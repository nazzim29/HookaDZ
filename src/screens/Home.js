import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
} from "react-native";

import { Box, ScrollView } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		// backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	headerText: {
		fontSize: 25,
		fontWeight: "bold",
		fontFamily: "Inter-Bold",
		color: "#7638FF",
		textAlign: "center",
		width: "100%",
		marginVertical: "10%",
	},
	headerIcon: {
		height: 25,
		width: 25,
	},
	container: {
		flex: 1,
		backgroundColor: "#0D1117",
		alignItems: "flex-start",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	screenContent: {
		flex: 1,
		minWidth: "100%",
		minHeight: "100%",
		justifyContent: "center",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	locationHeader: {
		// backgroundColor: "#161B22",
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "center",
	},
	locationText: {
		fontSize: 14,
		color: "#C9D1D9",
	},
	location: {
		fontSize: 14,
		color: "#2e8bdc",
	},
	headertxt: {
		color: "white",
		fontSize: 20,
		fontFamily: "Inter-Bold",
		marginLeft: 10,
		marginTop: 20,
	},
	produitsSection: {
		minWidth: "100%",
		paddingVertical: 5,
		maxHeight: 250,
	},
	panierBtn: {
		bottom: 0,
		width: "80%",
		height: "7%",
		backgroundColor: "#7638FF",
		borderRadius: 15,
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	dropShadow: {
		borderRadius: 50,
		padding: 15,
		backgroundColor: "#161B22",
		borderColor: "#3299F1",
		position: "relative",
		borderWidth: 0.25,
		shadowColor: "#3299F1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.62,
		shadowRadius: 3.84,
		elevation: 14,
	},
	arrowIcon: {
		resizeMode: "contain",
		height: 20,
		width: 20,
		marginLeft: "5%",
		transform: [{ rotate: "180deg" }],
	},
	paniertxt: {
		color: "white",
		fontSize: 20,
		fontFamily: "Inter-Bold",
	},
});
export default (props) => {
	const dispatch = useDispatch();
	const historyIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "history-icon")
	);
	const arrowIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "arrow-back")
	);
	const panier = useSelector((state) =>
		state.commande.commandeEnCours.produits
	);
	let products = useSelector((state) => state.product.products);
	const handleBagClick = () => {
		console.log("click");
		props.navigation.navigate("Panier");
	};
	return (
		<>
			<Box style={styles.container}>
				<View style={styles.header}>
					<View style={styles.locationHeader}>
						<Text style={styles.locationText}>Deliver to </Text>
						<Text style={styles.location}>C74 + P37, mila Algerie </Text>
					</View>
					<TouchableWithoutFeedback onPress={() => props.navigation.navigate('Historique')}>
					<Image
						source={historyIcon}
						style={[styles.headerIcon, { resizeMode: "contain" }]}
						/>
					</TouchableWithoutFeedback>
				</View>
				<Text style={styles.headerText}>Sicha App Logo</Text>
				<ScrollView contentContainerStyle={styles.screenContent}>
					{products.map((el) => (
						<Card key={el._id} product={el} />
					))}
				</ScrollView>
			</Box>
			{panier.length > 0 && (
				<TouchableWithoutFeedback onPressIn={handleBagClick}>
				<View style={styles.panierBtn}>
					<Text style={styles.paniertxt}>Aller au panier</Text>
					<Image source={arrowIcon} style={styles.arrowIcon} />
				</View>
			</TouchableWithoutFeedback>
			)}
		</>
	);
};
