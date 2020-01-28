import React from 'react';
import { render } from '@testing-library/react';

import data from 'data/bus-scheduling-input.json';

import BusWidgetScheduling from './index';

const ACTIVE_STYLE = 'background-color: #015baa';

it('renders', () => {
  const { asFragment } = render(<BusWidgetScheduling trips={data} />);
  expect(asFragment()).toMatchSnapshot();
});

it('moves the first trip to the second bus', () => {
  const { getAllByTestId } = render(<BusWidgetScheduling trips={data} />);
  expect(getAllByTestId('bus-row')).toHaveLength(9);
  expect(getAllByTestId('button-trip')).toHaveLength(9);

  const [firstTrip, secontTrip] = getAllByTestId('button-trip');

  expect(firstTrip).not.toHaveStyle(ACTIVE_STYLE); // not active
  expect(getAllByTestId('bus-row')[0]).toContainElement(firstTrip); // row1 contains trip1
  expect(getAllByTestId('bus-row')[1]).toContainElement(secontTrip); // row2 contains trip2

  getAllByTestId('button-trip')[0].click();

  expect(firstTrip).toHaveStyle(ACTIVE_STYLE); // trip1 becomes active

  getAllByTestId('bus-row')[1].click();

  expect(getAllByTestId('bus-row')).toHaveLength(8); // we lost a row
  expect(getAllByTestId('button-trip')).toHaveLength(9);

  const [newFirstTrip, newSecondTrip] = getAllByTestId('button-trip');
  expect(getAllByTestId('bus-row')[0]).toContainElement(newFirstTrip); // first row contains both trips
  expect(getAllByTestId('bus-row')[0]).toContainElement(newSecondTrip);
});

it('creates a new row when selecting a trip', () => {
  const { getAllByTestId } = render(<BusWidgetScheduling trips={data} />);
  expect(getAllByTestId('bus-row')).toHaveLength(9);
  expect(getAllByTestId('button-trip')).toHaveLength(9);

  getAllByTestId('button-trip')[0].click();

  expect(getAllByTestId('bus-row')).toHaveLength(10);
});

it('prevents from moving trip that overlaps', () => {
  const { getAllByTestId } = render(<BusWidgetScheduling trips={data} />);
  expect(getAllByTestId('bus-row')).toHaveLength(9);
  expect(getAllByTestId('button-trip')).toHaveLength(9);

  const firstTrip = getAllByTestId('button-trip')[1];

  expect(firstTrip).not.toHaveStyle(ACTIVE_STYLE); // not active

  // 2nd trip overlaps with 4th trip.
  firstTrip.click();

  expect(firstTrip).toHaveStyle(ACTIVE_STYLE); // still active becaus the trip conflicts

  getAllByTestId('bus-row')[3].click();

  expect(firstTrip).toHaveStyle(ACTIVE_STYLE); // still active becaus the trip conflicts
});
