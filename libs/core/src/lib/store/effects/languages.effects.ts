import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap, take, tap } from 'rxjs';
import { LanguagesActions } from '../actions/languages.actions';

@Injectable()
export class LanguagesEffects {
  readonly #actions: Actions = inject(Actions);
  readonly #translateService = inject(TranslocoService);

  init$ = createEffect(() =>
    this.#actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => LanguagesActions.prepareLanguages()),
    ),
  );

  prepareLanguages$ = createEffect(() =>
    this.#actions.pipe(
      ofType(LanguagesActions.prepareLanguages),
      switchMap(() => {
        const languages = this.#translateService.getAvailableLangs().map((lang) => {
          if (typeof lang === 'string') {
            return lang;
          }
          return lang.label;
        });
        const defaultLang = this.#translateService.getDefaultLang();
        return of(LanguagesActions.prepareLanguagesSuccess({ languages, selectedLanguage: defaultLang }));
      }),
    ),
  );

  selectLanguage$ = createEffect(() =>
    this.#actions.pipe(
      ofType(LanguagesActions.selectLanguage),
      map((action) => {
        this.#translateService.setActiveLang(action.language);
        return LanguagesActions.selectLanguageSuccess({ language: action.language });
      }),
    ),
  );
}
