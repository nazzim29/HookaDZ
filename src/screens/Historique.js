import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommandes } from "../actions/commandes";
import OrderCard from "../components/Order/OrderCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
	header: {
		justifyContent: "flex-start",
		backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		padding: 6,
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
});
export default function Historique(props) {
	const commandes = useSelector((state) => state.commande.commandes);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);

	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<View style={{flexDirection:'row',alignItems:'center'}}>
						<Image source={arrowBackIcon} style={styles.headerIcon} />
						<Text style={styles.headerText}>Historique</Text>
					</View>
				</TouchableOpacity>
			</View>
			{commandes.length > 0 ? (
				<ScrollView
					contentContainerStyle={{
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "center",
					}}
				>
					{commandes.map((commande) => (
						<OrderCard
							order={commande}
							key={commande._id}
							navigation={props.navigation}
						/>
					))}
				</ScrollView>
			) : (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Text style={{ fontSize: 18, color: "white" }}>
						Vous n'avez pas de commandes
					</Text>
				</View>
			)}
		</>
	);
}
