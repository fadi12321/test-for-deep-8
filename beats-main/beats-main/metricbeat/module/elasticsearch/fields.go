// Licensed to Elasticsearch B.V. under one or more contributor
// license agreements. See the NOTICE file distributed with
// this work for additional information regarding copyright
// ownership. Elasticsearch B.V. licenses this file to you under
// the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

// Code generated by beats/dev-tools/cmd/asset/asset.go - DO NOT EDIT.

package elasticsearch

import (
	"github.com/elastic/beats/v7/libbeat/asset"
)

func init() {
	if err := asset.SetFields("metricbeat", "elasticsearch", asset.ModuleFieldsPri, AssetElasticsearch); err != nil {
		panic(err)
	}
}

// AssetElasticsearch returns asset data.
// This is the base64 encoded zlib format compressed contents of module/elasticsearch.
func AssetElasticsearch() string {
	return "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"
}