import { add } from '../src';

describe('add', () => {
  it('adds positive numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('adds negative numbers correctly', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});
