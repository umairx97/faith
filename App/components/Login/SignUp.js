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
  TouchableOpacity,
  Image,
  Alert,
  Platform
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
    return ( < ScrollView contentContainerStyle = {
          {
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: "#FFFFFF",
          }
        }
     >
      <View>
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
            <Text style={styles.formInput}> Username</Text>
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
            <Text style={styles.formInput}>Email</Text>
            <TextInput placeholder="Please enter your email"
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
            <Text style={styles.formInput}>Password</Text>
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
            <Text >Date of Birth</Text>
             <TouchableOpacity
             onPress = {
               this.onFacebookPressed
             } >
            <TextInput style={
              {
                color: "#000000"
              }
            }
              placeholder="Please select your DOB"
            
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
              } /></TouchableOpacity>
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

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    flexDirection: "column",
    backgroundColor: "#FFFFFF"
  },
  mainContainer: {
    flex: 1,
    
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