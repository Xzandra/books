import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { LanguagesEffects, LanguagesReducer, LanguagesStateFeature } from '@books/core';
import { ENVIRONMENT } from '@books/shared';
import { provideTransloco } from '@ngneat/transloco';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    { provide: APP_BASE_HREF, useValue: environment.app.baseUrl },
    provideRouter(
      appRoutes,
      ...(!environment.production && environment.debugTracing ? [withDebugTracing()] : []),
      // enable angular feature to bind path params and query params to component inputs
      withComponentInputBinding(),
    ),
    provideAnimations(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'de'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),

    // root configuration for ngrx store
    /**
     * Analogue StoreModule.forRoot() - it is imported once in the root module to register the root store and state for the app, accepting a reducer
     * function or object map of reducer functions.
     * Ngrx team recommends to use provideStore for root state and provideState on the base route of the feature module to set up feature state slides.
     * Default Runtime checks enabled:
     * - strictStateImmutability
     * - strictActionImmutability
     * https://ngrx.io/guide/store/configuration/runtime-checks
     */
    provideStore(),
    /**
     * Part of @ngrx/router-store.
     * Analogue StoreRouterConnectingModule.forRoot() - it is imported once in the root module and connects the Angular Router to the Store.
     */
    provideRouterStore({}),
    /**
     * Analogue StoreModule.for Root() and StoreModule.forFeature()
     */
    provideState('router', routerReducer),
    provideState(LanguagesStateFeature, LanguagesReducer),
    provideEffects([LanguagesEffects]),
    MessageService,
    /**
     * contains dev tools for redux store and has to be the last in providers list otherwise extension is not working
     */
    environment.environmentProviders,
  ],
};
