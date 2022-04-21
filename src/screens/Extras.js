import {
	StyleSheet,
	FlatList,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { OrderRow } from "../components/Order";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import Extra from "../components/Extra";
import { PostCommande } from "../actions/commandes";
import SplashScreen from "./SplashScreen";
const styles = StyleSheet.create({
	border: {
		padding: 2,
		borderRadius: 10,
		marginBottom: 10,
		maxHeight: 100,
		minHeight: 100,
		marginHorizontal: 22,
		marginVertical: 20,
	},
	header: {
		justifyContent: "flex-start",
		backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",

		paddingHorizontal: 10,
		paddingVertical: 6.5,
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
	container: {
		backgroundColor: "#0D1117",
		width: "100%",
		flex: 1,
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 1,
		width: "100%",
		height: "100%",
	},
	floating: {
		minWidth: "100%",
		minHeight: "10%",
		padding: 15,
		flexDirection: "column",
		backgroundColor: "#0D1117",
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
	txtbtn: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "white",
	},
});
export default function Extras(props) {
	//show list of past order
	const dispatch = useDispatch();
	const handleCommandePress = () => {
		// dispatch(PostCommande(props.navigation.reset));
		props.navigation.navigate("Recap");
	};
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const commandeEnCours = useSelector(
		(state) => state.commande.commandeEnCours
	);
	const extras = useSelector((state) => state.product.extras);
	extras.forEach((element) => {
		let or = commandeEnCours.extras.find((el) => el.prd == element._id);
		element.quantite = or?.quantite || 0;
	});
	const isLoading = useSelector((state) => state.ui.isLoading);
	if (isLoading) return <SplashScreen />;
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity
					style={{ flexDirection: "row", alignItems: "center" }}
					onPress={() => props.navigation.goBack()}
				>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
					<Text style={styles.headerText}>Extras</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1, overflow: "hidden" }}>
				<ScrollView
					style={{ marginBottom: 0, overflow: "visible" }}
				>
					{extras.map((item, index) => (
						<Extra
							key={index}
							style={{
								maxHeight: 100,
								minHeight: 100,
								marginHorizontal: 5,
								marginVertical: 10,
								alignItems: "center",
							}}
							extra={item}
						/>
					))}
					<LinearGradient
						key={extras.length}
						colors={[
							"rgba(11, 103, 255, 1)",
							"rgba(255, 255, 255, 0)",
							"rgba(11, 103, 255, 1)",
						]}
						locations={[0, 0.5, 1]}
						{...deg(3)}
						style={styles.border}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: "#0D1117",
								padding: 10,
								borderRadius: 10,
								justifyContent: "space-evenly",
							}}
						>
							<View
								style={{
									maxWidth: "100%",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Text style={styles.detailsHeader}>Total</Text>
								<Text style={styles.totalPrice}>
									{commandeEnCours.commande.montant + ""}
								</Text>
							</View>
							<View
								style={{
									maxWidth: "100%",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Text style={[styles.detailsHeader, { color: "#7C7C7C" }]}>
									Livraison
								</Text>
								<Text style={[styles.totalPrice, { color: "#7C7C7C" }]}>
									500 Da
								</Text>
							</View>
						</View>
					</LinearGradient>
				</ScrollView>
			</View>
			<View style={styles.floating}>
				<TouchableWithoutFeedback onPress={handleCommandePress}>
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
						}}
					>
						<Text style={styles.txtbtn}>Suivant</Text>
					</LinearGradient>
				</TouchableWithoutFeedback>
			</View>
		</>
	);
}
