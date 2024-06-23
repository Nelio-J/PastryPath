import * as React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

export const LocationMarker = ({ locationData }) => {
  return (
    // Add a marker at the given coordinates
    <Marker
      coordinate={{
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      }}
      title={"Your Location"}
      description={"You are here"}
    >

      {/* Add a custom marker for the user's location */}
      <Image
        source={require("../../../assets/UserIcon.png")}
        style={{ width: 40, height: 40 }}
      />
    </Marker>
  );
};
