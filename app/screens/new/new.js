import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

export default class NewPostScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View styles={styles.view}>
        <Text>New Post</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});
