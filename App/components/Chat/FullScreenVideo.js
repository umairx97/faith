import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Platform,
  ScrollView,
  Dimensions,
  AsyncStorage
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";
// import Video from "react-native-video";
import Video from "rn-falcon-gifted-chat/node_modules/react-native-video";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

export default class FullScreenVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: ""
    };
  }
  async componentWillMount() {
    var url = await AsyncStorage.getItem("videoUrl");
    this.setState({
      videoUrl: url
    });
  }

  render() {
    if (this.state.videoUrl === "") return <View style={styles.container} />;
    else {
      return (
        <View style={styles.container}>
          <Video
            ref={r => {
              this.player = r;
            }}
            repeat={true}
            controls={true}
            source={{ uri: this.state.videoUrl }}
            resizeMode="cover"
            onBuffer={this.onBuffer}
            onLoadStart={this.onLoadStart}
            onError={this.videoError}
            onLoad={this.onLoad}
            style={styles.backgroundVideo}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Screen.width,
    height: Screen.height,
    ...ifIphoneX({ marginBottom: 0 }, { marginBottom: 0 })
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
