export default function calculateAmount(time) {
    if (typeof time !== 'number' || time < 0) {
        throw new Error('Invalid time value');
    }

    if (time <= 5) {
        return 750; // Fixed amount for 5 minutes or less
    } else {
        // For time greater than 5 minutes, calculate the additional cost
        const extraTime = time - 5; // Time in minutes beyond the initial 5
        const additionalCost = extraTime * 100; // Round up and calculate additional cost
        return 750 + additionalCost;
    }
}
