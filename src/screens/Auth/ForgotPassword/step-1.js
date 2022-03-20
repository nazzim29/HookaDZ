import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	TouchableOpacity
} from "react-native";
import React, { useRef,useState } from "react";
import Input from "../../../components/Input";
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
	title: {
		fontWeight: "700",
		fontSize: 22,
		marginLeft: "10%",
		marginTop: "10%",
		width: "80%",
		// borderWidth: 1,
		// borderColor: '#C9D1D9',
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
	},
	texte: {
		fontSize: 16,
		marginLeft: "10%",
		marginTop: "1%",
		width: "80%",
		// borderWidth: 1,
		// borderColor: '#C9D1D9',
		fontFamily: "Inter-Regular",
		color: "#C9D1D9",
	},
	link: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "#3299F1",
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
});
export default function ForgotPassword(props) {
	const [email, setEmail] = useState("");
	const slider = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "step-1-slider")
	);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const suivantHandler = () => {
		props.navigation.navigate("Forgot-2",{email});
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
					<Text style={styles.title}>Entrez votre adresse email</Text>
					<Text style={styles.texte}>
						Entrez votre email pour récupérer le mot de passe
					</Text>
					<Input
						icon={"email-1"}
						style={{ marginVertical: "5%", marginHorizontal: "10%" }}
					>
						<TextInput
							placeholder="Adresse email"
							textContentType="emailAddress"
							editable
							keyboardType="email-address"
							autoComplete="email"
							onChangeText={(e) => setEmail(e)}
							onSubmitEditing={() => {
								suivantHandler();
							}}
							blurOnSubmit={false}
							style={{
								flex: 1,
								fontFamily: "Inter-Regular",
								fontSize: 16,
								color: "#C9D1D9",
							}}
							placeholderTextColor={"#858585"}
						/>
					</Input>
					<TouchableWithoutFeedback onPressOut={suivantHandler}>
						<LinearGradient
							colors={["#5D31BF", "#0B67FFD6"]}
							{...deg(90)}
							style={styles.btn}
						>
							<Text style={styles.txtbtn}>Suivant</Text>
						</LinearGradient>
					</TouchableWithoutFeedback>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}
