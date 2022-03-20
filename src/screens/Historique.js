import { View, Text,ScrollView, StyleSheet,TouchableOpacity,Image} from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommandes } from '../actions/commandes';
import OrderCard from '../components/Order/OrderCard';




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
export default function Historique(props) {
  const commandes = useSelector(state =>state.commande.commandes)
  const arrowBackIcon = useSelector((state) =>
		state.ui.assets.find((asset) => asset.name === "arrow-back")
  );
  
  return (
		<>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<Image source={arrowBackIcon} style={styles.headerIcon} />
				</TouchableOpacity>
				<Text style={styles.headerText}>Historique</Text>
			</View>
      <ScrollView contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',justifyContent:"center"}}>
        {commandes.map((commande) => (
              <OrderCard order={commande} key={commande._id} navigation={props.navigation}/>
        ))}
      </ScrollView>
		</>
	);
}