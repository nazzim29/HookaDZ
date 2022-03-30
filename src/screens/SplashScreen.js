import { View, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function SplashScreen() {
	const logo1 = useSelector((state) =>
		state.ui.assets.find((el) => el.name === "logo-1")
	);
	const logo2 = useSelector((state) =>
		state.ui.assets.find((el) => el.name === "logo-2")
	);
	const logoRealist = useSelector((state) =>
		state.ui.assets.find((el) => el.name === "logo-realist")
	);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#0D1117",
			}}
		>
			{/* <ActivityIndicator size="large" color="#990091" /> */}
			<Image
				style={{
					width: "100%",
					height: "100%",
					resizeMode: "contain",
				}}
				source={logo2}
			/>
		</View>
	);
}
