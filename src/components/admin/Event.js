import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	TouchableWithoutFeedback,
	Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
export default function Card(props) {
	let { event } = props;
    const timeIcon = useSelector((state) =>
        state.ui.assets.find(el => el.name === "time-icon")
    )
	const phoneIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "phone-icon")
	);
	
	const callClient = () => {
		Linking.openURL(`tel:${event.user.numero}`);
	};

	return (
		<View style={[styles.card,{marginHorizontal:10}]}>
			<View style={styles.top}>
				<View style={{ maxWidth: "85%" }}>
					<TouchableWithoutFeedback
						onPress={() =>props.navigation.navigate("EventDetails", event)}
					>
						<View style={{ padding: 4, paddingRight: 0 }}>
							<Text style={styles.buyer}>
								Evenement de <Text style={styles.name}>{event.user.nom}</Text>
							</Text>
						</View>
					</TouchableWithoutFeedback>
					<View style={styles.info_row}>
						<Image style={styles.icon} source={timeIcon}></Image>
						<Text style={styles.inf}>{moment(event.date).fromNow()}</Text>
					</View>
				</View>
				<Pressable
                    onPress={callClient}
				>
					<View style={styles.info_b}>
						<Image
							style={styles.map_icon}
							source={phoneIcon}
						></Image>
					</View>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 15,
		marginBottom: 10,
		backgroundColor: "#161B22",
		borderRadius: 8,
	},

	top: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	state_l: {
		width: "60%",
		textAlign: "center",
		backgroundColor: "white",
		padding: 8,
		color: "black",
		fontWeight: "bold",
		borderRadius: 4,
	},
	state_r: {
		width: "37%",
		textAlign: "center",
		backgroundColor: "#3299F1",
		padding: 8,
		color: "white",
		fontWeight: "bold",
		borderRadius: 4,
	},
	info_row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	buyer: {
		color: "#C9D1D9",
		paddingBottom: 2,
		fontSize: 18,
		fontWeight: "bold",
	},
	nbr: {
		color: "#C9D1D9",
		paddingBottom: 2,
	},
	inf: {
		color: "#C9D1D9",
		fontSize: 10,
	},
	name: {
		color: "#3299F1",
	},
	bottom: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},

	btn_act_green: {
		width: "49%",
		textAlign: "center",
		backgroundColor: "green",
		padding: 8,
		color: "white",
		fontWeight: "bold",
		borderRadius: 4,
	},
	btn_act_red: {
		width: "49%",
		textAlign: "center",
		backgroundColor: "red",
		padding: 8,
		color: "white",
		fontWeight: "bold",
		borderRadius: 4,
	},
	icon: {
		resizeMode: "contain",
		width: 20,
		marginRight: 3,
		marginLeft: 3,
	},
	icon_phone: {
		resizeMode: "contain",
		width: 12,
		marginRight: 3,
		marginLeft: 3,
	},
	map_icon: {
		resizeMode: "contain",
		height: 40,
	},
});
