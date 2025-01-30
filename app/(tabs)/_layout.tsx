import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function DashboardLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarPosition: Platform.OS === "web" ? "left" : "bottom",
				tabBarItemStyle: {
					marginTop: Platform.OS === "web" ? 8 : 0,
				},
				tabBarActiveTintColor: Colors.shark[100],
				tabBarInactiveTintColor: Colors.shark[400],
				headerShown: true,
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
