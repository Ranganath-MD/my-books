import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { dark } from "@clerk/themes";
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SignIn } from "@clerk/clerk-react";

export default function HomeScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    return <Redirect href="/dashboard" />;
  }

  const onSignInPress = async () => {
    if (!isLoaded || !emailAddress || !password) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/dashboard");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch {}
  };

  if (!isLoaded) {
    return (
      <View>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="p-6 h-full flex flex-col justify-center">
        <ThemedText
          type="title"
          style={{ fontWeight: "heavy", letterSpacing: 6 }}
          className="text-center"
        >
          Watching you
        </ThemedText>
        <ThemedText
          type="default"
          style={{ fontWeight: "heavy", letterSpacing: 6 }}
          className="text-center mb-12"
        >
          Dare to open
        </ThemedText>

        {Platform.OS === "web" ? null : (
          <Image
            source={require("../../assets/images/book-2.png")}
            className="w-full h-52 mb-12 shadow"
          />
        )}

        {Platform.OS === "web" ? (
          <View className="flex justify-center items-center">
            <SignIn
              forceRedirectUrl={"/dashboard"}
              appearance={{
                baseTheme: dark,
                variables: {
                  fontSize: "20px",
                },
              }}
            />
          </View>
        ) : (
          <View className="space-y-4">
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-4 border dark:border-none border-zinc-300">
              <Ionicons name="mail" size={20} color={Colors.shark[500]} />
              <TextInput
                className="ml-3 text-base text-gray-900"
                placeholder="Email"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 border dark:border-none border-zinc-300">
              <Ionicons
                name="lock-closed"
                size={20}
                color={Colors.shark[500]}
              />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onSignInPress}
              style={{
                backgroundColor: Colors.icons.primary,
              }}
              className="py-4 rounded-lg mt-4"
            >
              <ThemedText type="defaultSemiBold" className="text-center">
                Login
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
