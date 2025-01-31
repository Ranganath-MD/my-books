import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@clerk/clerk-expo";
import { Link, Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
	const { isSignedIn } = useAuth();

	console.log({ isSignedIn });

	return (
		<View>
			{isSignedIn ? (
				<Redirect href={"/dashboard"} />
			) : (
				<Redirect href={"/sign-in"} />
			)}
		</View>
	);
}
