/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  isJavaAgentName,
  isRumAgentName,
  isIosAgentName,
  isAndroidAgentName,
  isMobileAgentName,
  isServerlessAgent,
  isAWSLambdaAgent,
  isAzureFunctionsAgent,
} from './agent_name';

import { ServerlessType } from './serverless';

describe('agent name helpers', () => {
  describe('isJavaAgentName', () => {
    describe('when the agent name is java', () => {
      it('returns true', () => {
        expect(isJavaAgentName('java')).toEqual(true);
      });
    });

    describe('when the agent name is opentelemetry/java', () => {
      it('returns true', () => {
        expect(isJavaAgentName('opentelemetry/java')).toEqual(true);
      });
    });

    describe('when the agent name is not java', () => {
      it('returns false', () => {
        expect(isJavaAgentName('not java')).toEqual(false);
      });
    });
  });

  describe('isRumAgentName', () => {
    describe('when the agent name is js-base', () => {
      it('returns true', () => {
        expect(isRumAgentName('js-base')).toEqual(true);
      });
    });

    describe('when the agent name is rum-js', () => {
      it('returns true', () => {
        expect(isRumAgentName('rum-js')).toEqual(true);
      });
    });

    describe('when the agent name is opentelemetry/webjs', () => {
      it('returns true', () => {
        expect(isRumAgentName('opentelemetry/webjs')).toEqual(true);
      });
    });

    describe('when the agent name is something else', () => {
      it('returns false', () => {
        expect(isRumAgentName('not rum')).toEqual(false);
      });
    });
  });

  describe('isIosAgentName', () => {
    describe('when the agent name is iOS/swift', () => {
      it('returns true', () => {
        expect(isIosAgentName('iOS/swift')).toEqual(true);
      });
    });

    describe('when the agent name is ios/swift', () => {
      it('returns true', () => {
        expect(isIosAgentName('ios/swift')).toEqual(true);
      });
    });

    describe('when the agent name is opentelemetry/swift', () => {
      it('returns true', () => {
        expect(isIosAgentName('opentelemetry/swift')).toEqual(false);
      });
    });

    describe('when the agent name is something else', () => {
      it('returns false', () => {
        expect(isIosAgentName('not ios')).toEqual(false);
      });
    });
  });

  describe('isAndroidAgentName', () => {
    describe('when the agent name is android/java', () => {
      it('returns true', () => {
        expect(isAndroidAgentName('android/java')).toEqual(true);
      });
    });

    describe('when the agent name is opentelemetry/java', () => {
      it('returns false', () => {
        expect(isAndroidAgentName('opentelemetry/java')).toEqual(false);
      });
    });

    describe('when the agent name is something else', () => {
      it('returns false', () => {
        expect(isAndroidAgentName('not android')).toEqual(false);
      });
    });
  });

  describe('isMobileAgentName', () => {
    describe('when the agent name is android/java', () => {
      it('returns true', () => {
        expect(isMobileAgentName('android/java')).toEqual(true);
      });
    });

    describe('when the agent name is iOS/swift', () => {
      it('returns true', () => {
        expect(isMobileAgentName('iOS/swift')).toEqual(true);
      });
    });

    describe('when the agent name is ios/swift', () => {
      it('returns true', () => {
        expect(isMobileAgentName('ios/swift')).toEqual(true);
      });
    });

    describe('when the agent name is opentelemetry/swift', () => {
      it('returns true', () => {
        expect(isMobileAgentName('opentelemetry/swift')).toEqual(false);
      });
    });

    describe('when the agent name is opentelemetry/java', () => {
      it('returns false', () => {
        expect(isMobileAgentName('opentelemetry/java')).toEqual(false);
      });
    });

    describe('when the agent name is something else', () => {
      it('returns false', () => {
        expect(isMobileAgentName('not mobile')).toEqual(false);
      });
    });
  });

  describe('isServerlessAgent', () => {
    describe('when the serverlessType is AWS_LAMBDA', () => {
      it('returns true', () => {
        expect(isServerlessAgent(ServerlessType.AWS_LAMBDA)).toEqual(true);
      });
    });

    describe('when the serverlessType is AZURE_FUNCTIONS', () => {
      it('returns true', () => {
        expect(isServerlessAgent(ServerlessType.AZURE_FUNCTIONS)).toEqual(true);
      });
    });

    describe('when the serverlessType is undefined', () => {
      it('returns false', () => {
        expect(isServerlessAgent(undefined)).toEqual(false);
      });
    });
  });

  describe('isAWSLambdaAgent', () => {
    describe('when the serverlessType is AWS_LAMBDA', () => {
      it('returns true', () => {
        expect(isAWSLambdaAgent(ServerlessType.AWS_LAMBDA)).toEqual(true);
      });
    });

    describe('when the serverlessType is AZURE_FUNCTIONS', () => {
      it('returns true', () => {
        expect(isAWSLambdaAgent(ServerlessType.AZURE_FUNCTIONS)).toEqual(false);
      });
    });

    describe('when the serverlessType is undefined', () => {
      it('returns false', () => {
        expect(isAWSLambdaAgent(undefined)).toEqual(false);
      });
    });
  });

  describe('isAzureFunctionsAgent', () => {
    describe('when the serverlessType is AZURE_FUNCTIONS', () => {
      it('returns true', () => {
        expect(isAzureFunctionsAgent(ServerlessType.AZURE_FUNCTIONS)).toEqual(
          true
        );
      });
    });

    describe('when the serverlessType is AWS_LAMBDA', () => {
      it('returns true', () => {
        expect(isAzureFunctionsAgent(ServerlessType.AWS_LAMBDA)).toEqual(false);
      });
    });

    describe('when the serverlessType is undefined', () => {
      it('returns false', () => {
        expect(isAzureFunctionsAgent(undefined)).toEqual(false);
      });
    });
  });
});
