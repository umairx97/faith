import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Platform,
} from "react-native";
import firebase from "react-native-firebase";
import { RkButton, RkText } from "react-native-ui-kitten";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    state = {
      email: "",
      password: ""
    };
  }

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  // _onSubmit() {
  //   //const { email, password } = this.state;
  //   Alert.alert("Alert", "Button pressed " + this.email);
  //   Actions.home();
  // }
  _onSubmit() {
    if (this.state.email == "") return;
    Actions.activityLoader();
    const { email } = this.state;

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(msg => {
        Alert.alert("Success", "Password reset link sent to your email id", [
          {
            text: "OK",
            onPress: () => {
              Actions.login();
            }
          }
        ]);
      })
      .catch(error => {
        Alert.alert("Authentication failed." + error.toString());
      });
  }
  render() {
    return (
      <View style={styles.container}>

        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.migoLogoImage}
        />
        <View style={styles.loginForm}>
          <View style={styles.formInput}>
            <Text>Email</Text>
            <TextInput placeholder="Please enter your email" onChangeText={value => this.setState({ email: value })}
              returnKeyLabel={"next"} autoCapitalize='none'
              onChangeText={(text) => this.setState({ email: text })}
              style={styles.textInput} />
          </View>

          <View style={{ marginTop: "4%" }}>
            <RkButton
              rkType="rounded"
              style={styles.googleButton}
              onPress={() => {
                this._onSubmit();
              }}
            >
              Reset Password
              </RkButton>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "10%",
    flexDirection: "column",
    justifyContent: "center",

    backgroundColor: "#FFFFFF"
  },
  innerView1: {
    flex: 1,
    padding: "10%",
    width: "100%",
    height: "100%",
    marginTop: "5%",
    flexDirection: "column"
  },
  forgetPwd: {
    width: "100%",
    textAlign: "right",
    marginTop: "3%",
    color: "#000"
  },
  icon: {
    color: "white"
  },
  migoLogoImage: {
    resizeMode: "contain",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: "25%",
    height: "15%",

    alignSelf: "center"
  },
  loginForm: {
    width: "100%",
    marginTop: "14%"
  },
  textInput: {
    width: "100%",
    color: "#000000",
    borderColor: "red",
    marginTop: Platform.OS === 'ios' ? 10 + "%" : 0,
    borderBottomWidth: 1
  },
  formInput: {
    width: "100%",
    marginTop: "4%"
  },
  googleButton: {
    backgroundColor: "rgb(252, 56, 80)",
    borderRadius: 24,

    width: 200,
    height: 48,

    alignSelf: "center"
  },
  facebookButton: {
    backgroundColor: "rgb(38, 114, 203)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 48,
    marginBottom: 33,
    marginTop: 100,
    alignSelf: "center",
    textAlign: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});
