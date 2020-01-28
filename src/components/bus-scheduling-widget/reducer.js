const ADD = 'ADD';
const ADD_BUS = 'ADD_BUS';
const DELETE = 'DELETE';

export function busReducer(state, action) {
  const bus = state.find((b) => action.payload.bus.id === b.id);

  switch (action.type) {
    case ADD:
      if (bus) {
        bus.trips.push(action.payload.trip);
      }

      return state;
    case DELETE:
      if (bus) {
        bus.trips = bus.trips.filter((t) => action.payload.trip.id !== t.id);
      }

      return state;
    case ADD_BUS:
      return [...state, action.payload.bus];
    default:
      return state;
  }
}

export function addTripToBus(bus, trip) {
  return {
    type: ADD,
    payload: {
      trip,
      bus,
    },
  };
}

export function deleteTripFromBus(bus, trip) {
  return {
    type: DELETE,
    payload: {
      trip,
      bus,
    },
  };
}

export function addBus(bus) {
  return {
    type: ADD_BUS,
    payload: {
      bus,
    },
  };
}
