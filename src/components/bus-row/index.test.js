import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';

import BusRow from './index';

const MOCK_BUS = { id: 1, trips: [] };

it('renders', () => {
  const { asFragment } = render(<BusRow bus={MOCK_BUS} />);
  expect(asFragment()).toMatchSnapshot();
});

it('executes a callback with bus as argument', () => {
  const onClickHandler = jest.fn();
  const { getByTestId } = render(<BusRow bus={MOCK_BUS} onClick={onClickHandler} />);
  getByTestId('bus-row').click();
  expect(onClickHandler).toHaveBeenCalledWith(MOCK_BUS);
});

it('renders with children', () => {
  const { getByTestId } = render(<BusRow bus={MOCK_BUS}><span>test</span></BusRow>);
  expect(getByTestId('bus-row')).toContainHTML('<span>test</span>');
});
