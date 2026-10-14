import Header from "@/components/Header";
import ScreenBackground from "@/components/ScreenBackground";
import { globalStyles } from "@/styles/global";
import { View } from "react-native";

export default function AddMealScreen() {
	return (
		<ScreenBackground>
			<View style={globalStyles.container}>
				<Header
					title="Your Meals"
					date={false}
				/>
			</View>
		</ScreenBackground>
	);
}
