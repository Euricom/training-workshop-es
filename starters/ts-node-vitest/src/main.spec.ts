import { describe, test, expect } from 'vitest';

describe('my first test', () => {
  test('it should not be this kind of rubbish', () => {
    expect(true).toBeTruthy();
  });

  test.skip('skipped test', () => {
    // Test skipped, as tests are running in Only mode
    expect(Math.sqrt(4)).toBe(3);
  });

  test.todo('unimplemented test');
});
