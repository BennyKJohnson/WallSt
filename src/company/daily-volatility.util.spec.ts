import { calculateDailyVolatility } from './daily-volatility.util';

describe('Testing Daily Volatility', () => {
  describe('Given a list of prices', () => {
    const prices = [
      262.3, 260.75, 261.15, 261.55, 262.9, 265.9, 270.55, 269.4, 269.8, 267.55,
    ];

    it('Then should return the correct daily volatility', () => {
      expect(calculateDailyVolatility(prices)).toBeCloseTo(0.008, 3);
    });
  });
});
