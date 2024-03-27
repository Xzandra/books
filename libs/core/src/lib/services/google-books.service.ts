import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '@books/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  readonly #apiPath = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(queryTitle: string, lang: string): Observable<Book[]> {
    return this.http
      .get<{ items: Book[] }>(`${this.#apiPath}?q=${queryTitle}&printType=books&langRestrict=${lang}`)
      .pipe(map((books) => books.items || []));
  }

  retrieveBook(volumeId: string): Observable<Book> {
    return this.http.get<Book>(`${this.#apiPath}/${volumeId}`);
  }
}
