import React from 'react';
import PropTypes from 'prop-types';
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
  bus: PropTypes.shape({
    id: PropTypes.number,
    trips: PropTypes.array,
  }).isRequired,
  trip: PropTypes.shape({
    id: PropTypes.number,
    endTime: PropTypes.number,
    startTime: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

ButtonTrip.defaultProps = {
  onClick: () => {},
  selected: undefined,
};

export default ButtonTrip;
