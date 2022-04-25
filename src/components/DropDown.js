import React from "react";
import { StyleSheet, Modal, View, Pressable, Text, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
const styles = StyleSheet.create({
  headerText: {
    // fontSize: 25,
    // fontWeight: "bold",
    // fontFamily: "Inter-Bold",
    // color: "#7638FF",
    // textAlign: "center",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    // marginVertical: "10%",
  },
  headerIcon: {
    height: 25,
    width: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingBottom: 30,
  },

  headertxt: {
    color: "white",
    fontSize: 20,
    fontFamily: "Inter-Bold",
    marginLeft: 10,
    marginTop: 20,
  },
});
const DropDown = ({ open, close }) => {
  const navigation = useNavigation();
  const historyIcon = useSelector((state) =>
    state.ui.assets.find((el) => el.name == "history-icon")
  );
  const logoutIcon = useSelector((state) =>
    state.ui.assets.find((el) => el.name == "logout")
  );
  const dispatch = useDispatch();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        close();
      }}>
      <Pressable
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#66000000",
        }}
        onPress={() => {
          close();
          console.log("tes");
        }}>
        <View
          style={{
            position: "absolute",
            width: 180,
            top: 50,
            right: 0,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.5,
            shadowRadius: 12.35,
            elevation: 19,
            backgroundColor: "#161B22",
          }}>
          <Pressable
            style={{
              marginVertical: 5,
            }}
            onPress={(e) => {
              e.stopPropagation();
              close();
              navigation.navigate("Historique");
            }}>
            {({ pressed }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 5,
                  opacity: pressed ? 0.4 : 1,
                }}>
                <Image
                  source={historyIcon}
                  style={[styles.headerIcon, { resizeMode: "contain" }]}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#C9D1D9",
                    marginHorizontal: 10,
                  }}>
                  Historique
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable
            style={{
              marginVertical: 5,
            }}
            onPress={(e) => {
              e.stopPropagation();
              close();
              dispatch(logout());
              //   navigation.navigate("Historique");
            }}>
            {({ pressed }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 5,
                  opacity: pressed ? 0.4 : 1,
                }}>
                <Image
                  source={logoutIcon}
                  style={[
                    styles.headerIcon,
                    { resizeMode: "contain", marginLeft: 0 },
                  ]}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#C9D1D9",
                    marginHorizontal: 10,
                  }}>
                  Se déconnecter
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default DropDown;
