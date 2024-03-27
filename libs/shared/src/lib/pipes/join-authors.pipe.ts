import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'joinAuthors',
})
export class JoinAuthorsPipe implements PipeTransform {
  transform(authors: undefined | null | string[]): string {
    if (!authors || authors.length === 0) {
      return 'books.unknownAuthor';
    }

    return authors.join(', ');
  }
}
