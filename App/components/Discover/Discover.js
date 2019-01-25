import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  BackAndroid,
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
export default class Discover extends Component {
  componentWillMount() {
    // Disable back button by just returning true instead of Action.pop()
    BackAndroid.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }
  render() {
    return (
      <View>
        <LinearGradient
          start={{
            x: 0.51,
            y: 0.17
          }}
          end={{
            x: 0.24,
            y: 0.87
          }}
          locations={[0, 1]}
          colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
          style={styles.colorPrimaryViewLinearGradient}
        >
          <View>
            <View
              style={{
                position: "absolute",
                ...ifIphoneX({ marginTop: 30 }),
                left: 20,
                top: 20
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
              >
                Discover
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: 20,
                ...ifIphoneX({ marginTop: 30 }),
                top: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.drawerOpen("drawer");
                }}
              >
                <Image
                  source={require("../../../assets/images/filters-btn-2.png")}
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ position: "absolute", left: 40, top: 80, right: 40 }}>
            <CardStack
              style={styles.content}
              renderNoMoreCards={() => (
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    color: "gray",
                    position: "absolute",
                    left: 80,
                    top: 180,
                    right: 60
                  }}
                >
                  No more cards :(
                </Text>
              )}
              ref={swiper => {
                this.swiper = swiper;
              }}
              onSwiped={() => console.log("onSwiped")}
              onSwipedLeft={() => console.log("onSwipedLeft")}
            >
              <Card>
                <Image
                  source={require("../../../assets/images/photos.png")}
                  style={{
                    height: Screen.height - 230,
                    width: Screen.width - 80,
                    resizeMode: "contain"
                  }}
                />
              </Card>
              <Card>
                <Image
                  source={require("../../../assets/images/photos.png")}
                  style={{
                    height: Screen.height - 260,
                    width: Screen.width - 80,
                    resizeMode: "contain"
                  }}
                />
              </Card>
              <Card>
                <Image
                  source={require("../../../assets/images/photos.png")}
                  style={{
                    height: Screen.height - 230,
                    width: Screen.width - 80,
                    resizeMode: "contain"
                  }}
                />
              </Card>
              <Card>
                <Image
                  source={require("../../../assets/images/rectangle-3.png")}
                  style={{
                    height: Screen.height - 230,
                    width: Screen.width - 80,
                    resizeMode: "contain"
                  }}
                />
              </Card>
              <Card>
                <Image
                  source={require("../../../assets/images/photos.png")}
                  style={{
                    height: Screen.height - 230,
                    width: Screen.width - 80,
                    resizeMode: "contain"
                  }}
                />
              </Card>
            </CardStack>
          </View>
          <View
            style={{
              position: "absolute",
              left: 50,
              bottom: 70,
              right: 40,
              ...ifIphoneX({ marginBottom: 70 })
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={() => {
                  this.swiper.swipeLeft();
                }}
              >
                <Image
                  source={require("../../../assets/images/red.png")}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.orange]}
                onPress={() => {
                  this.swiper.goBackFromLeft();
                }}
              >
                <Image
                  source={require("../../../assets/images/back.png")}
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 18,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => {
                  this.swiper.swipeRight();
                }}
              >
                <Image
                  source={require("../../../assets/images/green.png")}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  discoverView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  colorPrimaryViewLinearGradient: {
    height: Screen.height
  },
  buttonContainer: {
    alignSelf: "center",
    alignContent: "center",
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
