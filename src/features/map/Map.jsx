import React, { useState, useEffect } from 'react';
import { Map } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import PointsOnMap from '../../components/PointsOnMap.jsx';
import Route from '../../components/Route.jsx';
import { selectNewestPointBounds } from './mapSlice.js';

const YandexMap = () => {
  const mapDefaultState = { center: [55.75, 37.57], zoom: 9 };
  const [ymapsInstance, setYmapsInstance] = useState();
  const newestPointBounds = useSelector(selectNewestPointBounds);
  const { t } = useTranslation();

  const toastId = React.useRef({});

  const notify = (id) => {
    toastId.current[id] = toast(t('toast.addressSearch'), { autoClose: false });
  };

  const dismiss = (id) => toast.dismiss(toastId.current[id]);

  const update = (id) => toast.update(toastId.current[id], {
    theme: 'colored',
    render: t('toast.searchError'),
    type: toast.TYPE.ERROR,
    autoClose: 5000,
  });

  const toastApi = {
    notify,
    dismiss,
    update,
  };

  useEffect(() => {
    ymapsInstance?.setBounds(newestPointBounds, {
      // Checking the availability of tiles at the given zoom level.
      checkZoomRange: true,
    });
  }, [newestPointBounds]);

  return (
    <Card className="d-flex h-100">
      <Map
        instanceRef={(ref) => ref && setYmapsInstance(ref)}
        defaultState={mapDefaultState}
        className="h-100 w-100"
        modules={['geoObject.addon.editor', 'SuggestView', 'suggest', 'geocode', 'Placemark', 'Polyline', 'geoObject.addon.balloon']}
      >
        <Route />
        <PointsOnMap toastApi={toastApi} />
      </Map>
      <ToastContainer position="bottom-right" />
    </Card>
  );
};

export default YandexMap;
