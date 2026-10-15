import { Meal } from "@/storage/meals";
import { getTotals } from "@/utils";
import { StyleSheet, View } from "react-native";
import MacroCard from "./MacroCard";

type MacroGridProps = {
	meals: Meal[];
};

export default function MacroGrid({
	meals,
}: MacroGridProps) {
	const totals = getTotals(meals);

	return (
		<View style={styles.grid}>
			<MacroCard
				label="Calories"
				value={`${totals.calories}`}
				goal="2000"
				color="#FF6464"
				icon="flame"
			/>
			<MacroCard
				label="Protein"
				value={`${totals.protein}g`}
				goal="150g"
				color="#398BFF"
				icon="barbell"
			/>
			<MacroCard
				label="Carbs"
				value={`${totals.carbs}g`}
				goal="250g"
				color="#FFB400"
				icon="nutrition"
			/>
			<MacroCard
				label="Fat"
				value={`${totals.fat}g`}
				goal="65g"
				color="#2EAD7B"
				icon="water"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
});
