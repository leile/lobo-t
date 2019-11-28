import * as React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { initLobot, Translatable } from '../src';

Enzyme.configure({ adapter: new Adapter() });

enum Language {
  Norwegian = 'nb',
  English = 'en',
}

const translations = {
  heading: {
    nb: 'Norsk overskrift',
    en: 'Engligh heading',
  },
  someNumber: {
    nb: 1,
    en: 2,
  },
  someObject: {
    nb: {
      lol: 'hei',
    },
    en: {
      lol: 'hei',
    },
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
};

const { LanguageProvider, useTranslation } = initLobot<typeof Language>(
  Language.English
);

function TestComponent<U>({
  str,
  id = 'translated',
}: {
  str: Translatable<typeof Language, U>;
  id?: string;
}) {
  const { t } = useTranslation();

  return <div id={id}>{t(str)}</div>;
}

describe('it', () => {
  it('renders provider without crashing', () => {
    expect(() =>
      mount(<LanguageProvider value={Language.English} />)
    ).not.toThrow();
  });

  it('is able to use translation', () => {
    const wrapper = mount(
      <LanguageProvider value={Language.English}>
        <TestComponent str={translations.heading} />
      </LanguageProvider>
    );

    expect(wrapper.find('#translated').text()).toBe(translations.heading.en);
  });

  it('can change language', () => {
    const wrapper = mount(
      <LanguageProvider value={Language.English}>
        <TestComponent str={translations.heading} />
      </LanguageProvider>
    );

    expect(wrapper.find('#translated').text()).toBe(translations.heading.en);

    wrapper.setProps({ value: Language.Norwegian });

    expect(wrapper.find('#translated').text()).toBe(translations.heading.nb);
  });

  it("doesn't care about the type of translated values", () => {
    const wrapper = mount(
      <LanguageProvider value={Language.English}>
        <TestComponent str={translations.heading} />
      </LanguageProvider>
    );

    expect(wrapper.find('#translated').text()).toBe(translations.heading.en);

    wrapper.setProps({ value: Language.Norwegian });

    expect(wrapper.find('#translated').text()).toBe(translations.heading.nb);
  });
});
