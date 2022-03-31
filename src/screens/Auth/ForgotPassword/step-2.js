import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, {  useState } from "react";
import Input from "../../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector,useDispatch} from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { sendResetRequest } from "../../../actions/auth";

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
		fontFamily: "Inter-Regular",
		fontSize: 16,
        color: "#3299F1",
        marginLeft: "10%",
        marginVertical:"5%"
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

export default function Forgot2(props) {
	const [ code, setCode ] = useState()
	const { email } = props.route.params
	const dispatch = useDispatch()
	const slider = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "step-2-slider")
	);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
    );
	const resend = () => {
		dispatch(sendResetRequest(email))
	}
	const suivantHandler = () => {
        props.navigation.navigate("Forgot-3",{email,code});
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
					<Text style={styles.title}>Code</Text>
					<Text style={styles.texte}>
						Nous avons envoyé un code à 6 chiffres a l'adresse{" "}
						{email}
					</Text>
					<Input
						icon={"key-icon"}
						style={{ marginTop: "5%", marginHorizontal: "10%" }}
					>
						<TextInput
							placeholder="Code"
							editable
							keyboardType="number-pad"
							autoComplete="sms-otp"
							
							onChangeText={(e) => setCode(parseInt(e))}
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
                    <TouchableOpacity onPressOut={resend}>
                        <Text style={styles.link}>Renvoyer le code</Text>
                    </TouchableOpacity>
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
