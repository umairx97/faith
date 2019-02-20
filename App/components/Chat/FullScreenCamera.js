import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  AsyncStorage
} from "react-native";
import { RNCamera, FaceDetector } from "react-native-camera";
import RNFetchBlob from "react-native-fetch-blob";
import firebase from '../FirebaseConfig/FirebaseConfig'
import { Images } from "../../../assets/imageAll"
import { Actions } from "react-native-router-flux";
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class FullScreenCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: "",
      recording: false,
      processing: "",
      image_uri: "",
      cameraType: "back",
      mirrorMode: false
    };
  }
  render() {
    if (this.state.image_uri != "") {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.image_uri }}
            style={styles.preview}
          />
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "flex-start",
              marginLeft: "30%",
              marginRight: "10%"
            }}
          >
            <TouchableOpacity
              onPress={this.rejectImage.bind(this)}
              style={styles.capture}
            >
              <Image style={styles.btnImage} source={Images.closeIcon} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "30%"
            }}
          >
            <TouchableOpacity
              onPress={this.selectImage.bind(this)}
              style={styles.cameraChange}
            >
              <Image style={styles.btnImageSelect} source={Images.tickIcon} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={this.state.cameraType}
            //type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.on}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera phone"
            }
           
          />
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "flex-start",
              marginLeft: "30%",
              marginRight: "10%"
            }}
          >
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}
            >
              <Image style={styles.btnImage} source={Images.camIcon} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "30%"
            }}
          >
            <TouchableOpacity
              onPress={this.changeCamera.bind(this)}
              style={styles.cameraChange}
            >
              <Image style={styles.btnImageRotate} source={Images.camRotate} />
            </TouchableOpacity>
          </View>
        </View>
      );
  }
  changeCamera() {
    if (this.state.cameraType === "back") {
      this.setState({
        cameraType: "front",
        mirrorMode: true
      });
    } else {
      this.setState({
        cameraType: "back",
        mirrorMode: false
      });
    }
  }
  selectImage() {
    Actions.chat();
    setTimeout(() => Actions.refresh(), 100);
  }
  rejectImage() {
    this.setState({ image_uri: "" });
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      var _name = await firebase.auth().currentUser.uid;
      await AsyncStorage.setItem("file_path", data.uri);
      await AsyncStorage.setItem("media_type", "image");
      this.setState({ image_uri: data.uri });
    }
  }
  async uploadImage(uri, uid, mime = "image/jpg") {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      let uploadBlob = null;
      var milliseconds = new Date().getTime();
      const imageRef = firebase
        .storage()
        .ref("PostImages/" + uid)
        .child(milliseconds + ".jpg");

      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  preview: {
    flex: 1,
    height: "100%",
    width: "100%"
  },
  capture: {
    position: "absolute",
    flex: 0,
    bottom: 30,
    backgroundColor: "transparent"
  },
  cameraChange: {
    position: "absolute",
    flex: 0,
    bottom: 30,
    backgroundColor: "transparent"
  },
  btnImage: {
    width: 60,
    height: 60
  },
  btnImageRotate: {
    width: 40,
    height: 40
  },btnImageSelect:{
    width: 40,
    height: 40,
    marginBottom: 5
  }
});
