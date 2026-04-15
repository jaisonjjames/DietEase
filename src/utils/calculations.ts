import type { UserInputs, Results, UnitSystem } from '../types';

export function calculateResults(inputs: UserInputs, units: UnitSystem): Results {
    const { age, gender, weight, activity } = inputs;

    // Convert weight to KG
    let weightKg = units === 'imperial' ? weight * 0.453592 : weight;

    // Convert height to CM
    let heightCm: number;
    if (units === 'imperial') {
        const ft = inputs.heightFt || 0;
        const inches = inputs.heightIn || 0;
        heightCm = (ft * 30.48) + (inches * 2.54);
    } else {
        heightCm = inputs.heightCm || 0;
    }

    // Mifflin-St Jeor Formula
    let bmr: number;
    if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    const tdee = bmr * activity;
    let targetCalories = Math.round(tdee - 500);

    // Safety floors
    if (gender === 'female' && targetCalories < 1200) targetCalories = 1200;
    if (gender === 'male' && targetCalories < 1500) targetCalories = 1500;

    // Water Target (Approx 35ml per kg)
    const waterL = parseFloat((weightKg * 0.035).toFixed(1));
    const waterGal = parseFloat((waterL * 0.264172).toFixed(1));

    return { targetCalories, waterL, waterGal };
}
