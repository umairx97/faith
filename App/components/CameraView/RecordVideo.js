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

export default class RecordVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: "",
      recording: false,
      processing: "",
      video_url: ""
    };
  }
  render() {
    const { recording, processing } = this.state;
    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}
      >
        <Image style={styles.btnImage} source={Images.red} />
      </TouchableOpacity>
    );
    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}
        >
          <Image style={styles.btnImage} source={Images.red} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          {button}
        </View>
      </View>
    );
  }
  stopRecording() {
    this.camera.stopRecording();
  }
  async startRecording() {
    if (this.camera) {
      this.setState({ recording: true });
      const { uri, codec = "mp4" } = await this.camera.recordAsync();
      this.setState({ recording: false, processing: true });
      const type = `video/${codec}`;
      console.log(uri);
      var _name = await firebase.auth().currentUser.uid;
      AsyncStorage.setItem("file_path", uri);
      await AsyncStorage.setItem("media_type", "video");
      Actions.pop();
      setTimeout(() => Actions.refresh(), 300);
      //Actions.askPage()
      // this.uploadVideo(uri, _name, type)
      //   .then(url => {
      //     alert("uploaded");
      //     this.setState({ processing: false });
      //     this.setState({ video_url: url });
      //   })
      //   .catch(error => console.log(error));
    }
  }
  async uploadVideo(uri, uid, mime) {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      let uploadBlob = null;
      var milliseconds = new Date().getTime();
      const imageRef = firebase
        .storage()
        .ref("PostVideos/" + uid)
        .child(milliseconds + ".mp4");

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
    bottom: 15,
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  btnImage: {
    alignSelf: "stretch",
    alignItems: "stretch",
    width: 60,
    height: 60
  }
});
