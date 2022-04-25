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
import { getCommandeDetails, UpdateCommande } from "../../actions/commandes";
import moment from "moment";
export default function Card(props) {
  let { order } = props;
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const timeIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "time-icon")
  );
  const mapIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "map-icon")
  );
  const truckIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "truck-icon")
  );
  const removeIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "remove-icon")
  );
  const phoneIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "phone-icon")
  );
  const coinIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "coin-icon")
  );
  const fileIcon = useSelector((state) =>
    state.ui.assets.find((el) => el.name == "file-icon")
  );
  const callClient = () => {
    Linking.openURL(`tel:${order.user.numero}`);
  };
  const openInGoogleMap = () => {
    try {
      Linking.openURL(
        Platform.select({
          ios: `comgooglemapsurl://www.google.com/maps/?q=@${order.latitude},${order.longitude}&zoom=15&view=traffic`,
          android: `https://www.google.com/maps/?q=@${order.latitude},${order.longitude}&zoom=15&view=traffic`,
        })
      );
    } catch (err) {
      console.log("can't open google maps");
    }
    // props.navigation.navigate("Map", order);
  };
  const Accepter = () => {
    dispatch(
      UpdateCommande({
        _id: order._id,
        update: "confirmation",
        updateValue: true,
      })
    );
  };
  const Rejeter = () => {
    dispatch(
      UpdateCommande({ _id: order._id, update: "refuse", updateValue: true })
    );
  };
  const cancelRejet = () => {
    dispatch(
      UpdateCommande({ _id: order._id, update: "refuse", updateValue: false })
    );
  };
  const livreHandler = () => {
    dispatch(
      UpdateCommande({ _id: order._id, update: "livraison", updateValue: true })
    );
  };
  return (
    <View style={[styles.card, { marginHorizontal: 10 }]}>
      <View style={styles.top}>
        <View style={{ maxWidth: "80%" }}>
          <TouchableWithoutFeedback
            onPress={() =>
              dispatch(getCommandeDetails(order._id)) &&
              props.navigation.navigate("Details", order)
            }>
            <View style={{ padding: 4, paddingRight: 0 }}>
              <Text style={styles.buyer}>
                Commande de <Text style={styles.name}>{order.user.nom}</Text>
              </Text>
              <Text style={styles.nbr}>commande: {order._id}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.info_row}>
            <Image style={styles.icon} source={timeIcon}></Image>
            <Text style={styles.inf}>{moment(order.createdAt).fromNow()}</Text>
            <Image style={styles.icon} source={coinIcon}></Image>
            <Text style={styles.inf}>{order.montant} Da</Text>
            {!order.livraison && (
              <TouchableWithoutFeedback onPress={callClient}>
                <View
                  style={{
                    padding: 4,
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Image style={styles.icon_phone} source={phoneIcon}></Image>
                  <Text style={styles.inf}>{order.user.numero}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        <Pressable
          onPress={
            (!order.confirmation && !order.refuse) ||
            (order.confirmation && !order.livraison)
              ? openInGoogleMap
              : null
          }>
          <View style={styles.info_b}>
            <Image
              style={styles.map_icon}
              source={
                (!order.confirmation && !order.refuse) ||
                (order.confirmation && !order.livraison)
                  ? mapIcon
                  : order.livreur
                  ? truckIcon
                  : order.livraison
                  ? fileIcon
                  : removeIcon
              }></Image>
          </View>
        </Pressable>
      </View>
      {role == "admin" &&
        (!order.confirmation && !order.refuse ? (
          <View style={styles.bottom}>
            <TouchableWithoutFeedback onPress={Accepter}>
              <Text style={styles.btn_act_green}>J'accepte</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Rejeter}>
              <Text style={styles.btn_act_red}>Rejeter</Text>
            </TouchableWithoutFeedback>
          </View>
        ) : order.confirmation && !order.livraison ? (
          <TouchableWithoutFeedback
            onPress={() =>
              !order.livreur &&
              props.navigation.navigate("SelectLivreur", order)
            }>
            <View style={styles.bottom}>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "white",
                  padding: 8,
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: 4,
                }}>
                {order.livreur
                  ? `Accepté ` //( livreur ${order.livreur.nom} )
                  : "Livreur ..."}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : order.livraison === true ? (
          <View style={styles.bottom}>
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "white",
                padding: 8,
                color: "black",
                fontWeight: "bold",
                borderRadius: 4,
              }}>
              Livré
            </Text>
          </View>
        ) : (
          <View style={[styles.bottom]}>
            <Text style={styles.state_l}>Rejeté</Text>
            <TouchableWithoutFeedback onPress={cancelRejet}>
              <Text style={styles.state_r}>Cancel</Text>
            </TouchableWithoutFeedback>
          </View>
        ))}
      {role == "livreur" &&
        (!order.livraison ? (
          <View style={[styles.bottom]}>
            <Text style={styles.state_l}>Livraison</Text>
            <TouchableWithoutFeedback onPress={livreHandler}>
              <Text style={styles.state_r}>Terminé</Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View style={styles.bottom}>
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "white",
                padding: 8,
                color: "black",
                fontWeight: "bold",
                borderRadius: 4,
              }}>
              Livré
            </Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#161B22",
    borderRadius: 8,
    overflow: "hidden",
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
