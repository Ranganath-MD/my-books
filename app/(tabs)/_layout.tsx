import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs, useRouter } from "expo-router";
import { Platform, Pressable, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import { colors } from "@/constants/Colors";
import { SignOutButton } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-expo";
import { ThemedText } from "@/components/ThemedText";
import { useClerk } from "@clerk/clerk-react";

const Logout = () => {
	const { colorScheme } = useColorScheme();
	const { signOut } = useClerk();
	const { replace } = useRouter();

	const Icon = () => (
		<Ionicons
			className="mr-5"
			name={"log-out-outline"}
			size={24}
			color={
				colorScheme === "dark"
					? colors.light.background
					: colors.dark.background
			}
		/>
	);

	if (Platform.OS === "web") {
		return <SignOutButton redirectUrl="/" children={<Icon />} />;
	}

	const handleLogout = async () => {
		try {
			await signOut();
			replace("/");
		} catch {}
	};

	return (
		<TouchableOpacity onPress={handleLogout}>
			<Icon />
		</TouchableOpacity>
	);
};

export default function DashboardLayout() {
	const { colorScheme } = useColorScheme();
	const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();

	if (!isAuthLoaded) {
		return (
			<View>
				<ThemedText>Auth Loading...</ThemedText>
			</View>
		);
	}

	if (!isSignedIn) {
		return <Redirect href="/" />;
	}

	const isDark = colorScheme === "dark";

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
				headerRight: () => <Logout />,
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
