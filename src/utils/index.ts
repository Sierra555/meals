import type { MealType } from "@/schemas/MealSchema";

export const getTotals = (
	meals: MealType[]
): Omit<MealType, "name" | "imageUri"> => {
	const totals = meals.reduce(
		(acc, meal) => ({
			calories: acc.calories + meal.calories,
			protein: acc.protein + meal.protein,
			carbs: acc.carbs + meal.carbs,
			fat: acc.fat + meal.fat,
		}),
		{ calories: 0, protein: 0, carbs: 0, fat: 0 }
	);
	return totals;
};
