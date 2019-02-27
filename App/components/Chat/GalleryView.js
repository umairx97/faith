import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";

import { Images } from "../../../assets/imageAll";
import { ifIphoneX } from "react-native-iphone-x-helper";
import Video from "react-native-video";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

export default class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL: "",
      imageArray: []
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  async componentDidMount() {
    var arr = [];
    await AsyncStorage.getItem("imageArray")
      .then(json => (arr = json))
      .catch(error => alert(error));
    let dataObj = JSON.parse(arr);
    this.setState({
      isLoading: false,
      imageArray: dataObj
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  handleBackButtonClick() {
    Actions.chat();
    return true;
  }

  ShowModalFunction(visible, imageURL) {
    this.setState({
      ModalVisibleStatus: visible,
      TempImageURL: imageURL
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.MainContainer}>
      <View style={{height:50, ...ifIphoneX({ height: 80 }),backgroundColor:'red'}}>
      <View style={{ flexDirection: 'row',...ifIphoneX({ marginTop: 30 }) }}>
              <View>
                <TouchableOpacity onPress={() => { Actions.chat() }}>
                  <Image source={Images.arrowBackIcon} style={{ height: 30, width: 30, marginTop: 10, marginLeft: 5, tintColor:'white' }}>
                  </Image>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 12, marginLeft: 8, color:'white' }}>Gallery</Text>
              </View>
            </View>

           
      </View>
        <FlatList
          data={this.state.imageArray}
          renderItem={({ item: data, index }) => (<View style={{flex:1}}>
          
            <View style={{ flexDirection: "column", margin: 1 }}>
            
              {data.image != "" ? (
                <TouchableOpacity
                  onPress={this.ShowModalFunction.bind(this, true, data.image)}
                >
                  <Image
                    style={styles.imageThumbnail}
                    source={{ uri: data.image }}
                  />
                </TouchableOpacity>
              ) : (
                <Video
                  ref={r => {
                    this.player = r;
                  }}
                  repeat={false}
                  controls={true}
                  source={{ uri: data.video }}
                  resizeMode="cover"
                  paused={Platform.OS === "ios" ? true : false}
                  muted={Platform.OS === "ios" ? false : true}
                  onBuffer={this.onBuffer}
                  onLoadStart={this.onLoadStart}
                  onError={this.videoError}
                  onLoad={this.onLoad}
                  style={{ height: 100 }}
                />
              )}
            </View>
           </View>
           )}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        {this.state.ModalVisibleStatus ? (
          <Modal
            transparent={false}
            animationType={"fade"}
            visible={this.state.ModalVisibleStatus}
            onRequestClose={() => {
              this.ShowModalFunction(!this.state.ModalVisibleStatus);
            }}
          >
            <View style={styles.modalView}>
              <Image
                style={styles.mainImage}
                source={{ uri: this.state.TempImageURL }}
              />

              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.TouchableOpacity_Style}
                onPress={() => {
                  this.ShowModalFunction(!this.state.ModalVisibleStatus);
                }}
              >
                <Image
                  source={{
                    uri:
                      "https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png"
                  }}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 0
  },

  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },

  mainImage: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "98%",
    resizeMode: "contain"
  },

  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },

  TouchableOpacity_Style: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: "absolute"
  }
});
