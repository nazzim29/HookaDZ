import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	Animated,
} from "react-native";

import { Box, ScrollView } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import SplashScreen from "./SplashScreen";
import { Locate } from "../actions/commandes";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import EventCard from "../components/EventCard";
import DropDown from "../components/DropDown";

const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
		backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	headerText: {
		// fontSize: 25,
		// fontWeight: "bold",
		// fontFamily: "Inter-Bold",
		// color: "#7638FF",
		// textAlign: "center",
		width: "100%",
		height: "100%",
		resizeMode: "contain",
		// marginVertical: "10%",
	},
	headerIcon: {
		height: 25,
		width: 25,
	},
	container: {
		flex: 1,
		backgroundColor: "#0D1117",
		alignItems: "flex-start",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		paddingBottom: 30,
	},
	screenContent: {
		width: "100%",
		justifyContent: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
		flexGrow: 0,
		paddingBottom: 10,
	},
	locationHeader: {
		// backgroundColor: "#161B22",
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "center",
	},
	locationText: {
		fontSize: 14,
		color: "#C9D1D9",
	},
	location: {
		fontSize: 14,
		color: "#2e8bdc",
	},
	headertxt: {
		color: "white",
		fontSize: 20,
		fontFamily: "Inter-Bold",
		marginLeft: 10,
		marginTop: 20,
	},
	produitsSection: {
		minWidth: "100%",
		paddingVertical: 5,
		maxHeight: 250,
	},
	panierBtn: {
		width: "75%",
		height: 50,
		backgroundColor: "#7638FF",
		borderRadius: 15,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	dropShadow: {
		borderRadius: 50,
		padding: 15,
		backgroundColor: "#161B22",
		borderColor: "#3299F1",
		borderWidth: 0.25,
		shadowColor: "#3299F1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.72,
		shadowRadius: 3.84,
		elevation: 14,
	},
	arrowIcon: {
		resizeMode: "contain",
		height: 20,
		width: 20,
		marginLeft: "5%",
		transform: [{ rotate: "180deg" }],
	},
	paniertxt: {
		color: "white",
		fontSize: 20,
		fontFamily: "Inter-Bold",
	},
});
export default (props) => {
	const dispatch = useDispatch();
	const shakeAnimationRef = useRef(new Animated.Value(0));
	const [showHeader, setShowHeader] = useState(false);

	const profileIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "profile")
	);
	const arrowIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "arrow-back")
	);
	const panier = useSelector(
		(state) => state.commande.commandeEnCours.produits
	);
	const logo = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "logo-1")
	);
	const bagIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "hookah")
	);
	const currentAddress = useSelector((state) => state.ui.currentAddress);
	let products = useSelector((state) => state.product.products);
	const isLoading = useSelector((state) => state.ui.isLoading);
	const handleBagClick = () => {
		props.navigation.navigate("Panier");
	};
	const startShake = () => {
		//shake animation
		Animated.sequence([
			Animated.timing(shakeAnimationRef.current, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: -1,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: 0.7,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: -0.7,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: 0.5,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: -0.5,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: 0.2,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: -0.2,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeAnimationRef.current, {
				toValue: 0,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start(() => console.log("salut"));
	};
	const [openDropDown, setOpenDropDown] = useState(false);
	useEffect(() => {
		startShake();
	}, [panier]);
	useEffect(() => {
		dispatch(Locate());
	}, []);
	if (isLoading) return <SplashScreen />;
	return (
		<>
			<Box style={styles.container}>
				<View style={styles.header}>
					<View style={styles.locationHeader}>
						<Text style={styles.locationText}>Livrer a </Text>
						<Text style={styles.location}>{currentAddress || "..."}</Text>
					</View>
					<TouchableWithoutFeedback
						onPress={() => {
							setOpenDropDown(!openDropDown);
							//   props.navigation.navigate("Historique");
						}}
					>
						<View style={{ padding: 4 }}>
							<Image
								source={profileIcon}
								style={[styles.headerIcon, { resizeMode: "contain" }]}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<View style={{ overflow: "hidden", flex: 1 }}>
					<ScrollView
						// stickyHeaderIndices={[0]}
						onScroll={(e) => {
							if (e.nativeEvent.contentOffset.y > 0) {
								setShowHeader(true);
							} else {
								setShowHeader(false);
							}
						}}
						style={{
							width: "100%",
							flexGrow: 1,
							marginBottom: panier.length > 0 ? "30%" : "0%",
							overflow: "visible",
						}}
						showsVerticalScrollIndicator={false}
						contentInsetAdjustmentBehavior="scrollableAxes"
						contentContainerStyle={styles.screenContent}
					>
						<View style={{ width: "100%", height: 150 }}>
							<Image style={styles.headerText} source={logo} />
						</View>
						<View
							style={{
								width: "100%",
								paddingHorizontal: 20,
								justifyContent: "flex-start",
								flexDirection: "row",
								flexWrap: "wrap",
							}}
						>
							{products.map((el) => (
								<Card key={el._id} product={el} />
							))}
						</View>
						{/* {products.length != 0 && <EventCard {...props} />} */}
					</ScrollView>
				</View>
			</Box>
			{(panier.length > 0 || showHeader) && (
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
					{panier.length > 0 ? (
						<>
							<TouchableWithoutFeedback onPressIn={handleBagClick}>
								<Animated.View
									style={[
										styles.dropShadow,
										{
											backgroundColor: "#161B22",
											padding: 15,
											borderRadius: 100,
											position: "relative",
											transform: [
												{
													rotate: shakeAnimationRef.current.interpolate({
														inputRange: [-1, 1],
														outputRange: ["-0.3rad", "0.3rad"],
													}),
												},
											],
										},
									]}
								>
									<Image source={bagIcon} style={{ width: 30, height: 30 }} />
									<View
										style={{
											height: 25,
											width: 25,
											backgroundColor: "red",
											borderRadius: 500,
											alignItems: "center",
											justifyContent: "center",
											position: "absolute",
											top: -5,
											right: -5,
										}}
									>
										<Text
											style={{
												fontSize: 16,
												fontFamily: "Inter-Bold",
												color: "white",
											}}
										>
											{panier.length < 10 ? panier.length : "9+"}
										</Text>
									</View>
								</Animated.View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPressIn={handleBagClick}>
								<LinearGradient
									style={styles.panierBtn}
									colors={["#5D31BF", "#0B67FFD6"]}
									{...deg(90)}
								>
									<Text style={styles.paniertxt}>Aller au panier</Text>
									<Image source={arrowIcon} style={styles.arrowIcon} />
								</LinearGradient>
							</TouchableWithoutFeedback>
						</>
					) : (
						<>
							<TouchableWithoutFeedback
								onPressIn={() => props.navigation.navigate("Event1")}
							>
								<LinearGradient
									style={{
										width: "35%",
										height: 40,
										backgroundColor: "#7638FF",
										borderRadius: 15,
										alignItems: "center",
										flexDirection: "row",
										justifyContent: "center",
									}}
									colors={["#5D31BF", "#0B67FFD6"]}
									{...deg(90)}
								>
									<Text
										style={{
											color: "white",
											fontSize: 16,
											fontFamily: "Inter-Bold",
										}}
									>
										Commandez
									</Text>
									{/* <Image source={arrowIcon} style={styles.arrowIcon} /> */}
								</LinearGradient>
							</TouchableWithoutFeedback>
							<Text
								style={{
									fontFamily: "Inter-Bold",
									width: "50%",
									fontSize: 14,
									color: "white",
									textAlign: "center",
								}}
							>
								On vous livre aussi pour vos événements
							</Text>
						</>
					)}
				</LinearGradient>
			)}
			<DropDown open={openDropDown} close={() => setOpenDropDown(false)} />
		</>
	);
};
