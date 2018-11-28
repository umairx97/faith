import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";
import Discover from "../Discover/Discover";
import { Actions } from "react-native-router-flux";
import {
  Provider as PaperProvider,
  Text,
  Button,
  TextInput,
  RadioButton
} from "react-native-paper";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class SignUp extends React.Component {
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
      checked: "Male",
      isDateTimePickerVisible: false
    };
  }
  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this._hideDateTimePicker();
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  componentDidMount() {}

  onFacebookPressed = () => {
    this.props.navigation.navigate("UniversalTabView");
  };

  // onGooglePressed = () => {

  // }

  render() {
    const { checked } = this.state;
    return (
      <PaperProvider>
        <ImageBackground
          source={require("../../../assets/images/bg-plainwhite.png")}
          style={styles.MainContainer}
        >
          <View>
            <TextInput
              style={[styles.input, styles.inputText]}
              label="Full Name"
              Type="outlined"
            />
            <TextInput
              style={[styles.input, styles.inputText]}
              label="Username"
              keyboardType={"email-address"}
            />
            <TextInput
              style={[styles.input, styles.inputText]}
              label="Email"
              Type="outlined"
            />
            <TextInput
              style={[styles.input, styles.inputText]}
              label="Password"
              Type="outlined"
              secureTextEntry={true}
            />
            <View style={{ flexDirection: "row" }}>
              <RadioButton
                value="Male"
                status={checked === "Male" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ checked: "Male" });
                }}
              />
              <RadioButton
                value="Female"
                status={checked === "Female" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ checked: "Female" });
                }}
              />
            </View>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text>Show DatePicker</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
            <Button
              mode="contained"
              style={styles.input}
              onPress={_ => this.checkLogin()}
            >
              Register
            </Button>
          </View>
        </ImageBackground>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    width: null,
    height: null
  },

  heading: {
    fontSize: 24,
    textAlign: "center",
    color: "white"
  },
  signupText: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 12,
    color: "#ff00"
  },

  signupButton: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 15
  },
  signupButtonLeft: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 10,
    marginLeft: 8
  },
  signupTextStyle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16
  },
  label: {
    color: "white",
    fontSize: 20
  },
  alignRight: {
    alignSelf: "flex-end"
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30
  },
  inputText: {
    color: "white",
    tintColor: "white",
    textDecorationColor: "white",
    borderColor: "white"
  },
  parent: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "black"
  },
  img: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imgIcon: {
    width: 150,
    height: 150,
    resizeMode: "stretch",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonStyle: {
    flex: 1
  },

  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  loginView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  bgWhiteImageLinearGradient: {
    width: 726,
    height: 834,
    marginLeft: -107,
    marginTop: -18,
    marginRight: -244
  },
  bgWhiteImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  },
  facebookButtonImage: {
    resizeMode: "contain"
  },
  facebookButtonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 0,
    letterSpacing: 0
  },
  facebookButton: {
    flex: 1,
    backgroundColor: "rgb(38, 114, 203)",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    paddingLeft: 10,
    alignSelf: "center"
  },
  googleButtonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 0,
    letterSpacing: 0
  },
  googleButtonImage: {
    resizeMode: "contain"
  },
  googleButton: {
    flex: 1,
    backgroundColor: "rgb(252, 56, 80)",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    marginRight: 5,
    paddingRight: 10,
    alignSelf: "center"
  },
  byClickingStartYText: {
    color: "rgb(0,0,0)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: -0.36,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 243,
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    marginBottom: 3
  },
  iphoneXHomeIndicatorHomeIndicatorOnLightImage: {
    resizeMode: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 375,
    height: 34
  },
  migoLogoImage: {
    flex: 1,
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 90,
    height: 43,
    marginTop: 25,
    alignSelf: "center"
  }
});
