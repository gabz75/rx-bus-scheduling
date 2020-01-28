import { isSameTrip, rangeOverlap } from './helpers';

describe('isSameTrip()', () => {
  it('returns false given null null', () => {
    expect(isSameTrip(null, null)).toBe(null);
  });

  it('returns false given Object null', () => {
    expect(isSameTrip({ id: 1 }, null)).toBe(null);
  });

  it('returns false given two different ids', () => {
    expect(isSameTrip({ id: 1 }, { id: 2 })).toBe(false);
  });

  it('returns true given two different ids', () => {
    expect(isSameTrip({ id: 2 }, { id: 2 })).toBe(true);
  });
});

describe('rangeOverlap()', () => {
  it('returns true', () => {
    const rangeA = { startTime: 10, endTime: 20 };
    const rangeB = { startTime: 15, endTime: 25 };

    expect(rangeOverlap(rangeA, rangeB)).toBe(true);
  });

  it('returns true', () => {
    const rangeA = { startTime: 15, endTime: 25 };
    const rangeB = { startTime: 10, endTime: 20 };

    expect(rangeOverlap(rangeA, rangeB)).toBe(true);
  });

  it('returns true', () => {
    const rangeA = { startTime: 10, endTime: 30 };
    const rangeB = { startTime: 15, endTime: 25 };

    expect(rangeOverlap(rangeA, rangeB)).toBe(true);
  });

  it('returns true', () => {
    const rangeA = { startTime: 15, endTime: 25 };
    const rangeB = { startTime: 10, endTime: 30 };

    expect(rangeOverlap(rangeA, rangeB)).toBe(true);
  });

  it('returns false', () => {
    const rangeA = { startTime: 15, endTime: 25 };
    const rangeB = { startTime: 35, endTime: 45 };

    expect(rangeOverlap(rangeA, rangeB)).toBe(false);
  });
});
