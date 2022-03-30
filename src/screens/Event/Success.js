import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";

const styles = StyleSheet.create({
	step: {
		maxWidth: "80%",
		marginVertical: "20%",
		marginHorizontal: "10%",
		resizeMode: "contain",
		alignItems: "center",
	},
	screen: {
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontWeight: "700",
		fontSize: 20,
		marginLeft: "10%",
		marginBottom: "10%",
		width: "90%",
		// borderWidth: 1,
		// borderColor: '#C9D1D9',
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
	},
	btn: {
		width: "80%",
		height: 50,
		marginTop: "5%",
		borderRadius: 15,
		marginHorizontal: "10%",
		alignItems: "center",
		justifyContent: "center",
		padding: 1,
	},
	txtbtn: {
		fontFamily: "Inter-Bold",
		fontSize: 16,
		color: "#C9D1D9",
	},
	header: {
		justifyContent: "flex-start",
		// backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	headerIcon: {
		margin: 10,
		height: 20.5,
		width: 12.5,
	},
	checkIcon: {
		resizeMode: "contain",
		height: 100,
		width: 100,
		marginBottom: "10%",
	},
});

export default function Forgot2(props) {
	const slider = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "step-4-slider")
	);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const checkIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "check-icon")
	);
	const resend = () => {};
	const suivantHandler = () => {
		props.navigation.navigate("Login");
	};
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
				</TouchableOpacity>
			</View>
			<KeyboardAwareScrollView style={{ flex: 1 }}>
				<View style={styles.screen}>
					<Image style={styles.step} source={slider} />
					<Text style={[styles.title,{textAlign:'center'}]}>Votre demande a ete soumise a nos administrateurs il vous contacterons sous peu</Text>
					<Image style={styles.checkIcon} source={checkIcon} />
					<TouchableWithoutFeedback onPressOut={suivantHandler}>
						<LinearGradient
							colors={["#5D31BF", "#0B67FFD6"]}
							{...deg(90)}
							style={styles.btn}
						>
							<Text style={styles.txtbtn}>Terminé</Text>
						</LinearGradient>
					</TouchableWithoutFeedback>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}
