import { findEquation } from "../../app/utils/liniarInterpolation";

test('liniar interpolation with:\nx1 = 2,\ny1 = 5\nx2 = 4\ny2 = 7\n', () => {
  expect(findEquation(2, 5, 4, 7)).toEqual({ m: 1, b: 3 });
});