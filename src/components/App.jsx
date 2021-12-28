import React from 'react';
import { YMaps } from 'react-yandex-maps';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import PointsForm from '../features/pointsFrom/PointsForm.jsx';
import YandexMap from '../features/map/Map.jsx';
import Points from './Points.jsx';

const App = () => {
  const { t } = useTranslation();

  return (
    <YMaps query={{
      apikey: '48c83221-ea67-4ada-abb6-d05f32ffa30d',
    }}
    >
      <Container className="h-100 py-3 d-flex flex-column" fluid>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <h1 className="text-center mb-4">{t('mainHeader')}</h1>
        <div className="h-100 overflow-hidden">
          {/* благодаря этому div-у перестал выпадать контент и уместился на странице */}
          <Row className="h-100 flex-nowrap pt-1">
            <Col xs={6} sm={4} md={4} className="h-100 d-flex flex-column">
              <PointsForm />
              <Points />
            </Col>
            <Col xs={12} sm={8} md={8} className="h-100">
              <YandexMap />
            </Col>
          </Row>
        </div>
      </Container>
    </YMaps>
  );
};

export default App;
