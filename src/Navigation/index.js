import React, { useEffect } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import Panier from "../screens/Panier";
import { LoadAssests } from "../actions/ui";
import { readToken } from "../actions/auth";
import { useFonts } from "expo-font";
import SplashScreen from "../screens/SplashScreen";
import { useSelector,useDispatch } from "react-redux";
import { getAllProducts } from "../actions/products";
import Forgot1 from "../screens/ForgotPassword/step-1"
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Screen name="Login" component={Login} />
			<AuthStack.Screen name="Signup" component={SignUp} />
			<AuthStack.Screen name="Forgot-1" component={Forgot1} />
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
				{/* <AppStack.Screen
						name="newCommande"
						component={NewCommande}
						options={{
							headerShown: false,
						}}
					/> */}
			</AppStack.Navigator>
		</View>
	);
};

export default (props) => {
	const isLoading = useSelector((state) => state.ui.isLoading);
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	let [loaded] = useFonts({
		"Inter-Bold": require("../../assets/fonts/inter/Inter-Bold.ttf"),
		"Inter-Regular": require("../../assets/fonts/inter/Inter-Regular.ttf"),
		"Inter-Medium": require("../../assets/fonts/inter/Inter-Medium.ttf"),
		"Inter-SemiBold": require("../../assets/fonts/inter/Inter-SemiBold.ttf"),
	});
	useEffect(() => {
		dispatch(LoadAssests())
	}, [])
	useEffect(() => {
		dispatch(getAllProducts())
	}, [isAuth])
	console.log({
		isLoading,
		isAuth,
		loaded
	})
	return (
		<>
			{isLoading || !loaded ? (
				<SplashScreen />
			) : isAuth ? (
				<AppStackScreen />
			) : (
				<AuthStackScreen />
			)}
		</>
	);
};
