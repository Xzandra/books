import { Book } from '@books/shared';

export interface BooksState {
  searching: boolean;
  error?: string;
  query?: string;
  books: Book[];
}

export const BooksStateFeature = 'books';
