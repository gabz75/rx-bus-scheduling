import React from 'react';
import PropTypes from 'prop-types';

import { StyledButtonTrip } from './style';

function ButtonTrip({ trip, onClick, selected }) {
  const width = `${trip.endTime - trip.startTime}px`;
  const marginLeft = `${trip.startTime}px`;

  // handlers
  const handleOnClick = () => onClick(trip);

  return (
    <StyledButtonTrip
      style={{ marginLeft, width }}
      selected={selected}
      type="button"
      onClick={handleOnClick}
    >
      {trip.id}
    </StyledButtonTrip>
  );
}

ButtonTrip.propTypes = {
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
