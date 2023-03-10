/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';
import { FormattedRelative } from '@kbn/i18n-react';
import { UPDATED, UPDATING } from './translations';

interface UpdateStatusProps {
  updatedAt: number;
  isUpdating: boolean;
}

export const UpdateStatus: React.FC<UpdateStatusProps> = ({ isUpdating, updatedAt }) => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>
      <EuiText size="xs" color="subdued" data-test-subj="updateStatus">
        {isUpdating ? (
          UPDATING
        ) : (
          <>
            {UPDATED}
            &nbsp;
            <FormattedRelative value={new Date(updatedAt)} />
          </>
        )}
      </EuiText>
    </EuiFlexItem>
  </EuiFlexGroup>
);
