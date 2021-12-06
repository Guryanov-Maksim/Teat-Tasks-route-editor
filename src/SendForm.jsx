import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { YMaps, Map, Polyline, SearchControl } from 'react-yandex-maps';
import 'regenerator-runtime/runtime.js'; // установил, когда добавил async в handleSubmit, иначе появлялась ошибка, что import 'regenerator-runtime' не установлен
// import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

// import { selectCurrentChannelId } from '../channels/ChannelsSlice.jsx';
// import { useApi, useAuth } from '../../hooks/index.js';

const SendForm = ({ setInput, suggest, value, setFormik, ymaps }) => {
  // const currentChannelId = useSelector(selectCurrentChannelId);
  const inputRef = useRef();
  // const context = useContext(YMaps);
  // const { user: { username } } = useAuth();

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, [currentChannelId]);

  useEffect(() => {
    inputRef.current.focus();
    setInput(inputRef.current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await ymaps.geocode(value);
    console.log(res);
    // const formData = new FormData(e.target);
    // console.log(formData.get('text'));
    // console.log(value);
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values, actions) => {
      console.log(values);
      
      // const message = {
      //   text: values.text,
      //   channelId: currentChannelId,
      //   username,
      // };
      // const onSuccess = [
      //   () => actions.resetForm(),
      //   () => inputRef.current.focus(),
      // ];
      // const onFail = [
      //   () => actions.setSubmitting(false),
      //   () => inputRef.current.focus(),
      // ];
      // api.sendMessage(message, { onSuccess, onFail });
    },
  });

  // useEffect(() => {
  //   setFormik(formik);
  // }, []);

  // setFormik((e) => formik.handleChange(e));

  return (
    <div className="mt-auto px-5 py-3">
      {/* <Form onSubmit={formik.handleSubmit}> */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} sm>
            <Form.Control
              type="text"
              name="text"
              // value={formik.values.text}
              // onChange={(e) => {
                // console.log(ymap);
                // formik.handleChange(e);
                // console.log(inputRef.current.value);
                // console.log(formik.values.text);
                // ymap.suggest(inputRef.current.value).then((items) => {
                //   console.log(items);
                // });
                // console.log(suggest.events.select);
                // console.log(formik.values.text);
                // console.log(e.target.value);
                // console.log(inputRef.current);
                // console.log(e);
                //  const suggest = new ymaps.SuggestView(inputRef.current);
              // }}
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

export default SendForm;
