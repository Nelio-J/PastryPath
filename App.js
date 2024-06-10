import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from 'expo-status-bar';

import HomeScreen from './app/screens/HomeScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import CreatePostScreen from './app/screens/CreatePostScreen';
import DataScreen from './app/screens/DataScreen';
import Map from './app/screens/MapView';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/PastryPath.png')}
    />
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [data, setData] = React.useState()
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);

        const response = await fetch('https://stud.hosted.hr.nl/1037899/pastrypath.json');
        const json = await response.json();
        setData(json);
        // console.log(json);

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" mode="modal" screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: 'tomato',
        }}>
          <Tab.Screen
            name="Home"
            options={{
              headerTitle: (props) => <LogoTitle {...props} />,
              // Add a placeholder button without the `onPress` to avoid flicker
              headerRight: () => <Button title="Update count" />,
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="home-outline"
                    size={24}
                    color={tabInfo.focused ? "red" : "#8e8e93"}
                  />
                );
              },

              // headerRight: () => (
              //   <Button
              //     onPress={() => alert('This is a button!')}
              //     title="Info"
              //     color="#000"
              //   />
              // ),
            }}>
            {(props) => <HomeScreen {...props} data={data} />}
          </Tab.Screen>
          {/* <Tab.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }}
            options={{
              headerBackTitle: 'Custom Back',
              headerBackTitleStyle: { fontSize: 30, },
            }}
          /> */}

          {/* <Tab.Screen name="CreatePost" component={CreatePostScreen} /> */}
          <Tab.Screen name="Data">
            {(props) => <DataScreen {...props} data={data} />}
          </Tab.Screen>
          <Tab.Screen name="Map">
            {(props) => <Map {...props} data={data} />}
          </Tab.Screen>
          {/* <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={({ route }) => ({ title: route.params.name })}
        /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: 'white',
    fontSize: 40,
  }
});



