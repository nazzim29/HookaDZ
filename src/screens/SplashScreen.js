import { View, ActivityIndicator, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
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
	const imgW = new Animated.Value(1);
	useEffect(() => {
		Animated.loop(
			Animated.sequence(
				[Animated.timing(imgW, {
					toValue: 0.95,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(imgW, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				})]
			),
			{ iterations: -1 }
		).start();
	}, []);
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

			<Animated.Image
				style={{
					width: `100%`,
					height: `100%`,
					resizeMode: "contain",
					transform: [
						{
							scale: imgW,
						},
					],
				}}
				source={logo2}
			/>
		</View>
	);
}
