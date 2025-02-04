import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import { Slot } from "expo-router";
import { fontConfig } from "@/constants/fonts";

import "react-native-reanimated";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
	throw new Error(
		"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
	);
}

export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	const [loaded] = useFonts({
		GeistRegular: require("../assets/fonts/Geist-Regular.ttf"),
		GeistSemiBold: require("../assets/fonts/Geist-SemiBold.ttf"),
		GeistBold: require("../assets/fonts/Geist-Bold.ttf"),
		GeistExtraBold: require("../assets/fonts/Geist-ExtraBold.ttf"),
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
		fonts: fontConfig,
	};

	return (
		<GestureHandlerRootView>
			<ThemeProvider value={Theme as any}>
				<ConvexProvider client={convex}>
					<ClerkProvider
						publishableKey={publishableKey}
						tokenCache={tokenCache}
					>
						<ClerkLoaded>
							<Slot />
						</ClerkLoaded>
					</ClerkProvider>
				</ConvexProvider>
				<StatusBar style="auto" />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
