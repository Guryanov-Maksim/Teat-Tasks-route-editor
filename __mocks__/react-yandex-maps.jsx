import React, { useEffect, useRef } from 'react';

const firstPointBounds = [[55, 36], [58, 38]];
const secondPointBounds = [[65, 46], [68, 48]];
const firstPointCoordinates = [55.755864, 37.617698];
const secondPointCoordinates = [65.755864, 47.617698];
const firstPointBoundsAddress = 'first new point address';
const secondPointBoundsAddress = 'second new point address';
const firstPointId = '1';

const MockSuggestView = jest.fn().mockImplementation(() => ({ events: { add: jest.fn() } }));

const mockFirstFoundObject = {
  properties: {
    get: jest.fn(() => firstPointBounds),
  },
  geometry: {
    getCoordinates: jest.fn(() => firstPointCoordinates),
    setCoordinates: jest.fn(),
  },
  getAddressLine: jest.fn(() => firstPointBoundsAddress),
};

const mockFirstFoundObject2 = {
  properties: {
    get: jest.fn(() => secondPointBounds),
  },
  geometry: {
    getCoordinates: jest.fn(() => secondPointCoordinates),
    setCoordinates: jest.fn(),
  },
  getAddressLine: jest.fn(() => secondPointBoundsAddress),
};

const mockResponse = {
  geoObjects: {
    get: jest.fn(() => mockFirstFoundObject),
  },
};

const mockResponse2 = {
  geoObjects: {
    get: jest.fn(() => mockFirstFoundObject2),
  },
};

const mockResponse3 = {
  geoObjects: {
    get: jest.fn(() => null),
  },
};

const MockYmapsForForm = jest.fn().mockImplementation(() => {
  const mockGeocode = jest
    .fn(() => Promise.resolve(mockResponse))
    .mockImplementationOnce(() => Promise.resolve(mockResponse))
    .mockImplementationOnce(() => Promise.resolve(mockResponse2))
    .mockImplementationOnce(() => Promise.resolve(mockResponse3))
    .mockImplementationOnce(() => Promise.reject());

  return {
    SuggestView: MockSuggestView,
    geocode: mockGeocode,
  };
});

const MockYmapsForPlacemark = jest.fn().mockImplementation(() => {
  const mockGeocode = jest
    .fn(() => Promise.resolve(mockResponse))
    .mockImplementationOnce(() => Promise.resolve(mockResponse2))
    .mockImplementationOnce(() => Promise.reject());

  return {
    SuggestView: MockSuggestView,
    geocode: mockGeocode,
  };
});

const componentMapping = {
  SendForm: MockYmapsForForm,
  PointsOnMap: MockYmapsForPlacemark,
};

const withYMaps = jest.fn((Component) => {
  const Ymaps = componentMapping[Component.name];
  return () => <Component ymaps={new Ymaps()} />;
});

const mockTarget = {
  geometry: {
    getCoordinates: jest.fn(() => secondPointCoordinates),
  },
};

const mockEvent = {
  get: jest.fn(() => mockTarget),
};

const Placemark = ({ instanceRef }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const placeRef = {
      events: {
        add: jest.fn((_eventName, cb) => {
          inputEl.current.addEventListener('click', () => cb(mockEvent));
        }),
      },
      properties: {
        get: jest.fn((property) => {
          switch (property) {
            case 'pointId':
              return firstPointId;
            case 'coordinates':
              return firstPointBounds;
            default:
              console.error('the property isn\'t defined in Placemark.property.get mock getter');
              return null;
          }
        }),
      },
      geometry: {
        setCoordinates: jest.fn(),
      },
    };

    instanceRef(placeRef);
  }, [inputEl]);

  return <div ref={inputEl} data-testid="placemark">placemark</div>;
};

const Polyline = () => <div className="route" />;

const Map = ({ children }) => <div className="map">{children}</div>;

const YMaps = ({ children }) => children;

export {
  YMaps,
  withYMaps,
  Polyline,
  Map,
  Placemark,
};
