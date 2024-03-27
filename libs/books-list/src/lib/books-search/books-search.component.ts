import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'lib-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputTextModule, FormsModule, TranslocoModule],
})
export class BooksSearchComponent {
  @Input() searchValue?: string | null;

  @Output() search = new EventEmitter<string>();

  onSearch(searchInput: HTMLInputElement): void {
    this.search.emit(searchInput.value);
  }
}
