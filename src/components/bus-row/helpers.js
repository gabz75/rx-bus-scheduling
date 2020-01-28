/**
 * Transforms the time range of a trip into a friendly label.
 * @param  {Object} bus
 * @return {string}
 */
export function getTimeFrameLabel(bus) {
  if (!bus) {
    return '';
  }

  if (bus.trips.length < 1) {
    return '';
  }

  let min = 0;
  let max = 0;

  bus.trips.forEach((trip) => {
    min = Math.min(trip.startTime);
    max = Math.max(trip.endTime);
  });

  const minHour = Math.floor(min / 60);
  let minMinutes = min % 60;
  const maxHour = Math.floor(max / 60);
  let maxMinutes = max % 60;

  if (minMinutes < 10) minMinutes = `0${minMinutes}`;
  if (maxMinutes < 10) maxMinutes = `0${maxMinutes}`;

  return `${minHour}:${minMinutes} - ${maxHour}:${maxMinutes}`;
}
