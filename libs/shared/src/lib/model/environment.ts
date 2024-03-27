import { EnvironmentProviders, InjectionToken } from '@angular/core';

export interface Environment {
  buildVersion: string;
  environmentType: 'DEV' | 'PROD';
  startTime: Date;
  production: boolean;
  debugTracing?: boolean;
  environmentProviders: EnvironmentProviders[];
  app: {
    baseUrl: string;
  };
  api: {
    baseUrl: string;
  };
}

export const DEFAULT_ENVIRONMENT: Environment = {
  buildVersion: 'REPLACE',
  environmentType: 'DEV',
  startTime: new Date(),
  production: false,
  environmentProviders: [],
  app: {
    baseUrl: '/books',
  },
  api: {
    baseUrl: 'http://localhost:4001/api',
  },
};

export const ENVIRONMENT: InjectionToken<Environment> = new InjectionToken(
  'ENVIRONMENT'
);
