import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { withYMaps } from 'react-yandex-maps';
import 'regenerator-runtime/runtime.js'; // установил, когда добавил async в handleSubmit, иначе появлялась ошибка, что import 'regenerator-runtime' не установлен
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { addPoint } from './features/map/mapSlice.js';

const coordMock = {
  'Россия, Москва ': [55.75, 37.57],
  'Россия, Ростов-на-Дону ': [47.222078, 39.720358],
  'Россия, Самара ': [53.195878, 50.100202],
  'Россия, Волгоград ': [48.707067, 44.516975],
};

const SendForm = ({ ymaps }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    inputRef.current.focus();

    const suggest = new ymaps.SuggestView(inputRef.current);
    suggest.events.add('select', async (e) => {
      const item = e.get('item');
      setNewAddress(item.value);
      inputRef.current.focus();
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await ymaps.geocode(pointName);
    // const coordinates = res.geoObjects.get(0).geometry.getCoordinates()
    const coordinates = coordMock[newAddress];
    const newPoint = { id: _.uniqueId(), coordinates, address: newAddress };
    dispatch(addPoint(newPoint));
    e.target.reset();
    inputRef.current.focus();
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} sm>
            <Form.Control
              type="text"
              name="text"
              data-testid="new-message"
              placeholder="Введите новую точку"
              ref={inputRef}
            />
          </Form.Group>
          <Col sm="auto">
            <Button className="btn btn-group-vertical" type="submit">
              messages.submitButton
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default withYMaps(SendForm, true, []);
