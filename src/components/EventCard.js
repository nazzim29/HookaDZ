import {
	Text,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
	View,
	ImageBackground,
} from "react-native";
import { Box } from "native-base";
import React from "react";
import { Card } from "react-native-card-stack-swiper";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { addProduit } from "../actions/commandes";
const styles = StyleSheet.create({
	border: {
		padding: 3,
		borderRadius: 10,
		flex: 1,
		height: "100%",
	},
	card: {
		minWidth: "98%",
		minHeight: 100,
		maxHeight: 200,
		flex: 1,
		padding: 5,
		marginHorizontal: 5,
		backgroundColor: "#0D1117",
		flexDirection: "column",
		borderRadius: 10,
		justifyContent: "center",
	},
	imageContainer: {
		width: "100%",
		height: "75%",
		overflow: "hidden",
	},
	image: {
		resizeMode: "contain",
		flex: 1,
		width: "70%",
	},
	details: {
		marginTop: 5,
		height: "25%",
		width: "100%",
		flexDirection: "column",
		color: "#C9D1D9",
	},
	addBtn: {
		width: 30,
		height: 30,
	},
	addBtnContainer: {
		width: 30,
		borderRadius: 999,
		position: "absolute",
		bottom: -10,
		right: -10,
	},
	productTitle: {
		fontSize: 18,
		marginLeft: 5,
		fontFamily: "Inter-Regular",
		color: "#C9D1D9",
		// marginBottom: 5,
	},
	price: {
		fontSize: 18,
		marginLeft: 5,
		fontFamily: "Inter-Bold",
		color: "#3299F1",
	},
});

export default (props) => {
	const appleIcon = useSelector((state) => {
		return state.ui.assets.find((el) => el.name == "event-bg");
	});
	const logo = useSelector((state) => {
		return state.ui.assets.find((el) => el.name == "logo-1");
	});

	const addToCart = () => {
		dispatch(addProduit(product));
	};
	return (
		<Card style={styles.card}>
			<TouchableWithoutFeedback
				onPress={() => props.navigation.navigate("Event1")}
			>
				<View style={styles.imageContainer}>
					{/* <LinearGradient
						colors={[
							"rgba(11, 103, 255, 1)",
							"rgba(255, 255, 255, 0)",
							"rgba(11, 103, 255, 1)",
						]}
						locations={[0, 0.5, 1]}
						{...deg(45)}
						style={styles.border}
					> */}
						<ImageBackground
							style={{
								backgroundColor: "black",
								flex: 1,
								borderRadius: 10,
								overflow: "hidden",
								alignItems: "center",
								position: "relative",
							}}
							resizeMethod={"auto"}
							imageStyle={{
								resizeMode: "cover",
								marginLeft: 200,
							}}
							source={appleIcon}
						>
							<Image
								style={{
									width: 70,
									height: 70,
									resizeMode: "contain",
									position: "absolute",
									top: 0,
									left: 70,
								}}
								source={logo}
							/>
							<Text style={{
								fontSize: 12,
								fontFamily: "Inter-Bold",
								color: "#C9D1D9",
								width: 200,
								position: "absolute",
								bottom: 25,
								left:20
							}}>Faites une commande speciale pour vos evenements</Text>
						</ImageBackground>
					{/* </LinearGradient> */}
				</View>
			</TouchableWithoutFeedback>
		</Card>
	);
};
