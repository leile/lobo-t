# Lobo-T

> A small library for type-safe translations in React applications

## Installation

```sh
$ npm i @leile/lobo-t
# or
$ yarn add @leile/lobo-t
```

## `lobo-t` at a glance

You tell `lobo-t` which languages you support and which language is currently active.
`lobo-t` gives you a React hook that you can use to get a function for translating _text resources_.
A _text resource_ in `lobo-t` terms is an object that has keys for each language you support.
If you try to translate a _text resource_ that is missing one or more languages or a _text resource_ that doesn't exist, `lobo-t` (or rather, TypeScript) will tell you so.

That's all.

If you want to know more about why we decided to make this, [see below](#why).

## Usage

```tsx
// i18n.ts
import { initLobot } from '@leile/lobo-t';

// Specify which languages you support
export enum Language {
  Norwegian = 'nb',
  English = 'en',
}

const lobot = initLobot<typeof Language>(Language.English);

export const LanguageProvider = lobot.LanguageProvider;
export const useTranslation = lobot.useTranslation;
```

```tsx
// App.tsx
import { LanguageProvider, Language } from './i18n';
import MyComponent from './MyComponent';

// You decide how to detect/store the active language.
// In this example, we get it as a prop.
// When it changes, components using the useTranslation hook will re-render with the correct language
export default (props: { activeLanguage: Language }) => (
  <LanguageProvider value={props.activeLanguage}>
    <MyComponent />
  </LanguageProvider>
);
```

```tsx
// MyComponent.tsx
import { useTranslation } from './i18n';

// Text resources must have a key for each language you support
const texts = {
  header: {
    nb: 'Dette er en header',
    en: 'This is a header',
  },
  activeUsers: count => ({
    nb: `Det er nå ${count} aktive brukere`,
    en: `There are now ${count} active users`,
  }),
  // or
  //   header: {
  //     [Language.Norwegian]: 'Dette er en header',
  //     [Language.English]: 'This is a header',
  //   },
  //   activeUsers: count => ({
  //     [Language.Norwegian]: `Det er nå ${count} aktive brukere`,
  //     [Language.English]: `There are now ${count} active users`,
  //   }),
};

export default () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t(texts.header)}</h1>
      <p>{t(texts.activeUsers(5))}</p>
    </div>
  );
};
```

---

## Why?

After using other translation libraries for quite some time we realized that we didn't really like them.
They worked worked, but there were some things that irked us. For example:

- When using other tools you usually store translations in JSON files in separate folders per language. This makes the physical distance between translations too large. In our experience this often lead to texts in different languages communicating different things to users, because they were not written at the same time.
- Accessing text resources by calling a function with a string that coincidentally should correspond to a path in a JSON object is brittle and makes refactoring hard
- String interpolation is brittle when not type-checked. Having `{{somevariablename}}` in strings and passing objects with properties that _should_ match whatever you wrote in the translation file is an error waiting to happen.

So we sat down and came up with a list of what we wanted.
For context, most of our applications are written using [next.js](https://nextjs.org/), all of them in TypeScript, and at the moment we support two languages.
Additionally, we, the developers, are the ones writing the translations.

## Our list of requirements:

### Type-checked

- Trying to translate a resource that doesn't exist should not be an issue
- The compiler should tell you when you're missing translations for one or more of the languages you support

### Text resources should be able to live close to where they are used

We like the way CSS modules allow us to scope our CSS so that changes in one part of the application don't break other stuff. It would be nice to be able to apply the same principle to internationalization.

### It should be easy to see where a text resource is used

- There is a difference between two things being _similar_ and being _the same_. It happens often while refactoring one thing that some other thing stops making sense
- Dead code should be deleted, and so should unused text resources (and your editor/IDE should tell you if it wasn't dead after all)

### Translations for different languages should be located close together

The save button should communicate to the user that it will save, no matter what language the user is using.
It should not say "Save" in English and "Fullfør" (which means "Complete") in Norwegian.
Keeping the English and Norwegian texts close together, rather than in separate files in separate folders, helps us keep semantics in check.

### String interpolation should be easy and type-checked

When using a text resource that expects some external input you should be notified of this before leaving your editor/IDE.

### Using some styling in translations should be possible

Sometimes it makes sense to have some styling in the text resource.
This could be done either with inline HTML/JSX or using markdown in some way.

For example, in our opinion:

```tsx
const myText = <span>String with a <strong>bold</strong> word.</span>
/// ...
<div>{myTextResource}</div>
```

is easier and less error-prone than

```tsx
const myTextOne = 'String with a';
const myTextTwo = 'bold';
const myTextThree = ' word';
// ...
<div>
  {myTextOne}
  <strong>{myTextTwo}</strong>
  {myTextThree}
</div>;
```

In the second example, can you tell at a glance whether this wil render with the correct whitespace or not?

## This library is probably not for you if

- You get your text resources from a CMS or store them someplace other than in your code-base
- The developers are not the ones writing the translations
- You don't use TypeScript
- You don't like the API (but if you have any suggestions on how to improve it, discuss it with us!)
- You don't like superheroes
