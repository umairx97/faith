
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import firebase from "../FirebaseConfig/FirebaseConfig";
import GridView from "react-native-super-grid";
const items = [
  { name: "TURQUOISE", code: "#1abc9c" },
  { name: "EMERALD", code: "#2ecc71" },
  { name: "PETER RIVER", code: "#3498db" },
  { name: "AMETHYST", code: "#9b59b6" },
  { name: "WET ASPHALT", code: "#34495e" },
  { name: "GREEN SEA", code: "#16a085" },
  { name: "NEPHRITIS", code: "#27ae60" },
  { name: "BELIZE HOLE", code: "#2980b9" },
  { name: "WISTERIA", code: "#8e44ad" },
  { name: "MIDNIGHT BLUE", code: "#2c3e50" },
  { name: "SUN FLOWER", code: "#f1c40f" },
  { name: "CARROT", code: "#e67e22" },
  { name: "ALIZARIN", code: "#e74c3c" },
  { name: "CLOUDS", code: "#ecf0f1" },
  { name: "CONCRETE", code: "#95a5a6" },
  { name: "ORANGE", code: "#f39c12" },
  { name: "PUMPKIN", code: "#d35400" },
  { name: "POMEGRANATE", code: "#c0392b" },
  { name: "SILVER", code: "#bdc3c7" },
  { name: "ASBESTOS", code: "#7f8c8d" }
];

export default class Favorite extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUserId: '',
      userKey: ''
    };


  }
  async getCurrentUserId() {
    var uidUser = await firebase.auth().currentUser.uid;
    //alert(uidUser)
    this.setState({
      loginUserId: uidUser
    })
  }
  componentDidMount() {
    this.getCurrentUserId();
    this.getAllFavouriteUser();
  }
  async getAllFavouriteUser() {
    var alreadyFavouriteUser = firebase.database().ref("Users/FaithMeetsLove/FavouriteProfile/" + this.state.loginUserId);
    await alreadyFavouriteUser.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        childSnapshot.forEach(childS => {
          key = childS.key;
          this.setState({
            userKey: key
          })
          alert(key)
        })
      })
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <GridView
              itemDimension={130}
              items={items}
              style={styles.gridView}
              renderItem={item => (
                <View
                  style={[styles.itemContainer, { backgroundColor: item.code }]}
                >
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.code}</Text>
                </View>
              )}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 5,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  },
  nearbyAllUserView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  contentsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 860
  },
  iphoneXBarsTabBar5ItemsView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    height: 83
  },
  bgWhiteView: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 812
  },
  barsNavigationNearbyFiltersView: {
    backgroundColor: "rgb(248, 248, 248)",
    height: 145,
    justifyContent: "center"
  },
  tabView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 30,
    marginLeft: 16,
    marginTop: 115,
    marginRight: 14
  },
  col18vView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 176,
    height: 706,
    marginLeft: 8,
    marginTop: 9
  },
  col18vTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 176,
    height: 706,
    marginTop: 9,
    marginRight: 8
  },
  nearbyText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 34,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.32,
    marginLeft: 15
  },
  filtersBtnImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 40,
    height: 39,
    marginRight: 15
  },
  filtersView: {
    backgroundColor: "rgb(218, 217, 226)",
    height: 1
  },
  items1View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items2View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items3View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  rectangle3Image: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3ImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  augustaCastroText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  genderAgeSmallView: {
    width: "100%",
    height: "100%"
  },
  oval2Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.09,
    marginLeft: 8,
    marginRight: 8
  },
  rectangle3TwoImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3TwoImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  videosImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginTop: 7,
    marginRight: 7,
    alignSelf: "flex-end"
  },
  minaHowellText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallTwoViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  genderAgeSmallTwoView: {
    width: "100%",
    height: "100%"
  },
  textTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2TwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  rectangle3ThreeImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3ThreeImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  hettieBarberText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallThreeViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 3,
    marginBottom: 8
  },
  genderAgeSmallThreeView: {
    width: "100%",
    height: "100%"
  },
  textThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items2TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items3TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  rectangle3FourImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3FourImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  videosTwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginTop: 7,
    marginRight: 7,
    alignSelf: "flex-end"
  },
  susieDelgadoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallFourView: {
    width: "100%",
    height: "100%"
  },
  genderAgeSmallFourViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  textFourText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2ThreeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  rectangle3FiveImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3FiveImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  corneliaGilbertText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallFiveViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8,
    justifyContent: "center"
  },
  genderAgeSmallFiveView: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  oval2FourImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 9,
    height: 12,
    marginLeft: 1
  },
  rectangle3View: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 5,
    height: 2,
    marginLeft: 5
  },
  rectangle3TwoView: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 5,
    height: 2,
    marginLeft: 7,
    marginTop: 1
  },
  textFiveText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.09,
    marginLeft: 5,
    marginRight: 8
  },
  rectangle3SixImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3SixImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  claraMatthewsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallSixViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 3,
    marginBottom: 8
  },
  genderAgeSmallSixView: {
    width: "100%",
    height: "100%"
  },
  textSixText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2FiveImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  allUserText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 104, 154)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  spotlightText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 46,
    marginTop: -3
  },
  nearbyTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3,
    marginRight: 3
  },
  newText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3,
    marginRight: 43
  },
  rectangleView: {
    backgroundColor: "rgb(255, 104, 154)",
    width: 60,
    height: 3
  },
  discoverImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 22,
    marginTop: 12
  },
  neabyImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 45,
    marginTop: 12
  },
  homeIndicatorOnLightView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 34
  },
  favoriteImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    alignSelf: "center"
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    marginRight: 23
  },
  messageImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    marginRight: 45
  },
  rectangle24View: {
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: 2.5,
    width: 134,
    height: 5,
    marginTop: 20,
    alignSelf: "center"
  }
});
