import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
  Pressable,
  useColorScheme,
  Switch,
} from "react-native";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { Feather } from "@expo/vector-icons";

export default function SettingsScreen({}) {
  const { theme, updateTheme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [colorScheme, setColorScheme] = React.useState(theme.mode === "dark");

  const handleSwitch = () => {
    setColorScheme((previousState) => !previousState);
    updateTheme();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View>
        {/* <Text style={[styles.title, { color: activeColors.text }]}>
          Settings Screen
        </Text> */}
        <Text style={[styles.subTitle, { color: activeColors.text }]}>
          Update your settings here
        </Text>
      </View>

      <Text
        style={[
          styles.settingHeader,
          { color: activeColors.text, borderColor: activeColors.text },
        ]}
      >
        Preferences
      </Text>

      {/* <View style={styles.switchContainer}>
        <Text style={[styles.text, { color: activeColors.text }]}>
          Toggle App Appearance
        </Text>
        <Switch
          value={colorScheme}
          onValueChange={handleSwitch}
          style={styles.switch}
        />
      </View> */}
      <View style={[styles.buttonContainer, { borderColor: activeColors.text }]}>
        <Pressable
          style={[
            styles.Pressable,
            {
              backgroundColor:
                theme.mode === "light"
                  ? activeColors.quinary
                  : activeColors.background,
              borderColor: activeColors.text,
            },
          ]}
          onPress={() => updateTheme({ mode: "light" })}
        >
          <Feather name="sun" size={28} color={activeColors.text} />
        </Pressable>

        <Pressable
          style={[
            styles.Pressable,
            {
              backgroundColor:
                theme.mode === "dark"
                  ? activeColors.quinary
                  : activeColors.background,
              borderColor: activeColors.text,
            },
          ]}
          onPress={() => updateTheme({ mode: "dark" })}
        >
          <Feather name="moon" size={28} color={activeColors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 24,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  text: {
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  subTitle: {
    marginBottom: 40,
    alignSelf: "center"
  },
  settingHeader: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    paddingTop: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  Pressable: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    position: "relative",
  },
});
