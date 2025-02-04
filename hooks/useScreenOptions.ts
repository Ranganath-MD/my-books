import { Colors, colors } from "@/constants/Colors";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "nativewind";
import { Platform } from "react-native";

export function useScreenOptions() {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const isWeb = Platform.OS === "web";

	const tabsLayoutOptions: BottomTabNavigationOptions = {
		tabBarPosition: isWeb ? "left" : "bottom",
		tabBarStyle: {
			minWidth: 100,
			maxWidth: isWeb ? 200 : "100%",
		},
		tabBarItemStyle: {
			backgroundColor: isDark
				? colors.dark.background
				: colors.light.background,
			marginTop: isWeb ? 8 : 0,
		},
		tabBarActiveTintColor: isDark ? Colors.shark[100] : Colors.shark[600],
		tabBarInactiveTintColor: isDark ? Colors.shark[100] : Colors.shark[800],
		headerShown: true,
		headerTitleStyle: {
			color:
				colorScheme === "dark"
					? colors.light.background
					: colors.dark.background,
			fontWeight: "bold",
			fontSize: 20,
		},
		headerTitleAlign: "left",
		headerStyle: {
			backgroundColor:
				colorScheme === "dark"
					? colors.dark.background
					: colors.light.background,
			borderBottomWidth: 0.5,
			shadowColor: Colors.shark[900],
			borderBottomColor:
				colorScheme === "dark" ? Colors.shark[600] : Colors.shark[200],
			elevation: 2,
		},
	};
  
  return { tabsLayoutOptions };
}
