import { View, TextInput, Image, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
export default function Input(props) {
  const icon = useSelector((state) =>
    state.ui.assets.find((el) => el.name === props.icon)
  );
  return (
    <View
      style={[
        {
          width: "80%",
          maxWaight: "100%",
          height: 40,
          backgroundColor: "#161B22",
          borderBottomWidth: 1,
          borderBottomColor: "#3299F1",
          flexDirection: "row",
          alignItems: "center",
        },
        props.style,
      ]}>
      <Pressable onPress={props.onPressIcon}>
        <Image
          source={icon}
          style={{ height: 25, width: 25, margin: 5, resizeMode: "contain" }}
        />
      </Pressable>
      {props.children}
    </View>
  );
}
