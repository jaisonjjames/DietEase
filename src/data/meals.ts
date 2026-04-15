import type { Meal } from '../types';

export const MEAL_DATA: Record<string, Meal[]> = {
    breakfast: [
        { title: "Oats Puttu & Kadala", desc: "1 cup Oats Puttu with black chickpeas curry. Traditional protein.", tags: ["Traditional"], pref: "veg", prep: "traditional" },
        { title: "Egg Roast & Whole Wheat Toast", desc: "2 slices wheat bread + 1 egg roast (minimal oil).", tags: ["Fusion"], pref: "non-veg", prep: "quick" },
        { title: "Greek Yogurt & Berries", desc: "1 cup Greek yogurt, topped with blueberries and Cardamom.", tags: ["Convenience"], pref: "veg", prep: "quick" },
        { title: "Avocado Toast with Kerala Egg", desc: "Sourdough with avocado & egg fried with chili flakes & curry leaves.", tags: ["Fusion"], pref: "non-veg", prep: "quick" },
        { title: "Upma with plenty of Veggies", desc: "Semolina cooked with carrots, beans, and mustard tempering.", tags: ["Traditional"], pref: "veg", prep: "traditional" }
    ],
    lunch: [
        { title: "Matta Rice & Fish Curry", desc: "1 cup Red rice, Fish curry, and Cabbage Thoran.", tags: ["Traditional"], pref: "non-veg", prep: "traditional" },
        { title: "Quinoa 'Fried Rice'", desc: "Quinoa with turmeric, mixed veggies, and 4 grilled shrimp.", tags: ["US-Convenience"], pref: "non-veg", prep: "quick" },
        { title: "Brown Rice & Lentils", desc: "1 cup Brown rice, Kerala style Dal (Parippu), and Beans Thoran.", tags: ["Traditional"], pref: "veg", prep: "traditional" },
        { title: "Costco Chicken & Broccoli Mezhukkupuratti", desc: "Rotisserie chicken (skinless) with spiced broccoli.", tags: ["US-Convenience"], pref: "non-veg", prep: "quick" },
        { title: "Paneer & Spinach Thoran", desc: "Grilled paneer with a large serving of Cheera Thoran.", tags: ["Fusion"], pref: "veg", prep: "quick" }
    ],
    dinner: [
        { title: "Wheat Chapati & Veg Kurma", desc: "2 Chapatis with a vegetable stew made with coconut milk.", tags: ["Traditional"], pref: "veg", prep: "traditional" },
        { title: "Grilled Salmon & Garlic Spinach", desc: "Salmon fillet seasoned with turmeric/pepper and sautéed spinach.", tags: ["US-Convenience"], pref: "non-veg", prep: "quick" },
        { title: "Red Rice Kanji", desc: "Light gruel with payar (green gram) and a small piece of pappadam.", tags: ["Traditional"], pref: "veg", prep: "traditional" },
        { title: "Chicken Stew & 1 Chapati", desc: "Light chicken stew with carrots and potatoes + 1 whole wheat chapati.", tags: ["Traditional"], pref: "non-veg", prep: "traditional" }
    ]
};
