import React, { useMemo, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { AddForm } from "@/components/AddForm";
import { useColorScheme } from "nativewind";

export default function Dashboard() {
	const { colorScheme } = useColorScheme();
	const data = useQuery(api.books.getBooks);
	const addNewBook = useMutation(api.books.addBook);
	const snapPoints = useMemo(() => ["40%"], []);
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!data) {
		return (
			<View className="flex-1 items-center justify-center">
				<Feather
					name="loader"
					size={44}
					color={Colors.icons.primary}
					className="animate-spin"
				/>
			</View>
		);
	}

	const handleAddBook = async ({
		title,
		author,
	}: {
		title: string;
		author: string;
	}) => {
		if (!title || !author) {
			return;
		}

		setIsSubmitting(true);
		try {
			await addNewBook({ title, author });
			bottomSheetRef.current?.close();
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderBackdrop = (props: any) => <BottomSheetBackdrop {...props} />;

	return (
		<>
			<View className="p-4 relative h-full">
				<Text className="text-2xl mb-4 font-geist-bold dark:text-zinc-200 ">
					All Books
				</Text>
				<ScrollView>
					{data.map((book) => (
						<View
							key={book._id}
							className="bg-zinc-200 dark:bg-zinc-800 rounded-lg p-4 mb-4"
						>
							<Text className="font-geist-bold dark:text-zinc-200 text-xl">
								{book.title}
							</Text>
							<Text className=" dark:text-zinc-300 mt-1">{book.author}</Text>
						</View>
					))}
				</ScrollView>

				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => bottomSheetRef.current?.expand()}
					className="p-4 inline-flex items-center justify-center rounded-full shadow-current bg-zinc-200 dark:bg-zinc-700 absolute bottom-4 right-4"
				>
					<Entypo name="plus" size={24} color={Colors.icons.primary} />
				</TouchableOpacity>
			</View>

			<BottomSheet
				index={-1}
				snapPoints={snapPoints}
				ref={bottomSheetRef}
				keyboardBehavior="fillParent"
				enableOverDrag
				enablePanDownToClose
				backdropComponent={renderBackdrop}
				backgroundStyle={{
					backgroundColor:
						colorScheme === "dark" ? Colors.shark[900] : Colors.shark[50],
				}}
			>
				<BottomSheetView>
					<AddForm
						handleSubmit={(payload) => handleAddBook(payload)}
						isSubmitting={isSubmitting} />
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
