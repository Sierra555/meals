import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";
export default function HomeHeader({
	title,
	date,
}: {
	title: string;
	date: boolean;
}) {
	const today = new Date()
		.toLocaleDateString("en-Us", {
			weekday: "long",
			month: "long",
			day: "numeric",
		})
		.replace(",", "");

	return (
		<View>
			<View style={{ flexDirection: "row" }}>
				<Ionicons
					name="leaf"
					color={colors.surface}
					size={24}
				/>
				<Text style={globalStyles.title}>{title}</Text>
			</View>

			{date && <Text style={styles.date}>{today}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	date: {
		fontSize: 14,
		color: "#a0a0b0",
		marginTop: 4,
		marginBottom: 10,
	},
});
