import React, {
  Component
} from "react";
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
import {
  RkButton,
  RkText
} from "react-native-ui-kitten";
import {
  ScrollView
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";

var radio_props = [{
  label: "Male  ",
  value: 0
},
{
  label: "Female",
  value: 1
}
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
  _showDateTimePicker = () => this.setState({
    isDateTimePickerVisible: true
  });
  _hideDateTimePicker = () => this.setState({
    isDateTimePickerVisible: false
  });
  _handleDatePicked = date => {
    Moment.locale("en");
    const NewDate = Moment(date).format("DD-MM-YYYY");
    this._hideDateTimePicker();
    this.setState({
      dob: NewDate
    });
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    return (<ScrollView>
      <View style={
        {
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#D5C3C0",
          width: "100%"
        }
      }>
        <View style={
          {
            flex: 1,
            padding: "10%"
          }
        }>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              width: "100%"
            }
          } />
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Image source={
              require("../../../assets/images/logo.png")
            }
              style={
                {
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                  width: 90,
                  height: 90,
                  resizeMode: "contain",
                  marginBottom: 30
                }
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 20
            }
          }>
            <Text>Full Name</Text>
            <TextInput placeholder="Please enter your name"
              style={
                styles.textInput
              }
            />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Text>Username</Text>
            <TextInput placeholder="Please enter your username"
              style={
                styles.textInput
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Text>Email</Text>
            <TextInput placeholder="Please enter your emailID"
              style={
                styles.textInput
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }
          }>
            <Text>Password</Text>
            <TextInput secureTextEntry={
              true
            }
              placeholder="Please enter your Password"
              style={
                styles.textInput
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 10
            }
          }>
            <Text style={
              styles.formInput
            }>Date of Birth</Text>
            <TextInput style={
              {
                color: "#000000"
              }
            }
              placeholder="Please select your DOB"
              placeholderTextColor="#767575"
              value={
                this.state.dob
              }
              onChangeText={
                value => this.saveKey(value)
              }
              onChangeText={
                value => this.setState({
                  value
                })
              }
              onFocus={
                this._showDateTimePicker
              }
              style={
                styles.textInput
              } />
            <DateTimePicker isVisible={
              this.state.isDateTimePickerVisible
            }
              onConfirm={
                this._handleDatePicked
              }
              onCancel={
                this._hideDateTimePicker
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "row",

              marginBottom: 20,
              marginTop: 20
            }
          }>
            <Text style={
              {
                marginTop: 8,
                marginRight: 8
              }
            }>Gender</Text>
            <RadioForm radio_props={
              radio_props
            }
              initial={
                0
              }
              formHorizontal={
                true
              }
              labelHorizontal={
                true
              }
              buttonColor={
                "#2196f3"
              }
              animation={
                true
              }
              onPress={
                value => {
                  this.setState({
                    value: value
                  });
                }
              } />
          </View>
          <View style={
            {
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 20
            }
          }>
            <RkButton rkType="rounded"
              style={
                styles.googleButton
              }
              onPress={
                () => { }
              }>Register</RkButton>
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