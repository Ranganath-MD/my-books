import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

const createWebTokenCache = (): TokenCache => ({
  getToken: async (key: string) => {
    const item = localStorage.getItem(key);
    console.log(
      item ? `${key} was used 🌐` : `No values stored under key: ${key}`,
    );
    return item;
  },
  saveToken: (key: string, token: string) => {
    localStorage.setItem(key, token);
    return Promise.resolve();
  },
});

export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : createWebTokenCache();
