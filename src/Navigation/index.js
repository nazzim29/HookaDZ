import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoadAssests } from "../actions/ui";
import { readToken } from "../actions/auth";
import { useFonts } from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { getAllExtras, getAllProducts } from "../actions/products";
import { useToast } from "native-base";
//screens
import SplashScreen from "../screens/SplashScreen";

//auth screens
import SignUp from "../screens/Auth/SignUp";
import SignUpSuccess from "../screens/Auth/SignUpSuccess";
import Login from "../screens/Auth/Login";
import Forgot1 from "../screens/Auth/ForgotPassword/step-1";
import Forgot2 from "../screens/Auth/ForgotPassword/step-2";
import Forgot3 from "../screens/Auth/ForgotPassword/step-3";
import Forgot4 from "../screens/Auth/ForgotPassword/step-4";

// user screens
import Home from "../screens/Home";
import Historique from "../screens/Historique";
import Panier from "../screens/Panier";
import CommandeDetails from "../screens/CommandeDetails";
import Extras from "../screens/Extras";
import Recap from "../screens/Recap";
import Event1 from "../screens/Event/Step1";
import Event2 from "../screens/Event/Step2";
import Event3 from "../screens/Event/Step3";
import EventSuccess from "../screens/Event/Success";
import EventErreur from "../screens/Event/Erreur";
import Event from "../screens/EventNew";

//admin screens
import Orders from "../screens/admin/Orders";
import Details from "../screens/admin/Details";
import SelectLivreur from "../screens/admin/SelectLivreur";
import EventDetails from "../screens/admin/EventDetails";

import { getAllCommandes, getAllEvents } from "../actions/commandes";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      {/* <AuthStack.Screen name="SplashScreen" component={SplashScreen} /> */}
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
          name="Recap"
          component={Recap}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name={"Panier"}
          component={Panier}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Extras"
          component={Extras}
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
        <AppStack.Screen
          name="Event1"
          component={Event}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Event2"
          component={Event2}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Event3"
          component={Event3}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="EventErreur"
          component={EventErreur}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="EventSuccess"
          component={EventSuccess}
          options={{
            headerShown: false,
          }}
        />
      </AppStack.Navigator>
    </View>
  );
};

const AdminStack = createStackNavigator();

const AdminStackScreen = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AdminStack.Screen name="Orders" component={Orders} />
      <AdminStack.Screen name="Details" component={Details} />
      <AdminStack.Screen name="SelectLivreur" component={SelectLivreur} />
      <AdminStack.Screen name="EventDetails" component={EventDetails} />
    </AdminStack.Navigator>
  );
};
const UserStackScreen = {
  admin: AdminStackScreen,
  user: AppStackScreen,
};
export default (props) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const toast = useToast();
  const dispatch = useDispatch();
  let [loaded] = useFonts({
    "Inter-Bold": require("../../assets/fonts/inter/Inter-Bold.ttf"),
    "Inter-Regular": require("../../assets/fonts/inter/Inter-Regular.ttf"),
    "Inter-Medium": require("../../assets/fonts/inter/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../../assets/fonts/inter/Inter-SemiBold.ttf"),
  });
  const error = useSelector((state) => state.error.message);
  useEffect(() => {
    dispatch(LoadAssests());
    dispatch(readToken());
  }, []);
  useEffect(() => {
    if (isAuth) {
      dispatch(getAllProducts());
      dispatch(getAllCommandes());
      dispatch(getAllExtras());
    }
    if (role == "admin") {
      dispatch(getAllEvents());
    }
  }, [isAuth]);
  useEffect(() => {
    if (error) {
      toast.show({
        description: error,
        duration: 2000,
        placement: "bottom",
        onCloseComplete: () => {
          dispatch({ type: "CLEAR_ERROR" });
        },
      });
    }
  }, [error]);
  if (!loaded) return <SplashScreen />;
  if (isAuth) {
    if (role === "admin" || role === "livreur") {
      return <AdminStackScreen />;
    } else {
      return <AppStackScreen />;
    }
  }
  return <AuthStackScreen />;
};
