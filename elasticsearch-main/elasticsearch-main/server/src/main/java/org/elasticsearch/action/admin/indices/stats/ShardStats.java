/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

package org.elasticsearch.action.admin.indices.stats;

import org.elasticsearch.TransportVersion;
import org.elasticsearch.cluster.routing.ShardRouting;
import org.elasticsearch.common.io.stream.StreamInput;
import org.elasticsearch.common.io.stream.StreamOutput;
import org.elasticsearch.common.io.stream.Writeable;
import org.elasticsearch.core.Nullable;
import org.elasticsearch.index.engine.CommitStats;
import org.elasticsearch.index.seqno.RetentionLeaseStats;
import org.elasticsearch.index.seqno.SeqNoStats;
import org.elasticsearch.index.shard.ShardPath;
import org.elasticsearch.xcontent.ToXContentFragment;
import org.elasticsearch.xcontent.XContentBuilder;

import java.io.IOException;
import java.util.Objects;

public class ShardStats implements Writeable, ToXContentFragment {

    private static final TransportVersion DEDUPLICATE_SHARD_PATH_VERSION = TransportVersion.V_8_4_0;

    private final ShardRouting shardRouting;
    private final CommonStats commonStats;
    @Nullable
    private final CommitStats commitStats;
    @Nullable
    private final SeqNoStats seqNoStats;
    @Nullable
    private final RetentionLeaseStats retentionLeaseStats;

    private final String dataPath;
    private final String statePath;
    private final boolean isCustomDataPath;

    public ShardStats(StreamInput in) throws IOException {
        shardRouting = new ShardRouting(in);
        commonStats = new CommonStats(in);
        commitStats = CommitStats.readOptionalCommitStatsFrom(in);
        statePath = in.readString();
        if (in.getTransportVersion().onOrAfter(DEDUPLICATE_SHARD_PATH_VERSION)) {
            dataPath = Objects.requireNonNullElse(in.readOptionalString(), this.statePath);
        } else {
            dataPath = in.readString();
        }
        isCustomDataPath = in.readBoolean();
        seqNoStats = in.readOptionalWriteable(SeqNoStats::new);
        retentionLeaseStats = in.readOptionalWriteable(RetentionLeaseStats::new);
    }

    public ShardStats(
        final ShardRouting shardRouting,
        final ShardPath shardPath,
        final CommonStats commonStats,
        final CommitStats commitStats,
        final SeqNoStats seqNoStats,
        final RetentionLeaseStats retentionLeaseStats
    ) {
        this(
            shardRouting,
            commonStats,
            commitStats,
            seqNoStats,
            retentionLeaseStats,
            shardPath.getRootDataPath().toString(),
            shardPath.getRootStatePath().toString(),
            shardPath.isCustomDataPath()
        );
    }

    public ShardStats(
        ShardRouting shardRouting,
        CommonStats commonStats,
        CommitStats commitStats,
        SeqNoStats seqNoStats,
        RetentionLeaseStats retentionLeaseStats,
        String dataPath,
        String statePath,
        boolean isCustomDataPath
    ) {
        this.shardRouting = shardRouting;
        this.commonStats = commonStats;
        this.commitStats = commitStats;
        this.seqNoStats = seqNoStats;
        this.retentionLeaseStats = retentionLeaseStats;
        this.dataPath = dataPath;
        this.statePath = statePath;
        this.isCustomDataPath = isCustomDataPath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShardStats that = (ShardStats) o;
        return Objects.equals(shardRouting, that.shardRouting)
            && Objects.equals(dataPath, that.dataPath)
            && Objects.equals(statePath, that.statePath)
            && isCustomDataPath == that.isCustomDataPath
            && Objects.equals(commitStats, that.commitStats)
            && Objects.equals(commonStats, that.commonStats)
            && Objects.equals(seqNoStats, that.seqNoStats)
            && Objects.equals(retentionLeaseStats, that.retentionLeaseStats);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shardRouting, dataPath, statePath, isCustomDataPath, commitStats, commonStats, seqNoStats, retentionLeaseStats);
    }

    /**
     * The shard routing information (cluster wide shard state).
     */
    public ShardRouting getShardRouting() {
        return this.shardRouting;
    }

    public CommonStats getStats() {
        return this.commonStats;
    }

    @Nullable
    public CommitStats getCommitStats() {
        return this.commitStats;
    }

    @Nullable
    public SeqNoStats getSeqNoStats() {
        return this.seqNoStats;
    }

    /**
     * Gets the current retention lease stats.
     *
     * @return the current retention lease stats
     */
    public RetentionLeaseStats getRetentionLeaseStats() {
        return retentionLeaseStats;
    }

    public String getDataPath() {
        return dataPath;
    }

    public String getStatePath() {
        return statePath;
    }

    public boolean isCustomDataPath() {
        return isCustomDataPath;
    }

    @Override
    public void writeTo(StreamOutput out) throws IOException {
        shardRouting.writeTo(out);
        commonStats.writeTo(out);
        out.writeOptionalWriteable(commitStats);
        out.writeString(statePath);
        if (out.getTransportVersion().onOrAfter(DEDUPLICATE_SHARD_PATH_VERSION)) {
            out.writeOptionalString(statePath.equals(dataPath) ? null : dataPath);
        } else {
            out.writeString(dataPath);
        }
        out.writeBoolean(isCustomDataPath);
        out.writeOptionalWriteable(seqNoStats);
        out.writeOptionalWriteable(retentionLeaseStats);
    }

    @Override
    public XContentBuilder toXContent(XContentBuilder builder, Params params) throws IOException {
        builder.startObject(Fields.ROUTING)
            .field(Fields.STATE, shardRouting.state())
            .field(Fields.PRIMARY, shardRouting.primary())
            .field(Fields.NODE, shardRouting.currentNodeId())
            .field(Fields.RELOCATING_NODE, shardRouting.relocatingNodeId())
            .endObject();

        commonStats.toXContent(builder, params);
        if (commitStats != null) {
            commitStats.toXContent(builder, params);
        }
        if (seqNoStats != null) {
            seqNoStats.toXContent(builder, params);
        }
        if (retentionLeaseStats != null) {
            retentionLeaseStats.toXContent(builder, params);
        }
        builder.startObject(Fields.SHARD_PATH);
        builder.field(Fields.STATE_PATH, statePath);
        builder.field(Fields.DATA_PATH, dataPath);
        builder.field(Fields.IS_CUSTOM_DATA_PATH, isCustomDataPath);
        builder.endObject();
        return builder;
    }

    static final class Fields {
        static final String ROUTING = "routing";
        static final String STATE = "state";
        static final String STATE_PATH = "state_path";
        static final String DATA_PATH = "data_path";
        static final String IS_CUSTOM_DATA_PATH = "is_custom_data_path";
        static final String SHARD_PATH = "shard_path";
        static final String PRIMARY = "primary";
        static final String NODE = "node";
        static final String RELOCATING_NODE = "relocating_node";
    }

}
