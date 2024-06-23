import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../../screens/HomeScreen";
import Map from "../../screens/MapView";
import SettingsScreen from "../../screens/SettingsScreen";

import LogoTitle from "../LogoTitle";
import { ThemeContext } from "../../../context/ThemeContext";
import { colors } from "../../../config/theme";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ data }) => {
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: activeColors.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: activeColors.accent,
        tabBarInactiveTintColor: activeColors.inactive,
        tabBarStyle: { backgroundColor: activeColors.background },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="home-outline"
                size={24}
                //If this tab is selected, give it the accent colour, otherwise give it inactive
                color={
                  tabInfo.focused ? activeColors.accent : activeColors.inactive
                }
              />
            );
          },
        }}
      >
        {(props) => <HomeScreen {...props} data={data} />}
      </Tab.Screen>

      <Tab.Screen
        name="Map"
        options={{
          headerTitleAlign: "center",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="map-outline"
                size={24}
                color={
                  //If this tab is selected, give it the accent colour, otherwise give it inactive
                  tabInfo.focused ? activeColors.accent : activeColors.inactive
                }
              />
            );
          },
        }}
      >
        {(props) => <Map {...props} data={data} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitleAlign: "center",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="settings-outline"
                size={24}
                color={
                  //If this tab is selected, give it the accent colour, otherwise give it inactive
                  tabInfo.focused ? activeColors.accent : activeColors.inactive
                }
              />
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
