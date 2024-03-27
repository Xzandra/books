import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksReducer } from './store/reducers/books.reducer';
import { BooksStateFeature } from './store/state/books.state';
import { provideEffects } from '@ngrx/effects';
import { BookEffects } from './store/effects/books.effects';

export const booksRoutes: Route[] = [
  {
    path: '',
    providers: [
      // register feature reducer
      provideState(BooksStateFeature, BooksReducer),
      // register feature effects
      provideEffects([BookEffects]),
    ],
    children: [
      {
        path: '',
        component: BooksListComponent,
      },
    ],
  },
];
