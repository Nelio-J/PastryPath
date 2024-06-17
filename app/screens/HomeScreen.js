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
} from "react-native";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

export default function HomeScreen({ navigation, data }) {
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          navigation.navigate("Map", {
            latitude: item.latitude,
            longitude: item.longitude,
          });
        }}
      >
        <Text style={[styles.title, { color: activeColors.text }]}>
          {item.title}
        </Text>
      </Pressable>
      <Text style={[styles.description, { color: activeColors.text }]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <FlatList data={data} renderItem={Item} key={(item) => item.title} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
  },
});
