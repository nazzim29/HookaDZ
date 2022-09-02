import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import Navigation from "./src/Navigation";
import { Provider } from "react-redux";
import { configureStore } from "./src/store";
import { NativeBaseProvider } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// import messaging from "@react-native-firebase/messaging";
const theme = DefaultTheme;
theme.colors.background = "#0D1117";
theme.dark = true;
const store = configureStore();
export default function App({ navigation }) {
	const requestUserPermission = async () => {
	// 	const authStatus = await messaging().requestPermission();
	// 	console.log("Authorization status(authStatus):", authStatus);
	// 	return (
	// 		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
	// 		authStatus === messaging.AuthorizationStatus.PROVISIONAL
	// 	);
	};
	useEffect(() => {
		if (!requestUserPermission()) {
			console.log("Not Authorization status:", authStatus);
			return null;
		}
		// 
		// messaging()
		// 	.getInitialNotification()
		// 	.then(async (remoteMessage) => {
		// 		if (remoteMessage) {
		// 			console.log(
		// 				"getInitialNotification:" +
		// 					"Notification caused app to open from quit state"
		// 			);
		// 			console.log(remoteMessage);
		// 		}
		// 	});
		// messaging().onNotificationOpenedApp(async (remoteMessage) => {
		// 	if (remoteMessage) {
		// 		console.log(
		// 			"onNotificationOpenedApp: " +
		// 				"Notification caused app to open from background state"
		// 		);
		// 		console.log(remoteMessage);
		// 	}
		// });
		// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
		// 	console.log("Message handled in the background!", remoteMessage);
		// });
	}, []);

	return (
		<Provider store={store}>
			<NavigationContainer
				style={{ flex: 1, flexDirection: "column" }}
				theme={theme}
			>
				<SafeAreaView
					style={{
						height: "100%",
						width: "100%",
						overflow: "hidden",
						paddingTop: StatusBar.currentHeight,
						backgroundColor: "#0D1117",

						flex: 1,
					}}
				>
					<NativeBaseProvider>
						<Navigation />
					</NativeBaseProvider>
					<StatusBar style="light" animated={true} />
				</SafeAreaView>
			</NavigationContainer>
		</Provider>
	);
}
