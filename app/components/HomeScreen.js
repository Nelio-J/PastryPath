import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, } from 'react-native';

export default function HomeScreen({ navigation, route, data }) {
  const [count, setCount] = React.useState(0);
  console.log(data);

  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return (
    // <View style={styles.container}>
    //   <Text style={styles.Text}>RUN!!!!! THEY'RE BEHIND YOUUUUU RUUUUN!!!</Text>
    //   <StatusBar style="auto" />
    // </View>


    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>Home Screen</Text>

      <Text>Count: {count}</Text>

      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />

      <Button
        title="Go to Data Screen"
        onPress={() => navigation.navigate('Data', { data })}
      />

      <Button
        title="Go to Map Screen"
        onPress={() => navigation.navigate('Map', { data })}
      />


      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>

      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </View>
  );
}