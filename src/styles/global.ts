import { StyleSheet } from "react-native";

export const colors = {
	background: "#FAFAF7",
	header: "#F7F5EF",
	surface: "#008F78",
	primary: "#123B40",
	text: "#557783",
	textSecondary: "#557783",
	alert: "#ff5252",
};

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 160,
		paddingHorizontal: 40,
	},
	mainSectionBackground: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: colors.background,
	},
	shadow: {
		...StyleSheet.absoluteFill,
		backgroundColor: colors.textSecondary,
		opacity: 0.1,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: colors.text,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "600",
		color: colors.primary,
	},
	empty: {
		color: colors.textSecondary,
		fontSize: 14,
		paddingInlineStart: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
