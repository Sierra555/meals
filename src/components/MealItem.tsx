import { colors } from "@/styles/global";
import {
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";

type MealItemProps = {
	name: string;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	imageUri?: string;
};

export default function MealItem({
	name,
	calories,
	protein,
	carbs,
	fat,
	imageUri = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
}: MealItemProps) {
	return (
		<View style={styles.container}>
			{imageUri && (
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: imageUri }}
						style={styles.image}
					/>
				</View>
			)}

			<View>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.macros}>
					{calories} cal • {protein}g P • {carbs}g C • {fat}
					g F
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#F1F5F9",
		padding: 16,
		marginBottom: 10,
	},
	name: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.primary,
	},
	macros: {
		fontSize: 13,
		color: "#6B7280",
		marginTop: 4,
	},
	imageContainer: {
		position: "relative",
		width: 80,
		height: 80,
		borderRadius: 12,
	},
	image: {
		flex: 1,
		borderRadius: 12,
	},
});
