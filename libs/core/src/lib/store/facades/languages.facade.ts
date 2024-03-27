import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { LanguagesActions } from '../actions/languages.actions';
import { LanguagesSelectors } from '../selectors/languages.selectors';

@Injectable({
  providedIn: 'root',
})
export class LanguagesFacade {
  readonly #translate: TranslocoService = inject(TranslocoService);
  readonly #globalStore: Store = inject(Store);

  readonly languages$: Observable<string[]> = this.#globalStore.select(LanguagesSelectors.languages$);
  readonly selectedLanguage$ = combineLatest([
    this.#translate.events$,
    this.#globalStore.select(LanguagesSelectors.selectedLanguage$),
  ]).pipe(map(([_, selectedLanguage]) => selectedLanguage));

  readonly activeLanguage$ = this.#globalStore.select(LanguagesSelectors.selectedLanguage$);

  selectLanguage(language: string): void {
    this.#globalStore.dispatch(LanguagesActions.selectLanguage({ language }));
  }
}
