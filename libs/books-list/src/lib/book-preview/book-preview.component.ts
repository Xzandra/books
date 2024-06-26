import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book, JoinAuthorsPipe } from '@books/shared';
import { TranslocoPipe } from '@ngneat/transloco';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'lib-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslocoPipe, CardModule, JoinAuthorsPipe],
})
export class BookPreviewComponent {
  @Input() book!: Book;

  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get thumbnail(): string | boolean {
    if (this.book.volumeInfo.imageLinks) {
      return this.book.volumeInfo.imageLinks.smallThumbnail.replace('http:', '');
    }

    return false;
  }
}
