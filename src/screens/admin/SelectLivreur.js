import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLivreurs, UpdateCommande } from "../../actions/commandes";

const styles = StyleSheet.create({
	header: {
		justifyContent: "flex-start",
		// backgroundColor: "#161B22",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Inter-Bold",
		color: "white",
	},
	headerIcon: {
		margin: 10,
		height: 20.5,
		width: 12.5,
	},
});
export default function SelectLivreur(props) {
	const order = props.route.params;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLivreurs());
	}, []);
	const arrowIcon = useSelector(state=>state.ui.assets.find(el=>el.name == "arrow-back"))
	const livreurs = useSelector((state) => state.commande.livreurs);
	const isLoading = useSelector((state) => state.commande.isLoading);
	console.log(livreurs);
	const selectLivreur = (livreur) => {
		dispatch(
			UpdateCommande({
				_id: order._id,
				update: "livreur",
				updateValue: livreur._id,
			})
		);
		props.navigation.goBack()
	};
	if(isLoading) return <SplashScreen />
	return (
		<>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					// backgroundColor: "#161B22",
					padding: 15,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
						<View style={{ paddingHorizontal: 4 }}>
							<Image
								style={{ resizeMode: "contain", height: 25, marginRight: 5 }}
								source={arrowIcon}
							/>
						</View>
					</TouchableWithoutFeedback>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "bold",
							fontFamily: "Inter-Bold",
							color: "white",
						}}
					>
						Livreurs
					</Text>
				</View>
			</View>
			<ScrollView>
				{livreurs.map((livreur) => (
					<TouchableOpacity
						key={livreur.id}
						onPress={() => selectLivreur(livreur)}
						style={{
							padding: 15,
							marginBottom: 10,
							backgroundColor: "#161B22",
							borderRadius: 8,
							marginHorizontal: "5%",
						}}
					>
						{console.log(livreur)}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text
								style={{
									fontFamily: "Inter-Bold",
									fontSize: 20,
									color: "white",
									textAlign: "center",
								}}
							>
								{livreur.nom}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</>
	);
}
