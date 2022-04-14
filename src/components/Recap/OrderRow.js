import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduit,
  addProduit,
  minusProduit,
} from "../../actions/commandes";
import { withTheme } from "react-native-elements";
const styles = StyleSheet.create({
  border: {
    padding: 2,
    borderRadius: 10,
    minWidth: "90%",
    height: "100%",
    color: "white",
    marginVertical: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#0D1117",
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    borderRadius: 10,
    width: "30%",
    height: "100%",
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "white",
  },
  deleteIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
export default function OrderRow(props) {
  const { order } = props;
  const dispatch = useDispatch();
  const appleIcon = useSelector((state) =>
    state.ui.assets.find((el) => el.name + "." + el.type == order.image_url)
  );
  const PlusIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "plus-icon")
  );
  const MinusIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "minus-icon")
  );
  const deleteIcon = useSelector((state) =>
    state.ui.assets.find((asset) => asset.name === "remove-icon")
  );
  const removeFromCart = () => {
    dispatch(removeProduit(order));
  };
  const plusQuantite = () => {
    //add produit to cart
    dispatch(addProduit(order));
  };
  const minusQuantite = () => {
    dispatch(minusProduit(order));
  };
  return (
    <View
      style={[
        {
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
          paddingTop: 10,
          paddingBottom: 10,
        },
        // props.style,
      ]}>
      <Text style={{ fontSize: 15, color: "white" }}>
        {`${order?.nom} (${order?.prix || "NaN"} Da X ${order?.quantite}) `}
      </Text>
      <Text style={{ fontSize: 15, color: "white" }}>
        {order?.prix ? `${order?.quantite * order?.prix}` : "NaN"} Da
      </Text>
      {/* <LinearGradient
        colors={[
          "rgba(11, 103, 255, 1)",
          "rgba(255, 255, 255, 0)",
          "rgba(11, 103, 255, 1)",
        ]}
        locations={[0, 0.5, 1]}
        {...deg(-5)}
        style={styles.border}>
        <View style={styles.card}>
          <Image style={styles.image} source={appleIcon} />
          <View style={{ flex: 1, flexDirection: "column", marginLeft: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {order.nom}
            </Text>
            <Text style={{ fontSize: 15, color: "white" }}>
              {order.prix} Da
            </Text>
            <View
              style={{
                marginTop: 10,
                alignItems: "flex-end",
                width: "100%",
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {props.editable !== false && (
                  <View style={{ padding: 4 }}>
                    <TouchableWithoutFeedback onPressOut={minusQuantite}>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={MinusIcon}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                )}
                {props.editable === false && (
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Inter-Bold",
                      color: "rgba(201, 209, 217, 1)",
                    }}>
                    x
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter-Bold",
                    color: "rgba(201, 209, 217, 1)",
                    marginHorizontal: 10,
                  }}>
                  {order.quantite}
                </Text>
                {props.editable !== false && (
                  <TouchableWithoutFeedback onPressOut={plusQuantite}>
                    <View
                      style={{
                        padding: 4,
                      }}>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={PlusIcon}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </View>
            </View>
          </View>
        </View>
      </LinearGradient> */}
      {props.deletable !== false && (
        <View
          style={{
            padding: 4,
            position: "absolute",
            top: 5,
            right: 5,
          }}>
          <TouchableWithoutFeedback onPressOut={removeFromCart}>
            <Image source={deleteIcon} style={styles.deleteIcon} />
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}
