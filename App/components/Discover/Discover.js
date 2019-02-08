import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
  FlatList,
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Actions } from "react-native-router-flux";
import OfflineNotice from "../OfflineNotice/OfflineNotice";
import firebase from "../FirebaseConfig/FirebaseConfig";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};
var arr = [];
export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      showArr: [],
      showUrl: [],
      showAll:[],
      xData:[],
      xInfo:[],
      nName: 'hello',
      nUrl: ''
    }
    this.getAllUser();
  }
  componentWillMount() {
    //this.getAllUser();
    // Disable back button by just returning true instead of Action.pop()
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }

  componentDidMount(){
    
  }
  getAllUser = async () => {
    instance = this;
    var allUserProfile = firebase.database().ref("Users/FaithMeetsLove/Registered");
    allUserProfile
      .endAt()
      .limitToLast(4)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {

          var key = childSnapshot.key;
          var userProfileId = childSnapshot.key;
          var childData = childSnapshot.val().profileImageURL;
          var userName = childSnapshot.val().fullName;
          childSnapshot.usr = userName;
          childSnapshot.urlProfile = childData;
          var c = childSnapshot.usr;
          var e = childSnapshot.urlProfile;
       
          arr.push({ pName: c, pUrl: e });
     
          instance.setState({ showArr: arr });
          var x = instance.state.showArr;

        });
this.setState({showAll:instance.state.showArr})
var getF=this.state.showAll;
this.setState({xData:getF})

var x=instance.state.showAll;
      }).catch(error => {
        console.log(JSON.stringify(error));
      });

  }
  
  renderAllAccount=(items)=>{
    var x=items;
    return(items.map((item)=>{
      var uriProfile=item.pUrl;
      return(
          <Card style={{backgroundColor:'grey', 
          height: Screen.height - 220,
          width: Screen.width - 80,borderRadius:10}}>
          <View style={{flexDirection:'column'}}><Image
        source={{uri:uriProfile}}
        style={{
          height: Screen.height - 260,
          width: Screen.width - 80,
          borderRadius:10,
          resizeMode: "cover"
        }}
      />
      <Text style={{fontSize:25,fontWeight:'bold'}}>{item.pName}</Text></View>
      
    </Card>
      )
    }))
    // for (let i = 0; i < items.length; i++) {
    //   var urlProfilePic=items[i].pUrl;
    // return(
    //   <Card>
    //   <Image
    //     source={{uri:urlProfilePic}}
    //     style={{
    //       height: Screen.height - 260,
    //       width: Screen.width - 100,
    //       resizeMode: "contain"
    //     }}
    //   />
    // </Card>)}
    
  }

  render() {
    return (
      <View>
        <LinearGradient
          start={{
            x: 0.51,
            y: 0.17
          }}
          end={{
            x: 0.24,
            y: 0.87
          }}
          locations={[0, 1]}
          colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
          style={styles.colorPrimaryViewLinearGradient}
        >
          <View>
            <View
              style={{
                position: "absolute",
                ...ifIphoneX({ marginTop: 30 }),
                left: 20,
                top: 20
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
              >
                Discover
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: 20,
                ...ifIphoneX({ marginTop: 30 }),
                top: 20
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Actions.drawerOpen("drawer");
                }}
              >
                <Image
                  source={require("../../../assets/images/filters-btn-2.png")}
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ position: "absolute", left: 40, top: 80, right: 40 }}>
         
            <CardStack
              style={styles.content}
              renderNoMoreCards={() => (
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    color: "gray",
                    position: "absolute",
                    left: 80,
                    top: 180,
                    right: 60
                  }}
                >No more cards :(</Text>
              )}
              ref={swiper => {
                this.swiper = swiper;
              }}
              onSwiped={() => console.log("onSwiped")}
              onSwipedLeft={() => console.log("onSwipedLeft")}
            >{this.renderAllAccount(this.state.xData)}</CardStack>
          </View>
          <View
            style={{
              position: "absolute",
              left: 50,
              bottom: 70,
              right: 40,
              ...ifIphoneX({ marginBottom: 70 })
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={() => {
                  this.swiper.swipeLeft();
                }}
              >
                <Image
                  source={require("../../../assets/images/red.png")}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.orange]}
                onPress={() => {
                  this.swiper.goBackFromLeft();
                }}
              >
                <Image
                  source={require("../../../assets/images/back.png")}
                  style={{
                    height: 35,
                    width: 35,
                    borderRadius: 18,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => {
                  this.swiper.swipeRight();
                }}
              >
                <Image
                  source={require("../../../assets/images/green.png")}
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  discoverView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  colorPrimaryViewLinearGradient: {
    height: Screen.height
  },
  buttonContainer: {
    alignSelf: "center",
    alignContent: "center",
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
