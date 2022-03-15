import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const styles = StyleSheet.create({
	title: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	label: {
		color: "white",
		fontSize: 15,
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: "10%",
		marginTop: 10,
		alignSelf: "flex-start",
	},
	screen: {
		flex: 1,
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#000000",
	},
	input: {
		width: "80%",
		height: "7%",
		backgroundColor: "white",
		borderRadius: 10,
		marginTop: 10,
		padding: 10,
		fontSize: 20,
		marginBottom: 10,
	},
	btnborder: {
		padding: 1,
		width: "80%",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	buttonContent: {
		borderRadius: 10,
		color: "white",
		alignItems: "center",
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "black",
		width: "100%",
	},
	txtbtn: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		margin: 10,
	},
	link: {
		color: "#1616d9",
		fontSize: 15,
		fontWeight: "bold",
		textDecorationLine: "underline",
		backgroundColor: "transparent",
	},
});

export default (props) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const nomRef = React.useRef();
	const prenomRef = React.useRef();
	const emailRef = React.useRef();
	const passwordRef = React.useRef();
	const phoneRef = React.useRef();
	const passwordConfirmRef = React.useRef();


	const renderContent = () => {
		return (
			<View style={styles.screen}>
				<Text style={styles.title}>HOOKA DZ</Text>
				<Text style={styles.label}>Email</Text>
				<TextInput
					placeholder="Email"
					textContentType="emailAddress"
					editable
					keyboardType="email-address"
					autoComplete="email"
					style={styles.input}
					ref={emailRef}
					onSubmitEditing={() => {
						this.phoneRef.current.focus();
					}}
					blurOnSubmit={false}
				/>
				<Text style={styles.label}>nom</Text>
				<TextInput
					placeholder="nom"
					textContentType="emailAddress"
					editable
					keyboardType="email-address"
					autoComplete="email"
					style={styles.input}
					ref={emailRef}
					onSubmitEditing={() => {
						this.phoneRef.current.focus();
					}}
					blurOnSubmit={false}
				/>
				<Text style={styles.label}>prenom</Text>
				<TextInput
					placeholder="prenom"
					textContentType="emailAddress"
					editable
					keyboardType="email-address"
					autoComplete="email"
					style={styles.input}
					ref={emailRef}
					onSubmitEditing={() => {
						this.phoneRef.current.focus();
					}}
					blurOnSubmit={false}
				/>
				<Text style={styles.label}>Numero de telephone</Text>
				<TextInput
					placeholder="Numero de telephone"
					textContentType="telephoneNumber"
					editable
					keyboardType="number-pad"
					autoComplete="phoneNumber"
					style={styles.input}
					ref={phoneRef}
					onSubmitEditing={() => {
						this.passwordRef.current.focus();
					}}
					blurOnSubmit={false}
				/>
				<Text style={styles.label}>Mot de passe</Text>
				<TextInput
					placeholder="Mot de passe"
					textContentType="password"
					secureTextEntry={true}
					autoComplete="password"
					editable
					ref={passwordRef}
					style={styles.input}
					onSubmitEditing={() => passwordConfirmRef.current.focus()}
				/>
				<Text style={styles.label}>Confirmez votre Mot de passe</Text>
				<TextInput
					placeholder="Confirmation"
					textContentType="password"
					secureTextEntry={true}
					autoComplete="password"
					editable
					ref={passwordConfirmRef}
					style={styles.input}
					onSubmitEditing={signupHandler}
				/>
				<TouchableWithoutFeedback onPress={signupHandler}>
					<LinearGradient
						colors={["#1616d9", "#ff0071"]}
						locations={[0.3, 0.9]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.btnborder}
					>
						<View style={styles.buttonContent}>
							<Text style={styles.txtbtn}>S'inscrire</Text>
						</View>
					</LinearGradient>
				</TouchableWithoutFeedback>
				<View style={{ width: "100%", alignItems: "center" }}>
					<Text style={[styles.label, { alignSelf: "center", marginLeft: 0 }]}>
						Vous avez deja un compte ?
					</Text>
					<TouchableWithoutFeedback
						onPress={() => props.navigation.navigate("Login")}
					>
						<Text style={styles.link}>Connectez-vous</Text>
					</TouchableWithoutFeedback>
				</View>
			</View>
		);
	};
	if (Platform.OS == "ios") {
		return (
			<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
				{renderContent()}
			</KeyboardAvoidingView>
		);
	} else {
		return renderContent();
	}
};
