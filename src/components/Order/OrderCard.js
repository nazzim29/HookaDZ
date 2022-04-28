import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { useSelector, useDispatch } from "react-redux";
import { getCommandeDetails, cancelCommande } from "../../actions/commandes";

const styles = StyleSheet.create({
	border: {
		padding: 2,
		borderRadius: 10,
		width: 170,
		marginHorizontal: 5,
    marginVertical: 10,
    minHeight:250
	},
	card: {
		flex: 1,
		backgroundColor: "#0D1117",
		borderRadius: 10,
		// flexShrink: 1,
    overflow: "hidden",
    minHeight: 250,
	},
	orderTitle: {
		fontSize: 20,
		fontFamily: "Inter-Bold",
		color: "rgba(201, 209, 217, 1)",
		textAlign: "center",
		marginTop: 10,
	},
	image: {
		resizeMode: "contain",
		width: 40,
		height: 40,
		alignSelf: "center",
	},
	details: {
		fontFamily: "Inter-Bold",
		color: "rgba(201, 209, 217, 1)",
		fontSize: 14,
		textAlign: "center",
		marginHorizontal: 5,
	},
});

const formatDate = (date) => {
	let a = new Date(date);
	return `${a.getDate()}/${a.getMonth() + 1}/${a.getFullYear()}`;
};

export default function OrderCard({ order, navigation }) {
	const dispatch = useDispatch();
	const infoIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name === "info-icon")
	);
	const openDetails = () => {
		dispatch(getCommandeDetails(order?._id));
		navigation.navigate("Details", { order });
	};
	const cancelCommandeHandler = () => {
		dispatch(cancelCommande(order?._id));
	};
	return (
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
				style={[
					styles.card,
					order?.confirmation ||
						(order?.refuse && { justifyContent: "space-evenly" }),
				]}
			>
				<View style={{ flexGrow:1,overflow:"hidden"}}>
					<TouchableOpacity
						style={{
							marginVertical: 5,
						}}
						onPress={openDetails}
					>
						<Image style={styles.image} source={infoIcon} />
						<Text style={styles.details}>Détails de la commande</Text>
					</TouchableOpacity>
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
						}}
					>
						<Text style={{ fontFamily: "Inter-Bold", color: "white" }}>
							Total:{" "}
						</Text>
						<Text
							style={{ fontFamily: "Inter-Bold", color: "rgb(50, 153, 241)" }}
						>
							{order?.montant} Da
						</Text>
					</View>
					<View
						style={{
							borderTopWidth: 1,
							borderColor: "white",
							width: "90%",
							marginVertical: 10,
							alignSelf: "center",
						}}
					/>
					<Text
						style={{
							color: "white",
							fontFamily: "Inter-Bold",
							textAlign: "center",
						}}
					>
						{formatDate(order?.createdAt)}
					</Text>
				</View>
				<View style={{ height: "35%",marginTop:5,justifyContent:"space-evenly" }}>
					<View
						style={{
              marginHorizontal: 20,
              marginBottom:"5%",
							padding: 5,
							borderRadius: 5,
							backgroundColor:
								order?.refuse === true
									? "red"
									: order?.confirmation === false
									? "white"
									: order?.livraison === true
									? "green"
									: "yellow",
						}}
					>
						<Text
							style={{
								color:
									order?.refuse === true
										? "white"
										: order?.confirmation === false
										? "black"
										: order?.livraison === true
										? "white"
										: "black",
								fontFamily: "Inter-Bold",
								textAlign: "center",
							}}
						>
							{order?.refuse === true
								? "Refusé"
								: order?.confirmation === false
								? "en attente"
								: order?.livraison === true
								? "Livré"
								: "En cours"}
						</Text>
					</View>
					{!order?.confirmation && !order?.refuse && (
						<TouchableWithoutFeedback onPress={cancelCommandeHandler}>
							<View
								style={{
									width: "80%",
									alignSelf: "center",
									marginBottom: "5%",
									marginHorizontal: 20,
									padding: 5,
									borderRadius: 5,
									alignItems: "center",
									backgroundColor: "red",
								}}
							>
								<Text
									style={{
										fontFamily: "Inter-Bold",
										textAlign: "center",
										color: "white",
									}}
								>
									Annuler
								</Text>
							</View>
						</TouchableWithoutFeedback>
					)}
				</View>
			</View>
		</LinearGradient>
	);
}
