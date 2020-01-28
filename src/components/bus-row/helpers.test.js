import { getTimeFrameLabel } from './helpers';

it('returns an empty string given null', () => {
  expect(getTimeFrameLabel(null)).toBe('');
});

it('returns an empty string given null', () => {
  expect(getTimeFrameLabel({ trips: [] })).toBe('');
});

it('returns an empty string given null', () => {
  expect(getTimeFrameLabel({ trips: [{ id: 1, startTime: 0, endTime: 9 }] })).toBe('0:00 - 0:09');
});

it('returns an empty string given null', () => {
  const trips = [
    { startTime: 360, endTime: 580 },
    { startTime: 124, endTime: 265 },
  ];
  expect(getTimeFrameLabel({ trips })).toBe('2:04 - 4:25');
});
