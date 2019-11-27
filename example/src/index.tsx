import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { LanguageProvider, Language } from './i18n';
import HomePage from './HomePage';

const App = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState(
    Language.English
  );

  return (
    <LanguageProvider value={currentLanguage}>
      <HomePage />
      <button
        onClick={() => {
          setCurrentLanguage(
            currentLanguage === Language.English
              ? Language.Norwegian
              : Language.English
          );
        }}
      >
        Change language
      </button>
    </LanguageProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
