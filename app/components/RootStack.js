import * as React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { fetchStoredTheme } from "./FetchStoredTheme";
import TabNavigator from "./TabNavigator";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootStack() {
  const [data, setData] = React.useState();
  const [appIsReady, setAppIsReady] = React.useState(false);

  // Access ThemeContext for dynamic light/dark mode configuration
  const { theme, updateTheme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  React.useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);

        // Fetch your light/dark mode preference from the local storage
        await fetchStoredTheme(updateTheme);

        // Fetch the list of bakeries from the API
        const response = await fetch(
          "https://stud.hosted.hr.nl/1037899/pastrypath.json"
        );
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        {/* TabNavigator component for bottom tab navigation */}
        <TabNavigator data={data} />
      </NavigationContainer>
    </View>
  );
}
