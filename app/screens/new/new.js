import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Icon } from "react-native-elements";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { AddBeerStruct, AddBeerOptions } from "../../forms/AddBeer";
import { KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Toast, { DURATION } from "react-native-easy-toast";

export default class NewPostScreen extends Component {
  constructor() {
    super();
    this.state = {
      imageUriBeer: "",
      formData: {
        name: "",
        description: "",
        bar: ""
      }
    };
  }
  //This function checks if there is an image already, if not it assigns a default one
  hasImage = image => {
    if (image) {
      return (
        <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/no-image-icon-13.jpg")}
          style={{ width: "100%", height: 200 }}
        />
      );
    }
  };
  //This functions open gallery to pick an image
  uploadImage = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied") {
      this.refs.toast.show(
        "Es necesario aceptar los permisos de la galeria",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      if (result.cancelled) {
        this.refs.toast.show("Has cerrado la galeria de imagenes", 1500);
      } else {
        this.setState({
          imageUriBeer: result.uri
        });
      }
    }
  };

  render() {
    const { imageUriBeer } = this.state;
    return (
      <ScrollView style={styles.view}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.viewPhoto}>{this.hasImage(imageUriBeer)}</View>
          <View style={styles.viewIconUploadPhoto}>
            <Icon
              name="camera"
              type="material-community"
              color="#7A7A7A"
              iconStyle={styles.addPhotoIcon}
              onPress={() => this.uploadImage()}
            />
          </View>
          <View style={styles.formStyle}>
            <Form
              ref="addBeerForm"
              type={AddBeerStruct}
              options={AddBeerOptions}
            />
          </View>
          <Toast
            ref="toast"
            position="bottom"
            positionValue={320}
            fadeInDuration={1000}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: "#fff" }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  viewPhoto: {
    height: 200,
    marginBottom: 20,
    paddingTop: 20
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 17,
    paddingBottom: 14
  },
  formStyle: {
    padding: 20
  }
});
