import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

export default class AccountScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View styles={styles.view}>
        <Text>My Account</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});
