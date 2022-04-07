import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import React, {  } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import OrderRow from "../components/Order/OrderRow";
import Extra from "../components/Extra";
import SplashScreen from "./SplashScreen";
import { deg } from "react-native-linear-gradient-degree";
import {  PostCommande } from "../actions/commandes";
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
		minWidth: "100%",
		minHeight: 50,
		padding: 15,
		// paddingTop:0,
		flexDirection: "column",
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
    const isLoading = useSelector((state) => state.ui.isLoading);
	const products = useSelector((state) => state.product.products);
	const extras = useSelector((state) => state.product.extras);
    const renderRow = (item, index) => {
		if (!!extras.find(el=>el._id == item.prd)) {
			
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
                        marginVertical: 5
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
                        marginVertical: 5
					}}
					editable={false}
					deletable={false}
				/>
			);
		}
    };
    if(isLoading) return <SplashScreen />
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
				</TouchableOpacity>
				<Text style={styles.headerText}>Recap</Text>
			</View>
			<>
				<View style={{ flex: 1, overflow: "hidden" }}>
					<ScrollView
						style={{
							width: "100%",
							flexGrow: 1,
							marginBottom: 30,
                            overflow: "visible",
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
                        <LinearGradient
                            key={commande.produits.length + commande.extras.length}
							colors={[
								"rgba(11, 103, 255, 1)",
								"rgba(255, 255, 255, 0)",
								"rgba(11, 103, 255, 1)",
							]}
							locations={[0.1, 0.5, 1]}
							{...deg(10)}
							style={[styles.border,{width:"90%",marginTop:30}]}
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
									<Text style={styles.totalPrice}>{commande.montant} Da</Text>
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
							}}
						>
							<Text style={styles.txtbtn}>Commander</Text>
						</LinearGradient>
					</TouchableWithoutFeedback>
				</View>
			</>
		</>
	);
}
