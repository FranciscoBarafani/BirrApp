//React Native Components
import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Icon, Button } from "react-native-elements";
//Tcomb Form Native
import t from "tcomb-form-native";
const Form = t.form.Form;
import { AddBeerStruct, AddBeerOptions } from "../../forms/AddBeer";
//Avoid keyboard over input
import { KeyboardAvoidingView } from "react-native";
//Image Picker and Permissions
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//Toast
import Toast, { DURATION } from "react-native-easy-toast";
//Rating
import { Rating, AirbnbRating } from "react-native-ratings";

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
  //This function updates the component state on every form change
  onChange = formValue => {
    this.setState({
      formData: formValue
    });
  };

  render() {
    const { imageUriBeer } = this.state;
    const hopImage = require("../../../assets/LupuloImage.png");
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
              value={this.state.formData}
              //On Change propperty returns a json with the formValue
              onChange={formValue => this.onChange(formValue)}
            />
          </View>
          <View style={styles.ratingViewStyle}>
            <Rating
              type="custom"
              ratingImage={hopImage}
              ratingColor="#FFD400"
              selectedColor="#FFD400"
              ratingBackgroundColor="#FFD400"
              startingValue={0}
              ratingCount={5}
              imageSize={30}
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
          </View>
          <View style={styles.buttonViewStyle}>
            <Button
              title="Agregar"
              buttonStyle={styles.buttonStyle}
              onPress={() => console.log("Presionado")}
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
    marginBottom: 20
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 17,
    paddingBottom: 14
  },
  formStyle: {
    padding: 20
  },
  buttonViewStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  buttonStyle: {
    backgroundColor: "#FFD400"
  },
  ratingViewStyle: {
    height: 100,
    paddingLeft: 20,
    paddingRight: 20
  }
});
