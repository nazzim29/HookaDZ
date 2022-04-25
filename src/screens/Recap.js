import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import OrderRow from "../components/Recap/OrderRow";
import Extra from "../components/Recap/Extra";

import SplashScreen from "./SplashScreen";
import { deg } from "react-native-linear-gradient-degree";
import { PostCommande, removeAll } from "../actions/commandes";
import { ScrollView } from "native-base";
const styles = StyleSheet.create({
	header: {
		justifyContent: "flex-start",
		// backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Inter-Bold",
		color: "white",
	},
	headerIcon: {
		margin: 10,
		height: 20.5,
		width: 12.5,
	},
	details: {
		borderColor: "#2e8bdc",
		borderWidth: 0.25,
		maxWidth: "100%",
		height: 80,
		marginBottom: 20,
		borderRadius: 15,
		flexDirection: "column",
		padding: 10,
		justifyContent: "space-between",
		shadowColor: "#3299F1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.62,
		shadowRadius: 3.84,
		elevation: 14,
		backgroundColor: "#161B22",
	},
	detailsHeader: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "white",
	},
	totalPrice: {
		color: "#2e8bdc",
		fontFamily: "Inter-Bold",
		fontSize: 20,
	},
	floating: {
		display: "flex",
		minWidth: "90%",
		minHeight: 50,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 25,
		paddingRight: 25,
		// paddingTop:0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// position: "absolute",
		// bottom: 15,
	},
	details: {
		borderColor: "#2e8bdc",
		borderWidth: 0.25,
		maxWidth: "100%",
		height: 80,
		marginBottom: 20,
		borderRadius: 15,
		flexDirection: "column",
		padding: 10,
		justifyContent: "space-between",
		shadowColor: "#3299F1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.62,
		shadowRadius: 3.84,
		elevation: 14,
		backgroundColor: "#161B22",
	},
	detailsHeader: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "white",
	},
	totalPrice: {
		color: "#2e8bdc",
		fontFamily: "Inter-Bold",
		fontSize: 20,
	},
	border: {
		padding: 2,
		borderRadius: 10,
		flex: 1,
		height: 100,
		marginTop: 10,
	},

	txtbtn: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "white",
	},
});

export default function CommandeDetails({ navigation, route }) {
	const dispatch = useDispatch();
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const commande = useSelector((state) => state.commande.commandeEnCours);
	const commandePressHandler = () => {
		dispatch(PostCommande(navigation.reset));
	};
	const commandeCancelHandler = () => {
		console.log("cancel");
		dispatch(removeAll());
		navigation.navigate("Home");
	};
	const isLoading = useSelector((state) => state.ui.isLoading);
	const products = useSelector((state) => state.product.products);
	const extras = useSelector((state) => state.product.extras);
	const renderRow = (item, index) => {
		if (!!extras.find((el) => el._id == item.prd)) {
			return (
				<Extra
					extra={{
						...extras.find((el) => el._id == item.prd),
						...item,
					}}
					key={index}
					style={{
						maxHeight: 100,
						minHeight: 100,
						marginVertical: 5,
					}}
					editable={false}
				/>
			);
		} else {
			return (
				<OrderRow
					key={index}
					order={{
						...products.find((el) => el._id == item.prd),
						...item,
					}}
					style={{
						maxHeight: 100,
						minHeight: 100,
						marginVertical: 5,
					}}
					editable={false}
					deletable={false}
				/>
			);
		}
	};
	if (isLoading) return <SplashScreen />;
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
				</TouchableOpacity>
				<Text style={styles.headerText}>Recap</Text>
			</View>
			<>
				<View style={{ display: "flex", overflow: "hidden", maxHeight: "80%" }}>
					<View style={{ width: "100%", paddingLeft: 20, marginBottom: 8 }}>
						<Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
							Resumé de la commande :
						</Text>
					</View>
					<ScrollView
						style={{
							width: "100%",
							flexGrow: 1,
							marginBottom: 5,
							overflow: "visible",
							overflow: "hidden",
							maxHeight: "70%",
							// flex:1
						}}
						showsVerticalScrollIndicator={false}
						contentInsetAdjustmentBehavior="scrollableAxes"
						contentContainerStyle={{
							width: "100%",
							justifyContent: "flex-start",
							alignItems: "center",
							flexGrow: 0,

							// borderWidth: 1,
							// borderColor: "#2e8bdc",
						}}
					>
						{[...commande.produits, ...commande.extras].map(renderRow)}
						<Extra
							extra={{
								nom: "Bouteille d'eau",
								prix: "Offert",
								quantite: 1,
							}}
							key={[...commande.produits, ...commande.extras].length}
							style={{
								maxHeight: 100,
								minHeight: 100,
								marginVertical: 5,
							}}
							editable={false}
						/>
						<Extra
							extra={{
								nom: "Tuyeau",
								prix: "Offert",
								quantite: 1,
							}}
							key={[...commande.produits, ...commande.extras].length + 1}
							style={{
								maxHeight: 100,
								minHeight: 100,
								marginVertical: 5,
							}}
							editable={false}
						/>
						<Extra
							extra={{
								nom: "Charbon",
								prix: "Offert",
								quantite: 1,
							}}
							key={[...commande.produits, ...commande.extras].length + 2}
							style={{
								maxHeight: 100,
								minHeight: 100,
								marginVertical: 5,
							}}
							editable={false}
						/>
					</ScrollView>
					<View
						style={{
							width: "90%",
							borderTopWidth: 1,
							borderColor: "gray",
							height: 20,
							alignSelf: "center",
						}}
					></View>
					<View
						style={[
							{
								position: "relative",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
								paddingVertical: 10,
								paddingHorizontal: 30,
							},
							// props.style,
						]}
					>
						<Text style={{ fontSize: 15, color: "white" }}>
							Total des produits :
						</Text>
						<Text style={{ fontSize: 15, color: "white" }}>
							{commande?.montant} DA
						</Text>
					</View>
					<View
						style={[
							{
								position: "relative",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
								paddingVertical: 10,
								paddingHorizontal: 30,
							},
							// props.style,
						]}
					>
						<Text style={{ fontSize: 15, color: "white" }}>
							Frais de livraison :
						</Text>
						<Text style={{ fontSize: 15, color: "white" }}>500 DA</Text>
					</View>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
							paddingVertical: 10,
							paddingHorizontal: 30,
						}}
					>
						<Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
							Total de la commande :{" "}
						</Text>
						<Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
							{commande?.montant ? commande?.montant + 500 : "NAN"} DA
						</Text>
					</View>
				</View>
				<LinearGradient
					colors={["rgba(13, 17, 23,0.8)", "rgba(13, 17, 23,1)"]}
					style={{
						width: "100%",
						justifyContent: "space-evenly",
						position: "absolute",
						bottom: 0,
						alignItems: "center",
						flexDirection: "row-reverse",
						paddingVertical: 15,
						shadowColor: "#5D31BF",
						shadowOffset: { width: 0, height: -5 },
						shadowOpacity: 0.72,
						shadowRadius: 3.84,
						elevation: 14,
					}}
				>
					<View style={styles.floating}>
						<View
							style={{
								display: "flex",
								width: "40%",
							}}
						>
							<TouchableWithoutFeedback onPress={commandeCancelHandler}>
								<LinearGradient
									colors={["#A40606", "#D98324"]}
									{...deg(60)}
									style={{
										padding: 1,
										width: "100%",
										height: 40,
										borderRadius: 10,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text style={styles.txtbtn}>Annuler</Text>
								</LinearGradient>
							</TouchableWithoutFeedback>
						</View>
						<View
							style={{
								display: "flex",
								width: "50%",
							}}
						>
							<TouchableWithoutFeedback onPress={commandePressHandler}>
								<LinearGradient
									colors={["rgba(93, 49, 191, 1)", "rgba(11, 103, 255, 0.84)"]}
									{...deg(60)}
									style={{
										padding: 1,
										width: "100%",
										height: 40,
										borderRadius: 10,
										alignItems: "center",
										justifyContent: "center",
										paddingHorizontal: 10,
									}}
								>
									<Text style={styles.txtbtn}>Commander</Text>
								</LinearGradient>
							</TouchableWithoutFeedback>
						</View>
					</View>
				</LinearGradient>
			</>
		</>
	);
}
