import React from "react";
import { StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Actions } from "react-native-router-flux";
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320
  }
});

const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("../../../assets/images/1.png"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../../../assets/images/2.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../../../assets/images/3.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  },
  {
    key: "somethun2",
    title: "Rocket guy",
    text: "out of descrption",
    image: require("../../../assets/images/4.jpg"),
    imageStyle: styles.image,
    backgroundColor: "#22bcb5"
  }
];

export default class AppSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      showRealApp: false
    };
  }

  render() {
    if (this.state.showRealApp) {
      return <AppSlider />;
    } else {
      return (
        <AppIntroSlider 
          slides={slides}
          showSkipButton={true}
          onSkip={() => {
            Actions.login();
          }}
          onDone={() => {
            Actions.login();
          }}
        />
      );
    }
  }
}
