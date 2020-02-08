import PropTypes from 'prop-types';

import { PropTypesTrips } from 'prop-types/trip';

export const PropTypesBus = PropTypes.shape({
  id: PropTypes.number,
  trips: PropTypesTrips,
});
