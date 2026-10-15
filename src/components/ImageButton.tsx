import { colors } from "@/styles/global";
import Ionicons, {
	type IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import * as ImagePicker from "expo-image-picker";
import {
	Alert,
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";

type ImageButtonProps = {
	action: "take" | "pick";
	setImageUri: (uri: string) => void;
	icon: IoniconsIconName;
	label: string;
};

export default function ImageButton({
	action,
	setImageUri,
	icon,
	label,
}: ImageButtonProps) {
	const pickImage = async () => {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				"Permission required",
				"Please enable photo access in settings.",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Settings",
						onPress: () => Linking.openSettings(),
					},
				]
			);
			return;
		}

		const result =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
			});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};

	const takePhoto = async () => {
		const permissionResult =
			await ImagePicker.requestCameraPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert(
				"Permission required",
				"Permission to access the camera is required."
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setImageUri(result.assets[0].uri);
		}
	};
	return (
		<TouchableOpacity
			style={styles.photoButton}
			onPress={action === "take" ? takePhoto : pickImage}
		>
			<Ionicons
				name={icon}
				size={20}
				color={colors.primary}
			/>
			<Text style={styles.photoButtonText}>{label}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
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
});
