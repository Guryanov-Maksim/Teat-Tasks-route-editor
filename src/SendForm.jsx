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

import { addPlacemark, removePlacemark, addLocation } from './features/map/mapSlice.js';

const coordMock = {
  'Москва, Россия': [55.75, 37.57],
  'Ростов-на-Дону, Россия': [47.222078, 39.720358],
  'Самара, Россия': [53.195878, 50.100202],
  'Волгоград, Россия': [48.707067, 44.516975],
};

const SendForm = ({ ymaps }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [newPointCoords, setNewPointCoords] = useState();

  useEffect(() => {
    inputRef.current.focus();

    const suggest = new ymaps.SuggestView(inputRef.current);
    suggest.events.add('select', async (e) => {
      console.log(e.originalEvent.item.displayName);
      // const res = await ymaps.geocode(e.originalEvent.item.displayName);
      // console.log(res.geoObjects.get(0).geometry.getCoordinates());
      const coordinates = coordMock[e.originalEvent.item.displayName];
      dispatch(addPlacemark(coordinates));
      setNewPointCoords(coordinates);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removePlacemark());
    // const id = _.uniqueId();
    dispatch(addLocation(newPointCoords));
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
