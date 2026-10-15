import { deleteMeal } from "@/storage/meals";
import { colors } from "@/styles/global";
import * as Haptics from "expo-haptics";
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type MealItemProps = {
	id: string;
	name: string;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	imageUri?: string;
	onDelete: () => void;
};

export default function MealItem({
	id,
	name,
	calories,
	protein,
	carbs,
	fat,
	imageUri = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
	onDelete,
}: MealItemProps) {
	const handleLongPress = () => {
		Alert.alert(
			"Delete Meal",
			`Are you sure you want to delete ${name}?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						await deleteMeal(id);
						Haptics.notificationAsync(
							Haptics.NotificationFeedbackType.Success
						);
						onDelete();
					},
				},
			]
		);
	};
	return (
		<TouchableOpacity
			style={styles.container}
			onLongPress={handleLongPress}
		>
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
		</TouchableOpacity>
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
