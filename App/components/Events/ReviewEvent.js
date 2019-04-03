import React, { Component, PropTypes } from 'react'
import {
  Text, View, Image, ScrollView,
  StyleSheet, AsyncStorage, TouchableOpacity,
  KeyboardAvoidingView,
  TextInput, FlatList, ListItem, Button, Dimensions
} from 'react-native'
import Slideshow from 'react-native-image-slider-show';
import { Images } from '../../../assets/imageAll';
import moment from "moment";
import firebase from "react-native-firebase";
import { ifIphoneX } from "react-native-iphone-x-helper";
//import { TextInput } from 'react-native-paper';
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
var uidUser, userName, profileImageURL, eventKey, milliseconds;
var arr = [];
export default class ReviewEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      text: undefined,
      interval: null,
      showArr: [],
      isLike: false,
      likeUpdatedTime: 0,
      likeColorCode: "black",
      likeText: "",
      likeCount: "",
      commentText: "",
      commentCount: "",
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
  getUserId = async () => {
    uidUser = await firebase.auth().currentUser.uid;
    eventKey = await AsyncStorage.getItem("event_key");
    // alert(eventKey)

    this.getUserDetails();
    this.getUserComments();
    //setInterval(() => this.getUserComments(), 8000);  }
  }
  componentDidMount() {
    this.getUserComments();
    setInterval(() => this.getUserComments(), 50000)
    this.getTotalLikes();
    setInterval(() => this.getTotalLikes(), 5000)
  }
  getUserComments = () => {
    var key;
    arr = [];
    var x = eventKey
    var recentPostsRef = firebase
      .database()
      .ref("Users/FaithMeetsLove/Event/EventComments/" + eventKey).orderByChild('time_stamp');
    recentPostsRef.once("value").then(snapshot => {

      var keys = snapshot.key;
      snapshot.forEach(childSnapshot => {
        var keyd = childSnapshot.key;
        var msg = childSnapshot.val().comment_Msg;
        var userID = childSnapshot.val().uid;
        var timeStamp = childSnapshot.val().time_stamp;
        var usersName = childSnapshot.val().user_Name;
        var userPic = childSnapshot.val().user_ProfilePic;
        var time = moment(timeStamp).format("h:mm:ss DD-MM-YYYY");
        arr.push({
          _id: userID,
          _userName: usersName,
          _msg: msg,
          _userPic: userPic,
          _time: time
        })
        // childSnapshot.forEach(children => {
        //   key = children.key;
        // })
      })
    })
    this.setState({
      showArr: arr
    })
    //  alert(key)
  }
  getUserDetails = async () => {
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

    milliseconds = new Date().getTime();
    firebase.database().ref("Users/FaithMeetsLove/Event/EventComments/" + eventKey).push({
      comment_Msg: text,
      time_stamp: milliseconds,
      uid: uidUser,
      user_Name: userName,
      user_ProfilePic: profileImageURL,

    })
    this.getUserComments();
    this.setState({
      text: ''
    })
    //   if (text) {
    //    // this.setState({ text: undefined }, () => this.props.onSubmit(text));
    //   } else {
    //     alert('Please enter your comment first');
    //   }
  };
  getTotalLikes = async () => {
    var recentPostsLike = firebase
      .database()
      .ref("Users/FaithMeetsLove/Event/Likes/" + eventKey + "/" + uidUser);
    recentPostsLike.once("value").then(snapshot => {
      console.log(snapshot.val());
      var like = snapshot.val().is_like;
      var updated_time = snapshot.val().updated_time;
      if (like) {
        this.setState({
          isLike: like,
          likeUpdatedTime: updated_time,
          likeColorCode: "blue"
        });
      } else {
        this.setState({
          isLike: like,
          likeUpdatedTime: updated_time,
          likeColorCode: "black"
        });
      }
    });

    var totalPostsLike = firebase
      .database()
      .ref("Users/FaithMeetsLove/Event/Likes/" + eventKey);
    totalPostsLike
      .once("value")
      .then(snapshot => {
        if (snapshot.numChildren() == 1) {
          this.setState({
            likeText: " like ",
            likeCount: snapshot.numChildren()
          });
        } else if (snapshot.numChildren() > 1) {
          this.setState({
            likeText: " likes ",
            likeCount: snapshot.numChildren()
          });
        } else if (snapshot.numChildren() <= 0) {
          this.setState({
            likeText: "",
            likeCount: ""
          });
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
    //   var totalPostsComment = firebase
    //   .database()
    //   .ref("Users/FaithMeetsLove/Event/EventComments/" + eventKey);
    // var commentCount = 0;
    // await totalPostsComment
    //   .once("value")
    //   .then(snapshot => {
    //     snapshot.forEach(childSnapshot => {
    //       commentCount = commentCount + childSnapshot.numChildren();
    //     });
    //   })
    //   .catch(error => {
    //     alert(JSON.stringify(error));
    //   });
    // if (commentCount == 1) {
    //   this.setState({
    //     commentText: " comment ",
    //     commentCount: commentCount
    //   });
    // } else if (commentCount > 1) {
    //   this.setState({
    //     commentText: " comments ",
    //     commentCount: commentCount
    //   });
    // } else if (commentCount <= 0) {
    //   this.setState({
    //     commentText: " ",
    //     commentCount: ""
    //   });
    // }

  };

  likePost = () => {

    var milliseconds = new Date().getTime();
    var like;
    if (this.state.isLike) {
      like = false;
      this.setState({
        isLike: like,
        likeUpdatedTime: milliseconds,
        likeColorCode: "black"
      });
    } else {
      like = true;
      this.setState({
        isLike: like,
        likeUpdatedTime: milliseconds,
        likeColorCode: "blue"
      });
    }
    if (!like) {
      firebase
        .database()
        .ref("Users/FaithMeetsLove/Event/Likes/" + eventKey)
        .child(uidUser)
        .remove();
      this.getTotalLikes();
    } else
      firebase
        .database()
        .ref("Users/FaithMeetsLove/Event/Likes/" + eventKey + "/" + uidUser)
        .set({
          is_like: like,
          updated_time: milliseconds
        })
        .then(ref => {
          this.getTotalLikes();
        })
        .catch(error => {
          //this.setState({ ...this.state, progressVisible: false });
          this.getTotalLikes();
          Alert.alert("failed" + error.toString());
        });
        this.getComments();
  }
  getComments=()=>{
   if(this.state.likeCount != "") 
       {
        return(
          <View style={{ height: (Screen.height - (Screen.height / 3)) - 90, ...ifIphoneX({ height: (Screen.height - (Screen.height / 3)) - 140 }) }}><FlatList
            style={{ marginBottom: 100 }}
            data={this.state.showArr}
            legacyImplementation={true}
            renderItem={({ item }) => (
    
              <View style={{ flexDirection: 'row', marginTop: 10, }}>
                <View>
                  <Image source={{ uri: item._userPic }} style={{
                    height: 70,
                    marginLeft: 10,
                    width: 70,
                    borderRadius: 35,
                  }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
    
                  <View><Text style={{
                    fontSize: 18, marginLeft: 17,
                    fontWeight: '500'
                  }}>{item._userName}</Text></View>
                  <View><Text style={{ fontSize: 16, marginLeft: 17, marginTop: 5, width: Screen.width - 100 }}>{item._msg}</Text></View>
                  <View><Text style={{ marginLeft: 17, marginTop: 8 }}>{item._time}</Text></View>
                </View>
              </View>
    
            )}
            keyExtractor={item => item.user_name}
            ItemSeparatorComponent={this.renderSeparator}
          /></View>
    
    )
       }              
    else
    {
      
      return(
        <View style={{ height: (Screen.height - (Screen.height / 3)) - 80, ...ifIphoneX({ height: (Screen.height - (Screen.height / 3)) - 130 }) }}><FlatList
          style={{ marginBottom: 100 }}
          data={this.state.showArr}
          legacyImplementation={true}
          renderItem={({ item }) => (
  
            <View style={{ flexDirection: 'row', marginTop: 10, }}>
              <View>
                <Image source={{ uri: item._userPic }} style={{
                  height: 70,
                  marginLeft: 10,
                  width: 70,
                  borderRadius: 35,
                }} />
              </View>
              <View style={{ flexDirection: 'column' }}>
  
                <View><Text style={{
                  fontSize: 18, marginLeft: 17,
                  fontWeight: '500'
                }}>{item._userName}</Text></View>
                <View><Text style={{ fontSize: 16, marginLeft: 17, marginTop: 5, width: Screen.width - 100 }}>{item._msg}</Text></View>
                <View><Text style={{ marginLeft: 17, marginTop: 8 }}>{item._time}</Text></View>
              </View>
            </View>
  
          )}
          keyExtractor={item => item.user_name}
          ItemSeparatorComponent={this.renderSeparator}
        /></View>
  
  )
    }
   
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    return (
      <View

        style={{ flex: 1, ...ifIphoneX({ marginTop: 31 }) }}
      >
        <View style={{ flex: 0.9 }}>
          <View>
            <View ><View>
              <Slideshow
                height={Screen.height / 3}
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} />
            </View>
              <View style={styles.buttonGroupContainer}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    this.likePost();
                  }}
                >
                  <Text
                    style={[styles.buttonText, { color: this.state.likeColorCode }]}
                  >
                    Like
              </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    this.refs.myInput.focus()
                  }}
                >
                  <Text style={styles.buttonText}>Comment</Text>
                </TouchableOpacity>

              </View>

              {/* <View style={styles.panel2View}>
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

              </View> */}



              <View>
                <View
                  style={
                    this.state.likeCount || this.state.commentCount != ""
                      ? styles.buttonGroup2Container
                      : { height: 0 }
                  }
                >
                  <Text
                    style={[styles.buttonText, { color: "black", marginTop: 8 }]}
                  >
                    {this.state.likeCount + this.state.likeText}
                  </Text>
                  <Text
                    style={[styles.buttonText, { color: "black", marginTop: 8 }]}
                  >
                    {this.state.likeCount != "" && this.state.commentCount != ""
                      ? "◉ " + this.state.commentCount + this.state.commentText
                      : this.state.commentCount + this.state.commentText}
                  </Text>
                </View>
                <View
                  style={
                    this.state.likeCount || this.state.commentCount != ""
                      ? styles.line
                      : {}
                  }
                />
              </View>
              <View style={{ marginTop: 10, }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>Reviews</Text>
              {this.getComments()}
            </View>
            </View>

          </View>
        </View>
        <View style={{ flex: 0.1 }}><KeyboardAvoidingView
          behavior='position'
        ><View style={styles.container}>
            {/* Comment input field */}
            <TextInput
              placeholder="Add a comment..."
              keyboardType="twitter"
              autoFocus={true}
              style={styles.input}
              ref="myInput"
              value={this.state.text}
              clearButtonMode='always'
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
  buttonGroupContainer: {
    height: 40,
    flexDirection: "row"
  },
  buttonGroup2Container: {
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  line: {
    height: 0.5,
    backgroundColor: "#BDBDBD",
    marginTop: 5
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 14
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