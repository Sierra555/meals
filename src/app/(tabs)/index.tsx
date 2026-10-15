import CopyButton from "@/components/CopyButton";
import Header from "@/components/Header";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import ReminderToggle from "@/components/ReminderToggle";
import ScreenBackground from "@/components/ScreenBackground";
import ShareButton from "@/components/ShareButton";
import { getMeals, Meal } from "@/storage/meals";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
	const [meals, setMeals] = useState<Meal[]>([]);
	const loadMeals = async () => {
		const result = await getMeals();
		setMeals(result);
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
					title="NutriTrack"
					date={true}
				/>
				<View style={styles.shareButton}>
					<ShareButton meals={meals} />
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<MacroGrid meals={meals} />
					<CopyButton meals={meals} />
					<ReminderToggle />
					<RecentMeals
						meals={meals}
						onDelete={loadMeals}
					/>
				</ScrollView>
			</View>
		</ScreenBackground>
	);
}

const styles = StyleSheet.create({
	shareButton: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginInlineEnd: 20,
		marginBlockEnd: 10,
	},
});
