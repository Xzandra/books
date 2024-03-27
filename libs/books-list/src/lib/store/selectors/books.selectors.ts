import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, BooksStateFeature } from '../state/books.state';

const booksState$ = createFeatureSelector<BooksState>(BooksStateFeature);

export const BooksSelectors = {
  searching$: createSelector(booksState$, (state) => state.searching),
  query$: createSelector(booksState$, (state) => state.query),
  error$: createSelector(booksState$, (state) => state.error),
  books$: createSelector(booksState$, (state) => state.books),
};
