/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { ValidFeatureId } from '@kbn/rule-data-utils';
import { BASE_RAC_ALERTS_API_PATH, BrowserFields } from '@kbn/rule-registry-plugin/common';
import { useCallback, useEffect, useState } from 'react';
import type { Alerts } from '../../../../types';
import { useKibana } from '../../../../common/lib/kibana';
import { ERROR_FETCH_BROWSER_FIELDS } from './translations';

export interface FetchAlertsArgs {
  featureIds: ValidFeatureId[];
  initialBrowserFields?: BrowserFields;
}

export interface FetchAlertResp {
  alerts: Alerts;
}

export type UseFetchAlerts = ({ featureIds }: FetchAlertsArgs) => [boolean, FetchAlertResp];

const INVALID_FEATURE_ID = 'siem';

export const useFetchBrowserFieldCapabilities = ({
  featureIds,
  initialBrowserFields,
}: FetchAlertsArgs): [boolean | undefined, BrowserFields] => {
  const {
    http,
    notifications: { toasts },
  } = useKibana().services;

  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
  const [browserFields, setBrowserFields] = useState<BrowserFields>(
    () => initialBrowserFields ?? {}
  );

  const getBrowserFieldInfo = useCallback(async () => {
    if (!http) return Promise.resolve({});

    try {
      return await http.get<BrowserFields>(`${BASE_RAC_ALERTS_API_PATH}/browser_fields`, {
        query: { featureIds },
      });
    } catch (e) {
      toasts.addDanger(ERROR_FETCH_BROWSER_FIELDS);
      return {};
    }
  }, [featureIds, http, toasts]);

  useEffect(() => {
    if (initialBrowserFields) {
      // Event if initial browser fields is empty, assign it
      // because client may be doing it to hide Fields Browser
      setBrowserFields(initialBrowserFields);
      return;
    }

    if (isLoading !== undefined || featureIds.includes(INVALID_FEATURE_ID)) {
      return;
    }

    setIsLoading(true);

    const callApi = async () => {
      const browserFieldsInfo = await getBrowserFieldInfo();

      setBrowserFields(browserFieldsInfo);
      setIsLoading(false);
    };

    callApi();
  }, [getBrowserFieldInfo, isLoading, featureIds, initialBrowserFields]);

  return [isLoading, browserFields];
};
