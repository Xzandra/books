import { Action, createReducer, on } from '@ngrx/store';
import { LanguagesState } from '../state/languages.state';
import { LanguagesActions } from '../actions/languages.actions';

const initialState: LanguagesState = {
  languages: [],
  selectedLanguage: '',
};

const reducer = createReducer<LanguagesState>(
  initialState,
  on(LanguagesActions.prepareLanguagesSuccess, (state, { languages, selectedLanguage }) => ({
    languages: [...languages],
    selectedLanguage,
  })),
  on(LanguagesActions.selectLanguageSuccess, (state, { language }) => ({ ...state, selectedLanguage: language })),
);

export const LanguagesReducer = (state = initialState, action: Action): LanguagesState => {
  return reducer(state, action);
};
