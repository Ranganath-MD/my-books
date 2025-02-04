import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import { View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { ThemedText } from "@/components/ThemedText";
import { Logout } from "../../components/Logout";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export default function DashboardLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { tabsLayoutOptions } = useScreenOptions();
  if (!isLoaded) {
    return (
      <View>
        <ThemedText>Auth Loading...</ThemedText>
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
		<Tabs
			screenOptions={{
				...tabsLayoutOptions,
				headerRight: () => (
					<View className="mr-4">
						<Logout />
					</View>
				),
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
