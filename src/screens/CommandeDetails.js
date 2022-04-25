import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "native-base";
import OrderRow from "../components/Order/OrderRow";
import Extra from "../components/Extra";
import SplashScreen from "./SplashScreen";
import { deg } from "react-native-linear-gradient-degree";
import { cancelCommande } from "../actions/commandes";
const styles = StyleSheet.create({
	header: {
		justifyContent: "flex-start",
		backgroundColor: "#161B22",
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
	  width: "100%",
		height: "20%",
		padding: 15,
		flexDirection: "column",
		// paddingTop:0,
		// flexDirection: "column",
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
		height: "100%",
		marginBottom: 10,
	},
	txtbtn: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "white",
	},
});

export default function CommandeDetails({ navigation, route }) {
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const dispatch = useDispatch();
	const commande = useSelector((state) => state.commande.commande);
	const cancelCommandeHandler = () => {
		dispatch(cancelCommande(route.params.order._id, navigation));
	};
	const products = useSelector((state) => state.product.products);
	const extras = useSelector((state) => state.product.extras);
	const renderRow = ({ item }) => {
		if (item.type == "extra") {
			return (
				<>
					
				</>
			);
		} else {
			return (
				<>
					
				</>
			);
		}
	};
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
				</TouchableOpacity>
				<Text style={styles.headerText}>Details</Text>
			</View>
			{commande == null ? (
				<SplashScreen />
			) : (
				<>
					<View style={{ flex: 1, overflow: "hidden" }}>
						<ScrollView
							style={{
								width: "100%",
								flexGrow: 1,
								overflow: "visible",
								// marginBottom:70,
							}}
							showsVerticalScrollIndicator={false}
							contentInsetAdjustmentBehavior="scrollableAxes"
							contentContainerStyle={{
								width: "100%",
								justifyContent: "flex-start",
								flexDirection: "column",
								// flexWrap: "wrap",
								flexGrow: 0,
							}}
						>
							{commande.map((item, index) => {
								if (item.type == "extra") {
									return (
										<Extra
											extra={{
												...extras.find((el) => el._id == item.prd),
												...item,
											}}
											style={{
												width: "90%",
												marginVertical: 5,
												marginHorizontal: "5%",
												// marginHorizontal: "2%",
											}}
											editable={false}
											key={index}
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
												width: "100%",
												marginVertical: 5,
												alignItems: "center",
											}}
											editable={false}
											deletable={false}
										/>
									);
								}
							})}
							<OrderRow
								key={commande.length}
								style={{
									maxHeight: 100,
									minHeight: 100,
									marginHorizontal: 5,
									marginVertical: 10,
									alignItems: "center",
								}}
								order={{
									image_url: "bouteille-eau.jpg",
									nom: "Bouteille d'eau",
									prix: "Offert",
									quantite: 1,
								}}
								editable={false}
								deletable={false}
							/>
							<OrderRow
								key={commande.length + 1}
								style={{
									maxHeight: 100,
									minHeight: 100,
									marginHorizontal: 5,
									marginVertical: 10,
									alignItems: "center",
								}}
								order={{
									image_url: "charbon.jpg",
									nom: "Charbon",
									prix: "Offert",
									quantite: 1,
								}}
								editable={false}
								deletable={false}
							/>
							<OrderRow
								editable={false}
								deletable={false}
								key={commande.length + 2}
								style={{
									maxHeight: 100,
									minHeight: 100,
									marginHorizontal: 5,
									marginVertical: 10,
									alignItems: "center",
								}}
								order={{
									image_url: "tuyau.png",
									nom: "Tuyau",
									prix: "Offert",
									quantite: 1,
								}}
							/>
						</ScrollView>
						{/* <FlatList
							data={commande ? commande : null}
							style={{ marginBottom: 190, overflow: "visible", width: "100%" }}
							contentContainerStyle={{
                alignItems: "center",
								flex: 1,
								paddingBottom: 190,
							}}
							renderItem={renderRow}
							keyExtractor={(item, index) => index}
						/> */}
					</View>
					<View style={styles.floating}>
						<LinearGradient
							colors={[
								"rgba(11, 103, 255, 1)",
								"rgba(255, 255, 255, 0)",
								"rgba(11, 103, 255, 1)",
							]}
							locations={[0.1, 0.5, 1]}
							{...deg(10)}
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
										{route.params.order.montant} Da
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
						{!route.params.order?.confirmation && !route.params.order?.refuse && (
							<TouchableWithoutFeedback onPress={cancelCommandeHandler}>
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
									<Text style={styles.txtbtn}>Annuler</Text>
								</LinearGradient>
							</TouchableWithoutFeedback>
						)}
					</View>
				</>
			)}
		</>
	);
}
