import React from 'react';
import { render } from 'react-dom';

import App from './App.jsx';

const run = () => {
  render(<App />, document.getElementById('container'));
};

run();

// TODO
// 1. Remove lodash
