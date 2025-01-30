import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

const HomeScreen = () => {
	return (
		<SafeAreaView>
			<View className="h-full p-6">
				<ThemedText>This screen doesn't exist.</ThemedText>
				<Link href="/dashboard" replace className="text-blue-100">
					Go to Dashboard
				</Link>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
