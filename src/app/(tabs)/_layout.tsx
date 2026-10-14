import { colors } from "@/styles/global";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopColor: colors.textSecondary,
				},
				tabBarActiveTintColor: colors.surface,
				tabBarInactiveTintColor: colors.textSecondary,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="home"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="add-meal"
				options={{
					title: "Add Meal",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="add-circle"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="meals"
				options={{
					title: "Meals",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="list"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
