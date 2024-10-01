export function calculateDailyVolatility(prices: number[]): number {
  const dailyReturns = prices.map((price, index) => {
    if (index === 0) {
      return 0;
    }
    return price / prices[index - 1] - 1;
  });

  const mean =
    dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length;
  const variance =
    dailyReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) /
    (dailyReturns.length - 1);

  return Math.sqrt(variance);
}
