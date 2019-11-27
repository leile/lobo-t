import * as React from 'react';

// --- Helper types

// https://github.com/Microsoft/TypeScript/issues/30611
type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

type KeyType = string | number;

type ValueOf<T> = T[keyof T];

export type Translatable<Lang extends StandardEnum<KeyType>, U = unknown> = {
  [key in ValueOf<Lang>]: U;
};

export type TFunc<Lang extends StandardEnum<KeyType>> = <U>(
  arg: Translatable<Lang, U>
) => U;

// ---

function init<Language extends StandardEnum<KeyType>>(
  defaultLanguage: ValueOf<Language>
) {
  const LanguageContext = React.createContext(defaultLanguage);

  const useTranslation = (): {
    t: TFunc<Language>;
    language: ValueOf<Language>;
  } => {
    const language = React.useContext(LanguageContext);

    return { t: arg => arg[language], language };
  };

  return {
    LanguageProvider: LanguageContext.Provider,
    useTranslation,
  };
}

export default init;
