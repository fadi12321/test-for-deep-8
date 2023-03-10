/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import { ReportingUsageType } from '@kbn/reporting-plugin/server/usage/types';
import { FtrProviderContext } from '../../ftr_provider_context';

const DATA_ARCHIVE_PATH = 'x-pack/test/functional/es_archives/reporting/errors';

// eslint-disable-next-line import/no-default-export
export default function ({ getService }: FtrProviderContext) {
  const esArchiver = getService('esArchiver');
  const reportingAPI = getService('reportingAPI');
  const usageAPI = getService('usageAPI');

  describe(`error codes`, () => {
    let reporting: ReportingUsageType;

    before(async () => {
      await reportingAPI.deleteAllReports();
      await esArchiver.load(DATA_ARCHIVE_PATH);
      const [{ stats }] = await usageAPI.getTelemetryStats({ unencrypted: true });
      reporting = stats.stack_stats.kibana.plugins.reporting;
    });

    after(async () => {
      await esArchiver.unload(DATA_ARCHIVE_PATH);
      await reportingAPI.deleteAllReports();
    });

    it('includes error code statistics', async () => {
      expect(reporting._all).equal(3);
      expectSnapshot(
        (['csv_searchsource', 'PNGV2', 'printable_pdf_v2'] as const).map((k) => {
          const field = reporting[k];
          return { key: k, error_codes: field.error_codes, total: field.total };
        })
      ).toMatchInline(`
        Array [
          Object {
            "error_codes": undefined,
            "key": "csv_searchsource",
            "total": 0,
          },
          Object {
            "error_codes": undefined,
            "key": "PNGV2",
            "total": 0,
          },
          Object {
            "error_codes": Object {
              "queue_timeout_error": 1,
              "unknown_error": 1,
            },
            "key": "printable_pdf_v2",
            "total": 3,
          },
        ]
      `);
    });
  });
}
