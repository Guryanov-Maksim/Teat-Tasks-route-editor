import { render } from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/app.scss';

import init from './init.jsx';

const run = async () => {
  const vdom = await init();
  render(vdom, document.getElementById('container'));
};

run();

// TODO
// 1. Remove lodash
// https://reactjs.org/docs/refs-and-the-dom.html#callback-refs - почитать
// 2. Удалить лишнюю инфу из баллунов
