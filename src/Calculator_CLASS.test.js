import {myCalculator} from "./classes/Calculator";

describe("calculator class, and its evaluate method", () => {
  test("myCalculator.evaluate returns correct result example #1", () => {
    let result = myCalculator.evaluate("5+3");
    expect(result).toBe(8);
  });

  test("example #2", () => {
    let result = myCalculator.evaluate("5+3-6+6--21");
    expect(result).toBe(29);
  });

  test("example #3", () => {
    let result = myCalculator.evaluate("1x-5+6.3-6/2x7+-4");
    expect(result).toBe(-23.7);
  });

  test("example #4", () => {
    let result = myCalculator.evaluate(
      "1.62635x-5.53521+6.8786--3.477+-6.46264/-2.1535x7.646+-4.3535"
    );
    expect(result).toBe(19.95);
  });

  test("example #5", () => {
    let result = myCalculator.evaluate("5");
    expect(result).toBe(5);
  });

  test("example #6", () => {
    let result = myCalculator.evaluate("2+3-5x6/2");
    expect(result).toBe(-10);
  });

  test("example #7", () => {
    let result = myCalculator.evaluate("-3");
    expect(result).toBe(-3);
  });

  test("example #8", () => {
    let result = myCalculator.evaluate("3.646");
    expect(result).toBe(3.65);
  });
});
