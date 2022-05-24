import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';

import init from '../src/init.jsx';
// *************************************************************
// TODO

// 1. Realize a check of expect(input).toHaveAttribute('readonly') while form is submitting
//
// 2. Find out why withYMaps.mockImplementationOnce(() => { ... }) dosn't work in tests:
//
// import { withYmaps } from 'react-yandex-maps';
//
// withYMaps
//   .mockImplementationOnce((Component) => {
//       console.log('new withMock implementation called');
//       return () => <Component ymaps={new MockRejectedYmaps()} />;
//     });
// test('network error message', async () => {
//   console.log(withYMaps);
//   withYMaps
//     .mockImplementationOnce((Component) => {
//       console.log('new withMock implementation called');
//       return () => <Component ymaps={new MockRejectedYmaps()} />;
//     });

//   const vdom = await init();
//   render(vdom);
// });
//
// 3. Realize a dragend event for placemarks instead of await user.click(placemark);
//
// 4. Test points reordering when a point was dragged in the points list
//
// *************************************************************

jest.mock('react-beautiful-dnd');
jest.mock('react-yandex-maps');
jest.mock('react-toastify');

const mockToastId = 'toastId';
toast.mockReturnValue(mockToastId);

afterEach(cleanup);

test('should render correctly', async () => {
  const vdom = await init();
  const { container } = render(vdom);
  expect(container.firstChild).toMatchSnapshot();
  const input = screen.getByTestId('new-message');
  expect(input).toBeInTheDocument();
  expect(input).toHaveFocus();
  expect(input).toHaveValue('');
});

test('add point process', async () => {
  const vdom = await init();
  render(vdom);
  const user = userEvent.setup();
  const input = screen.getByTestId('new-message');

  await user.keyboard('{Enter}');

  const feedBack = await screen.findByText('Обязательное поле');
  expect(feedBack).toBeInTheDocument();

  await user.type(input, 'first new point');
  await user.keyboard('{Enter}');

  const newAddress = await screen.findByText('first new point address');
  expect(newAddress).toBeInTheDocument();

  await user.type(input, 'second new point');
  await user.keyboard('{Enter}');

  const newAddress2 = await screen.findByText('second new point address');
  expect(newAddress2).toBeInTheDocument();

  await user.type(input, 'nonexistent address');
  await user.keyboard('{Enter}');

  const feedBack3 = await screen.findByText('Указанный вами адрес не найдет');
  expect(feedBack3).toBeInTheDocument();

  await user.type(input, 'first new point');
  await user.keyboard('{Enter}');

  const networkError = await screen.findByText('Ошибка сети');
  expect(networkError).toBeInTheDocument();
});

test('remove point', async () => {
  const vdom = await init();
  render(vdom);
  const user = userEvent.setup();
  const input = screen.getByTestId('new-message');

  await user.type(input, 'first new point');
  await user.keyboard('{Enter}');

  await user.type(input, 'second new point');
  await user.keyboard('{Enter}');

  const newAddress1 = await screen.findByText('first new point address');
  const newAddress2 = await screen.findByText('second new point address');

  const [firstRemovingButton] = await screen.findAllByTestId('removing-button');

  await user.click(firstRemovingButton);

  expect(newAddress1).not.toBeInTheDocument();
  expect(newAddress2).toBeInTheDocument();
});

test('should update address when a placemark was moved', async () => {
  const vdom = await init();
  render(vdom);

  const user = userEvent.setup();

  const input = screen.getByTestId('new-message');

  await user.type(input, 'Москва');
  await user.keyboard('{Enter}');

  const placemark = await screen.findByText('placemark');

  await user.click(placemark); // simulate a dragend event of a placemark, see TODO above

  expect(toast).toHaveBeenCalled();

  expect(toast.mock.calls[0][0]).toBe('Подождите, идет обновление адреса...');
  expect(toast.dismiss).toHaveBeenCalled();
  expect(toast.dismiss.mock.calls[0][0]).toBe(mockToastId);

  await user.click(placemark); // simulate a dragend event of a placemark, see TODO above
  expect(toast.update).toHaveBeenCalled();
  expect(toast.update.mock.calls[0][0]).toBe(mockToastId);
});
