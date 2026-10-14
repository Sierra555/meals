import { colors } from "@/styles/global";
import Ionicons, {
	type IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";

type MacroCardType = {
	label: string;
	value: string;
	goal: string;
	color: string;
	icon: IoniconsIconName;
};
export default function MacroCard({
	label,
	value,
	goal,
	color,
	icon,
}: MacroCardType) {
	const numericValue = Number(value.match(/\d+/)?.[0]);
	const numericGoal = Number(goal.match(/\d+/)?.[0]);
	const progress =
		numericValue !== undefined && numericGoal !== undefined
			? Math.min(Math.max(numericValue / numericGoal, 0), 1)
			: 0;
	return (
		<View style={styles.cardContainer}>
			<View
				style={[
					styles.cardBackground,
					{ backgroundColor: color },
				]}
			/>
			<View style={styles.labelContainer}>
				<Ionicons
					name={icon}
					color={color}
					size={24}
				/>
				<Text style={styles.label}>{label}</Text>
			</View>

			<View>
				<Text style={styles.value}>{value}</Text>
				<Text style={styles.goal}>/ {goal}</Text>
			</View>

			<View style={styles.track}>
				<View
					style={[
						styles.fill,
						{
							backgroundColor: color,
							width: `${progress * 100}%`,
						},
					]}
				></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		width: 150,
		height: "auto",
		aspectRatio: 1 / 1,
		borderRadius: 22,
		paddingVertical: 20,
		paddingHorizontal: 15,
		justifyContent: "space-between",
	},
	cardBackground: {
		...StyleSheet.absoluteFill,
		opacity: 0.2,
		borderRadius: 22,
	},
	labelContainer: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
	},
	track: {
		height: 12,
		width: "100%",
		backgroundColor: "#E5E7EB",
		borderRadius: 100,
		overflow: "hidden",
	},
	fill: { height: "100%", borderRadius: 100 },
	label: {
		fontSize: 14,
		color: colors.primary,
	},
	value: {
		fontSize: 28,
		fontWeight: "700",
		color: colors.primary,
		marginTop: 4,
	},
	goal: {
		fontSize: 14,
		fontWeight: "400",
		color: "#6B7280",
		marginTop: 2,
	},
});
