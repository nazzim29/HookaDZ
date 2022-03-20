import React, { useEffect,useState } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoadAssests } from "../actions/ui";
import { readToken } from "../actions/auth";
import { useFonts } from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../actions/products";

//screens
import SplashScreen from "../screens/SplashScreen";
import SignUp from "../screens/Auth/SignUp";
import SignUpSuccess from "../screens/Auth/SignUpSuccess";
import Home from "../screens/Home";
import Historique from "../screens/Historique";
import Panier from "../screens/Panier";
import Login from "../screens/Auth/Login";
import Forgot1 from "../screens/Auth/ForgotPassword/step-1";
import Forgot2 from "../screens/Auth/ForgotPassword/step-2";
import Forgot3 from "../screens/Auth/ForgotPassword/step-3";
import Forgot4 from "../screens/Auth/ForgotPassword/step-4";
import CommandeDetails from "../screens/CommandeDetails";
import { getAllCommandes } from "../actions/commandes";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			// initialRouteName="Forgot-1"
		>
			<AuthStack.Screen name="Login" component={Login} />
			<AuthStack.Screen name="Signup" component={SignUp} />
			<AuthStack.Screen name="SignupSuccess" component={SignUpSuccess} />
			<AuthStack.Screen name="Forgot-1" component={Forgot1} />
			<AuthStack.Screen name="Forgot-2" component={Forgot2} />
			<AuthStack.Screen name="Forgot-3" component={Forgot3} />
			<AuthStack.Screen name="Forgot-4" component={Forgot4} />
		</AuthStack.Navigator>
	);
};
const AppStack = createStackNavigator();
const AppStackScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<AppStack.Navigator initialRouteName="Home">
				<AppStack.Screen
					name="Home"
					component={Home}
					options={{
						headerShown: false,
					}}
				/>
				<AppStack.Screen
					name="Panier"
					component={Panier}
					options={{
						headerShown: false,
					}}
				/>
				<AppStack.Screen
					name="Historique"
					component={Historique}
					options={{
						headerShown: false,
					}}
				/>
				<AppStack.Screen
					name="Details"
					component={CommandeDetails}
					options={{
						headerShown: false,
					}}
				/>
			</AppStack.Navigator>
		</View>
	);
};


export default (props) => {
	console.log('rendring navigation')
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	let [loaded] = useFonts({
		"Inter-Bold": require("../../assets/fonts/inter/Inter-Bold.ttf"),
		"Inter-Regular": require("../../assets/fonts/inter/Inter-Regular.ttf"),
		"Inter-Medium": require("../../assets/fonts/inter/Inter-Medium.ttf"),
		"Inter-SemiBold": require("../../assets/fonts/inter/Inter-SemiBold.ttf"),
	});
	useEffect(() => {
		dispatch(LoadAssests());
	}, []);
	useEffect(() => {
		if (isAuth) {
			dispatch(getAllProducts());
			dispatch(getAllCommandes())
		}
	}, [isAuth]);
	return (
		<>
			{(!loaded) ? (
				<SplashScreen />
			) : isAuth ? (
				<AppStackScreen />
			) : (
				<AuthStackScreen />
			)}
		</>
	);
};
