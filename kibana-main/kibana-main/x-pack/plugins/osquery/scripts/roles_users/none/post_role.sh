
#
# Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
# or more contributor license agreements. Licensed under the Elastic License
# 2.0; you may not use this file except in compliance with the Elastic License
# 2.0.
#

ROLE_CONFIG=(${@:-./detections_role.json})

curl -H 'Content-Type: application/json' -H 'kbn-xsrf: 123'\
 -u ${ELASTICSEARCH_USERNAME}:${ELASTICSEARCH_PASSWORD} \
-XPUT ${KIBANA_URL}/api/security/role/none \
-d @${ROLE_CONFIG}
