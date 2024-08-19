export function generateMockHistoricalData(token, startDate, endDate) {
    const data = [];
    let currentDate = new Date(startDate);
    let currentBalance = 50; // Start with a base balance

    while (currentDate <= endDate) {
        // Introduce a stable period
        if (Math.random() < 0.7) {
            // 70% chance to stay within a small fluctuation
            currentBalance += (Math.random() - 0.5) * 2; // Fluctuate within -1 to +1
        } else if (Math.random() < 0.2) {
            // 20% chance for a gradual rise or drop
            currentBalance += (Math.random() - 0.5) * 10; // Fluctuate within -5 to +5
        } else {
            // 10% chance for a sudden sharp change
            currentBalance += (Math.random() - 0.5) * 50; // Fluctuate within -25 to +25
        }

        // Ensure balance doesn't go negative
        currentBalance = Math.max(0, currentBalance);

        data.push({
            date: currentDate.toISOString().split('T')[0],
            balance: currentBalance.toFixed(2)
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
}
