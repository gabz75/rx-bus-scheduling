import reducer, {
  ADD_TRIP,
  ADD_BUS,
  DELETE_TRIP,
  UPDATE_SELECTED_BUS,
  UPDATE_SELECTED_TRIP,
  getInitialState,
  addBus,
  addTrip,
  deleteTrip,
  updateSelectedTrip,
  updateSelectedBus,
} from './reducer';

const MOCK_BUS = { id: 1, trips: [] };
const MOCK_TRIP = { id: 1, startTime: 10, endTime: 20 };
const MOCK_TRIPS = [
  { id: 1, startTime: 30, endTime: 150 },
  { id: 2, startTime: 180, endTime: 300 },
];

describe('getInitialState', () => {
  it('returns a state with no buses', () => {
    const state = getInitialState();

    expect(state.selectedBus).toBeNull();
    expect(state.selectedTrip).toBeNull();
    expect(state.buses).toStrictEqual([]);
  });

  it('initialize an array of buses with their associated trips', () => {
    const state = getInitialState(MOCK_TRIPS);

    expect(state.selectedBus).toBeNull();
    expect(state.selectedTrip).toBeNull();
    expect(state.buses).toHaveLength(2);

    const [bus1, bus2] = state.buses;

    expect(bus1.id).toBe(1);
    expect(bus2.id).toBe(2);
    expect(bus1.trips).toHaveLength(1);
    expect(bus2.trips).toHaveLength(1);

    const [bus1Trip] = bus1.trips;
    const [bus2Trip] = bus2.trips;

    expect(bus1Trip.startTime).toBe(30);
    expect(bus1Trip.endTime).toBe(150);
    expect(bus2Trip.startTime).toBe(180);
    expect(bus2Trip.endTime).toBe(300);
  });
});

/**
 * Actions
 */

describe('actions', () => {
  it('returns an action for updating selectedTrip in state', () => {
    const action = updateSelectedTrip(MOCK_TRIP);

    expect(action.type).toBe(UPDATE_SELECTED_TRIP);
    expect(action.payload.trip).toBe(MOCK_TRIP);
  });

  it('returns an action for updating selectedBus in state', () => {
    const action = updateSelectedBus(MOCK_BUS);

    expect(action.type).toBe(UPDATE_SELECTED_BUS);
    expect(action.payload.bus).toBe(MOCK_BUS);
  });

  it('returns an action for adding a trip on a bus', () => {
    const action = addTrip(MOCK_BUS, MOCK_TRIP);

    expect(action.type).toBe(ADD_TRIP);
    expect(action.payload.trip).toBe(MOCK_TRIP);
    expect(action.payload.bus).toBe(MOCK_BUS);
  });

  it('returns an action for deleting a trip from a bus', () => {
    const action = deleteTrip(MOCK_BUS, MOCK_TRIP);

    expect(action.type).toBe(DELETE_TRIP);
    expect(action.payload.trip).toBe(MOCK_TRIP);
    expect(action.payload.bus).toBe(MOCK_BUS);
  });

  it('returns an action for adding a bus', () => {
    const action = addBus(MOCK_BUS);

    expect(action.type).toBe(ADD_BUS);
    expect(action.payload.bus).toBe(MOCK_BUS);
  });
});

describe('reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = getInitialState(MOCK_TRIPS);
  });

  it('updates selectedTrip', () => {
    const [trip] = initialState.buses[0].trips;

    expect(initialState.selectedTrip).toBeNull();

    const state = reducer(initialState, updateSelectedTrip(trip));

    expect(state.selectedTrip).toBe(trip);
  });

  it('updates selectedBus', () => {
    const [bus] = initialState.buses;

    expect(initialState.selectedBus).toBeNull();

    const state = reducer(initialState, updateSelectedBus(bus));

    expect(state.selectedBus).toBe(bus);
  });

  it('adds a trip to a bus', () => {
    const [bus] = initialState.buses;
    const newTrip = { id: 3, startTime: 90, endTime: 180 };

    expect(initialState.buses[0].trips).toHaveLength(1);

    const state = reducer(initialState, addTrip(bus, newTrip));

    expect(state.buses[0].trips).toHaveLength(2);
    expect(state.buses[0].trips).toContain(newTrip);
  });

  it('deletes a trip from a bus', () => {
    const [bus] = initialState.buses;
    const [trip] = bus.trips;

    expect(initialState.buses[0].trips).toHaveLength(1);

    const state = reducer(initialState, deleteTrip(bus, trip));

    expect(state.buses[0].trips).toHaveLength(0);
    expect(state.buses[0].trips).not.toContain(trip);
  });

  it('adds a bus', () => {
    const newBus = { id: 3, trips: [] };

    expect(initialState.buses).toHaveLength(MOCK_TRIPS.length);

    const state = reducer(initialState, addBus(newBus));

    expect(state.buses).toHaveLength(MOCK_TRIPS.length + 1);
    expect(state.buses).toContain(newBus);
  });
});
