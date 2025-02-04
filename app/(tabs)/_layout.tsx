import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { useColorScheme } from "nativewind";
import { colors } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { ThemedText } from "@/components/ThemedText";
import { Logout } from "./Logout";

export default function DashboardLayout() {
  const { colorScheme } = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();

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

  const isDark = colorScheme === "dark";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
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
