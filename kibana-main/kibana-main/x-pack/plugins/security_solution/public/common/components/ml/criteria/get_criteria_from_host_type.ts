/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { HostsType } from '../../../../explore/hosts/store/model';
import type { CriteriaFields } from '../types';

export const getCriteriaFromHostType = (
  type: HostsType,
  hostName: string | undefined
): CriteriaFields[] => {
  if (type === HostsType.details && hostName != null) {
    return [{ fieldName: 'host.name', fieldValue: hostName }];
  } else {
    return [];
  }
};
