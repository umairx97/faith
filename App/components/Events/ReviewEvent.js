import React, { Component,PropTypes } from 'react'
import { Text, View, Image,ScrollView, StyleSheet, TouchableOpacity,KeyboardAvoidingView, TextInput, FlatList, ListItem, Button, Dimensions } from 'react-native'
import Slideshow from 'react-native-image-slider-show';
import { Images } from '../../../assets/imageAll';

import firebase from "react-native-firebase";
import { ifIphoneX } from "react-native-iphone-x-helper";
//import { TextInput } from 'react-native-paper';
const Screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
};
var uidUser,userName,profileImageURL;
export default class ReviewEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            text: undefined,
            interval: null,
            dataSource: [
                {
                    title: 'Title 1',
                    caption: 'Caption 1',
                    url: 'http://placeimg.com/640/480/any',
                }, {
                    title: 'Title 2',
                    caption: 'Caption 2',
                    url: 'http://placeimg.com/640/480/any',
                }, {
                    title: 'Title 3',
                    caption: 'Caption 3',
                    url: 'http://placeimg.com/640/480/any',
                },
            ],
        };
       this.getUserId();
    }
    getUserId=async()=>{
        uidUser = await firebase.auth().currentUser.uid;
this.getUserDetails();
    }
    getUserDetails=async()=>{
        var displayUserName = firebase
        .database()
        .ref("Users/FaithMeetsLove/Registered/" + uidUser);
      await displayUserName.once("value", function (snapshot) {
       // var usrName = snapshot.val().fullName;
      
        userName = snapshot.val().fullName;
        
      
       
        profileImageURL = snapshot.val().profileImageURL;
      })
    }
    onChangeText = (text) => this.setState({ text });

    // static propTypes = {
    //     onSubmit: PropTypes.func.isRequired,
    //   };
    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }
    onSubmitEditing = ({ nativeEvent: { text } }) => this.setState({ text }, this.submit);

    // Call this.props.onSubmit handler and pass the comment
    submit = () => {
      const { text } = this.state;
      if (text) {
       // this.setState({ text: undefined }, () => this.props.onSubmit(text));
      } else {
        alert('Please enter your comment first');
      }
    };
  
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    render() {
        return (  
        <View 
     
          style={{flex:1}}
          >
         <View style={{flex:0.9}}>
        <View>
            <View ><View>
                <Slideshow
                    dataSource={this.state.dataSource}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({ position })} />
            </View>
                <View style={styles.panel2View}>
                    <View style={styles.levelView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View>
                                <TouchableOpacity onPress={this.onLikePressed}>
                      <Image style={{ height: 30, width: 30, }} source={Images.likeIcon} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity onPress={this.onCommentPressed}>
                                    <Image style={{ height: 30, width: 30 }}
                                        source={Images.commentIcon} />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                    <View>

                    </View>

                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>Reviews</Text>
                    
                </View></View>
           
           
        </View>
        </View>
        <View style={{flex:0.1}}><KeyboardAvoidingView
            behavior='position'
          ><View style={styles.container}>
              {/* Comment input field */}
              <TextInput
                placeholder="Add a comment..."
                keyboardType="twitter" 
                autoFocus={true} 
                style={styles.input}
                value={this.state.text}
                onChangeText={this.onChangeText} // handle input changes
                onSubmitEditing={this.onSubmitEditing} // handle submit event
              />
              {/* Post button */}
              <TouchableOpacity
                style={styles.button}
                onPress={this.submit}
              >
                {/* Apply inactive style if no input */}
                <Text style={styles.text}>Post</Text>
              </TouchableOpacity>
            </View></KeyboardAvoidingView></View>
       
</View>
        );
    }
}

const styles = StyleSheet.create({
    panel2View: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 6,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowRadius: 5,
        shadowOpacity: 1,
        marginBottom: 8,
        marginLeft: 17,
        marginTop: 8,
        marginRight: 16
    },
    levelView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        marginBottom: 9,
        marginLeft: 1,
        marginTop: 9,
        marginRight: 1
    },
     container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});