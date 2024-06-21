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

import {
  storeData,
  getData,
  removeFavourites,
} from "../../config/asyncStorage";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation, data }) {
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const [favourites, setFavourites] = React.useState(new Set());

  React.useEffect(() => {
    fetchFavourites();
  }, []);

  const addToFavourites = async (bakery) => {
    try {
      setFavourites((prevFavourites) => {
        const updatedFavourites = new Set(prevFavourites);
        if (updatedFavourites.has(bakery)) {
          updatedFavourites.delete(bakery);
          console.log(`removed ${bakery} from favourites`)
        } else {
          updatedFavourites.add(bakery);          
          console.log(`added ${bakery} to favourites`);
        }

        const save = storeData("Favourites", Array.from(updatedFavourites));

        return updatedFavourites;
      });
    } catch (e) {
      alert(e);
    }
  };

  const fetchFavourites = async () => {
    try {
      const fav = await getData("Favourites");

      if (fav) {
        setFavourites(new Set(fav));
        console.log("All favourites:", fav);
      } else {
        console.log("Favourites list is empty");
      }
    } catch (e) {
      alert(e);
    }
  };

  // const removeFav = async () => {
  //   try {
  //     removeFavourites("Favourites");

  //     setFavourites(new Set());
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
      <Pressable
        style={[styles.Pressable, { color: activeColors.text }]}
        onPress={() => {
          addToFavourites(item.title);
        }}
      >
        <MaterialIcons
          name={favourites.has(item.title) ? "favorite" : "favorite-outline"}
          size={24}
          color={activeColors.accent}
        />
      </Pressable>
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
