/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlexGroup, EuiFlexItem, EuiButtonEmpty } from '@elastic/eui';
import React, { ReactNode } from 'react';
import { withTheme, EuiTheme } from '@kbn/kibana-react-plugin/common';
import { KubernetesTour } from './kubernetes_tour';

interface Props {
  'data-test-subj'?: string;
  label: string;
  onClick: () => void;
  theme: EuiTheme | undefined;
  children: ReactNode;
  showKubernetesInfo?: boolean;
}

const ButtonLabel = ({ label, theme }: { label: string; theme?: EuiTheme }) => (
  <EuiFlexItem
    grow={false}
    style={{
      padding: 12,
      background: theme?.eui.euiFormInputGroupLabelBackground,
      fontSize: '0.75em',
      fontWeight: 600,
      color: theme?.eui.euiTitleColor,
    }}
  >
    {label}
  </EuiFlexItem>
);

export const DropdownButton = withTheme((props: Props) => {
  const { onClick, label, theme, children, showKubernetesInfo } = props;
  return (
    <EuiFlexGroup
      alignItems="center"
      gutterSize="none"
      style={{
        border: theme?.eui.euiFormInputGroupBorder,
        boxShadow: `0px 3px 2px ${theme?.eui.euiTableActionsBorderColor}, 0px 1px 1px ${theme?.eui.euiTableActionsBorderColor}`,
      }}
    >
      {showKubernetesInfo ? (
        <KubernetesTour>
          <ButtonLabel label={label} theme={theme} />
        </KubernetesTour>
      ) : (
        <ButtonLabel label={label} theme={theme} />
      )}
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          data-test-subj={props['data-test-subj']}
          color="text"
          iconType="arrowDown"
          onClick={onClick}
          iconSide="right"
          size="xs"
        >
          {children}
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
});
