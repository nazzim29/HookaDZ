import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import moment from "moment";
const styles = StyleSheet.create({
	step: {
		maxWidth: "80%",
		marginVertical: "15%",
		marginHorizontal: "10%",
		resizeMode: "contain",
		alignItems: "center",
	},
	title: {
		fontWeight: "700",
		fontSize: 22,
		marginLeft: "10%",
		marginTop: "5%",
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
	const [date, setDate] = useState(null);
	// const dispatch = useDispatch();
	const slider = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "step-1-slider")
	);
	const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
	);
	const handleDateClick = (day) => {
		setDate(day.dateString);
	};
	const handleSuivant = () => {
		if (date && moment().diff(moment(date)) >= 0) {
			return;
		}
		props.navigation.navigate("Event2", { date });
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
					<Text style={styles.title}>
						Quand pouvons nous vous rendre service ?
					</Text>
					<Text style={styles.texte}>Selectionner une date</Text>
					<Calendar
						onDayPress={handleDateClick}
						// firstDay={1}
						markedDates={{
							[date]: {
								selected: true,
								disableTouchEvent: true,
								selectedColor: "#F1EFFE",
								selectedTextColor: "#7954FA",
							},
						}}
						current={date}
						style={{
							width: "90%",
							marginVertical: "5%",
							marginHorizontal: "5%",
						}}
						theme={{
							backgroundColor: "#0D1117",
							calendarBackground: "#0D1117",
							textSectionTitleColor: "#b6c1cd",
							textSectionTitleDisabledColor: "#d9e1e8",
							selectedDayBackgroundColor: "#3299F1",
							selectedDayTextColor: "#0D1117",
							todayTextColor: "#00adf5",
							dayTextColor: "#2d4150",
							textDisabledColor: "#d9e1e8",
							dotColor: "#00adf5",
							selectedDotColor: "#0D1117",
							arrowColor: "orange",
							disabledArrowColor: "#d9e1e8",
							monthTextColor: "blue",
							indicatorColor: "blue",
							textDayFontFamily: "Inter-Regular",
							textMonthFontFamily: "Inter-Bold",
							textDayHeaderFontFamily: "Inter-Regular",
							textDayFontWeight: "300",
							textMonthFontWeight: "bold",
							textDayHeaderFontWeight: "300",
							textDayFontSize: 16,
							textMonthFontSize: 16,
							textDayHeaderFontSize: 16,
						}}
					/>
					<TouchableWithoutFeedback onPressOut={handleSuivant}>
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
