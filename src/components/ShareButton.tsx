import { Meal } from "@/storage/meals";
import { colors } from "@/styles/global";
import { getTotals } from "@/utils";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Share, TouchableOpacity } from "react-native";

type ShareButtonProps = {
	meals: Meal[];
};

export default function ShareButton({
	meals,
}: ShareButtonProps) {
	const handleShare = async () => {
		const totals = getTotals(meals);

		await Share.share({
			message: `My NutriTrack Summary for today! \n\nCalories: ${totals.calories}\nProtein: ${totals.protein}g\nCarbs: ${totals.carbs}g\nFat: ${totals.fat}g\n\nMeals: ${meals.length}`,
		});
	};

	return (
		<TouchableOpacity onPress={handleShare}>
			<Ionicons
				name="share-outline"
				size={24}
				color={colors.primary}
			/>
		</TouchableOpacity>
	);
}
