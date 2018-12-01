import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import { RkButton, RkText } from "react-native-ui-kitten";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";

var radio_props = [
  { label: "Male  ", value: 0 },
  { label: "Female", value: 1 }
];
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isDateTimePickerVisible: false,
      dob: ""
    };
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = date => {
    Moment.locale("en");
    const NewDate = Moment(date).format("DD-MM-YYYY");
    this._hideDateTimePicker();
    this.setState({ dob: NewDate });
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#D5C3C0",
            width: "100%"
          }}
        >
          <View style={{ flex: 1, padding: "10%" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                width: "100%"
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../../../assets/images/logo.png")}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                  width: 90,
                  height: 90,
                  resizeMode: "contain",
                  marginBottom: 30
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 20
              }}
            >
              <Text>Full Name</Text>
              <TextInput
                placeholder="Please enter your name"
                style={styles.textInput}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text>Username</Text>
              <TextInput
                placeholder="Please enter your username"
                style={styles.textInput}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text>Email</Text>
              <TextInput
                placeholder="Please enter your emailID"
                style={styles.textInput}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text>Password</Text>
              <TextInput
                secureTextEntry={true}
                placeholder="Please enter your Password"
                style={styles.textInput}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 10
              }}
            >
              <Text style={styles.formInput}>Date of Birth</Text>
              <TextInput
                style={{ color: "#000000" }}
                placeholder="Please select your DOB"
                placeholderTextColor="#767575"
                value={this.state.dob}
                onChangeText={value => this.saveKey(value)}
                onChangeText={value => this.setState({ value })}
                onFocus={this._showDateTimePicker}
                style={styles.textInput}
              />
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",

                marginBottom: 20,
                marginTop: 20
              }}
            >
              <Text style={{ marginTop: 8, marginRight: 8 }}>Gender</Text>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={"#2196f3"}
                animation={true}
                onPress={value => {
                  this.setState({ value: value });
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                marginTop: 20
              }}
            >
              <RkButton
                rkType="rounded"
                style={styles.googleButton}
                onPress={() => {}}
              >
                Register
              </RkButton>
            </View>
          </View>
        </View>
      </ScrollView>

      // <ScrollView style={styles.mainContainer}>
      //   {/* <View contentContainerStyle={styles.mainContainer}> */}
      //   <View style={styles.innerView1}>
      //     {/* <Image
      //       source={require("../../../assets/images/logo.png")}
      //       style={styles.migoLogoImage}
      //     /> */}
      //     <View style={styles.loginForm}>
      //       <View style={styles.formInput}>
      //         <Text>Full Name</Text>
      //         <TextInput style={styles.textInput} />
      //       </View>
      //       <View style={styles.formInput}>
      //         <Text>Username</Text>
      //         <TextInput style={styles.textInput} />
      //       </View>
      //       <View style={styles.formInput}>
      //         <Text>Email</Text>
      //         <TextInput style={styles.textInput} />
      //       </View>
      //       <View style={styles.formInput}>
      //         <Text>Password</Text>
      //         <TextInput style={styles.textInput} />
      //       </View>
      //       <View>
      //         <Text>Date of Birth</Text>
      //         <View style={styles.textInput} />
      //       </View>
      //     </View>
      //     <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
      //       <Text style={{ marginTop: 8, marginRight: 8 }}>Gender</Text>
      //       <RadioForm
      //         radio_props={radio_props}
      //         initial={0}
      //         formHorizontal={true}
      //         labelHorizontal={true}
      //         buttonColor={"#2196f3"}
      //         animation={true}
      //         onPress={value => {
      //           this.setState({ value: value });
      //         }}
      //       />
      //     </View>
      //     <View style={{ marginTop: "4%" }}>
      //       <RkButton
      //         rkType="rounded"
      //         style={styles.googleButton}
      //         onPress={() => {}}
      //       >
      //         Register
      //       </RkButton>
      //     </View>
      //   </View>
      //   {/* </View> */}
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    flexDirection: "column",
    backgroundColor: "#D5C3C0"
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column"
    // backgroundColor: 'yellow'
  },
  innerView1: {
    flex: 1,
    padding: "10%",
    width: "100%",

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
    color: "#ffffff",
    borderColor: "red",
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

// import {
//   TouchableOpacity,
//   View,
//   Image,
//   StyleSheet,
//   ImageBackground
// } from "react-native";
// import React from "react";
// import LinearGradient from "react-native-linear-gradient";
// import { StackNavigator, SwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation";
// import Discover from "../Discover/Discover";
// import { Actions } from "react-native-router-flux";
// import {
//   Provider as PaperProvider,
//   Text,
//   Button,
//   TextInput,
//   RadioButton
// } from "react-native-paper";
// import RadioGroup from "react-native-radio-buttons-group";
// import DateTimePicker from "react-native-modal-datetime-picker";
// import { ScrollView } from "react-native-gesture-handler";

// export default class SignUp extends React.Component {
//   static navigationOptions = ({ navigation }) => {
//     const { params = {} } = navigation.state;
//     return {
//       header: null,
//       headerLeft: null,
//       headerRight: null
//     };
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       checked: "Male",
//       isDateTimePickerVisible: false
//     };
//   }
//   _handleDatePicked = date => {
//     console.log("A date has been picked: ", date);
//     this._hideDateTimePicker();
//   };
//   _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

//   _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

//   componentDidMount() {}

//   onFacebookPressed = () => {
//     this.props.navigation.navigate("UniversalTabView");
//   };

//   // onGooglePressed = () => {

//   // }

//   render() {
//     const { checked } = this.state;
//     return (
//       <PaperProvider>
//         <ImageBackground
//           source={require("../../../assets/images/bg-plainwhite.png")}
//           style={styles.MainContainer}
//         >
//           <View>
//             <TextInput
//               style={[styles.input, styles.inputText]}
//               label="Full Name"
//               Type="outlined"
//             />
//             <TextInput
//               style={[styles.input, styles.inputText]}
//               label="Username"
//               keyboardType={"email-address"}
//             />
//             <TextInput
//               style={[styles.input, styles.inputText]}
//               label="Email"
//               Type="outlined"
//             />
//             <TextInput
//               style={[styles.input, styles.inputText]}
//               label="Password"
//               Type="outlined"
//               secureTextEntry={true}
//             />
//             <View style={{ flexDirection: "row" }}>
//               <RadioButton
//                 value="Male"
//                 status={checked === "Male" ? "checked" : "unchecked"}
//                 onPress={() => {
//                   this.setState({ checked: "Male" });
//                 }}
//               />
//               <RadioButton
//                 value="Female"
//                 status={checked === "Female" ? "checked" : "unchecked"}
//                 onPress={() => {
//                   this.setState({ checked: "Female" });
//                 }}
//               />
//             </View>
//             <TouchableOpacity onPress={this._showDateTimePicker}>
//               <Text>Show DatePicker</Text>
//             </TouchableOpacity>
//             <DateTimePicker
//               isVisible={this.state.isDateTimePickerVisible}
//               onConfirm={this._handleDatePicked}
//               onCancel={this._hideDateTimePicker}
//             />
//             <Button
//               mode="contained"
//               style={styles.input}
//               onPress={_ => this.checkLogin()}
//             >
//               Register
//             </Button>
//           </View>
//         </ImageBackground>
//       </PaperProvider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     justifyContent: "center",
//     width: null,
//     height: null
//   },

//   heading: {
//     fontSize: 24,
//     textAlign: "center",
//     color: "white"
//   },
//   signupText: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     marginVertical: 12,
//     color: "#ff00"
//   },

//   signupButton: {
//     color: "#ffffff",
//     fontSize: 12,
//     fontWeight: "400",
//     marginTop: 15
//   },
//   signupButtonLeft: {
//     color: "#ffffff",
//     fontSize: 12,
//     fontWeight: "400",
//     marginTop: 10,
//     marginLeft: 8
//   },
//   signupTextStyle: {
//     color: "rgba(255,255,255,0.7)",
//     fontSize: 16
//   },
//   label: {
//     color: "white",
//     fontSize: 20
//   },
//   alignRight: {
//     alignSelf: "flex-end"
//   },
//   input: {
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 30
//   },
//   inputText: {
//     color: "white",
//     tintColor: "white",
//     textDecorationColor: "white",
//     borderColor: "white"
//   },
//   parent: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 10,
//     backgroundColor: "black"
//   },
//   img: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   imgIcon: {
//     width: 150,
//     height: 150,
//     resizeMode: "stretch",
//     alignSelf: "center",
//     marginBottom: 10,
//     marginTop: 10
//   },
//   bottom: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   buttonStyle: {
//     flex: 1
//   },

//   container: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   loginView: {
//     backgroundColor: "rgb(255, 255, 255)",
//     flex: 1
//   },
//   bgWhiteImageLinearGradient: {
//     width: 726,
//     height: 834,
//     marginLeft: -107,
//     marginTop: -18,
//     marginRight: -244
//   },
//   bgWhiteImage: {
//     resizeMode: "contain",
//     width: "100%",
//     height: "100%"
//   },
//   facebookButtonImage: {
//     resizeMode: "contain"
//   },
//   facebookButtonText: {
//     color: "rgb(255, 255, 255)",
//     fontSize: 15,
//     fontStyle: "normal",
//     fontWeight: "normal",
//     textAlign: "center",
//     lineHeight: 0,
//     letterSpacing: 0
//   },
//   facebookButton: {
//     flex: 1,
//     backgroundColor: "rgb(38, 114, 203)",
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 70,
//     height: 40,
//     paddingLeft: 10,
//     alignSelf: "center"
//   },
//   googleButtonText: {
//     color: "rgb(255, 255, 255)",
//     fontSize: 15,
//     fontStyle: "normal",
//     fontWeight: "normal",
//     textAlign: "center",
//     lineHeight: 0,
//     letterSpacing: 0
//   },
//   googleButtonImage: {
//     resizeMode: "contain"
//   },
//   googleButton: {
//     flex: 1,
//     backgroundColor: "rgb(252, 56, 80)",
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 70,
//     height: 40,
//     marginRight: 5,
//     paddingRight: 10,
//     alignSelf: "center"
//   },
//   byClickingStartYText: {
//     color: "rgb(0,0,0)",
//     fontSize: 15,
//     fontStyle: "normal",
//     fontWeight: "normal",
//     textAlign: "center",
//     lineHeight: 22,
//     letterSpacing: -0.36,
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     width: 243,
//     flex: 1,
//     alignSelf: "center",
//     justifyContent: "flex-end",
//     marginBottom: 3
//   },
//   iphoneXHomeIndicatorHomeIndicatorOnLightImage: {
//     resizeMode: "stretch",
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     width: 375,
//     height: 34
//   },
//   migoLogoImage: {
//     flex: 1,
//     resizeMode: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.0)",
//     width: 90,
//     height: 43,
//     marginTop: 25,
//     alignSelf: "center"
//   }
// });
