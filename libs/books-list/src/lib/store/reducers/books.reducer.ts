import { SearchBookActions } from '../actions/books-search.actions';
import { BooksState } from '../state/books.state';
import { Action, createReducer, on } from '@ngrx/store';

const initialState: BooksState = {
  searching: false,
  error: undefined,
  query: undefined,
  books: [],
};

const reducer = createReducer(
  initialState,
  on(SearchBookActions.searchBooks, (state, { query }) => ({
    ...state,
    searching: true,
    books: [],
    query,
  })),
  on(SearchBookActions.searchBooksSuccess, (state, { books }) => ({
    ...state,
    searching: false,
    books,
  })),
  on(SearchBookActions.searchBooksFailure, (state, { errorMsg }) => ({
    ...state,
    searching: false,
    books: [],
    error: errorMsg,
  })),
);

export const BooksReducer = (state = initialState, action: Action): BooksState => {
  return reducer(state, action);
};
