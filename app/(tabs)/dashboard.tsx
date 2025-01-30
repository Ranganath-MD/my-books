import { ThemedText } from "@/components/ThemedText";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Colors } from "@/constants/Colors";

export default function Dashboard() {
	const categories = useQuery(api.categories.getCategories);

	const isWeb = Platform.OS === "web";

	const Main = isWeb ? View : ScrollView;

	return (
		<Main className="web:grid web:grid-cols-4 web:p-4 gap-4 shadow-slate-500 web:rounded-md">
			{categories?.map((item) => {
				return (
					<Pressable key={item._id} className="mt-4 web:mt-0">
						<View className="bg-[#212529] p-4 flex flex-row items-center justify-between web:justify-center">
							<View className="flex flex-row web:flex-col items-center gap-4 web:gap-2">
								<MaterialCommunityIcons
									name={item.icon as any}
									size={32}
									color={Colors.icons.gold}
								/>
								<ThemedText
									type="default"
									style={{ fontSize: isWeb ? 14 : 20 }}
								>
									{item?.title}
								</ThemedText>
							</View>
							{isWeb ? null : (
								<SimpleLineIcons
									className="float-right"
									name="arrow-right"
									size={16}
									color={Colors.icons.gold}
								/>
							)}
						</View>
					</Pressable>
				);
			})}
		</Main>
	);
}
