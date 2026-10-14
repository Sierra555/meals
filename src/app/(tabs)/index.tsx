import Header from "@/components/Header";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import ScreenBackground from "@/components/ScreenBackground";
import { globalStyles } from "@/styles/global";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
	return (
		<ScreenBackground>
			<View style={globalStyles.container}>
				<Header
					title="NutriTrack"
					date={true}
				/>
				<ScrollView>
					<MacroGrid />
					<RecentMeals />
				</ScrollView>
			</View>
		</ScreenBackground>
	);
}
