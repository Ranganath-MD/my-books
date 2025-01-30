import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import "react-native-reanimated";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	const [loaded] = useFonts({
		GeistRegular: require("../assets/fonts/Geist-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	const Theme = {
		dark: true,
		colors: {
			...DarkTheme.colors,
			background:
				colorScheme === "dark"
					? colors.dark.background
					: colors.light.background,
			text: colorScheme === "dark" ? colors.dark.text : colors.light.text,
		},
		fonts: {
			regular: {
				fontFamily: "GeistRegular", // Ensure this matches what is registered in useFonts
				fontWeight: "400",
			},
			medium: {
				fontFamily: "GeistRegular",
				fontWeight: "500",
			},
			bold: {
				fontFamily: "GeistRegular",
				fontWeight: "600",
			},
			heavy: {
				fontFamily: "GeistRegular",
				fontWeight: "700",
			},
		},
	};

	return (
		<ThemeProvider value={Theme as any}>
			<ConvexProvider client={convex}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="index" />
					<Stack.Screen
						name="(tabs)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen name="+not-found" />
				</Stack>
			</ConvexProvider>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
