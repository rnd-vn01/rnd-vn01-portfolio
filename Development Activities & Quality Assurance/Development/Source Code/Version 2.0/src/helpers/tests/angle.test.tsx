import { angleToRadians } from 'src/helpers/angle';

test('angleToRadians should return 0 radians for input of 0 degrees', () => {
  expect(angleToRadians(0)).toBe(0)
});

test('angleToRadians should return PI radian for input of 180 degrees', () => {
  expect(angleToRadians(180)).toBeCloseTo(Math.PI)
});

test('angleToRadians should return PI/2 radian for input of 90 degrees', () => {
  expect(angleToRadians(90)).toBeCloseTo(Math.PI / 2)
});
