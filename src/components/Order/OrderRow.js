import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { useSelector, useDispatch } from "react-redux";
import { removeProduit } from "../../actions/commandes";
const styles = StyleSheet.create({
	border: {
		padding: 2,
		borderRadius: 10,
		minWidth: "90%",
		minHeight: 100,
		color: "white",
		marginVertical: 20,
	},
	card: {
		flex: 1,
		backgroundColor: "#0D1117",
		flexDirection: "row",
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
	},
	image: {
		borderRadius: 10,
		width: "30%",
		height: "100%",
		resizeMode: "contain",
		borderWidth: 1,
		borderColor: "white",
	},
	deleteIcon: {
		position: "absolute",
		top: 10,
		right: -10,
		height: 25,
		width: 25,
		resizeMode: "contain",
	},
});
export default function OrderRow(props) {
	const dispatch = useDispatch();
	const appleIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "apple")
	);
	const product = useSelector((state) =>
		state.product.products.find((el) => el._id == props.order.prd)
	);
	const PlusIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "plus-icon")
	);
	const MinusIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "minus-icon")
	);
	const deleteIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "remove-icon")
	);
	const removeFromCart = () => {
		console.log("remove from cart");
		// dispatch(removeProduit(props.order.prd));
	};
	const plusQuantite = () => {
		console.log("plus quantite");
	};
	const minusQuantite = () => {
		console.log("minus quantite");
	};

	return (
		<View style={{ position: "relative" }}>
			<LinearGradient
				colors={[
					"rgba(11, 103, 255, 1)",
					"rgba(255, 255, 255, 0)",
					"rgba(11, 103, 255, 1)",
				]}
				locations={[0, 0.5, 1]}
				{...deg(-5)}
				style={styles.border}
			>
				<View style={styles.card}>
					<Image style={styles.image} source={appleIcon} />
					<View style={{ flex: 1, flexDirection: "column", marginLeft: 15 }}>
						<Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
							{product.nom}
						</Text>
						<Text style={{ fontSize: 15, color: "white" }}>
							{product.prix || "NaN"} Da
						</Text>
						<View
							style={{
								marginTop: 10,
								alignItems: "flex-end",
								width: "100%",
							}}
						>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								{props.editable !== false && (
									<TouchableWithoutFeedback onPressOut={minusQuantite}>
										<Image
											style={{ width: 20, height: 20 }}
											source={MinusIcon}
										/>
									</TouchableWithoutFeedback>
								)}
								{props.editable === false && (
									<Text
										style={{
											fontSize: 20,
											fontFamily: "Inter-Bold",
											color: "rgba(201, 209, 217, 1)",
										}}
									>
										x
									</Text>
								)}
								<Text
									style={{
										fontSize: 20,
										fontFamily: "Inter-Bold",
										color: "rgba(201, 209, 217, 1)",
										marginHorizontal: 10,
									}}
								>
									{props.order.quantite}
								</Text>
								{props.editable !== false && (
									<TouchableWithoutFeedback onPressOut={plusQuantite}>
										<Image
											style={{ width: 20, height: 20 }}
											source={PlusIcon}
										/>
									</TouchableWithoutFeedback>
								)}
							</View>
						</View>
					</View>
				</View>
			</LinearGradient>
			{props.editable !== false && (
				<TouchableWithoutFeedback onPressOut={removeFromCart}>
					<Image source={deleteIcon} style={styles.deleteIcon} />
				</TouchableWithoutFeedback>
			)}
		</View>
	);
}
