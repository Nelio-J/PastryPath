import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import useFavourites from "../components/UseFavourites";
import Item from "../components/ListItem";

export default function HomeScreen({ navigation, data }) {
  // Access ThemeContext for dynamic light/dark mode configuration
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const { favourites, addToFavourites, fetchFavourites } = useFavourites();

  // Fetch the user's favourites from asyncstorage when the componenent loads in
  React.useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {/* Render every item from the fetched bakery location data in a Flatlist*/}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            item={item}
            navigation={navigation}
            addToFavourites={addToFavourites}
            favourites={favourites}
          />
        )}
        key={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
});
