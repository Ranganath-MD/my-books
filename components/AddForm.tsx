import { Colors } from "@/constants/Colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const textInputClassName =
	"text-base text-white px-4 py-3 mb-4 bg-none text-gray-900 rounded-lg border dark:border-none border-zinc-300";

export const AddForm = ({
	handleSubmit,
	isSubmitting,
}: {
	handleSubmit: ({ title, author }: { title: string; author: string }) => void;
	isSubmitting: boolean;
}) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");

	const onPresss = () => {
		handleSubmit({ title, author });
		setTitle("");
		setAuthor("");
	};

	return (
		<View className="p-4 w-full">
			<Text className="dark:text-white mb-4 font-geist-bold text-xl">
				Add your favorite book
			</Text>
			<BottomSheetTextInput
				placeholder="Title of the book"
				placeholderTextColor={Colors.shark[500]}
				className={textInputClassName}
				onChange={(e) => setTitle(e.nativeEvent.text)}
				style={{
					backgroundColor: Colors.shark[200],
				}}
				value={title}
			/>
			<BottomSheetTextInput
				placeholder="Author"
				placeholderTextColor={Colors.shark[500]}
				className={textInputClassName}
				onChange={(e) => setAuthor(e.nativeEvent.text)}
				style={{
					backgroundColor: Colors.shark[200],
				}}
				value={author}
			/>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={onPresss}
				style={{
					backgroundColor: Colors.icons.primary,
				}}
				className="p-4 mt-4 rounded-lg"
			>
				<Text className="font-geist-bold text-center">
					{isSubmitting ? "Adding..." : "Add a book"}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
