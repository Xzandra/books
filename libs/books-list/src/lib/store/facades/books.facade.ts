import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchBookActions } from '../actions/books-search.actions';
import { BooksSelectors } from '../selectors/books.selectors';

@Injectable({
  providedIn: 'root',
})
export class BooksFacade {
  readonly #store: Store = inject(Store);

  searching$ = this.#store.select(BooksSelectors.searching$);
  query$ = this.#store.select(BooksSelectors.query$);
  books$ = this.#store.select(BooksSelectors.books$);
  error$ = this.#store.select(BooksSelectors.error$);

  searchBooks(query: string) {
    this.#store.dispatch(SearchBookActions.searchBooks({ query }));
  }
}
