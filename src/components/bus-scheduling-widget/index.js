import React, { useReducer } from 'react';

import BusRow from 'components/bus-row';
import ButtonTrip from 'components/button-trip';
import { PropTypesTrips } from 'prop-types/trip';

import reducer, {
  getInitialState,
  addTrip,
  deleteTrip,
  addBus,
  updateSelectedBus,
  updateSelectedTrip,
} from './reducer';

import {
  Wrapper,
  Header,
  Body,
} from './style';

import { isSameTrip, rangeOverlap } from './helpers';

const TICKS = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];

function BusSchedulingWidget({ trips }) {
  // hooks
  const [state, dispatch] = useReducer(reducer, getInitialState(trips));
  const {
    selectedTrip,
    selectedBus,
    buses,
  } = state;

  // handlers
  const handleSelectTrip = (bus, trip) => {
    if (isSameTrip(trip, selectedTrip)) {
      dispatch(updateSelectedBus(null));
      dispatch(updateSelectedTrip(null));
    } else {
      dispatch(updateSelectedBus(bus));
      dispatch(updateSelectedTrip(trip));
    }
  };

  const handleMoveTrip = (bus) => {
    if (!selectedTrip || !selectedBus) {
      return;
    }

    const overlappingTrip = bus.trips.find((t) => rangeOverlap(selectedTrip, t));

    if (!overlappingTrip) {
      dispatch(deleteTrip(selectedBus, selectedTrip));
      dispatch(addTrip(bus, selectedTrip));
      dispatch(updateSelectedTrip(null));
    }
  };

  const handleAddBus = () => {
    const lastBuses = buses[buses.length - 1];
    const bus = { id: lastBuses.id + 1, trips: [] };

    dispatch(addBus(bus));
    dispatch(deleteTrip(selectedBus, selectedTrip));
    dispatch(addTrip(bus, selectedTrip));
    dispatch(updateSelectedBus(null));
    dispatch(updateSelectedTrip(null));
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
  trips: PropTypesTrips,
};

BusSchedulingWidget.defaultProps = {
  trips: [],
};

export default BusSchedulingWidget;
