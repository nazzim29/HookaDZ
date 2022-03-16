import { StatusBar } from "expo-status-bar";
import { SafeAreaView,Image} from "react-native";
import React, {useState } from "react";
import Navigation from "./src/Navigation";
import { Provider,useSelector } from "react-redux";
import { configureStore } from "./src/store";
import { NativeBaseProvider } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
const theme = DefaultTheme;
theme.colors.background = "#0D1117";
theme.dark = true;
const store = configureStore();
export default function App({ navigation }) {

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
