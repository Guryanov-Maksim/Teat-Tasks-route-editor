import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import * as yup from 'yup';

// import store from './store.js';
import configureAppStore from './store.js';
import { ru, errors } from './locales/index.js';
import App from './components/App.jsx';

const defaultLanguage = 'ru';

export default async () => {
  yup.setLocale(errors);

  const i18nInstance = i18n.createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: defaultLanguage,
      debug: process.env.NODE_ENV === 'development',
      resources: {
        ru,
      },
    });

  const store = configureAppStore();

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};
