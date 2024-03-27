import * as packageJson from '../../../../package.json';
import { DEFAULT_ENVIRONMENT, Environment } from '@books/shared';

export const environment: Environment = {
  ...DEFAULT_ENVIRONMENT,
  buildVersion: packageJson.version,
  environmentType: 'PROD',
  production: true,
};
