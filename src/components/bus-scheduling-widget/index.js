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

import { Wrapper, Header, Body } from './style';

function BusSchedulingWidget({ trips }) {
  // create an array of buses and assign each trip to its own bus.
  const intialStateBuses = trips.map((trip) => {
    const bus = { id: trip.id, trips: [trip] };

    return bus;
  });

  // helpers
  const isSameTrip = (tripA, tripB) => tripA && tripB && tripA.id === tripB.id;
  const rangeOverlap = (rangeA, rangeB) => (
    (rangeA.endTime >= rangeB.startTime && rangeA.endTime <= rangeB.endTime)
    || (rangeA.startTime <= rangeB.endTime && rangeA.startTime >= rangeB.startTime)
    || (rangeA.startTime >= rangeB.startTime && rangeA.endTime <= rangeB.endTime)
    || (rangeA.startTime >= rangeB.startTime && rangeA.endTime <= rangeB.endTime)
    || (rangeB.startTime >= rangeA.startTime && rangeB.endTime <= rangeA.endTime)
  );

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
        { /* this would be better if it was dynamic */ }
        <span style={{ left: '0px' }}>0:00</span>
        <span style={{ left: '60px' }}>1:00</span>
        <span style={{ left: '120px' }}>2:00</span>
        <span style={{ left: '180px' }}>3:00</span>
        <span style={{ left: '240px' }}>4:00</span>
        <span style={{ left: '300px' }}>5:00</span>
        <span style={{ left: '360px' }}>6:00</span>
        <span style={{ left: '420px' }}>7:00</span>
        <span style={{ left: '480px' }}>9:00</span>
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
