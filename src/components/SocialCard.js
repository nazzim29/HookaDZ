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
		marginBottom: 30,
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
	arrowIcon: {
		resizeMode: "contain",
		height: 10,
		width: 10,
		marginLeft: "5%",
		marginTop: 2,
		transform: [{ rotate: "180deg" }],
	},
});

export default (props) => {
	const appleIcon = useSelector((state) => {
		return state.ui.assets.find((el) => el.name == "sociale-bg");
	});
	const logo = useSelector((state) => {
		return state.ui.assets.find((el) => el.name == "logo-1");
	});
	const fb = useSelector((state) => {
		return state.ui.assets.find((el) => el.name == "facebook");
	});
	const ig = useSelector((state) => {
		return state.ui.assets.find((el) => el.name == "instagram");
	});
	const arrowIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "arrow-back")
	);
	const addToCart = () => {
		dispatch(addProduit(product));
	};
	return (
		<Card style={styles.card}>
			<TouchableWithoutFeedback
				onPress={() => {
					props.navigation.navigate("Event1");
				}}
			>
				<View style={styles.imageContainer}>
					<ImageBackground
						style={{
							backgroundColor: "#0D1117",
							flex: 1,
							borderRadius: 10,
							overflow: "hidden",
							alignItems: "center",
							position: "relative",
						}}
						resizeMethod={"auto"}
						imageStyle={{
							resizeMode: "cover",
						}}
						source={appleIcon}
					>
						<Text
							style={{
								top: 45,
								left: 20,
								position: "absolute",
								fontSize: 12,
								fontFamily: "Inter-Bold",
								color: "#fff",
								textAlign: "center",
								color: "#fff",
							}}
						>
							N'hesitez pas nous joindre
						</Text>
						<TouchableWithoutFeedback>
							<Text
                                style={{
                                    paddingVertical:5,
									top: 60,
									left: 40,
									position: "absolute",
									fontSize: 12,
									fontFamily: "Inter-Bold",
									color: "#fff",
									textAlign: "center",
									color: "#fff",
								}}
							>
								+213 698 15 13 48
							</Text>
						</TouchableWithoutFeedback>
						<View
							style={[
								styles.dropShadow,
								{
									position: "absolute",
									padding: 7,
									// backgroundColor:'black',
									width: "40%",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									height: "100%",
									right: 0,
									zIndex: 9999,
									boxShadow:
										"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
								},
							]}
						>
							<Text
								style={{
									fontSize: 12,
									fontFamily: "Inter-Bold",
									color: "#fff",
									textAlign: "center",
								}}
							>
								Suivez nous sur les reseaux
							</Text>
							<View
								style={{
									width: "80%",
									marginTop: 10,
									flexDirection: "row",
									paddingVertical: 10,
									justifyContent: "space-evenly",
									height: 50,
								}}
							>
								<TouchableWithoutFeedback>
									<Image
										source={fb}
										style={{ width: 30, height: 30, resizeMode: "contain" }}
									/>
								</TouchableWithoutFeedback>
								<TouchableWithoutFeedback>
									<Image
										source={ig}
										style={{ width: 30, height: 30, resizeMode: "contain" }}
									/>
								</TouchableWithoutFeedback>
							</View>
						</View>
					</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
		</Card>
	);
};
