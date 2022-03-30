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
import Input from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import moment from "moment";
import * as _ from "lodash"
moment.locale("fr", {
	months:
		"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
			"_"
		),
	monthsShort:
		"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
	monthsParseExact: true,
	weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
	weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
	weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
	weekdaysParseExact: true,
	longDateFormat: {
		LT: "HH:mm",
		LTS: "HH:mm:ss",
		L: "DD/MM/YYYY",
		LL: "D MMMM YYYY",
		LLL: "D MMMM YYYY HH:mm",
		LLLL: "dddd D MMMM YYYY HH:mm",
	},
	calendar: {
		sameDay: "[Aujourd’hui à] LT",
		nextDay: "[Demain à] LT",
		nextWeek: "dddd [à] LT",
		lastDay: "[Hier à] LT",
		lastWeek: "dddd [dernier à] LT",
		sameElse: "L",
	},
	relativeTime: {
		future: "dans %s",
		past: "il y a %s",
		s: "quelques secondes",
		m: "une minute",
		mm: "%d minutes",
		h: "une heure",
		hh: "%d heures",
		d: "un jour",
		dd: "%d jours",
		M: "un mois",
		MM: "%d mois",
		y: "un an",
		yy: "%d ans",
	},
	dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
	ordinal: function (number) {
		return number + (number === 1 ? "er" : "e");
	},
	meridiemParse: /PD|MD/,
	isPM: function (input) {
		return input.charAt(0) === "M";
	},

	meridiem: function (hours, minutes, isLower) {
		return hours < 12 ? "PD" : "MD";
	},
	week: {
		dow: 1, // Monday is the first day of the week.
		doy: 4, // Used to determine first week of the year.
	},
});
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
		width: "80%",
		// borderWidth: 1,
		// borderColor: '#C9D1D9',
		fontFamily: "Inter-Bold",
		color: "#C9D1D9",
	},
	texte: {
		fontSize: 16,
		marginLeft: "5%",
		marginTop: "2%",
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
	const [adresse, setAdresse] = useState();
	const slider = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "step-2-slider")
	);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const resend = () => {};
	const suivantHandler = () => {
		if (_.trim(adresse).length == 0) return;
		props.navigation.navigate("Event3", {
			date: props.route.params.date,
			adresse:_.trim(adresse),
		});
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
					<Text style={styles.title}>Adresse</Text>
					<Text style={styles.texte}>
						Vous commandez pour le{" "}
						{moment(props.route.params.date).format("dddd D MMMM")}
					</Text>
					<Input
						icon={"key-icon"}
						style={{ marginTop: "5%", marginHorizontal: "5%", width: "90%" }}
					>
						<TextInput
							placeholder="Adresse de livraison"
							editable
							keyboardType="default"
							autoComplete="street-address"
							onChangeText={(e) => setAdresse(e)}
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
