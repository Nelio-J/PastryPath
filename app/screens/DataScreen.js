import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, FlatList, } from 'react-native';

export default function DataScreen({ data }) {
  
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Fetched Data:</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text>{JSON.stringify(item)}</Text>
            </View>
          )}
        />
      </View>
    );
  }