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
      <Text style={[styles.title, { color: activeColors.text }]}>
        Settings Screen
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { color: activeColors.text }]}>
          Toggle App Appearance
        </Text>
        <Switch
          value={colorScheme}
          onValueChange={handleSwitch}
          style={styles.switch}
        />
      </View>
      <View>
        <Button
          colorScheme={theme.mode === "light"}
          title="Light Mode"
          onPress={() => updateTheme({ mode: "light" })}
        />
        <Button
          colorScheme={theme.mode === "dark"}
          title="Dark Mode"
          onPress={() => updateTheme({ mode: "dark" })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
