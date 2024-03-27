import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguagesState, LanguagesStateFeature } from '../state/languages.state';

const languagesState$ = createFeatureSelector<LanguagesState>(LanguagesStateFeature);

export const LanguagesSelectors = {
  languages$: createSelector(languagesState$, (state) => state.languages),
  selectedLanguage$: createSelector(languagesState$, (state) => state.selectedLanguage),
};
