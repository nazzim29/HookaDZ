import { Text, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Box } from "native-base";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { addProduit } from "../actions/commandes";
const styles = StyleSheet.create({
	border: {
		padding: 3,
		borderRadius: 10,
		maxWidth: "100%",
		aspectRatio: 1,
		overflow: "hidden",	
	},
	card: {
		maxWidth: "45%",
		marginVertical: 15,
		margin: "2.5%",
		maxHeight: 230,
		overflow: "hidden",
		justifyContent: "flex-start",
		paddingRight: 13,
		backgroundColor: "#0D1117",
		flexDirection: "column",
		borderRadius: 10,
		flexGrow: 1,
		flexShrink: 1,
	},
	imageContainer: {
		width: "100%",
		aspectRatio: 1,
	},
	image: {
		resizeMode: "cover",
		flex: 1,
		width: "100%",
	},
	details: {
		// marginTop: 5,
		width: "100%",
		flexDirection: "column",
		color: "#C9D1D9",
	},
	addBtn: {
		width: 30,
		height: 30,
	},
	addBtnContainer: {
		width: 30,
		borderRadius: 999,
		position: "absolute",
		bottom: -5,
		right: -10,
	},
	productTitle: {
		fontSize: 14,
		textAlign: "left",
		marginVertical: 3,
		marginLeft: 5,
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
		flexGrow: 1,
	},
	price: {
		fontSize: 18,
		marginLeft: 5,
		minHeight: 25,
		height: 20,
		fontFamily: "Inter-Bold",
		color: "#3299F1",
	},
});

export default (props) => {
	const { index, product } = props;
	const dispatch = useDispatch();
	const appleIcon = useSelector((state) => {
			return state.ui.assets.find(
				(el) => el.name + "." + el.type == product.image_url
			);
	});
	
	const plusIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "plus-icon")
	);
	const addToCart = () => {
		dispatch(addProduit(product));
	};
	return (
		<View style={[styles.card]}>
			<View style={styles.imageContainer}>
				<LinearGradient
					colors={[
						"rgba(11, 103, 255, 1)",
						"rgba(255, 255, 255, 0)",
						"rgba(11, 103, 255, 1)",
					]}
					locations={[0, 0.5, 1]}
					{...deg(45)}
					style={styles.border}
				>
					<View
						style={{ backgroundColor: "#0D1117", flex: 1, borderRadius: 10, overflow:"hidden" }}
					>
						<Image
							source={appleIcon}
							style={styles.image}
							alt={"product image"}
						/>
					</View>
				</LinearGradient>
				<TouchableOpacity style={styles.addBtnContainer} onPressOut={addToCart}>
					<Image
						source={plusIcon}
						style={styles.addBtn}
						alt={"add product to cart"}
					/>
				</TouchableOpacity>
			</View>

			<Box style={[styles.details,]}>
				<Text style={styles.productTitle}>{product.nom}</Text>
				<Text style={styles.price}>{product.prix || "NaN"} Da</Text>
			</Box>
		</View>
	);
};
