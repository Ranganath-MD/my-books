import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import {
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	Keyboard,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";

const PIN_LENGTH = 6;
const HomeScreen = () => {
	const [focusedIndex, setFocusedIndex] = useState(0);

	const [pin, setPin] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([...Array(PIN_LENGTH)].map(() => React.createRef()));

	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, PIN_LENGTH);
	}, []);

	const focusInput = (index: number) => {
		if (inputRefs.current[index]) {
			inputRefs.current[index].focus();
			setFocusedIndex(index);
		}
	};

	const handlePinChange = (text: string, index: number) => {
		// Only allow numbers
		if (!/^\d*$/.test(text)) return;

		const newPin = [...pin];

		// For Android backspace handling
		if (text.length === 0) {
			newPin[index] = "";
			setPin(newPin);
			if (index > 0) {
				focusInput(index - 1);
			}
			return;
		}

		// Handle paste of full PIN
		if (text.length > 1) {
			const digits = text.split("").slice(0, PIN_LENGTH);
			const newPin = [...digits, ...Array(PIN_LENGTH).fill("")].slice(
				0,
				PIN_LENGTH
			);
			setPin(newPin);
			if (digits.length === PIN_LENGTH) {
				Keyboard.dismiss();
			} else {
				focusInput(digits.length);
			}
			return;
		}

		// Handle single digit input
		newPin[index] = text;
		setPin(newPin);

		if (text) {
			if (index < PIN_LENGTH - 1) {
				focusInput(index + 1);
			} else {
				Keyboard.dismiss();
			}
		}
	};

	const handleKeyPress = (event: any, index: number) => {
		// iOS backspace handling
		if (Platform.OS === "ios" && event.nativeEvent.key === "Backspace") {
			const newPin = [...pin];

			if (newPin[index]) {
				newPin[index] = "";
				setPin(newPin);
			} else if (index > 0) {
				newPin[index - 1] = "";
				setPin(newPin);
				focusInput(index - 1);
			}
		}
	};
	return (
		<SafeAreaView className="p-5 items-center mx-auto">
			<ThemedText className="mt-12 mb-2.5 text-center">
				Enter the code
			</ThemedText>

			<View className="flex-row justify-center space-x-2.5 mb-8 gap-1">
				{pin.map((digit, index) => (
					<TextInput
						key={index}
						ref={(ref) => (inputRefs.current[index] = ref)}
						className={`w-[40px] h-[50px] rounded text-2xl dark:text-white  text-center border-2 border-[#ADB5BD] ${focusedIndex === index ? "dark:border-white border-black" : "border-[#2C2C2E]"}`}
						maxLength={1}
						keyboardType="number-pad"
						value={digit}
						onChangeText={(text) => handlePinChange(text, index)}
						onKeyPress={(e) => handleKeyPress(e, index)}
						secureTextEntry={false}
						onFocus={() => setFocusedIndex(index)}
						selectTextOnFocus
						caretHidden={true}
					/>
				))}
			</View>

			<TouchableOpacity
				activeOpacity={0.8}
				className="flex-row items-center space-x-2 gap-2 mb-5 bg-black dark:bg-transparent dark:border dark:border-zinc-600 p-4 rounded-xl shadow-slate-500"
			>
				<ThemedText style={{ color: Colors.shark[50] }}>
					Enter code to login
				</ThemedText>
				<MaterialCommunityIcons name="login" size={24} color="#999" />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default HomeScreen;
