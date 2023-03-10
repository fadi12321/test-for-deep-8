/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import Boom from '@hapi/boom';

import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { identity } from 'fp-ts/lib/function';
import { schema } from '@kbn/config-schema';

import { throwErrors } from '../../../common/runtime_types';

import { InfraBackendLibs } from '../../lib/infra_types';
import {
  LOG_ENTRIES_SUMMARY_HIGHLIGHTS_PATH,
  logEntriesSummaryHighlightsRequestRT,
  logEntriesSummaryHighlightsResponseRT,
} from '../../../common/http_api/log_entries';
import { parseFilterQuery } from '../../utils/serialized_query';

const escapeHatch = schema.object({}, { unknowns: 'allow' });

export const initLogEntriesSummaryHighlightsRoute = ({
  framework,
  logEntries,
}: InfraBackendLibs) => {
  framework.registerRoute(
    {
      method: 'post',
      path: LOG_ENTRIES_SUMMARY_HIGHLIGHTS_PATH,
      validate: { body: escapeHatch },
    },
    async (requestContext, request, response) => {
      const payload = pipe(
        logEntriesSummaryHighlightsRequestRT.decode(request.body),
        fold(throwErrors(Boom.badRequest), identity)
      );
      const { logView, startTimestamp, endTimestamp, bucketSize, query, highlightTerms } = payload;

      const bucketsPerHighlightTerm = await logEntries.getLogSummaryHighlightBucketsBetween(
        requestContext,
        logView,
        startTimestamp,
        endTimestamp,
        bucketSize,
        highlightTerms,
        parseFilterQuery(query)
      );

      return response.ok({
        body: logEntriesSummaryHighlightsResponseRT.encode({
          data: bucketsPerHighlightTerm.map((buckets) => ({
            start: startTimestamp,
            end: endTimestamp,
            buckets,
          })),
        }),
      });
    }
  );
};
