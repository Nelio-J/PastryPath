import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import MapView from "react-native-maps";
import * as Location from "expo-location";

import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { LocationMarker } from "../components/Markers/LocationMarker";
import { BakeryMarker } from "../components/Markers/BakeryMarker";

import { mapStyle } from "../components/map/MapStyle";

export default function Map({ data, route }) {
  const [location, setLocation] = React.useState(null); // State to hold the user's current location
  const [errorMsg, setErrorMsg] = React.useState(null); // State to manage the map region
  const [region, setRegion] = React.useState({
    latitude: 51.91968,
    longitude: 4.464831,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  // Checks if route.params exists and is not null or undefined. If not, it latitude/longitude will be 'undefined', but the rest of the code still works.
  const latitude = route.params?.latitude;
  const longitude = route.params?.longitude;

  // Access ThemeContext for dynamic light/dark mode configuration
  const { theme } = React.useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  React.useEffect(() => {
    let locationSubscription;

    (async () => {
      // Request the user for permission to access their location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the user's current location
      let initialLocation = await Location.getCurrentPositionAsync({});

      // Set the initial map region based on user's coords or passed latitude and longitude (passed along from the home screen)
      setRegion({
        latitude: latitude || initialLocation.coords.latitude,
        longitude: longitude || initialLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      // Track the user's live location and update it when the user's location changes
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 1,
        },
        (loc) => {
          setLocation(loc);
          // console.log("loc location:", loc, typeof loc);
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove(); // Clean up the live location subscription when the location update is finished
      }
    };
  }, [latitude, longitude]); //O

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // Setting the current region for the map view
        showsCompass={true} // Showing a compass on the map
        customMapStyle={theme.mode === "dark" ? mapStyle : []} // Applying custom map style based on the current theme
      >
        {/* Render the user's location marker */}
        {location && <LocationMarker locationData={location} />}

        {/* Render a marker for each bakery location from the fetched data*/}
        {data &&
          data.map((item, index) => <BakeryMarker key={index} item={item} />)}
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
});
