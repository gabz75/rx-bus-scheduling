import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import BusRow from 'components/bus-row';
import ButtonTrip from 'components/button-trip';


function BusSchedulingWidget({ trips }) {
  // create an array of buses and assign each trip to its own bus.
  const buses = trips.map((trip, index) => {
    const bus = {
      id: uniqueId(`Bus ${index}`),
      trips: [trip],
    };

    return bus;
  });

  // helpers
  const isSameTrip = (tripA, tripB) => tripA && tripB && tripA.id === tripB.id;

  // hooks
  const [selectedTrip, setSelectedTrip] = useState();

  // handlers
  const handleClickOnButtonTrip = (trip) => {
    if (isSameTrip(trip, selectedTrip)) {
      setSelectedTrip(null);
    } else {
      setSelectedTrip(trip);
    }
  };

  return (
    <div>
      {
        buses.map((bus) => (
          <BusRow key={bus.id}>
            {
              bus.trips.map((trip) => (
                <ButtonTrip
                  key={trip.id}
                  trip={trip}
                  selected={isSameTrip(selectedTrip, trip)}
                  onClick={handleClickOnButtonTrip}
                />
              ))
            }
          </BusRow>
        ))
      }
    </div>
  );
}

BusSchedulingWidget.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    endTime: PropTypes.number,
    startTime: PropTypes.number,
  })),
};

BusSchedulingWidget.defaultProps = {
  trips: [],
};

export default BusSchedulingWidget;
