import type { MealType } from "@/schemas/MealSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Meal = MealType & {
	id: string;
	createdAt: string;
};

const MEALS_KEY = "meals";

export const getMeals = async (): Promise<Meal[]> => {
	const data = await AsyncStorage.getItem(MEALS_KEY);
	return data ? JSON.parse(data) : [];
};

export const addMeal = async (
	meal: MealType
): Promise<MealType> => {
	const meals = await getMeals();
	const Meal: Meal = {
		...meal,
		id: Date.now().toString(),
		createdAt: new Date().toISOString(),
	};
	await AsyncStorage.setItem(
		MEALS_KEY,
		JSON.stringify([...meals, Meal])
	);
	return Meal;
};

export const deleteMeal = async (
	id: string
): Promise<void> => {
	const meals = (await getMeals()).filter(
		(item) => item.id !== id
	);

	await AsyncStorage.setItem(
		MEALS_KEY,
		JSON.stringify(meals)
	);
};

export const removeAllMeals = async (): Promise<void> => {
	await AsyncStorage.removeItem(MEALS_KEY);
};
