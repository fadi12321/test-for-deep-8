/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { find, reduce, values, sortBy } from 'lodash';
import { decorateShards } from '../lib/decorate_shards';

export function indicesByNodes() {
  return function indicesByNodesFn(shards, nodes) {
    function createIndex(obj, shard) {
      const id = shard.index;
      if (obj[id]) {
        return obj;
      }
      obj[id] = {
        id,
        name: id,
        children: [],
        unassigned: [],
        unassignedPrimaries: false,
        type: 'index',
      };
      return obj;
    }

    function createNodeAddShard(obj, shard) {
      const { node, index } = shard;

      // If the node is null then it's an unassigned shard and we need to
      // add it to the unassigned array.
      if (!shard.node || shard.node === null) {
        obj[index].unassigned.push(shard);
        // if the shard is a primary we need to set the unassignedPrimaries flag
        if (shard.primary) {
          obj[index].unassignedPrimaries = true;
        }
        return obj;
      }

      let nodeObj = find(obj[index].children, { id: node });
      if (!nodeObj) {
        nodeObj = {
          id: node,
          type: 'node',
          name: nodes[node].name,
          node_type: nodes[node].type,
          ip_port: nodes[node].transport_address,
          children: [],
        };
        obj[index].children.push(nodeObj);
      }
      nodeObj.children.push(shard);
      return obj;
    }

    const data = reduce(
      decorateShards(shards, nodes),
      function (obj, shard) {
        obj = createIndex(obj, shard);
        obj = createNodeAddShard(obj, shard);
        return obj;
      },
      {}
    );
    const dataValues = values(data);
    return sortBy(dataValues, (index) => [
      !index.unassignedPrimaries,
      /^\./.test(index.name),
      index.name,
    ]);
  };
}
