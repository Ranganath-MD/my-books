import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
		<SafeAreaView>
			<View className="h-full p-6">
				<Text className="text-white text-2xl">Hello, World!</Text>
				<Text className="text-white text-xl">Welcome to your new app!</Text>
			</View>
		</SafeAreaView>
	);
}

export default HomeScreen