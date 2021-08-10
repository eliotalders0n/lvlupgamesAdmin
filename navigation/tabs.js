import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { isIphoneX } from "react-native-iphone-x-helper";
import { COLORS, icons } from "../constants";
import { Feather } from "@expo/vector-icons";
import profile from "../comp/profile/Profile";
import Explore from "../comp/explore/Explore";
import Search from "../comp/search/Search";
import Inquiries from "../comp/orders/Inquiries";
import TopViewed from "../comp/explore/TopViewed";
import AvailableGames from "../comp/explore/AvailableGames";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: "#ffffff",
        }}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: "#ffffff",
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = (props) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: "#054D2B",
          }}
        ></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          left: 0,
          bottom: 11,
          right: 0,
          elevation: 0,
          borderRadius: 30,
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="Home"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? COLORS.secondary : COLORS.primary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="activity"
              size={24}
              color={focused ? COLORS.secondary : COLORS.primary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="AvailableGames"
        component={AvailableGames}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="book"
              size={24}
              color={focused ? COLORS.secondary : COLORS.primary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="TopViewed"
        component={TopViewed}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="octagon"
              size={24}
              color={focused ? COLORS.secondary : COLORS.primary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Inquiries"
        component={Inquiries}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="bell"
              size={24}
              color={focused ? COLORS.secondary : COLORS.primary}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? COLORS.secondary : COLORS.primary}
              resizeMode="contain"
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
