import { countdown  } from "../countdown";

describe("Count down function returning the time left until a certain future day", () => {
    test("it should filter by a search term (link)", () => {
      // actual test
      const result = countdown(new Date().getTime() + 86400000);
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('hour');
      expect(result).toHaveProperty('minute');
      expect(result).toHaveProperty('second');
    });

    test('should calculate the correct countdown when given a future date', () => {
      const result = countdown(new Date().getTime() + 86400000);
      expect(result.day).toBe(1);
      expect(result.hour).toBe(0);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });
  });