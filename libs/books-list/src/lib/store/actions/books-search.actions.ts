import { Book } from '@books/shared';
import { createActionGroup, props } from '@ngrx/store';

export const SearchBookActions = createActionGroup({
  source: 'Search Book',
  events: {
    'Search Books': props<{ query: string }>(),
    'Search Books Success': props<{ books: Book[] }>(),
    'Search Books Failure': props<{ errorMsg: string }>(),
  },
});
