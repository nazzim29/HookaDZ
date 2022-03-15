import {
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
} from "react-native";
import { Box } from "native-base";
import React from "react";
import { Card } from "react-native-card-stack-swiper";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "react-native-svg";
const styles = StyleSheet.create({
	card: {
		overflow: "hidden",
		flexDirection: "column",
		borderRadius: 10,
		backgroundColor: "#161B22",
		height: "100%",
		maxWidth: 100,
		marginHorizontal: 10,
		justifyContent: "space-between",
	},
	image: {
		minWidth: "100%",
		minHeight: "60%",
		resizeMode: "contain",
	},
	details: {
		backgroundColor: "#161B22",
		maxHeight: "40%",
		flexDirection: "column",
		color: "#C9D1D9",
		paddingBottom: 10,
	},
	addBtn: {
		position: "relative",
		bottom: 15,
		marginLeft: "auto",
		marginRight: 5,
		backgroundColor: "#2e8bdc",
		width: 30,
		height: 30,
		borderRadius: 999,
	},
	productTitle: {
		fontSize: 18,
		marginLeft: 5,
		marginTop: 5,
		fontFamily: "Inter-Regular",
		color: "#C9D1D9",
		marginBottom: 5,
	},
	price: {
		fontSize: 18,
		marginLeft: 5,
		marginTop: 10,
		fontFamily: "Inter-Bold",
		color: "#3299F1",
	},
});

export default (props) => {
	const { index, product } = props;
	const dispatch = useDispatch();
	const appleIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "apple")
	);
	const plusIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "plus-icon")
	);
	console.log(product.item.nom);
	return (
			<Card style={styles.card}>
				<Box minWidth={"100%"} minHeight={"60%"}>
					<Image
						source={appleIcon}
						style={styles.image}
						alt={"product image"}
					/>
					<TouchableOpacity>
						<Image
							source={plusIcon}
							style={styles.addBtn}
							alt={"add product to cart"}
						/>
					</TouchableOpacity>
				</Box>
				<Box style={styles.details}>
					<Text style={styles.productTitle}>{product.item.nom}</Text>
					<Text style={styles.price}>{product.item.prix || "NaN"} Da</Text>
				</Box>
			</Card>
	);
};
