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

/** The initializing function for Lobot.
 *
 * It requires you to pass an enum of valid languages, and a default language
 * if none is provided.
 *
 * @example
 * enum Language = {
 *   Norwegian: 'nb',
 *   English: 'en'
 * };
 * const lobot = initLobot<typeof Language>(Language.English);
 */
export function initLobot<Language extends StandardEnum<KeyType>>(
  defaultLanguage: ValueOf<Language>
) {
  const LanguageContext = React.createContext(defaultLanguage);

  /** A hook that gives you access to the translation function `t` and the
   * current language `language`.
   *
   * @example
   * const texts = {
   *   buttonText: {
   *     nb: 'Trykk her',
   *     en: 'Click here',
   *   }
   * };
   * const { t } = useTranslation();
   * return (
   *   <button>
   *     {t(texts.buttonText)}
   *   </button>
   * );
   * */
  const useTranslation = (): {
    /** The translation function.
     *
     * Provide it a text object, and it will return you the text in the
     * current language.
     *
     * @example
     * const texts = {
     *   buttonText: {
     *     nb: 'Trykk her',
     *     en: 'Click here'
     *   }
     * };
     * const { t } = useTranslation();
     * return (
     *   <button>
     *     {t(texts.buttonText)}
     *   </button>
     * );
     */
    t: TFunc<Language>;
    /** The currently selected language */
    language: ValueOf<Language>;
  } => {
    const language = React.useContext(LanguageContext);

    return {
      t: (arg: any) => arg[language],
      language,
    };
  };

  return {
    /** Wraps your app, and provides the current language through context
     *
     * `LanguageProvider` accepts a `value` prop, which is the currently active
     * language.
     *
     * @example
     * <LanguageProvider value={currentLanguage}>
     *   <App />
     * </LanguageProvider>
     */
    LanguageProvider: LanguageContext.Provider,

    useTranslation,
  };
}
