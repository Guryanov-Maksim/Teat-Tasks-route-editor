import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Polyline, SearchControl } from 'react-yandex-maps';
import SendForm from './SendForm.jsx';

const App = () => {
  const a = 1;
  const [input, setInput] = useState();
  const [suggest, setSuggest] = useState(null);
  const [value, setValue] = useState();
  // const [formikInstance, setFormik] = useState();
  const [ymaps, setYmaps] = useState();
  // const refFunc = (ref) => ref && ref.editor.startDrawing();

  return (
    <>
      <SendForm setInput={setInput} suggest={suggest} value={value} ymaps={ymaps} />
      <YMaps>
        <div>
          My awesome application with maps!
          <Map
            onLoad={(ymaps) => {
              const suggest = new ymaps.SuggestView(input);
              // console.log('sdfsdfsdfsdfsdf');
              setYmaps(ymaps);
              suggest.events.add('select', (e) => {
                console.log(e.originalEvent.item.value);
                // setSuggest(suggest);
                // console.log(input.value);
                // console.log(input);
                setValue(e.get('item'));
                // try {
                // console.log(e);
                // e.name = 'text';
                // input.value = 'skdfjsdf';
                // formikInstance.handleChange(e.originalEvent);
                // setValue(e.originalEvent.item.value);
                // } catch(e) {
                //   console.error(e);
                // }
              }); // посмотреть, можно ли использовать e.get('domEvent')
              // suggest.events.add('select', (e) => console.log(e.get('domEvent')));
              // console.log(suggest.events);
              // console.log(suggest.events.types);
              // setSuggest(suggest);
            }}
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            modules={['geoObject.addon.editor', 'SuggestView', 'suggest', 'geocode']}
          >
            <Polyline
              instanceRef={(ref) => ref && ref.editor.startDrawing()} // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs   https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
              geometry={[
                [55.8, 37.5],
                [55.8, 37.4],
                [55.7, 37.5],
                [55.7, 37.4],
              ]}
              options={{
                balloonCloseButton: true,
                strokeColor: '#000',
                strokeWidth: 4,
                strokeOpacity: 0.5,
                editorMaxPoints: 1,
              }}
            />
          </Map>
        </div>
      </YMaps>
    </>
  );
};

export default App;
