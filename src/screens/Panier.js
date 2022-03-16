import {
	StyleSheet,
	FlatList,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { OrderRow } from "../components/Order";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommandes } from "../actions/commandes";
import { Button } from "native-base";
import DropShadow from "react-native-drop-shadow";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
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
	container: {
		flex: 1,
		backgroundColor: "#0D1117",
		width: "100%",
		height: "100%",
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 1,
		width: "100%",
		height: "100%",
	},
	floating: {
		position: "absolute",
		bottom: 0,
		minWidth: "100%",
		padding: 30,
		flexDirection: "column",
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
export default function Commandes(props) {
	//show list of past order
	console.log("rendring panier")
	const handleCommandePress = () => {};
	const dispatch = useDispatch();
	const commandes = useSelector((state) => state.commande.commandes);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
				</TouchableOpacity>
				<Text style={styles.headerText}>Panier</Text>
			</View>
			<FlatList
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				data={commandes}
				renderItem={({ item }) => <OrderRow order={item} />}
				keyExtractor={(item) => item._id}
			/>
			<View style={styles.floating}>
				<DropShadow style={styles.details}>
					<View
						style={{
							maxWidth: "100%",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text style={styles.detailsHeader}>Total</Text>
						<Text style={styles.totalPrice}>2000 Da</Text>
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
						<Text style={[styles.totalPrice, { color: "#7C7C7C" }]}>free</Text>
					</View>
				</DropShadow>
				<TouchableWithoutFeedback onPress={handleCommandePress}>
					<LinearGradient
						colors={["#5D31BF", "#0B67FFD6", "transparent"]}
						locations={[0.1, 0.9, 0.1]}
						{...deg(1)}
						style={{ padding: 1, width: "100%", height: 50, borderRadius: 15 }}
					>
						<View
							style={{
								width: "100%",
								height: "100%",
								borderRadius: 15,
								backgroundColor: "#0D1117",
								alignItems: "center",
								justifyContent: "center",

							}}
						>
							<Text style={styles.txtbtn}>Commander</Text>
						</View>
					</LinearGradient>
				</TouchableWithoutFeedback>
			</View>
		</>
	);
}
