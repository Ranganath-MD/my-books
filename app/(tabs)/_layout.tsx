import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useColorScheme } from "nativewind";
import { colors } from "@/constants/Colors";

export default function DashboardLayout() {
	const { colorScheme } = useColorScheme();

	const isDark = colorScheme === "dark"

	return (
		<Tabs
			screenOptions={{
				tabBarPosition: Platform.OS === "web" ? "left" : "bottom",
				tabBarStyle: {
					minWidth: 100,
					maxWidth: Platform.OS === "web" ? 200 : "100%",
				},
				tabBarItemStyle: {
					backgroundColor: isDark
						? colors.dark.background
						: colors.light.background,
					marginTop: Platform.OS === "web" ? 8 : 0,
				},
				tabBarActiveTintColor: isDark ? Colors.shark[100] : Colors.shark[600],
				tabBarInactiveTintColor: isDark ? Colors.shark[100] : Colors.shark[600],
				headerShown: true,
				headerTitleStyle: {
					color:
						colorScheme === "dark"
							? colors.light.background
							: colors.dark.background,
					fontWeight: "bold",
				},
				headerStyle: {
					backgroundColor:
						colorScheme === "dark"
							? colors.dark.background
							: colors.light.background,
				},
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					headerTitle: "Dashboard",
					title: "Dashboard",
					tabBarIcon: ({ focused, color }) => (
						<Ionicons
							size={24}
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="documents"
				options={{
					headerTitle: "Documents",
					title: "Documents",
					tabBarIcon: ({ focused, color }) => (
						<Ionicons
							name={focused ? "document-text" : "document-text-outline"}
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
