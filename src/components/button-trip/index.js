import React from 'react';
import PropTypes from 'prop-types';

import { PropTypesBus } from 'prop-types/bus';
import { PropTypesTrip } from 'prop-types/trip';

import { StyledButtonTrip } from './style';

function ButtonTrip({
  bus,
  trip,
  onClick,
  selected,
}) {
  const width = `${trip.endTime - trip.startTime}px`;
  const left = `${trip.startTime}px`;

  // handlers
  const handleOnClick = () => onClick(bus, trip);

  return (
    <StyledButtonTrip
      data-testid="button-trip"
      style={{ left, width }}
      selected={selected}
      type="button"
      onClick={handleOnClick}
    >
      {trip.id}
    </StyledButtonTrip>
  );
}

ButtonTrip.propTypes = {
  bus: PropTypesBus.isRequired,
  trip: PropTypesTrip.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

ButtonTrip.defaultProps = {
  onClick: () => {},
  selected: undefined,
};

export default ButtonTrip;
