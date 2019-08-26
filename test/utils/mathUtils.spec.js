import * as mathUtils from '../../src/utils/mathUtils';
import { deepStrictEqual } from 'assert';

describe('mathUtils', () => {
  describe('mathUtils::applyTransform', () => {
    it('multiple matrixes all zeroes', () => {
      let p = [0, 0];
      let m = [0, 0, 0, 0, 0, 0];
      deepStrictEqual(mathUtils.applyTransform(p, m), [0, 0]);
    });

    it('multiple matrixes', () => {
      let p = [5, 3, 10];
      let m = [1, 3, 2, 4, 5, 2];
      deepStrictEqual(mathUtils.applyTransform(p, m), [16, 29]);
    });
  });
});
