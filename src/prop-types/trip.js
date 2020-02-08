import PropTypes from 'prop-types';

export const PropTypesTrip = PropTypes.shape({
  id: PropTypes.number,
  endTime: PropTypes.number,
  startTime: PropTypes.number,
});

export const PropTypesTrips = PropTypes.arrayOf(
  PropTypesTrip,
);
