import Header from "@/components/Header";
import ImageButton from "@/components/ImageButton";
import ScreenBackground from "@/components/ScreenBackground";
import { mealSchema } from "@/schemas/MealSchema";
import { addMeal } from "@/storage/meals";
import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function AddMealScreen() {
	const [name, setName] = useState("");
	const [calories, setCalories] = useState("");
	const [protein, setProtein] = useState("");
	const [carbs, setCarbs] = useState("");
	const [fat, setFat] = useState("");
	const [imageUri, setImageUri] = useState<string | null>(
		null
	);
	const [errors, setErrors] = useState<
		Record<string, string>
	>({});

	const handleAddMeal = async () => {
		const result = mealSchema.safeParse({
			name,
			calories,
			protein,
			carbs,
			fat,
			imageUri,
		});

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			result.error.issues.forEach((error) => {
				const field = error.path[0];

				if (typeof field === "string") {
					fieldErrors[field] = error.message;
				}
			});

			setErrors(fieldErrors);
			return;
		}
		await addMeal(result.data);

		setName("");
		setCalories("");
		setProtein("");
		setCarbs("");
		setFat("");
		setImageUri("");

		Alert.alert("Success", "Meal added successfully!");
		Haptics.notificationAsync(
			Haptics.NotificationFeedbackType.Success
		);

		router.push("/");
	};

	return (
		<ScreenBackground>
			<ScrollView
				style={globalStyles.container}
				showsVerticalScrollIndicator={false}
			>
				<Header
					title="Add Meal"
					date={false}
				/>

				<TextInput
					style={[
						styles.input,
						errors.name && styles.error,
					]}
					placeholder="Meal name"
					placeholderTextColor={colors.textSecondary}
					value={name}
					onChangeText={(value) => {
						setName(value);
						setErrors((prev) => ({ ...prev, name: "" }));
					}}
				/>

				<TextInput
					style={[
						styles.input,
						errors.calories && styles.error,
					]}
					placeholder="Calories"
					placeholderTextColor={colors.textSecondary}
					keyboardType="decimal-pad"
					value={calories}
					onChangeText={(value) => {
						setCalories(value);
						setErrors((prev) => ({
							...prev,
							calories: "",
						}));
					}}
				/>

				<View style={styles.row}>
					<TextInput
						style={[styles.input, styles.rowInput]}
						placeholder="Protein (g)"
						placeholderTextColor={colors.textSecondary}
						keyboardType="decimal-pad"
						value={protein}
						onChangeText={setProtein}
					/>

					<TextInput
						style={[styles.input, styles.rowInput]}
						placeholder="Carbs (g)"
						placeholderTextColor={colors.textSecondary}
						keyboardType="decimal-pad"
						value={carbs}
						onChangeText={setCarbs}
					/>

					<TextInput
						style={[styles.input, styles.rowInput]}
						placeholder="Fat (g)"
						placeholderTextColor={colors.textSecondary}
						keyboardType="decimal-pad"
						value={fat}
						onChangeText={setFat}
					/>
				</View>
				<View style={styles.photoButtons}>
					<ImageButton
						action="take"
						setImageUri={setImageUri}
						icon="camera-outline"
						label="Take Photo"
					/>

					<ImageButton
						action="pick"
						setImageUri={setImageUri}
						icon="images-outline"
						label="Gallery"
					/>
				</View>
				<View style={styles.imagePlaceholder}>
					{imageUri && (
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: imageUri }}
								style={styles.image}
							/>

							<TouchableOpacity
								style={styles.removeButton}
								onPress={() => setImageUri(null)}
								accessibilityLabel="Remove photo"
							>
								<Ionicons
									name="close-circle"
									size={22}
									color="#FF6464"
								/>
							</TouchableOpacity>
						</View>
					)}
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={handleAddMeal}
				>
					<Text style={styles.buttonText}>Add Meal</Text>
				</TouchableOpacity>
			</ScrollView>
		</ScreenBackground>
	);
}

const styles = StyleSheet.create({
	input: {
		color: colors.text,
		padding: 16,
		fontSize: 16,
		marginTop: 16,
		backgroundColor: "#fff",
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#F1F5F9",
	},
	row: {
		flexDirection: "row",
		gap: 10,
	},
	rowInput: {
		flex: 1,
		minWidth: 0,
	},
	sectionTitle: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
		marginTop: 24,
		marginBottom: 35,
	},
	imagePlaceholder: {
		height: 104,
		justifyContent: "center",
	},
	imageContainer: {
		position: "relative",
		width: 80,
		height: 80,
		borderRadius: 12,
		marginBlock: 12,
	},
	image: {
		flex: 1,
		borderRadius: 12,
	},
	removeButton: {
		position: "absolute",
		top: -8,
		right: -8,
		backgroundColor: "#fff",
		borderRadius: 20,
	},
	photoButtons: {
		flexDirection: "row",
		gap: 12,
		marginTop: 12,
	},
	button: {
		backgroundColor: colors.primary,
		padding: 16,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 24,
	},
	buttonText: {
		color: colors.background,
		fontSize: 16,
		fontWeight: "bold",
	},
	error: {
		borderColor: "red",
	},
});
