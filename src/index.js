import React from 'react';
import { render } from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/app.scss';

import App from './App.jsx';

const run = () => {
  render(<App />, document.getElementById('container'));
};

run();

// TODO
// 1. Remove lodash
// https://reactjs.org/docs/refs-and-the-dom.html#callback-refs - почитать
