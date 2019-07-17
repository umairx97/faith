//
//  NearbyAllUser.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

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

export default class FavoritesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "Nearby"
    };
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onAllUserPressed = () => {
    this.props.navigation.navigate("Discover");
  };
  onSpotlightPressed = () => {
    //this.props.navigation.navigate('Discover');
  };
  onNearbyPressed = () => {
    this.props.navigation.navigate("NearbyFilters");
  };

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
  rectangle3ThreeImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3FourImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  genderAgeSmallFourView: {
    width: "100%",
    height: "100%"
  },
  rectangle3FiveImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  genderAgeSmallFiveView: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  rectangle3SixImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  genderAgeSmallSixView: {
    width: "100%",
    height: "100%"
  }
});
