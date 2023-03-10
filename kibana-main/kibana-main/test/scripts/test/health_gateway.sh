#!/usr/bin/env bash

source test/scripts/jenkins_test_setup_oss.sh

node scripts/functional_tests \
  --config test/health_gateway/config.ts \
  --bail \
  --debug \
  --kibana-install-dir $KIBANA_INSTALL_DIR
