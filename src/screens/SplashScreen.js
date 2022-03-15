import { View, ActivityIndicator } from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#0D1117",
				}}
			>
				<ActivityIndicator size="large" color="#990091" />
			</View>
		);
}