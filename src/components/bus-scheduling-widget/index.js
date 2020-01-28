import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';

import BusRow from 'components/bus-row';
import ButtonTrip from 'components/button-trip';

import {
  addBus,
  addTripToBus,
  busReducer,
  deleteTripFromBus,
} from './reducer';

import {
  Wrapper,
  Header,
  Body,
} from './style';

import { isSameTrip, rangeOverlap } from './helpers';

const TICKS = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];

function BusSchedulingWidget({ trips }) {
  // create an array of buses and assign each trip to its own bus.
  const intialStateBuses = trips.map((trip) => {
    const bus = { id: trip.id, trips: [trip] };

    return bus;
  });

  // hooks
  const [buses, dispatch] = useReducer(busReducer, intialStateBuses);
  const [selectedTrip, setSelectedTrip] = useState();
  const [selectedBus, setSelectedBus] = useState();

  // handlers
  const handleSelectTrip = (bus, trip) => {
    if (isSameTrip(trip, selectedTrip)) {
      setSelectedTrip(null);
      setSelectedBus(null);
    } else {
      setSelectedTrip(trip);
      setSelectedBus(bus);
    }
  };

  const handleMoveTrip = (bus) => {
    if (!selectedTrip || !selectedBus) {
      return;
    }

    const overlappingTrip = bus.trips.find((t) => rangeOverlap(selectedTrip, t));

    if (!overlappingTrip) {
      dispatch(deleteTripFromBus(selectedBus, selectedTrip));
      dispatch(addTripToBus(bus, selectedTrip));
      setSelectedTrip(null);
    }
  };

  const handleAddBus = () => {
    const lastBuses = buses[buses.length - 1];
    const bus = { id: lastBuses.id + 1, trips: [] };

    dispatch(addBus(bus));
    dispatch(deleteTripFromBus(selectedBus, selectedTrip));
    dispatch(addTripToBus(bus, selectedTrip));
    setSelectedBus(null);
    setSelectedTrip(null);
  };

  return (
    <Wrapper>
      <Header>
        {
          // eslint-disable-next-line react/jsx-one-expression-per-line
          TICKS.map((i) => (<span key={i} style={{ left: `${i * 60}px` }}>{i}:00</span>))
        }
      </Header>
      <Body>
        {
          buses.map((bus) => bus.trips.length > 0 && (
            <BusRow
              key={bus.id}
              bus={bus}
              clickable={!!selectedTrip}
              onClick={handleMoveTrip}
            >
              {
                bus.trips.map((trip) => (
                  <ButtonTrip
                    key={trip.id}
                    trip={trip}
                    bus={bus}
                    selected={isSameTrip(selectedTrip, trip)}
                    onClick={handleSelectTrip}
                  />
                ))
              }
            </BusRow>
          ))
        }
        {
          !!selectedTrip && (
            <BusRow clickable onClick={handleAddBus} />
          )
        }
      </Body>
    </Wrapper>
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
