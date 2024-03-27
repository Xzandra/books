import { Route } from '@angular/router';
import { AppRoute } from '@books/shared';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LanguagesFacade } from '@books/core';

export const appRoutes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
    providers: [{ provide: LanguagesFacade, useClass: LanguagesFacade }],
  },
  {
    path: AppRoute.Books,
    loadChildren: () => import('@books/books-list').then((m) => m.booksRoutes),
  },
];
