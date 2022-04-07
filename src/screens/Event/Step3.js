import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector,useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import SplashScreen from '../SplashScreen'
import { PostEvent } from "../../actions/commandes";
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
		marginLeft: "5%",
		marginTop: "10%",
		width: "90%",
		// borderWidth: 1,
		// borderColor: '#C9D1D9',
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
	},
	texte: {
		fontSize: 16,
		marginLeft: "5%",
		marginTop: "1%",
		width: "90%",
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
		marginVertical: "5%",
	},
	btn: {
		width: "90%",
		height: 50,
		marginTop: "5%",
		borderRadius: 15,
		marginHorizontal: "5%",
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
	const [description, setDescription] = useState("");
	const { date, adresse } = props.route.params
	const isLoading = useSelector((state) => state.ui.isLoading);
	const dispatch = useDispatch();
	const slider = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "step-3-slider")
	);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const icon = useSelector((state) =>
		state.ui.assets.find((el) => el.name === "phone-icon")
	);
	const suivantHandler = () => {
		const event = {
			date: new Date(date),
			adresse,
			description,
		}
		dispatch(PostEvent(event, props.navigation.navigate));
	};
	if(isLoading) return <SplashScreen />
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
					<Text style={styles.title}>Description</Text>
					<Text style={styles.texte}>
						Donnez nous plus de details un administrateur les confirmeras par la
						suite
					</Text>
					<View
						style={[
							{
								width: "90%",
								maxHeight: "50%",
								marginHorizontal: "5%",
								marginTop: "5%",
								backgroundColor: "#161B22",
								borderBottomWidth: 1,
								borderBottomColor: "#3299F1",
								flexDirection: "row",
								alignItems: "center",
								paddingBottom:5,
							},
						]}
					>
						<Image
							source={icon}
							style={{
								height: 25,
								width: 25,
								margin: 5,
								resizeMode: "contain",
							}}
						/>

						<TextInput
							placeholder="Description"
							editable
							multiline={true}
							keyboardType="default"
							onChangeText={(e) => setDescription(e)}
							onSubmitEditing={() => {}}
							blurOnSubmit={false}
							style={{
								flex: 1,
								fontFamily: "Inter-Regular",
								fontSize: 16,
								color: "#C9D1D9",
							}}
							placeholderTextColor={"#858585"}
						/>
					</View>
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
