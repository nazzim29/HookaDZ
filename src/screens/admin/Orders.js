import React, { useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	ActivityIndicator,
	RefreshControl,
	TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/admin/card";
import Event from "../../components/admin/Event";
import { getAllCommandes, getAllEvents } from "../../actions/commandes";
export default function Orders(props) {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.ui.isLoading);
	const orders = useSelector((state) => state.commande.commandes);
	const currentId = useSelector((state) => state.auth._id);
	const role = useSelector((state) => state.auth.role);
	const [section, setSection] = React.useState("orders");
	const [showedOrders, setShowedOrders] = React.useState([]);
	const events = useSelector((state) => state.commande.evenements);
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		dispatch(getAllCommandes());
		dispatch(getAllEvents());
			setRefreshing(false);
	}, [refreshing]);
	useEffect(() => {
		if (section == "orders") {
			setShowedOrders(
				orders.filter((el) => {
					return (
						((!el.confirmation && !el.refuse) ||
							(el.confirmation && !el.livreur) ||
							(role == "livreur" && el.livreur == currentId)) &&
						!el.livraison
					);
				})
			);
		} else if (section == "accepte") {
			setShowedOrders(
				orders.filter((el) => {
					return el.confirmation;
				})
			);
		} else if (section == "rejete") {
			setShowedOrders(
				orders.filter((el) => {
					return el.refuse;
				})
			);
		} else if (section == "livre") {
			setShowedOrders(
				orders.filter((el) => {
					return el.livraison;
				})
			);
		}
	}, [orders, section]);
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<View
					style={[
						styles.navigation,
						{ justifyContent: role == "admin" ? "space-evenly" : "flex-start" },
					]}
				>
					<TouchableWithoutFeedback onPressOut={() => setSection("orders")}>
						<Text
							style={[
								section == "orders" ? styles.btn_blue : styles.btn,
								{ padding: 4 },
							]}
						>
							Orders
						</Text>
					</TouchableWithoutFeedback>
					{role == "admin" && (
						<>
							<TouchableWithoutFeedback
								onPressOut={() => setSection("accepte")}
							>
								<Text
									style={[
										section == "accepte" ? styles.btn_blue : styles.btn,
										{ padding: 4 },
									]}
								>
									Accepté
								</Text>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPressOut={() => setSection("rejete")}>
								<Text
									style={[
										section == "rejete" ? styles.btn_blue : styles.btn,
										{ padding: 4 },
									]}
								>
									Rejeté
								</Text>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPressOut={() => setSection("livre")}>
								<Text
									style={[
										section == "livre" ? styles.btn_blue : styles.btn,
										{ padding: 4 },
									]}
								>
									Livré
								</Text>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPressOut={() => setSection("event")}>
								<Text
									style={[
										section == "event" ? styles.btn_blue : styles.btn,
										{ padding: 4 },
									]}
								>
									Evenements
								</Text>
							</TouchableWithoutFeedback>
						</>
					)}
				</View>
			</View>
			{isLoading ? (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			) : section != "event" ? (
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{showedOrders.map((order, index) => (
						<Card order={order} key={index} {...props} />
					))}
				</ScrollView>
			) : (
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{events.map((event, index) => (
						<Event event={event} key={index} {...props} />
					))}
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#0D1117",
		height: "100%",
	},
	column: {
		backgroundColor: "",
		paddingRight: 20,
		paddingLeft: 20,
		backgroundColor: "#161B22",
		marginBottom: 20,
	},
	nav: {
		padding: 15,
	},
	admin: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Inter-Bold",
		color: "white",
	},
	navigation: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 5,
		paddingHorizontal: 3,
	},

	btn: {
		color: "#ffffff",
		fontSize: 14,
	},

	btn_blue: {
		color: "#3299F1",
		fontSize: 14,
		fontWeight: "bold",
	},
});
