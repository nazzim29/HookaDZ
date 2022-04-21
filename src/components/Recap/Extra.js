import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import { useSelector, useDispatch } from "react-redux";
import { removeProduit, addExtra, minusExtra } from "../../actions/commandes";
const styles = StyleSheet.create({
  border: {
    padding: 2,
    borderRadius: 10,
    minWidth: "90%",
    minHeight: 100,
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
    backgroundColor: "white",
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "white",
  },
  deleteIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
export default function Extra(props) {
  const { extra } = props;
  const dispatch = useDispatch();
  const appleIcon = useSelector((state) =>
    state.ui.assets.find((el) => el.name + "." + el.type == extra.image_url)
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
  const plusQuantite = () => {
    dispatch(addExtra(extra));
  };
  const minusQuantite = () => {
    console.log(extra.quantite);
    if (extra.quantite == 0) return;
    dispatch(minusExtra(extra));
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
					paddingVertical: 10,
				},
				// props.style,
			]}
		>
			<Text style={{ fontSize: 15, color: "white" }}>
				{extra?.nom} (
				{typeof extra?.prix == "string" ? extra.prix : `${extra.prix} Da`} X{" "}
				{extra?.quantite})
			</Text>
			<Text style={{ fontSize: 15, color: "white" }}>
				{typeof extra?.prix == "string" ? extra.prix : extra.prix + "Da"}
			</Text>
			{/* <LinearGradient
                  colors={[
                      "rgba(11, 103, 255, 1)",
                      "rgba(255, 255, 255, 0)",
                      "rgba(11, 103, 255, 1)",
                  ]}
                  locations={[0, 0.5, 1]}
                  {...deg(-5)}
                  style={styles.border}
              >
                  <View style={styles.card}>
                      <Image style={styles.image} source={appleIcon} />
                      <View style={{ flex: 1, flexDirection: "column", marginLeft: 15 }}>
                          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
                              {extra.nom}
                          </Text>
                          <Text style={{ fontSize: 15, color: "white" }}>
                              {extra.prix || "NaN"} Da
                          </Text>
                          <View
                              style={{
                                  marginTop: 10,
                                  alignItems: "flex-end",
                                  width: "100%",
                              }}
                          >
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
                                          }}
                                      >
                                          x
                                      </Text>
                                  )}
                                  <Text
                                      style={{
                                          fontSize: 20,
                                          fontFamily: "Inter-Bold",
                                          color: "rgba(201, 209, 217, 1)",
                                          marginHorizontal: 10,
                                      }}
                                  >
                                      {extra.quantite}
                                  </Text>
                                  {props.editable !== false && (
                                      <TouchableWithoutFeedback onPressOut={plusQuantite}>
                                          <View
                                              style={{
                                                  padding: 4,
                                              }}
                                          >
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
			{/* {props.deletable !== false && (
                  <View
                      style={{
                          padding: 4,
                          position: "absolute",
                          top: 10,
                          right: -10,
                      }}
                  >
                      <TouchableWithoutFeedback onPressOut={removeFromCart}>
                          <Image source={deleteIcon} style={styles.deleteIcon} />
                      </TouchableWithoutFeedback>
                  </View>
              )} */}
		</View>
	);
}
