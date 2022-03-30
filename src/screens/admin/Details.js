import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Linking,
	TouchableWithoutFeedback,
	Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { useSelector } from "react-redux";
import Extra from "../../components/Extra";
import OrderRow from "../../components/Order/OrderRow";
import SplashScreen from "../SplashScreen"
import openMap from "react-native-open-maps";
export default function Details(props) {
	const arrowIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "arrow-back")
	);
	const mapIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "map-icon")
	);
	const c = useSelector((state) => state.commande.commande);
	console.log(c)
	const isLoading = useSelector((state) => state.ui.isLoading);
	const order = props.route.params;
	
	console.log({order})
	const extras = useSelector((state) => state.product.extras);
	const products = useSelector((state) => state.product.products);
	const openInGoogleMap = () => {
		try {
			Linking.openURL(
				`comgooglemapsurl://www.google.com/maps/?q=@${order.latitude},${order.longitude}&zoom=15&view=traffic`
				);
		} catch (err) {
			console.log("can't open google maps")
		}
		// props.navigation.navigate("Map", order);
	};
	if (isLoading) {
		return <SplashScreen />;
	}
	return (
		<>
			<View style={styles.nav}>
				<View style={styles.row}>
					<TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
						<View style={{paddingHorizontal:4}}>
							<Image style={styles.arrow} source={arrowIcon} />
						</View>
					</TouchableWithoutFeedback>
					<Text style={styles.txt}>Les détails</Text>
				</View>
				<TouchableWithoutFeedback onPress={openInGoogleMap}>
					<View style={[{ padding: 4 }]}>
						<Image style={styles.map} source={mapIcon} />
					</View>
				</TouchableWithoutFeedback>
			</View>
			<ScrollView style={styles.container}>
				{c &&
					c
						.filter((el) => el.type == "produit")
						.map((el, i) => (
							<OrderRow
								key={i}
								order={{ ...products.find((p) => p._id == el.prd), ...el }}
								editable={false}
								deletable={false}
								style={{ marginHorizontal: 10 }}
							/>
						))}
				{c &&
					c
						.filter((el) => el.type == "extra")
						.map((el, i) => (
							<Extra
								key={i}
								extra={{ ...extras.find((ex) => ex._id == el.prd), ...el }}
								editable={false}
								deletable={false}
								style={{ marginHorizontal: 10 }}
							/>
						))}
			</ScrollView>
			<View style={styles.floating}>
				<LinearGradient
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
								{order.montant + ""}
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
								free
							</Text>
						</View>
					</View>
				</LinearGradient>
				
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	nav: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// backgroundColor: "#161B22",
		padding: 15,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	arrow: {
		resizeMode: "contain",
		height: 25,
		marginRight: 5,
	},
	txt: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Inter-Bold",
		color: "white",
	},
	map: {
		resizeMode: "contain",
		width: 30,
		height: 30,
	},
	border: {
		padding: 2,
		borderRadius: 10,
		flex: 1,
		height: "80%",
		marginBottom: 10,
	},
	floating: {
		minWidth: "100%",
		minHeight: "25%",
		padding: 15,
		flexDirection: "column",
	},
	details: {
		borderColor: "#2e8bdc",
		borderWidth: 0.25,
		maxWidth: "100%",
		height: 70,
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
});
