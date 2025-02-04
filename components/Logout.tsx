import { colors } from "@/constants/Colors";
import { useClerk, SignOutButton } from "@clerk/clerk-react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Platform, TouchableOpacity } from "react-native";

export const Logout = () => {
	const { colorScheme } = useColorScheme();
	const { signOut } = useClerk();
	const { replace } = useRouter();

	const handleLogout = async () => {
		try {
			await signOut();
			replace("/");
		} catch (error) {
			console.error(error);
		}
	};

	const renderIcon = () => (
		<Ionicons
			name="log-out-outline"
			size={24}
			color={
				colorScheme === "dark"
					? colors.light.background
					: colors.dark.background
			}
		/>
	);

	if (Platform.OS === "web") {
		return <SignOutButton redirectUrl="/" children={renderIcon()} />;
	}

	return (
		<TouchableOpacity onPress={handleLogout}>
			{renderIcon()}
		</TouchableOpacity>
	);
};
