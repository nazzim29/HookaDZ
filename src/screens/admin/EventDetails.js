import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Linking,
	TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import moment from "moment";
export default function Details(props) {
	const arrowIcon = useSelector((state) =>
		state.ui.assets.find((el) => el.name == "arrow-back")
	);
	const phoneIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "phone-icon")
	);
	const event = props.route.params;
	const callClient = () => {
		Linking.openURL(`tel:${event.user.numero}`);
	};
	console.log({ event });
	return (
		<>
			<View style={styles.nav}>
				<View style={styles.row}>
					<TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
						<View style={{ paddingHorizontal: 4 }}>
							<Image style={styles.arrow} source={arrowIcon} />
						</View>
					</TouchableWithoutFeedback>
					<Text style={styles.txt}>Les détails</Text>
				</View>
				<TouchableWithoutFeedback onPress={callClient}>
					<View style={[{ padding: 4 }]}>
						<Image style={styles.map} source={phoneIcon} />
					</View>
				</TouchableWithoutFeedback>
			</View>
            <View style={{ marginVertical: 10, alignItems:'center' }}>
				<Text
					style={[styles.txt, { fontFamily: "Inter-Regular", fontSize: 14 }]}
				>
					Soumis {moment(event.createdAt).fromNow()} pour le{" "}
					{moment(event.date).format("DD/MM/YYYY")}
				</Text>
			</View>
			<ScrollView
				style={{
					marginHorizontal: "5%",
				}}
				contentContainerStyle={{}}
			>
				<View style={{ marginTop: 20 }}>
					<Text style={styles.txt}>Client:</Text>
					<Text
						style={[
							styles.txt,
							{
								fontSize: 18,
								fontFamily: "Inter-Regular",
								marginTop: 5,
								marginLeft: "5%",
								maxWidth: "93%",
							},
						]}
					>
						{event.user.nom}
					</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text style={styles.txt}>Adresse:</Text>
					<Text
						style={[
							styles.txt,
							{
								fontSize: 18,
								fontFamily: "Inter-Regular",
								marginTop: 5,
								marginLeft: "5%",
								maxWidth: "93%",
							},
						]}
					>
						{event.adresse}
					</Text>
				</View>

				<View style={{ marginTop: 20 }}>
					<Text style={styles.txt}>Description:</Text>
					<Text
						style={[
							styles.txt,
							{
								fontSize: 18,
								fontFamily: "Inter-Regular",
								marginTop: 5,
								marginLeft: "5%",
								maxWidth: "93%",
							},
						]}
					>
						{event.description}
					</Text>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	nav: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// backgroundColor: "#161B22",
		padding: 15,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	arrow: {
		resizeMode: "contain",
		height: 25,
		marginRight: 5,
	},
	txt: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Inter-Bold",
		color: "white",
	},
	map: {
		resizeMode: "contain",
		width: 30,
		height: 30,
	},
	border: {
		padding: 2,
		borderRadius: 10,
		flex: 1,
		height: "80%",
		marginBottom: 10,
	},
	floating: {
		minWidth: "100%",
		minHeight: "25%",
		padding: 15,
		flexDirection: "column",
	},
	details: {
		borderColor: "#2e8bdc",
		borderWidth: 0.25,
		maxWidth: "100%",
		height: 70,
		marginBottom: 20,
		borderRadius: 15,
		flexDirection: "column",
		padding: 10,
		justifyContent: "space-between",
		shadowColor: "#3299F1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.62,
		shadowRadius: 3.84,
		elevation: 14,
		backgroundColor: "#161B22",
	},
	detailsHeader: {
		fontFamily: "Inter-Bold",
		fontSize: 20,
		color: "white",
	},
	totalPrice: {
		color: "#2e8bdc",
		fontFamily: "Inter-Bold",
		fontSize: 20,
	},
});
