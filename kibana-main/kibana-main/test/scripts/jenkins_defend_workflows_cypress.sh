#!/usr/bin/env bash

source test/scripts/jenkins_test_setup_xpack.sh

echo " -> Running defend workflows cypress tests"
cd "$XPACK_DIR"

node scripts/functional_tests \
  --debug --bail \
  --kibana-install-dir "$KIBANA_INSTALL_DIR" \
  --config test/defend_workflows_cypress/cli_config.ts

echo ""
echo ""
