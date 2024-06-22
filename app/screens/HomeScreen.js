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
import { bakeryImages } from "../components/BakeryImages";

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
          console.log(`removed ${bakery} from favourites`);
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
    <View style={[styles.itemContainer]}>
      <View style={[styles.rooftop, { borderBottomColor: activeColors.primary }]} />
      <View style={[styles.item, { backgroundColor: activeColors.quaternary }]}>
        <Pressable
          style={styles.Pressable}
          onPress={() => {
            navigation.navigate("Map", {
              latitude: item.latitude,
              longitude: item.longitude,
            });
          }}
        >
          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, { color: activeColors.text }]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
          </View>

          <Image
            style={styles.image}
            source={bakeryImages[item.title]}
            resizeMode="cover"
          />
          <Text
            style={[styles.description, { color: activeColors.text }]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.Pressable, { color: activeColors.text }]}
          onPress={() => {
            addToFavourites(item.title);
          }}
        >
          <MaterialIcons
            style={styles.icon}
            name={favourites.has(item.title) ? "favorite" : "favorite-outline"}
            size={24}
            color={activeColors.accent}
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <FlatList
        data={data}
        renderItem={Item}
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
