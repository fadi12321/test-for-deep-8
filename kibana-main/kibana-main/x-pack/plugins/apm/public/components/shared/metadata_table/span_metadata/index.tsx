/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useMemo } from 'react';
import { ProcessorEvent } from '@kbn/observability-plugin/common';
import { getSectionsFromFields } from '../helper';
import { MetadataTable } from '..';
import { FETCH_STATUS, useFetcher } from '../../../../hooks/use_fetcher';

interface Props {
  spanId: string;
}

export function SpanMetadata({ spanId }: Props) {
  const { data: spanEvent, status } = useFetcher(
    (callApmApi) => {
      return callApmApi(
        'GET /internal/apm/event_metadata/{processorEvent}/{id}',
        {
          params: {
            path: {
              processorEvent: ProcessorEvent.span,
              id: spanId,
            },
          },
        }
      );
    },
    [spanId]
  );

  const sections = useMemo(
    () => getSectionsFromFields(spanEvent?.metadata || {}),
    [spanEvent?.metadata]
  );

  return (
    <MetadataTable
      sections={sections}
      isLoading={status === FETCH_STATUS.LOADING}
    />
  );
}
