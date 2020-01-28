import { uniqueId } from 'lodash';

export default class Trip {
  constructor({
    id,
    startTime,
    endTime,
    bus,
  }) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.bus = bus;
    this.updatedAt = uniqueId();
  }
}
