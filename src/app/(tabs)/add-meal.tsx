import Header from "@/components/Header";
import ScreenBackground from "@/components/ScreenBackground";
import { colors, globalStyles } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
	Alert,
	Image,
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

	const handleAddMeal = () => {
		console.log({
			name,
			calories,
			protein,
			carbs,
			fat,
			imageUri,
		});
	};

	const pickImage = async () => {
		const result =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
			});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};

	const takePhoto = async () => {
		const permission =
			await ImagePicker.requestCameraPermissionsAsync();

		if (!permission.granted) {
			Alert.alert(
				"Camera permission",
				"Please allow camera access to take a photo."
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.8,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};

	return (
		<ScreenBackground>
			<View style={globalStyles.container}>
				<Header
					title="Add Meal"
					date={false}
				/>

				<TextInput
					style={styles.input}
					placeholder="Meal name"
					placeholderTextColor={colors.textSecondary}
					value={name}
					onChangeText={setName}
				/>

				<TextInput
					style={styles.input}
					placeholder="Calories"
					placeholderTextColor={colors.textSecondary}
					keyboardType="numeric"
					value={calories}
					onChangeText={setCalories}
				/>

				<View style={styles.row}>
					<TextInput
						style={[styles.input, styles.rowInput]}
						placeholder="Protein (g)"
						placeholderTextColor={colors.textSecondary}
						keyboardType="numeric"
						value={protein}
						onChangeText={setProtein}
					/>

					<TextInput
						style={[styles.input, styles.rowInput]}
						placeholder="Carbs (g)"
						placeholderTextColor={colors.textSecondary}
						keyboardType="numeric"
						value={carbs}
						onChangeText={setCarbs}
					/>

					<TextInput
						style={[styles.input, styles.rowInput]}
						placeholder="Fat (g)"
						placeholderTextColor={colors.textSecondary}
						keyboardType="numeric"
						value={fat}
						onChangeText={setFat}
					/>
				</View>
				<View style={styles.photoButtons}>
					<TouchableOpacity
						style={styles.photoButton}
						onPress={takePhoto}
					>
						<Ionicons
							name="camera-outline"
							size={20}
							color={colors.primary}
						/>
						<Text style={styles.photoButtonText}>
							Take Photo
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.photoButton}
						onPress={pickImage}
					>
						<Ionicons
							name="images-outline"
							size={20}
							color={colors.primary}
						/>
						<Text style={styles.photoButtonText}>
							Gallery
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ height: 80 }}>
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
			</View>
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
	photoButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingVertical: 14,
		backgroundColor: "#EAF3FF",
		borderRadius: 10,
	},
	photoButtonText: {
		color: colors.primary,
		fontSize: 14,
		fontWeight: "600",
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
});
