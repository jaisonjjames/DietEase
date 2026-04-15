export type UnitSystem = 'imperial' | 'metric';
export type Gender = 'male' | 'female';
export type Preference = 'veg' | 'non-veg';
export type PrepTime = 'quick' | 'traditional';

export interface UserInputs {
    age: number;
    gender: Gender;
    weight: number;
    heightFt?: number;
    heightIn?: number;
    heightCm?: number;
    activity: number;
    preference: Preference;
    prepTime: PrepTime;
}

export interface Results {
    targetCalories: number;
    waterL: number;
    waterGal: number;
}

export interface Meal {
    title: string;
    desc: string;
    tags: string[];
    pref: Preference;
    prep: PrepTime;
}
