import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  FlatList,
  Platform,
} from "react-native";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Callout } from "react-native-maps";
import * as Location from "expo-location";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import UserIcon from "../../assets/UserIcon.png";

// import BakkerijHalkImage from "../../assets/bakeries/BakkerijHalk_inside.jpg";
// import KoekelaImage from "../../assets/bakeries/Koekela_inside.jpg";
// import StAnnyBakeryImage from "../../assets/bakeries/st-anny-bakery_inside.webp";
// import BakkerijArifImage from "../../assets/bakeries/BakkerijArif.png";
// import BakkerijBartImage from "../../assets/bakeries/BakkerBart_inside.png";
// import JordysBakeryImage from "../../assets/bakeries/JordysBakery_inside.jpg";
// import BanketbakkerijvanBeekSpeckerMeentImage from "../../assets/bakeries/BanketbakkerijvanBeekSpeckerMeent_inside.jpeg";
// import BanketbakkerijvanBeekSpeckerKarelDoormanstraatImage from "../../assets/bakeries/BanketbakkerijvanBeekSpeckerKarelDoormanstraat_inside.jpeg";
// import VlaamschBroodhuysMeentImage from "../../assets/bakeries/VlaamschBroodhuysMeent.jpg";
// import DeBijenkorfImage from "../../assets/bakeries/DeBijenkorf.jpg";
// import VlaamschBroodhuysNieuweBinnenwegImage from "../../assets/bakeries/VlaamschBroodhuysNieuweBinnenweg.jpg";

export default function Map({ data, route }) {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [region, setRegion] = React.useState({
    latitude: 51.91968,
    longitude: 4.464831,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const latitude = route.params?.latitude;
  const longitude = route.params?.longitude;

  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const bakeryImages = {
    "Bakkerij Halk": require("../../assets/bakeries/BakkerijHalk_inside.jpg"),
    Koekela: require("../../assets/bakeries/Koekela_inside.jpg"),
    "St. Anny Bakery Rotterdam": require("../../assets/bakeries/st-anny-bakery_inside.webp"),
    "Bakkerij Arif": require("../../assets/bakeries/BakkerijArif.png"),
    "Bakker Bart Rotterdam Lijnbaan": require("../../assets/bakeries/BakkerBart_inside.png"),
    "Jordy's Bakery": require("../../assets/bakeries/JordysBakery_inside.jpg"),
    "Banketbakkerij van Beek & Specker Meent": require("../../assets/bakeries/BanketbakkerijvanBeekSpeckerMeent_inside.jpeg"),
    "Banketbakkerij van Beek & Specker Karel Doormanstraat": require("../../assets/bakeries/BanketbakkerijvanBeekSpeckerKarelDoormanstraat_inside.jpeg"),
    "Vlaamsch Broodhuys Meent": require("../../assets/bakeries/VlaamschBroodhuysMeent.jpg"),
    "Patisserie de Bijenkorf": require("../../assets/bakeries/DeBijenkorf.jpg"),
    "Vlaamsch Broodhuys Nieuwe Binnenweg": require("../../assets/bakeries/VlaamschBroodhuysNieuweBinnenweg.jpg"),
  };

  React.useEffect(() => {
    let locationSubscription;

    // Image.prefetch(bakeryImages["Bakkerij Halk"]);
    // Image.prefetch(bakeryImages["Koekela"]);
    // Image.prefetch(bakeryImages["St. Anny Bakery Rotterdam"]);
    // Image.prefetch(bakeryImages["Bakkerij Arif"]);
    // Image.prefetch(bakeryImages["Bakker Bart Rotterdam Lijnbaan"]);
    // Image.prefetch(bakeryImages["Jordy's Bakery"]);
    // Image.prefetch(bakeryImages["Banketbakkerij van Beek & Specker Meent"]);
    // Image.prefetch(bakeryImages["Banketbakkerij van Beek & Specker Karel Doormanstraat"]);
    // Image.prefetch(bakeryImages["Vlaamsch Broodhuys Meent"]);
    // Image.prefetch(bakeryImages["Patisserie de Bijenkorf"]);
    // Image.prefetch(bakeryImages["Vlaamsch Broodhuys Nieuwe Binnenweg"]);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let initialLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: latitude || initialLocation.coords.latitude,
        longitude: longitude || initialLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 1,
        },
        (loc) => {
          setLocation(loc);
          console.log("loc location:", loc, typeof loc);
        }
      );

      // console.log("LOCATION:", location, typeof location);
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        // showsUserLocation={true}
        // followsUserLocation={true}
        showsCompass={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
            description={"You are here"}
          >
            <Image
              source={require("../../assets/UserIcon.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        )}
        {data &&
          data.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.title}
              description={item.description}
            >
              <Callout tooltip={true}>
                <View>
                  <View
                    style={[
                      styles.bubble,
                      { backgroundColor: activeColors.primary },
                    ]}
                  >
                    <Text style={styles.name}>{item.title}</Text>
                    <Text>
                      <Image
                        style={styles.image}
                        source={bakeryImages[item.title]}
                        resizeMode="contain"
                      />
                    </Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  {/* <View style={styles.arrowBorder} />
                  <View style={styles.arrow} /> */}
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  bubble: {
    alignItems: "center",
    borderRadius: 6,
    borderColor: "red",
    borderWidth: 2,
    padding: 10,
    width: 300,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 10,
    color: "#fff",
  },
  image: {
    width: 160,
    height: 100,
    maxHeight: 150,
  },
});

