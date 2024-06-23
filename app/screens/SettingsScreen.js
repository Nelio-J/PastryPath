import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { ThemeToggleButton } from "../components/common/ThemeToggleButton";

export default function SettingsScreen({}) {
  // Access ThemeContext for dynamic light/dark mode configuration
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View>
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

      <View
        style={[styles.buttonContainer, { borderColor: activeColors.text }]}
      >
        <ThemeToggleButton mode="light" icon="sun" />

        <ThemeToggleButton mode="dark" icon="moon" />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  subTitle: {
    marginBottom: 40,
    alignSelf: "center",
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
});
