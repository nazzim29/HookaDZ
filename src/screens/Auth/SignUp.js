import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../components/Input";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../../actions/auth";
import SplashScreen from "../SplashScreen";
import { addError } from "../../actions/error";
const styles = StyleSheet.create({
	title: {
		width: `100%`,
		height: `110%`,
		resizeMode: "contain",
		// borderWidth: 1,
		// borderColor: "#C9D1D9",
	},
	subtitle: {
		fontSize: 20,
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
		textAlign: "center",
		marginHorizontal: "10%",
	},
	text: {
		fontSize: 20,
		fontFamily: "Inter-Regular",
		color: "#C9D1D9",
		textAlign: "center",
	},
	form: {
		backgroundColor: "#0D1117",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
	},
	input: {
		flex: 1,
		fontFamily: "Inter-Regular",
		fontSize: 16,
		color: "#C9D1D9",
	},
	button: {
		padding: 1,
		width: "80%",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	txtbtn: {
		color: "white",
		fontSize: 20,
		fontFamily: "Inter-Bold",
		margin: 10,
	},
	conditions: {
		color: "#9A9A9A",
		fontSize: 10,
		fontFamily: "Inter-Regular",
	},
	link: {
		color: "#3299f1",
		textDecorationLine: "underline",
		backgroundColor: "transparent",
	},
});

export default (props) => {
	const emailRef = React.useRef();
	const nameRef = React.useRef();
	const passwordRef = React.useRef();
	const phoneRef = React.useRef();
	const [email, setEmail] = React.useState("");
	const [name, setName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const isLoading = useSelector((state) => state.ui.isLoading);
	const dispatch = useDispatch();
	const logo = useSelector((state) => {
		return state.ui.assets.find((el) => el.name == "logo-2");
	});
	const signupHandler = () => {
		const user = {
			nom: name,
			email: email,
			password: password,
			// confirmPassword: confirmPassword,
			numero: phone,
		};
		if (
			user.nom == "" ||
			user.email == "" ||
			user.password == "" ||
			user.numero == ""
		) {
			return dispatch(addError("Veuillez remplir tous les champs"));
		}
		// if (user.password.length < 8) {
		// 	return dispatch(addError("Votre mot de passe doit contenir au moins 6 caractères"));
		// }
		if (user.email.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == -1) {
			return dispatch(addError("Veuillez entrer un email valide"));
		}
		if (user.numero.search(/^(\+\d{3})( )?\d{9}$|^0( )?(\d( )?){9}$/g) == -1) {
			return dispatch(
				addError("Veuillez entrer un numéro de téléphone valide")
			);
		}

		dispatch(signup(user));
	};
	if (isLoading) return <SplashScreen />;
	return (
		<>
			<KeyboardAwareScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ flex: 1, justifyContent: "flex-start" }}
			>
				<View style={{ width: "100%", height: "20%" }}>
					<Image style={styles.title} source={logo} />
				</View>
				<View
					style={{
						justifyContent: "center",
						alignitems: "center",
						height: "75%",
					}}
				>
					<View style={{ marginTop: 10 }}>
						<Text style={styles.text}>Vous vous inscrivez.</Text>
						<Text style={styles.text}>Nous livrons - rapidement.</Text>
					</View>
					<View style={styles.form}>
						<Input icon={"person-icon"} style={{ marginBottom: "5%" }}>
							<TextInput
								placeholder="Nom complet"
								textContentType="name"
								editable
								keyboardType="default"
								autoComplete="name"
								style={styles.input}
								ref={nameRef}
								onSubmitEditing={() => {
									emailRef.current.focus();
								}}
								onChangeText={(text) => setName(text)}
								blurOnSubmit={false}
								placeholderTextColor={"#858585"}
							/>
						</Input>
						<Input icon={"email-1"} style={{ marginBottom: "5%" }}>
							<TextInput
								placeholder="Adresse email"
								textContentType="emailAddress"
								editable
								keyboardType="email-address"
								autoComplete="email"
								style={styles.input}
								ref={emailRef}
								onSubmitEditing={() => {
									phoneRef.current.focus();
								}}
								onChangeText={(text) => setEmail(text)}
								blurOnSubmit={false}
								placeholderTextColor={"#858585"}
							/>
						</Input>
						<Input icon={"phone-icon"} style={{ marginBottom: "5%" }}>
							<TextInput
								placeholder="Numero de telephone"
								textContentType="telephoneNumber"
								editable
								keyboardType="number-pad"
								autoComplete="phoneNumber"
								style={styles.input}
								ref={phoneRef}
								onSubmitEditing={() => {
									passwordRef.current.focus();
								}}
								onChangeText={(text) => setPhone(text)}
								blurOnSubmit={false}
								placeholderTextColor={"#858585"}
							/>
						</Input>
						<Input icon={"password-icon"} style={{ marginBottom: "5%" }}>
							<TextInput
								placeholder="Mot de passe"
								textContentType="password"
								secureTextEntry={true}
								autoComplete="password"
								placeholderTextColor={"#858585"}
								editable
								ref={passwordRef}
								onChangeText={(text) => setPassword(text)}
								style={styles.input}
								onSubmitEditing={() => signupHandler()}
							/>
						</Input>

						<TouchableWithoutFeedback onPress={signupHandler}>
							<LinearGradient
								colors={["#5D31BF", "#0B67FFD6"]}
								{...deg(90)}
								style={styles.button}
							>
								<Text style={styles.txtbtn}>Suivant</Text>
							</LinearGradient>
						</TouchableWithoutFeedback>

						<View style={{ flexDirection: "row", marginTop: 10 }}>
							<Text style={styles.conditions}>
								{" "}
								En continuant, vous acceptez nos
							</Text>
							<Text style={[styles.conditions, styles.link]}>
								{" "}
								conditions d'utilisation
							</Text>
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<View
				style={{
					borderTopWidth: 1,
					borderColor: "#B0B0B0",
					width: "80%",
					height: "5%",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					alignSelf: "center",
				}}
			>
				<Text
					style={{
						fontFamily: "Inter-Regular",
						fontSize: 16,
						color: "#9A9A9A",
					}}
				>
					Vous avez deja un compte?
				</Text>
				<TouchableWithoutFeedback
					onPress={() => props.navigation.navigate("Login")}
				>
					<Text style={styles.link}> Connectez-vous</Text>
				</TouchableWithoutFeedback>
			</View>
		</>
	);
};
