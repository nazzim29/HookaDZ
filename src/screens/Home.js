import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
} from "react-native";

import { Box, FlatList, IconButton, ScrollView } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import DropShadow from "react-native-drop-shadow";
const styles = StyleSheet.create({
	header: {
		justifyContent: "space-between",
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
	},
	screenContent: {
		flex: 1,
		minWidth: "100%",
	},
	locationHeader: {
		backgroundColor: "#161B22",
		minWidth: "100%",
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
	bagButton: {
		bottom: 20,
		right: 30,
		position: "absolute",
		height: 40,
		width: 40,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	dropShadow: {
		borderRadius: 50,
		padding: 15,
		backgroundColor: "#161B22",
		borderColor: "#3299F1",
		position:"relative",
		borderWidth: 0.25,
		shadowColor: "#3299F1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.62,
		shadowRadius: 3.84,
		elevation: 14,
	},
	bagIcon: {
		resizeMode: "contain",
		height: 30,
		width: 30,
	},
});
export default (props) => {
	const dispatch = useDispatch();
	const historyIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "history-icon")
	);
	const bagIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "bag-icon")
	);
	let products = useSelector((state) => state.product.products);
	console.log(products);
	const handleBagClick = () => {
		console.log("click");
		props.navigation.navigate("Panier");
	};
	return (
		<>
			<Box style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Shicha App Logo</Text>
					<Image
						source={historyIcon}
						style={[styles.headerIcon, { resizeMode: "contain" }]}
					/>
				</View>
				<ScrollView contentContainerStyle={styles.screenContent}>
					<View
						style={{
							width: "100%",
							height: 200,
							// borderWidth: 2,
							// borderColor: "white",
						}}
					></View>
					<View style={styles.locationHeader}>
						<Text style={styles.locationText}>Deliver to </Text>
						<Text style={styles.location}>C74 + P37, mila Algerie </Text>
					</View>
					<Text style={styles.headertxt}>Nos Produits</Text>
					<FlatList
						style={styles.produitsSection}
						horizontal={true}
						data={products}
						keyExtractor={(item) => item._id}
						renderItem={(item) => <Card product={item} />}
					/>
					<Text style={styles.headertxt}>Nos Extras</Text>
					<FlatList style={styles.produitsSection} horizontal={true}></FlatList>
				</ScrollView>
			</Box>
			<TouchableHighlight style={styles.bagButton} onPressIn={handleBagClick}>
					<DropShadow style={styles.dropShadow}>
						<Image source={bagIcon} style={styles.bagIcon} />
					</DropShadow>
			</TouchableHighlight>
		</>
	);
};
