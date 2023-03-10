/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { NetworkTopCountriesStrategyResponse } from '../../../../../common/search_strategy/security_solution/network';

export const mockData: { NetworkTopCountries: NetworkTopCountriesStrategyResponse } = {
  NetworkTopCountries: {
    rawResponse: {} as NetworkTopCountriesStrategyResponse['rawResponse'],
    totalCount: 524,
    edges: [
      {
        node: {
          source: {
            country: 'DE',
            destination_ips: 12,
            flows: 12345,
            source_ips: 55,
          },
          destination: null,
          network: {
            bytes_in: 3826633497,
            bytes_out: 1083495734,
          },
        },
        cursor: {
          value: '8.8.8.8',
        },
      },
      {
        node: {
          source: {
            flows: 12345,
            destination_ips: 12,
            source_ips: 55,
            country: 'US',
          },
          destination: null,
          network: {
            bytes_in: 3826633497,
            bytes_out: 1083495734,
          },
        },
        cursor: {
          value: '9.9.9.9',
        },
      },
    ],
    pageInfo: {
      activePage: 1,
      fakeTotalCount: 50,
      showMorePagesIndicator: true,
    },
  },
};
