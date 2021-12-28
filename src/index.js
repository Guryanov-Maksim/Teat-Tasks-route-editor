import { render } from 'react-dom';
import '../assets/app.scss';

import init from './init.jsx';

const run = async () => {
  const vdom = await init();
  render(vdom, document.getElementById('container'));
};

run();

// TODO
// https://reactjs.org/docs/refs-and-the-dom.html#callback-refs - почитать
