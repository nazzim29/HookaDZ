import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { useDispatch } from "react-redux";
const styles = StyleSheet.create({
	title: {
		color: "#3299F1",
		fontSize: 30,
		fontFamily: "Inter-Bold",
		textAlign: "center",
		marginBottom: 50,
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
	const dispatch = useDispatch();
	const signupHandler = () => {
		dispatch(
			signUp({
				nom: nameRef.current.value,
				email: emailRef.current.value,
				password: passwordRef.current.value,
				phone: phoneRef.current.value,
			})
		);
	};
	return (
		<KeyboardAwareScrollView style={{ flex: 1 }}
			contentContainerStyle={{ flex: 1, justifyContent: "center" }}

		>
			<View style={{ flex: 1, justifyContent: "center", alignitems: "center" }}>
				<Text style={styles.title}>Shicha App Logo</Text>
				<Text style={styles.subtitle}> Commandez en quelques secondes,</Text>
				<Text style={styles.subtitle}>livré en 30 minutes ou moins</Text>
				<View style={{ marginTop: 40 }}>
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
			<View
				style={{
					borderTopWidth: 1,
					width: "90%",
					borderColor: "#B0B0B0",
					alignSelf: "center",
				}}
			></View>
			<View
				style={{
					width: "100%",
					justifyContent: "center",
					flexDirection: "row",
					alignSelf: "center",
					paddingTop: 20,
					paddingBottom: 10,
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
		</KeyboardAwareScrollView>
	);
};
