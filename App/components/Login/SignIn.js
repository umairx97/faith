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
import { RkButton, RkText } from "react-native-ui-kitten";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";

export default class SignIn extends Component {
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
  _onSubmit() {
    //const { email, password } = this.state;
    Alert.alert("Alert", "Button pressed " + this.email);
   Actions.home();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerView1}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.migoLogoImage}
          />
          <View style={styles.loginForm}>
            <View style={styles.formInput}>
              <Text>Username</Text>
              <TextInput onChangeText={value => this.setState({ email: value })}
              returnKeyLabel = {"next"}
              onChangeText={(text) => this.setState({email:text})}
               style={styles.textInput} />
            </View>
            <View style={styles.formInput}>
              <Text>Password</Text>
              <TextInput onChangeText={value => this.setState({ password: value })}
               style={styles.textInput} />
            </View>
            <Text style={styles.forgetPwd}>Forgot Password</Text>
            <View style={{ marginTop: "4%" }}>
              <RkButton
                rkType="rounded"
                style={styles.googleButton}
                onPress={() => {
                  this._onSubmit();
                }}
              >
                Login
              </RkButton>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "black",
                    height: 2,
                    flex: 1,
                    alignSelf: "center",
                    marginLeft: "12%",
                    marginTop: "4%"
                  }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    paddingHorizontal: 5,
                    fontSize: 14,
                    marginTop: "4%"
                  }}
                >
                  Or Login With
                </Text>
                <View
                  style={{
                    backgroundColor: "black",
                    height: 2,
                    flex: 1,
                    alignSelf: "center",
                    marginRight: "12%",
                    marginTop: "4%"
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",

                  marginTop: "5%"
                }}
              >
                <View style={{ flex: 1 }}>
                  <RkButton
                    rkType="rounded"
                    style={[
                      {
                        width: "100%",
                        marginRight: "2%",
                        marginVertical: 8
                      }
                    ]}
                  >
                    <Icon
                      style={[
                        styles.icon,
                        { marginHorizontal: 16, fontSize: 21 }
                      ]}
                      name="facebook"
                    />
                    <RkText rkType="caption">Facebook</RkText>
                  </RkButton>
                </View>
                <View style={{ flex: 1 }}>
                  <RkButton
                    rkType="rounded"
                    style={[
                      {
                        width: "100%",
                        marginLeft: "2%",
                        marginVertical: 8,
                        backgroundColor: '#dd4b39'
                      }
                    ]}
                  >
                    <Icon
                      style={[
                        styles.icon,
                        { marginHorizontal: 16, fontSize: 21 }
                      ]}
                      name="google"
                    />
                    <RkText rkType="caption" >Google</RkText>
                  </RkButton>
                </View>
              </View>
            </View>
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
    flexDirection: "column",
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
    marginTop: Platform.OS === 'ios' ? 10+"%" : 0,
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
