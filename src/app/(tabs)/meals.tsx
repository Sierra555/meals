import Header from "@/components/Header";
import MealItem from "@/components/MealItem";
import ScreenBackground from "@/components/ScreenBackground";
import {
	getMeals,
	Meal,
	removeAllMeals,
} from "@/storage/meals";
import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function AddMealScreen() {
	const [meals, setMeals] = useState<Meal[]>([]);

	const loadMeals = async () => {
		const meals = await getMeals();
		setMeals(meals);
	};

	const handleClearAll = async () => {
		await removeAllMeals();
		loadMeals();
	};

	useFocusEffect(
		useCallback(() => {
			loadMeals();
		}, [])
	);

	return (
		<ScreenBackground>
			<View style={globalStyles.container}>
				<Header
					title="Your Meals"
					date={false}
				/>
				{meals.length > 0 && (
					<TouchableOpacity
						style={styles.clearContainer}
						onPress={handleClearAll}
					>
						<Text style={{ color: colors.surface }}>
							Clear all
						</Text>
						<Ionicons
							name="trash-outline"
							color={colors.surface}
							size={24}
						/>
					</TouchableOpacity>
				)}
				<View style={{ marginTop: 10 }}>
					{meals.length === 0 ? (
						<Text style={globalStyles.empty}>
							No meals logged yet.
						</Text>
					) : (
						<FlatList
							data={meals}
							renderItem={({ item }) => (
								<MealItem
									id={item.id}
									name={item.name}
									calories={item.calories}
									protein={item.protein}
									carbs={item.carbs}
									fat={item.fat}
									imageUri={item.imageUri || undefined}
									onDelete={loadMeals}
								/>
							)}
						/>
					)}
				</View>
			</View>
		</ScreenBackground>
	);
}

const styles = StyleSheet.create({
	clearContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		marginInlineEnd: 10,
		marginTop: 10,
	},
});
