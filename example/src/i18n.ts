import initLobot from '../../.';

export enum Language {
  Norwegian = 'nb',
  English = 'en',
}

const lobot = initLobot<typeof Language>(Language.English);

export const LanguageProvider = lobot.LanguageProvider;
export const useTranslation = lobot.useTranslation;
