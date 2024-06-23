import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { Marker } from "react-native-maps";
import { Callout } from "react-native-maps";

import { colors } from "../../../config/theme";
import { ThemeContext } from "../../../context/ThemeContext";

import { bakeryImages } from "../../components/BakeryImages";

export const BakeryMarker = ({ item }) => {
  // Access ThemeContext for dynamic light/dark mode configuration
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    // Add a marker at the given coordinates
    <Marker
      coordinate={{
        latitude: item.latitude,
        longitude: item.longitude,
      }}
      title={item.title}
      description={item.description}
    >
      {/* Customize the bubble that pops up when you click on a marker on the map */}
      <Callout tooltip={true}>
        <View>
          <View
            style={[styles.bubble, { backgroundColor: activeColors.primary }]}
          >
            <Text style={styles.name}>{item.title}</Text>

            {/* Add a custom image of the corresponding bakery to the pop out bubble. <Image> needs to nested inside <Text> in order to display*/}
            <Text style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={bakeryImages[item.title]}
                resizeMode="cover"
              />
            </Text>

            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  bubble: {
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
    width: 200,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    padding: 4,
    textAlign: "center",
    position: "relative",
    bottom: 20,
  },
  image: {
    width: 160,
    height: 100,
    maxHeight: 150,
    marginTop: 10,
    alignSelf: "center",
  },
  imageContainer: {
    height: 150,
    position: "relative",
    bottom: 40,
  },
});
