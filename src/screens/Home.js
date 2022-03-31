import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
} from "react-native";

import { Box, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import SplashScreen from "./SplashScreen";
import { Locate } from "../actions/commandes";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginBottom:15,
		paddingVertical: 2,
		paddingHorizontal: 10,
	},
	headerText: {
		// fontSize: 25,
		// fontWeight: "bold",
		// fontFamily: "Inter-Bold",
		// color: "#7638FF",
		// textAlign: "center",
		width: "100%",
		height: "100%",
		resizeMode: "contain",
		// marginVertical: "10%",
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
		// flex: 1,
		// flexGrow:1,
		width: "100%",
		justifyContent: "space-evenly",
		// overflow: "hidden",
		flexDirection: "row",
		flexWrap: "wrap",
		borderWidth: 1,
		borderColor: "#7638FF",
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
	const panier = useSelector(
		(state) => state.commande.commandeEnCours.produits
	);
	const logo = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "logo-1")
	);
	const currentAddress = useSelector((state) => state.ui.currentAddress);
	let products = useSelector((state) => state.product.products);
	const isLoading = useSelector((state) => state.ui.isLoading);
	const handleBagClick = () => {
		props.navigation.navigate("Panier");
	};
	useEffect(() => {
		dispatch(Locate());
	}, []);
	if (isLoading) return <SplashScreen />;
	console.log(products.length)
	return (
		<>
			<Box style={styles.container}>
				<View style={{ width: "100%", height: 150 }}>
					<Image style={styles.headerText} source={logo} />
				</View>
				<View style={styles.header}>
					<View style={styles.locationHeader}>
						<Text style={styles.locationText}>Livrer a </Text>
						<Text style={styles.location}>{currentAddress || "..."}</Text>
					</View>
					<TouchableWithoutFeedback
						onPress={() => props.navigation.navigate("Historique")}
					>
						<View style={{ padding: 4 }}>
							<Image
								source={historyIcon}
								style={[styles.headerIcon, { resizeMode: "contain" }]}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
				{/* <TouchableWithoutFeedback
					onPress={() => props.navigation.navigate("Event1")}
				>
					<Box
						marginX={"5%"}
						borderRadius={"md"}
						marginBottom={"5%"}
						background={"white"}
						minWidth={"90%"}
						height={20}
						overflow={"hidden"}
						backgroundColor={"#161B22"}
						justifyContent={"center"}
						alignItems={"center"}
						shadowColor={"#5D31BF"}
						shadowOffset={{ width: 15, height: 15 }}
						shadowOpacity={0.72}
						shadowRadius={1.84}
						elevation={14}
					>
						<Text
							style={{
								fontSize: 18,
								fontFamily: "Inter-Regular",
								color: "white",
							}}
						>
							Faites votre commande{" "}
							<Text
								style={{
									fontFamily: "Inter-Bold",
								}}
							>
								SPECIALE!
							</Text>
						</Text>
					</Box>
				</TouchableWithoutFeedback> */}
				<ScrollView
					style={{
						borderWidth: 1,
						borderColor: "#3299F1",
						width: "100%",
						flexGrow: 1,
					}}
					showsVerticalScrollIndicator={false}
					contentInsetAdjustmentBehavior="scrollableAxes"
					contentContainerStyle={styles.screenContent}
				>
					{products.map((el) => (
						<Card key={el._id} product={el} />
					))}
				</ScrollView>
			</Box>
			{panier.length > 0 && (
				<TouchableWithoutFeedback onPressIn={handleBagClick}>
					<View style={styles.panierBtn}>
						<Text style={styles.paniertxt}>Panier</Text>
						<Image source={arrowIcon} style={styles.arrowIcon} />
					</View>
				</TouchableWithoutFeedback>
			)}
		</>
	);
};
