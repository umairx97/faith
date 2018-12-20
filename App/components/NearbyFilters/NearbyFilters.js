//
//  NearbyFilters.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Slider
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ButtonGroup } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
export default class NearbyFilters extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
      Km: 18,
      values: [18, 75]
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  getVal(val) {
    console.warn(val);
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  componentDidMount() {}
  multiSliderValuesChange = values => {
    this.setState({
      values
    });
  };
  render() {
    const buttons = ["Guys", "Girls", "Both"];
    const { selectedIndex } = this.state;
    return (
      <ScrollView>
        <View style={styles.nearbyFiltersView}>
          <View style={styles.barsNavigationFilterView}>
            <View style={styles.toplineView}>
              <TouchableOpacity onPress={this.onDonePressed}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            >
              <Text style={styles.filterText}>Filter</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              >
                <View style={styles.filtersView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contentsView}>
            <View style={styles.showMeView}>
              <Text style={styles.showMeText}>Show me</Text>

              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 50, marginTop: 15 }}
              />
            </View>
            <View style={styles.locationsView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.locationText}>Location</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 30,
                  backgroundColor: "#F5F5F5"
                }}
              >
                <Text style={styles.currentLocationText}>Current Location</Text>

                <Text style={styles.sanFranciscoText}>(San Francisco)</Text>
                <Image
                  source={require("../../../assets/images/locations.png")}
                  style={styles.locationsImage}
                />
              </View>
            </View>

            <View style={styles.distanceView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.distanceText}>Distance</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Slider
                    style={{ width: "85%", alignSelf: "center" }}
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.Km}
                    onSlidingComplete={val => this.getVal(val)}
                    onValueChange={val => this.setState({ Km: val })}
                  />
                  <Text style={styles.kmText}>{this.state.Km} Km</Text>
                </View>
              </View>
            </View>
            <View style={styles.ageView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.ageRangeText}>Age range</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text style={styles.textText}>
                    {this.state.values[0]}-{this.state.values[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch"
                  }}
                >
                  <MultiSlider
                    values={[this.state.values[0], this.state.values[1]]}
                    sliderLength={270}
                    onValuesChange={this.multiSliderValuesChange}
                    min={0}
                    max={100}
                    step={1}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  nearbyFiltersView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  barsNavigationFilterView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 70,
    justifyContent: "center"
  },
  contentsView: {
    backgroundColor: "rgb(255, 255, 255)"
  },
  iphoneXBarsTabBar5ItemsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 83
  },
  showMeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 70,
    marginLeft: 16,
    marginTop: 15,
    marginRight: 16
  },
  locationsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 83,
    marginLeft: 16,
    marginTop: 40,
    marginRight: 16
  },
  distanceView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 60,
    marginLeft: 16,
    marginTop: 30,
    marginRight: 16
  },
  ageView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 91,
    marginLeft: 16,
    marginTop: 30,
    marginRight: 16
  },
  showMeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  guysText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: -0.41,
    marginLeft: 38,
    marginTop: 28
  },
  rectangleViewLinearGradient: {
    width: 114,
    height: 18,
    alignSelf: "flex-end"
  },
  rectangleView: {
    width: "100%",
    height: "100%"
  },
  girlsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: -0.41,
    marginTop: 47,
    alignSelf: "center"
  },
  bothText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: 43,
    marginRight: 40,
    alignSelf: "flex-end"
  },
  locationText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  locationsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 20,
    height: 20,
    paddingTop: 7,
    alignSelf: "center"
  },
  sanFranciscoText: {
    color: "#BEBEBE",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: -0.41,
    paddingTop: 7
  },
  currentLocationText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 5,
    paddingTop: 7
  },
  distanceText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  kmText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "right",
    letterSpacing: -0.41
  },
  rectangle6View: {
    backgroundColor: "rgb(239, 239, 239)",
    borderRadius: 3.5,
    height: 7,
    marginBottom: 17
  },
  rectangle6CopyView: {
    width: "100%",
    height: "100%"
  },
  rectangle6CopyViewLinearGradient: {
    borderRadius: 3.5,
    width: 200,
    height: 7,
    marginBottom: 17
  },
  ageRangeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "right",
    letterSpacing: -0.41,
    marginRight: 2
  },
  rectangle6CopyTwoViewLinearGradient: {
    borderRadius: 3.5,
    width: 97,
    height: 7,
    marginLeft: 37,
    marginBottom: 16
  },
  rectangle6CopyTwoView: {
    width: "100%",
    height: "100%"
  },
  rectangle6TwoView: {
    backgroundColor: "rgb(239, 239, 239)",
    borderRadius: 3.5,
    width: 306,
    height: 7,
    marginBottom: 16
  },
  barView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    width: 0,
    height: 0
  },
  homeIndicatorOnLightImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  discoverImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  neabyImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  favoriteView: {
    backgroundColor: "rgb(193, 192, 201)",
    width: 0,
    height: 0
  },
  messageImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  toplineView: {
    backgroundColor: "rgb(248, 248, 248)",
    height: 116
  },
  filterText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 34,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.32,
    marginLeft: 15,
    marginTop: 20
  },
  filtersView: {
    backgroundColor: "rgb(218, 217, 226)",
    height: 1
  },
  doneText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 104, 154)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "right",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: 66,
    marginRight: 16,
    alignSelf: "flex-end"
  }
});
