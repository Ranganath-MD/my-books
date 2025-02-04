import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Page() {
  const { isSignedIn } = useAuth();

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
