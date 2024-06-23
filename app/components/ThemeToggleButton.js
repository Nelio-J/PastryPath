import * as React from "react";
import { StyleSheet, Pressable } from "react-native";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { Feather } from "@expo/vector-icons";

export const ThemeToggleButton = ({ mode, icon }) => {
  // Access ThemeContext for dynamic light/dark mode configuration
  const { theme, updateTheme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <Pressable
      style={[
        styles.Pressable,
        {
          backgroundColor:
            theme.mode === mode
              ? activeColors.quinary
              : activeColors.background,
          borderColor: activeColors.text,
        },
      ]}
      onPress={() => updateTheme({ mode })}
    >
      <Feather name={icon} size={28} color={activeColors.text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
