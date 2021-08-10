import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Tabs from "./navigation/tabs";
import firebase from "./firebase";
import Welcome from "./comp/Welcome";
import Inquiry from "./comp/orders/inquiry";
import Inquiries from "./comp/orders/Inquiries";
import { View, Text } from "react-native";
import Signin from "./comp/profile/Signin";
import feedback from "./comp/profile/Feedback";
import viewGames from "./comp/explore/viewGames";
import AddGames from "./comp/profile/AddGames";

import updateProfile from "./comp/profile/UpdateProfile";
import UpdateGames from "./comp/profile/manageProfile/UpdateGames";
import Update from "./comp/profile/manageProfile/Update";
import TopViewed from "./comp/explore/TopViewed";
import AvailableGames from "./comp/explore/AvailableGames";

const Stack = createStackNavigator();

const App = () => {
  const [loaded_, setLoaded] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedin(false);
      } else {
        setLoaded(true);
        setLoggedin(true);
      }
    });
  }, []);

  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Roboto-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (!loaded_) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!loggedin) {
    return (
      // <View>
      //   <Signup />
      // </View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Signin}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen
          name="inquire"
          component={Inquiry}
          options={{ headerShown: true, title: "" }}
        />

        <Stack.Screen
          name="Inquiries"
          component={Inquiries}
          options={{ headerShown: true, title: "Inquiries" }}
        />
        <Stack.Screen
          name="viewGames"
          component={viewGames}
          options={{ headerShown: true, title: "View Game" }}
        />
        <Stack.Screen
          name="AddGames"
          component={AddGames}
          options={{ headerShown: true, title: "Add Game" }}
        />
        <Stack.Screen
          name="updateProfile"
          component={updateProfile}
          options={{ headerShown: true, title: "Update profile" }}
        />
        <Stack.Screen
          name="feedback"
          component={feedback}
          options={{ headerShown: true, title: "Feedback" }}
        />
        <Stack.Screen
          name="UpdateGames"
          component={UpdateGames}
          options={{ headerShown: true, title: "Update Games" }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{ headerShown: true, title: "Update Game" }}
        />
        <Stack.Screen
          name="TopViewed"
          component={TopViewed}
          options={{ headerShown: true, title: "Top Viewed" }}
        />
        <Stack.Screen
          name="AvailableGames"
          component={AvailableGames}
          options={{ headerShown: true, title: "Available Games" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
