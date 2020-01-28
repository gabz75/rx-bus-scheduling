import React from 'react';
import { render } from '@testing-library/react';

import ButtonTrip from './index';

const MOCK_TRIP = { id: 1, startTime: 80, endTime: 240 };
const MOCK_BUS = { id: 1, trips: [MOCK_TRIP] };

it('renders', () => {
  const { asFragment } = render(<ButtonTrip bus={MOCK_BUS} trip={MOCK_TRIP} />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders with selected', () => {
  const { asFragment } = render(<ButtonTrip bus={MOCK_BUS} trip={MOCK_TRIP} selected />);
  expect(asFragment()).toMatchSnapshot();
});

it('executes a callback with bus and trip as part of the arguments', () => {
  const onClickHandler = jest.fn();
  const { getByTestId } = render(<ButtonTrip bus={MOCK_BUS} trip={MOCK_TRIP} onClick={onClickHandler} />);
  getByTestId('button-trip').click();
  expect(onClickHandler).toHaveBeenCalledWith(MOCK_BUS, MOCK_TRIP);
});

it('renders with an absolute position', () => {
  const { getByTestId } = render(<ButtonTrip bus={MOCK_BUS} trip={MOCK_TRIP} />);
  expect(getByTestId('button-trip')).toHaveStyle('position: absolute');
  expect(getByTestId('button-trip')).toHaveStyle('left: 80px');
  expect(getByTestId('button-trip')).toHaveStyle('width: 160px');
});
