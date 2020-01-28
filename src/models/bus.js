import { uniqueId } from 'lodash';

export default class Bus {
  constructor() {
    this.name = uniqueId('Bus #');
    this.trips = [];
    this.id = uniqueId();
    this.updatedAt = uniqueId();
  }

  hasOverlapingTripWith(trip) {
    return this.trips.find((t) => t.id === trip.id);
  }

  addTrip(trip) {
    this.trips = [...this.trips, trip];
  }

  removeTrip(trip) {
    this.trips = this.trips.filter((t) => t.id !== trip.id);
  }
}
