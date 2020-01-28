/**
 * Compare ID of two trips for equality
 * @param  {Object} tripA
 * @param  {Object} tripB
 * @return {boolean]}
 */
export const isSameTrip = (tripA, tripB) => tripA && tripB && tripA.id === tripB.id;

/**
 * Returns whether two time range are overlapping
 *
 * @param  {Object} rangeA
 * @param  {Object} rangeB
 * @return {boolean}
 */
export const rangeOverlap = (rangeA, rangeB) => (
  (rangeA.endTime >= rangeB.startTime && rangeA.endTime <= rangeB.endTime)
  || (rangeA.startTime <= rangeB.endTime && rangeA.startTime >= rangeB.startTime)
  || (rangeA.startTime >= rangeB.startTime && rangeA.endTime <= rangeB.endTime)
  || (rangeA.startTime >= rangeB.startTime && rangeA.endTime <= rangeB.endTime)
  || (rangeB.startTime >= rangeA.startTime && rangeB.endTime <= rangeA.endTime)
);
