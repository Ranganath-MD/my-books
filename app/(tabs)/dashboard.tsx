import { ThemedText } from "@/components/ThemedText";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

export default function Dashboard() {
	const categories = useQuery(api.categories.getCategories);
	const { colorScheme } = useColorScheme();

	const isWeb = Platform.OS === "web";

	const Main = isWeb ? View : ScrollView;

	return (
		<Main className="web:p-4 grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full">
			{categories?.map((item) => {
				return (
					<Pressable key={item._id}>
						<View className="web:border border-b gap-0 dark:border-zinc-800 border-zinc-200  p-4 flex flex-row web:items-start items-center justify-between web:justify-start">
							<View className="flex flex-row web:flex-col web:items-start items-center gap-4 web:gap-2">
								<MaterialCommunityIcons
									name={item.icon as any}
									size={32}
									color={
										colorScheme === "dark"
											? Colors.icons.primary
											: Colors.icons.secondary
									}
								/>
								<ThemedText type="defaultSemiBold">{item?.title}</ThemedText>
							</View>
							{isWeb ? null : (
								<SimpleLineIcons
									className="float-right "
									name="arrow-right"
									size={14}
									color={Colors.shark[500]}
								/>
							)}
						</View>
					</Pressable>
				);
			})}
		</Main>
	);
}
