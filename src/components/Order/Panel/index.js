import { View, Text,Dimensions } from "react-native";
import React from "react";
import { Box,Color } from "native-base";
import DraggablePanel from "react-native-draggable-panel";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import {NavigationContainer } from "@react-navigation/native";

const config = {
	animation: "spring",
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};


const initialHeight = Dimensions.get("window").height * 0.85;
const Stack = createStackNavigator();
export default function Panel() {
	const isVisible = useSelector(({ ui }) => ui.commandePanel);
	return (
		<DraggablePanel
			visible={isVisible}
            style={{
                backgroundColor: "black",
				Color: "white"
            }}
			borderRadius={20}
			initialHeight={initialHeight}
			animationDuration={200}
		>
			<NavigationContainer independent={true} style={{flex:1}}>
			<Stack.Navigator initialRouteName="Step1" style={{flex:1}}>
				<Stack.Screen
					name="Step1"
					component={Step1}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Step2"
					component={Step2}
					options={{
						headerShown: false,
					}}
				/>
				</Stack.Navigator>
			</NavigationContainer>
		</DraggablePanel>
	);
}