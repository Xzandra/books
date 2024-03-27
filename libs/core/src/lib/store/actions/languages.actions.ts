import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LanguagesActions = createActionGroup({
  source: 'Languages',
  events: {
    prepareLanguages: emptyProps(),
    prepareLanguagesSuccess: props<{ languages: string[]; selectedLanguage: string }>(),
    selectLanguage: props<{ language: string }>(),
    selectLanguageSuccess: props<{ language: string }>(),
  },
});
