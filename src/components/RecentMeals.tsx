import { Meal } from "@/storage/meals";
import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
import MealItem from "./MealItem";

type RecentMealsProps = {
	meals: Meal[];
	onDelete: () => void;
};

export default function RecentMeals({
	meals,
	onDelete,
}: RecentMealsProps) {
	return (
		<View style={{ marginTop: 30 }}>
			<View style={styles.titleContainer}>
				<Ionicons
					name="restaurant-outline"
					size={24}
					color={colors.surface}
				/>
				<Text style={globalStyles.sectionTitle}>
					Recent Meals
				</Text>
			</View>

			{meals.length === 0 ? (
				<Text style={globalStyles.empty}>
					No recent meals yet.
				</Text>
			) : (
				meals.slice(0, 5).map((item) => (
					<MealItem
						id={item.id}
						key={item.id}
						name={item.name}
						calories={item.calories}
						protein={item.protein}
						carbs={item.carbs}
						fat={item.fat}
						imageUri={item.imageUri || undefined}
						onDelete={onDelete}
					/>
				))
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		marginBottom: 16,
		paddingInlineStart: 20,
	},
});
