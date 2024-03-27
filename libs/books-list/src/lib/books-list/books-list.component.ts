import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookPreviewComponent } from '../book-preview/book-preview.component';
import { BooksFacade } from '../store/facades/books.facade';
import { BooksSearchComponent } from './../books-search/books-search.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'lib-books-list',
  standalone: true,
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BooksSearchComponent, BookPreviewComponent, ProgressSpinnerModule],
})
export class BooksListComponent {
  readonly #booksFacade: BooksFacade = inject(BooksFacade);

  books$ = this.#booksFacade.books$;
  searching$ = this.#booksFacade.searching$;
  error$ = this.#booksFacade.error$;
  query$ = this.#booksFacade.query$;

  search(query: string) {
    this.#booksFacade.searchBooks(query);
  }
}
