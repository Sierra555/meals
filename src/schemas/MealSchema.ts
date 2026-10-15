import { z } from "zod";

export const mealSchema = z.object({
	name: z.string().trim().min(1, "Enter meal name"),
	calories: z.coerce.number().min(1, "Enter meal calories"),
	protein: z.coerce.number().nonnegative(),
	carbs: z.coerce.number().nonnegative(),
	fat: z.coerce.number().nonnegative(),
	imageUri: z.string().nullable(),
});

export type MealType = z.infer<typeof mealSchema>;
