import * as React from 'react';

import translations from './translations';
import { useTranslation } from './i18n';

const HomePage = () => {
  const { t, language } = useTranslation();
  return (
    <div>
      <h1>{t(translations.title)}</h1>
      <p>{t(translations.description)}</p>
      <p>
        {t(translations.languageLabel)}: {language}
      </p>
      <div>
        <h3>{t(translations.examples.heading)}</h3>
        <p>{t(translations.examples.description)}</p>
        <ul>
          <li>
            {t(translations.examples.labels.string)}:{' '}
            <pre>{t(translations.examples.someString)}</pre>
          </li>
          <li>
            {t(translations.examples.labels.numbers)}:{' '}
            <pre>{t(translations.examples.someNumber)}</pre>
          </li>
          <li>
            {t(translations.examples.labels.components)}:{' '}
            <pre>{t(translations.examples.someComponent)}</pre>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
