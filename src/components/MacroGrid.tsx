import { StyleSheet, View } from "react-native";
import MacroCard from "./MacroCard";

export default function MacroGrid() {
	return (
		<View style={styles.grid}>
			<MacroCard
				label="Calories"
				value="0"
				goal="2,000"
				color="#FF6464"
				icon="flame"
			/>
			<MacroCard
				label="Protein"
				value="0g"
				goal="150g"
				color="#398BFF"
				icon="barbell"
			/>
			<MacroCard
				label="Carbs"
				value="0g"
				goal="250g"
				color="#FFB400"
				icon="nutrition"
			/>
			<MacroCard
				label="Fat"
				value="0g"
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
