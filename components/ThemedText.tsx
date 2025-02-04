import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor = Colors.shark[950],
  darkColor = Colors.shark[50],
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      className={className}
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "GeistRegular",
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: "GeistRegular",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontFamily: "GeistRegular",
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: "GeistRegular",
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontFamily: "GeistRegular",
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
