/**
 * Takes an array of trips and creates the initialState.
 * For the key `buses`, it will initialize an array of buses and associate each trip to its own bus.
 *
 * @param  {Array}  trips
 * @return {Object}
 */
export function getInitialState(trips = []) {
  const initialState = {
    selectedBus: null,
    selectedTrip: null,
    buses: trips.map((trip) => {
      const bus = { id: trip.id, trips: [trip] };

      return bus;
    }),
  };

  return initialState;
}

/**
 * Actions
 */

export const ADD_TRIP = 'ADD_TRIP';
export const ADD_BUS = 'ADD_BUS';
export const DELETE_TRIP = 'DELETE_TRIP';
export const UPDATE_SELECTED_BUS = 'UPDATE_SELECTED_BUS';
export const UPDATE_SELECTED_TRIP = 'UPDATE_SELECTED_TRIP';

export function addTrip(bus, trip) {
  return {
    type: ADD_TRIP,
    payload: {
      trip,
      bus,
    },
  };
}

export function deleteTrip(bus, trip) {
  return {
    type: DELETE_TRIP,
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

export function updateSelectedBus(bus) {
  return {
    type: UPDATE_SELECTED_BUS,
    payload: {
      bus,
    },
  };
}

export function updateSelectedTrip(trip) {
  return {
    type: UPDATE_SELECTED_TRIP,
    payload: {
      trip,
    },
  };
}

/**
 * Helpers
 */

function findBusById(state, action) {
  const { bus: payloadBus } = action.payload;
  const { buses } = state;

  return buses.find((b) => payloadBus.id === b.id);
}

/**
 * Reducers
 */

function reduceAddTrip(state, action) {
  const bus = findBusById(state, action);

  bus.trips.push(action.payload.trip);

  return state;
}

function reduceDeleteTrip(state, action) {
  const bus = findBusById(state, action);

  bus.trips = bus.trips.filter((t) => action.payload.trip.id !== t.id);

  return state;
}

function reduceAddBus(state, action) {
  const { bus } = action.payload;
  const { buses } = state;

  buses.push(bus);

  return { ...state, buses: [...buses] };
}

function reduceUpdateSelectedBus(state, action) {
  const { bus } = action.payload;

  return { ...state, selectedBus: bus };
}

function reduceUpdateSelectedTrip(state, action) {
  const { trip } = action.payload;

  return { ...state, selectedTrip: trip };
}

/**
 * Main reducer function for <BusSchedulingWidget>
 * @param  {Object} state
 * @param  {Object} action
 * @return {Object}
 */
export default function reducer(state, action = {}) {
  switch (action.type) {
    case ADD_TRIP:
      return reduceAddTrip(state, action);
    case DELETE_TRIP:
      return reduceDeleteTrip(state, action);
    case ADD_BUS:
      return reduceAddBus(state, action);
    case UPDATE_SELECTED_BUS:
      return reduceUpdateSelectedBus(state, action);
    case UPDATE_SELECTED_TRIP:
      return reduceUpdateSelectedTrip(state, action);
    default:
      return state;
  }
}
