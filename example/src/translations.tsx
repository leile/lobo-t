import * as React from 'react';

const tranlations = {
  title: {
    nb: 'Lobo-T',
    en: 'Lobo-T',
  },
  description: {
    nb: 'Lobo-T er et enkelt bibliotek for typesikre oversettelser.',
    en: 'Lobo-T is a simple library for type-safe translations',
  },
  languageLabel: {
    nb: 'Aktivt språk',
    en: 'Active language',
  },
  examples: {
    heading: {
      nb: 'Lobo-T bryr seg ikke om hva du oversetter',
      en: "Lobo-T doesn't care what you translate",
    },
    description: {
      nb: 'Det kan være f.eks.:',
      en: 'It can be for example:',
    },
    labels: {
      string: {
        nb: 'Strenger',
        en: 'Strings',
      },
      numbers: {
        nb: 'Tall',
        en: 'Numbers',
      },
      components: {
        nb: 'Tilogmed React-komponenter',
        en: 'Even React components',
      },
    },
    someString: {
      nb: 'Dette er en streng',
      en: 'This is a string',
    },
    someNumber: {
      nb: 1234,
      en: 5678,
    },
    someComponent: {
      nb: (
        <span>
          Dette er <strong>stilig</strong>
        </span>
      ),
      en: (
        <span>
          This is <strong>cool</strong>
        </span>
      ),
    },
  },
};

export default tranlations;
