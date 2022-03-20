import { View, Text, StyleSheet,Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useSelector } from "react-redux";


const styles = StyleSheet.create({});
export default function Extra({extra,commandeEnCours}) {
	const PlusIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "plus-icon")
	);
	const MinusIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "minus-icon")
	);
	const plusQuantite = () => {
		console.log("plusQuantite");
	}
	const minusQuantite = () => {
		console.log("minusQuantite");
	}

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				padding: 5,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontFamily: "Inter-Bold",
					color: "rgba(201, 209, 217, 1)",
				}}
			>
				{extra.name}
			</Text>

			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TouchableWithoutFeedback onPressOut={minusQuantite}>
					<Image style={{ width: 20, height: 20 }} source={MinusIcon} />
				</TouchableWithoutFeedback>
				<Text
					style={{
						fontSize: 20,
						fontFamily: "Inter-Bold",
						color: "rgba(201, 209, 217, 1)",
						marginHorizontal: 10,
					}}
				>
					{commandeEnCours.extras.find((el) => el.ext == extra._id)?.quantite ||
						0}
				</Text>
				<TouchableWithoutFeedback onPress={plusQuantite}>
					<Image style={{ width: 20, height: 20 }} source={PlusIcon} />
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
}
