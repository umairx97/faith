import React, { Component } from "react";
import { Text, View } from "react-native";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
export default class Chat extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <OfflineNotice />
      </View>
    );
  }
}
