import React, { Component } from 'react'
import { Text, View, ListItem, FlatList, BackHandler } from 'react-native'
import firebase from "../FirebaseConfig/FirebaseConfig";
var arr=[];
export default class Matches extends Component {
    constructor() {
        super();
        this.state = {
            FullName: '',
            ImageProfileUrl: '',
            Gender: 0
        }
        // this.getCurrentUserId();
        // this.getLikedProfile();
    }

    // async componentDidMount() {
    //     // var jeck =await  AsyncStorage.getItem("userProfileKeys");
    //     // alert(jeck)
    //     BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
    // }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
    // }

    // backAndroid() {
    //     Actions.pop() // Return to previous screen
    //     return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
    // }
    // getCurrentUserId = async () => {
    //     var uidUser = await firebase.auth().currentUser.uid;
    //     this.setState({
    //         loginUserId: uidUser
    //     })
    // }
    // getLikedProfile = async () => {

    //     arr = [];
    //     //  var bb = this.state.loginUserId;
    //     var uidUser = await firebase.auth().currentUser.uid;
    //     var xfs = uidUser
    //     var alreadyLikedUserBy = firebase.database().ref("Users/FaithMeetsLove/ProfileLikedBy/" + uidUser);
    //     await alreadyLikedUserBy.once('value').then(snapshot => {
    //         snapshot.forEach(childSnapshot => {
    //             key = childSnapshot.key;
    //             var kl = key;
    //           var aray= setTimeout(()=>this.getUserProfileDetail(key),1000);
    //             var usrProfileName=arr;
    //             var fd=usrProfileName;
    //         })


    //     })
    // }
    // getUserProfileDetail = async (ids) => {
    //     arr=[]
    //     var ImageUrl;
    //     var fullName;
    //     var gender;
    //     var displayUserName = firebase
    //         .database()
    //         .ref("Users/FaithMeetsLove/Registered/" + ids);
    //     await alreadyFavouriteUser.once('value').then(snapshot => {
        
    //         ImageUrl = snapshot.val().profileImageURL;
    //         fullName = snapshot.val().fullName;
    //         gender = snapshot.val().gender;
    //         arr.push({ pName: fullName, pUrl: ImageUrl, id: ids });
    //         this.setState({
    //             FullName:fullName,
    //             ImageProfileUrl:ImageUrl,
    //             Gender:gender
    //         })
    //     })
    //     return arr;
    // }
    render() {
        return (
            <View>
                <Text>Hello</Text>
                {/* <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
          />
        )}
      /> */}
            </View>
        )
    }
}
