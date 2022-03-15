import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	Image,
	Animated,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { deg } from "react-native-linear-gradient-degree";
import React, { useRef, useState, useEffect, forwardRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector, useStore } from "react-redux";
import { login } from "../actions/auth";
import { useToast } from "native-base";
import Input from "../components/Input";
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		minHeight: "100%",
		paddingTop: "20%",
		alignItems: "center",
		minWidth: "100%",
		color: "#C9D1D9",
	},
	title: {
		fontWeight: "700",
		fontSize: 50,
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
	},
	subTitle: {
		fontFamily: "Inter-Regular",
		fontSize: 18,
		color: "#C9D1D9",
	},
	link: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "#3299F1",
	},
	personIcon: {
		width: 100,
		height: 100,
		margin: "20%",
		resizeMode: "contain",
	},
	forgotPassword: {
		marginTop: "1%",
		width: "80%",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		color: "#3299F1",
		textAlign: "right",
	},
	btnContainer: {
		height: "100%",
		width: "100%",
		backgroundColor: "#0D1117",
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		width: "80%",
		height: 50,
		marginTop: "5%",
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		padding: 1,
	},
	txtbtn: {
		fontFamily: "Inter-Bold",
		fontSize: 16,
		color: "#C9D1D9",
	},
});

export default (props) => {
	const personIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "person-icon")
	);
	const passwordRef = useRef();
	const toast = useToast();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error.message);
	useEffect(() => {
		if (error) {
			toast.show({
				description: error,
				duration: 2000,
				placement: "bottom",
				onCloseComplete: () => {
					dispatch({ type: "CLEAR_ERROR" });
				},
			});
		}
	}, [error]);
	const loginHandler = () => {
		dispatch(login({email, password}));
	};
	return (
		<KeyboardAwareScrollView style={{ flex: 1 }}>
			<View style={styles.screen}>
				<Text style={styles.title}>S'identifier</Text>
				<View
					style={{
						width: "100%",
						justifyContent: "center",
						flexDirection: "row",
					}}
				>
					<Text
						style={[styles.subTitle, { alignSelf: "center", marginLeft: 0 }]}
					>
						Nouveau ici?
					</Text>
					<TouchableWithoutFeedback
						onPress={() => props.navigation.navigate("Signup")}
					>
						<Text style={styles.link}> S'inscrire</Text>
					</TouchableWithoutFeedback>
				</View>
				<Image source={personIcon} style={styles.personIcon} />
				<Input icon={"email-1"} style={{ marginBottom: "5%" }}>
					<TextInput
						placeholder="Adresse email"
						textContentType="emailAddress"
						editable
						keyboardType="email-address"
						autoComplete="email"
						onChangeText={(e) => setEmail(e)}
						onSubmitEditing={() => {
							passwordRef.current.focus();
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
				<Input icon={"password-icon"}>
					<TextInput
						placeholder="Mot de passe"
						textContentType="password"
						secureTextEntry={true}
						autoComplete="password"
						editable
						ref={passwordRef}
						onChangeText={(e) => setPassword(e)}
						onSubmitEditing={loginHandler}
						style={{
							flex: 1,
							fontFamily: "Inter-Regular",
							fontSize: 16,
							color: "#C9D1D9",
						}}
						placeholderTextColor={"#858585"}
					/>
				</Input>
				<Text style={styles.forgotPassword}>mots de passe oublié ?</Text>

				<TouchableWithoutFeedback onPress={loginHandler}>
					<LinearGradient
						colors={["#5D31BF", "#0B67FFD6", "transparent"]}
						locations={[0.1, 0.8, 0.1]}
						{...deg(1)}
						style={styles.btn}
					>
						<View style={styles.btnContainer}>
							<Text style={styles.txtbtn}>Se Connecter</Text>
						</View>
					</LinearGradient>
				</TouchableWithoutFeedback>
				<View
					style={{
						width: "80%",
						marginTop: "5%",
						justifyContent: "center",
						flexDirection: "row",
					}}
				>
					<Text
						style={[styles.subTitle,{fontSize:11,alignSelf:"center",marginLeft:0}]}
					>
						En continuant, vous acceptez nos
					</Text>
					<TouchableWithoutFeedback
						onPress={() => props.navigation.navigate("ConditionUtilisation")}
					>
						<Text style={[styles.link,{fontSize:11}]}> condition d'utilisation</Text>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};
