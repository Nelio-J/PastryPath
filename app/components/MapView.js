import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, Platform } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [region, setRegion] = React.useState({
        latitude: 51.919680,
        longitude: 4.464831,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    });
    const [markers, setMarkers] = React.useState([]);

    React.useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location, typeof location);

            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                <Marker
                    coordinate={{
                        latitude: 51.91633654534601,
                        longitude: 4.469011288228148,
                    }}
                    title={"Pastry Path"}
                    description={"The best pastry shop in town!"}
                />
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={"Your Location"}
                        description={"You are here"}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});