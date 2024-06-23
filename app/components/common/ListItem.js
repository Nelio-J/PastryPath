import * as React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

import { colors } from "../../../config/theme";
import { ThemeContext } from "../../../context/ThemeContext";

import { MaterialIcons } from "@expo/vector-icons";
import { bakeryImages } from "../common/BakeryImages";

const Item = ({ item, navigation, addToFavourites, favourites }) => {
  // Access ThemeContext for dynamic light/dark mode configuration
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  return (
    <View style={[styles.itemContainer]}>

      {/* Display a rooftop above each item container. The rooftop is just a triangle made with CSS borders */}
      <View
        style={[styles.rooftop, { borderBottomColor: activeColors.primary }]}
      />

      <View style={[styles.item, { backgroundColor: activeColors.quaternary }]}>
        <Pressable
          style={styles.Pressable}
          // Navigate to the clicked bakery's location on the Map screen
          onPress={() => {
            navigation.navigate("Map", {
              latitude: item.latitude,
              longitude: item.longitude,
            });
          }}
        >
          <View style={styles.titleContainer}>
            {/* Display the bakery's title, truncate (...) the title if it goes passed 3 lines of text */}
            <Text
              style={[styles.title, { color: activeColors.text }]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </View>

          {/* Display an image of the bakery */}
          <Image
            style={styles.image}
            source={bakeryImages[item.title]}
            resizeMode="cover"
          />

          {/* Display the bakery's description, truncate (...) the description if it goes passed 3 lines of text */}
          <Text
            style={[styles.description, { color: activeColors.text }]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </Pressable>

        {/* Add a 'favorite' icon to each item in the list. When pressed, it either adds or removes the item from the user's favourites */}
        <Pressable
          style={[styles.Pressable, { color: activeColors.text }]}
          onPress={() => {
            addToFavourites(item.title);
          }}
        >
          <MaterialIcons
            style={styles.icon}
            // If an item is already in favourites, use the 'favorite' icon, else the use 'favorite-outline' icon
            name={favourites.has(item.title) ? "favorite" : "favorite-outline"}
            size={24}
            color={activeColors.accent}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 8,
    borderRadius: 20,
    maxWidth: "45%",
    position: "relative",
    height: 280,
  },
  rooftop: {
    width: 0,
    height: 0,
    borderLeftWidth: 85,
    borderRightWidth: 85,
    borderBottomWidth: 40,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -70,
    zIndex: 2,
  },
  item: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 20,
    position: "relative",
    height: 250,
    width: 160,
    elevation: 10,
  },
  Pressable: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleContainer: {
    height: 72,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  image: {
    maxHeight: 60,
    maxWidth: 140,
  },
  icon: {
    bottom: -5,
    right: 0,
    position: "absolute",
  },
});

export default Item;
