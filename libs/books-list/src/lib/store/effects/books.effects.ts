import { Injectable, inject } from '@angular/core';
import { GoogleBooksService, LanguagesActions, LanguagesFacade } from '@books/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map, of, switchMap, take, withLatestFrom } from 'rxjs';
import { SearchBookActions } from '../actions/books-search.actions';
import { Book } from '@books/shared';
import { BooksSelectors } from '../selectors/books.selectors';
import { isEmpty } from 'lodash-es';

@Injectable()
export class BookEffects {
  readonly #actions: Actions = inject(Actions);
  readonly #store: Store = inject(Store);
  readonly #languagesFacade: LanguagesFacade = inject(LanguagesFacade);
  readonly #googleBooks: GoogleBooksService = inject(GoogleBooksService);

  search$ = createEffect(() =>
    this.#actions.pipe(
      ofType(SearchBookActions.searchBooks),
      withLatestFrom(this.#languagesFacade.activeLanguage$),
      switchMap(([{ query }, lang]) => {
        return this.#searchBooks(lang, query);
      }),
    ),
  );

  languageChange$ = createEffect(() =>
    this.#actions.pipe(
      ofType(LanguagesActions.selectLanguageSuccess),
      withLatestFrom(this.#store.select(BooksSelectors.query$)),
      switchMap(([{ language }, query]) => {
        return this.#searchBooks(language, query);
      }),
    ),
  );

  readonly #searchBooks = (lang: string, query?: string | null) => {
    if (isEmpty(query)) {
      return EMPTY;
    }
    return this.#googleBooks.searchBooks(query ?? '', lang).pipe(
      take(1),
      map((books: Book[]) => SearchBookActions.searchBooksSuccess({ books })),
      catchError((err) => of(SearchBookActions.searchBooksFailure({ errorMsg: err.message }))),
    );
  };
}
