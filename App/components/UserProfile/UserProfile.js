/*
* User Public profile
*/ 
import React, { Component, Fragment } from "react";
import { Text, StyleSheet, View, Image, BackHandler, AsyncStorage, TouchableOpacity, ActivityIndicator, Dimensions, Platform, Button } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Images } from "../../../assets/imageAll";
import firebase from "react-native-firebase";
import { TagSelect } from 'react-native-tag-select';
import { Immersive } from 'react-native-immersive';
import Video from 'react-native-video';
// import Moment from "moment";


const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

const data = [
  { id: 1, label: 'Music' },
  { id: 2, label: 'Movies' },
  { id: 3, label: 'Playing Cards' },
  { id: 4, label: 'Playing Games' },
  { id: 5, label: 'Singing' },
  { id: 6, label: 'Swiming' },
  { id: 7, label: 'Driving' },
  { id: 8, label: 'Travelling' },
  { id: 9, label: 'Reading Books' },
  { id: 10, label: 'Cars' },
  { id: 11, label: 'Theatre' },
  { id: 12, label: 'Politics' },
  { id: 13, label: 'Dancing' },
  { id: 14, label: 'Cooking' },
  { id: 15, label: 'Watching Sports' },
  { id: 16, label: 'Playing Sports' },
  { id: 17, label: 'Fitness' },
  { id: 18, label: 'Boating and Cruising' },
  { id: 19, label: 'Outdoor' },
  { id: 20, label: 'Country' },
  { id: 21, label: 'Snow' },
  { id: 22, label: 'Fine Dining' },
  { id: 23, label: 'Shopping' },
  { id: 24, label: 'Beach' },
  { id: 25, label: 'Water Sports' },
  { id: 26, label: 'Social' },
  { id: 27, label: 'Photography' }
];
const dataLifeStyle = [
  { id: 1, label: 'Smoke' },
  { id: 2, label: 'Foody' },
  { id: 3, label: 'Drink' },
  { id: 4, label: 'Party' },
  { id: 5, label: 'Pets' },
  { id: 6, label: 'Club' },
  { id: 7, label: 'Introvert' },
  { id: 8, label: 'Extrovert' },
]
const LATITUDE_DELTA = 0.0922;
const ASPECT_RATIO = Screen.width / Screen.height;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
var type = "image/jpg";
var format = ".jpg";
var dirName = "PostImages/";
var isImageUpload = true;

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matched: '',
      likes: '',
      place: "Searching...",
      imagePath: "",
      imagedata: "",
      videoPath: "",
      videoData: "",
      filePath: "",
      fileData: "",
      video_url: "",
      image_url: "",
      file_url: "",
      nameFull: '',
      dateOfBirth: '',
      totalAge: "",
      slidePanel: false,
      dob: '',
      isDateTimePickerVisible: false,
      isModalVisible: false,
      isModalVisibleLocation: false,
      isModalVisibleGender: false,
      isModalVisibleBio: false,
      isModalVisibleReligion: false,
      isModalVisibleJobTitle: false,
      isModalVisibleEducation: false,
      isModalVisibleHeight: false,
      isModalVisibleLanguage: false,
      isModalVisiblePersonalInfo: false,
      personalInfoIsCollapsed: true,
      relationShipStatus: '',
      relationShipStatusIndex: 0,
      showComponmentB: '',
      permanentLocation: '',
      bioText: '',
      religion: '',
      jobTitle: '',
      education: '',
      height: '',
      language: '',
      likes: '',
      matched: '',
      genderInfo: '',
      uploadMediaGallery: false,
      uploadMediaGalleryIndex: null,
      uploadMediaGalleryCanDelete: false,
      _gender: 0,
      imageProfileUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png",
      galleryPhoto: [],
      interests: [],
      lifestyleAndSocial: [],
      galleryVideo: null,
      isLoading: false
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", async () => {
      var profileID = await AsyncStorage.getItem("userProfileKeys");
      this.loadProfileData(profileID);
      // load likes and matched stats
      // setTimeout(() => {
      //   this.loadProfileStats(profileID);
      // }, 2000);
      this.androidGoInImmersive();
    });
    
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
  }

  androidGoInImmersive() {
    if(Platform.OS == 'android') {
      Immersive.setImmersive(true);
    }
  }
 
  loadProfileData = async (profileID) => {
    var instance = this;
    var convertGender;
    // var _name = await firebase.auth().currentUser.uid;
    var imgUserId = firebase.database().ref("Users/FaithMeetsLove/Registered/" + profileID);
    imgUserId.once('value', function (snapshot) {
      var ImageUrl = snapshot.val().profileImageURL;
      var userName = snapshot.val().fullName;
      var dob = snapshot.val().user_Dob;
      var realtionshipS = snapshot.val().relationshipStatus;
      var relationShipStatusIndex = snapshot.val().relationShipStatusIndex;
      var permanentAdd = snapshot.val().permanentAddress;
      var bioText = snapshot.val().bioText;
      var genderData = snapshot.val().gender;
      var religionData = snapshot.val().religion;
      var jobTitleData = snapshot.val().jobTitle;
      var educationData = snapshot.val().education;
      var heightData = snapshot.val().height;
      var languageData = snapshot.val().language;
      var videoData = snapshot.val().profileVideo;
      var bioText = snapshot.val().bioText;
      var interestsData = [];
      try {
        interestsData = JSON.parse(snapshot.val().interests);
        // instance.tag.setState({ value: interestsData });
      } catch (error) {
        
      }
      var lifestyleAndSocialData = [];
      try {
        lifestyleAndSocialData = JSON.parse(snapshot.val().lifestyleAndSocial);
        // instance.tag2.setState({ value: lifestyleAndSocialData });
      } catch (error) {
        
      }

      var mediaPhoto = [];

      var ImageUrl1 = '';
      if(snapshot.val().profileImageURL1 != null) {
        ImageUrl1 = snapshot.val().profileImageURL1;
        mediaPhoto.push({url: ImageUrl1});
      }
      var ImageUrl2 = '';
      if(snapshot.val().profileImageURL2 != null) {
        ImageUrl2 = snapshot.val().profileImageURL2;
        mediaPhoto.push({url: ImageUrl2});
      }
      var ImageUrl3 = '';
      if(snapshot.val().profileImageURL3 != null) {
        ImageUrl3 = snapshot.val().profileImageURL3;
        mediaPhoto.push({url: ImageUrl3});
      }
      var ImageUrl4 = '';
      if(snapshot.val().profileImageURL4 != null) {
        ImageUrl4 = snapshot.val().profileImageURL4;
        mediaPhoto.push({url: ImageUrl4});
      }
      var ImageUrl5 = '';
      if(snapshot.val().profileImageURL5 != null) {
        ImageUrl5 = snapshot.val().profileImageURL5;
        mediaPhoto.push({url: ImageUrl5});
      }
      var ImageUrl6 = '';
      if(snapshot.val().profileImageURL6 != null) {
        ImageUrl6 = snapshot.val().profileImageURL6;
        mediaPhoto.push({url: ImageUrl6});
      }
      var ImageUrl7 = '';
      if(snapshot.val().profileImageURL7 != null) {
        ImageUrl7 = snapshot.val().profileImageURL7;
        mediaPhoto.push({url: ImageUrl7});
      }

      // var mediaPhoto = [
      //   { url: ImageUrl1 },
      //   { url: ImageUrl2 },
      //   { url: ImageUrl3 },
      //   { url: ImageUrl4 },
      //   { url: ImageUrl5 },
      //   { url: ImageUrl6 }
      // ];
      
      if(genderData==0)
      {
        convertGender="Man";
      }
      else if(genderData==1)
      {
        convertGender="Woman";
      }
      else{
        convertGender="Unknown";
      }
      
      if((ImageUrl == "")||(ImageUrl == null))
      {
        instance.setState({
          imageProfileUrl: "http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png",
          nameFull: userName,
          dateOfBirth: dob,
          relationShipStatus: realtionshipS,
          relationShipStatusIndex: relationShipStatusIndex,
          permanentLocation: permanentAdd,
          bioText: bioText,
          genderInfo: convertGender,
          _gender: genderData,
          religion: religionData,
          jobTitle: jobTitleData,
          education: educationData,
          height: heightData,
          language: languageData,
          galleryPhoto: mediaPhoto,
          galleryVideo: videoData,
          interests: interestsData,
          lifestyleAndSocial: lifestyleAndSocialData,
          bioText: bioText
        });
      } else {
        instance.setState({
          imageProfileUrl: ImageUrl,
          nameFull: userName,
          dateOfBirth: dob,
          relationShipStatus: realtionshipS,
          relationShipStatusIndex: relationShipStatusIndex,
          permanentLocation: permanentAdd,
          bioText: bioText,
          genderInfo: convertGender,
          _gender: genderData,
          religion :religionData,
          jobTitle: jobTitleData,
          education: educationData,
          height: heightData,
          language: languageData,
          galleryPhoto: mediaPhoto,
          galleryVideo: videoData,
          interests: interestsData,
          lifestyleAndSocial: lifestyleAndSocialData,
          bioText: bioText
        });
      }
      
      instance.age();
    });
  }

  loadProfileStats = async (profileID) => {
    if((this.state.likes == '')||(this.state.matched == '')) {
      var likes = 0;
      var allUserProfile = firebase.database().ref("Users/FaithMeetsLove/ProfileLiked");

      await allUserProfile
      .once("value")
      .then(snapshot => {
          snapshot.forEach(childSnapshot => {
            if(JSON.stringify(childSnapshot).includes(profileID)) {
              likes++;
            }
          });
          
          var allUserProfileMatch = firebase.database().ref("Users/FaithMeetsLove/MatchedProfiles/"+profileID);
          allUserProfileMatch
          .once("value")
          .then(snapshot => {
            snapshot.numChildren();
            
            this.setState({
              likes: likes,
              matched: snapshot.numChildren()
            });
          }).catch(error => {
            console.log(JSON.stringify(error));
          });
          
      }).catch(error => {
        console.log('error1: ', JSON.stringify(error));
      });
    }
  }

  age = () => {
    var userAge = this.state.dateOfBirth;

    var date = userAge.split('-')[0]
    var month = userAge.split('-')[1]
    var year = userAge.split('-')[2]

    var ageFull = this.calculate_age(month, date, year);

    this.setState({
      totalAge: ageFull
    })
  }

  calculate_age = (birth_month, birth_day, birth_year) => {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
      age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
      age--;
    }
    return age;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
  }

  backAndroid() {
    Actions.pop();
    return true;
  }

  render() {
    return (
      <View><ScrollView style={{ backgroundColor: "rgb(249, 249, 249)" }}>
        <View>
          <View style={{
            backgroundColor: "rgb(255, 255, 255)",
            justifyContent: 'center',
            alignItems: 'center',
            margin: 8,
            borderRadius: 8,
            shadowColor: "rgba(0, 0, 0, 0.08)",
            shadowRadius: 5,
            shadowOpacity: 1,
          }}>
            <View>
              <View>

              </View>
              <TouchableOpacity>
                <Image source={{ uri: this.state.imageProfileUrl }}
                  style={styles.ovalImage}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom: hp(1) }}>
              <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>{this.state.nameFull}</Text>
              {/* <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 22 }}>,</Text> */}
              {this.state.totalAge != '' ?
                <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>{', '+this.state.totalAge}</Text>
              : null }
            </View>
          </View>
        </View>
        {/* <View style={{
          backgroundColor: "rgb(255, 255, 255)",
          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View styel={{ margin: 10 }}>
            
          </View> 
        </View> */}
          {/* <TouchableOpacity style={{marginTop: hp(1), width: wp(100), height: hp(10)}} onPress={() => { this.onChangePersonalInfoCollapse() }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 15, marginBottom: 15 }}>Show Personal Info</Text>
            </View>
          </TouchableOpacity> */}
        {/* <Collapsible collapsed={this.state.personalInfoIsCollapsed}> */}
          <View style={{
            backgroundColor: "rgb(255, 255, 255)",
            margin: 8,
            borderRadius: 8,
            shadowColor: "rgba(0, 0, 0, 0.08)",
            shadowRadius: 5,
            shadowOpacity: 1,
          }}>
            <View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View><Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Personal Info</Text>
                </View>

              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', marginRight: wp(6) }}>
                  <Image source={Images.bio} style={styles.personalDataView} />
                  <Text style={styles.personalDataText}>Bio : {this.state.bioText}</Text></View>
              </View>
              {((this.state.permanentLocation != '')&&(this.state.permanentLocation != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.locationIcon}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>From : {this.state.permanentLocation}</Text></View>
                </View>
              : null }
              {((this.state.relationShipStatus != '')&&(this.state.relationShipStatus != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.statusIcon}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>Realtionship Status : {this.state.relationShipStatus}</Text></View>
                </View>
              : null }
              {((this.state.genderInfo != '')&&(this.state.genderInfo != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.genderIcon}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>Gender : {this.state.genderInfo}</Text></View>
                </View>
              : null }
              {((this.state.religion != '')&&(this.state.religion != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.religion}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>Religion : {this.state.religion}</Text></View>
                </View>
              : null }
              {((this.state.jobTitle != '')&&(this.state.jobTitle != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.job}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>Job Title : {this.state.jobTitle}</Text></View>
                </View>
              : null }
              {((this.state.education != '')&&(this.state.education != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.education}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>Education : {this.state.education}</Text></View>
                </View>
              : null }
              {((this.state.height != '')&&(this.state.height != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.height}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>Height : {this.state.height}</Text></View>
                </View>
              : null }
              {((this.state.language != '')&&(this.state.language != undefined)) ?
                <View style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}><Image source={Images.language}
                    style={styles.personalDataView} />
                    <Text style={styles.personalDataText}>Language : {this.state.language}</Text></View>
                </View>
              : null }
            </View>
          </View>
        {/* </Collapsible> */}

        {/* <View style={styles.addPersonalView}>
          <View styel={{ margin: 10 }}>
            
          </View>
        </View> */}
        {/* <View style={{
          backgroundColor: "rgb(255, 255, 255)",
          justifyContent: 'center',
          alignItems: 'center',
          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View style={styles.followTabView}>
            <Text style={styles.visitorsText}>Likes</Text>
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.textText}>{this.state.likes}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text style={styles.matchedText}>Matched</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            >
              <Text style={styles.textThreeText}>{this.state.matched}</Text>
            </View>
          </View>
        </View> */}

        <View style={{
          backgroundColor: "rgb(255, 255, 255)",
          margin: 8,
          borderRadius: 8,
          shadowColor: "rgba(0, 0, 0, 0.08)",
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
          <View>
            <Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Gallery</Text>
          </View>
          <View style={{ margin: 10 }}>

            <View>
              <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, marginTop: 10 }}>Photos</Text>
            </View>
            
            <FlatGrid
              itemDimension={wp(20)}
              items={this.state.galleryPhoto}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.gridItem}>
                  {item.url != ''?
                    <Image source={{ uri: item.url }}
                      style={styles.gridImage}
                    />
                  : null }
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <Text>No photos</Text>
              )}
              extraData={this.state}
            />

            <View>
              <Text style={{ fontSize: 14, color: 'grey', marginLeft: 13, marginTop: hp(3), marginBottom: hp(3) }}>Video</Text>
            </View>

            <View style={{flex: 0.5}}>
                {this.state.galleryVideo != null ?
                    <View style={{flex: 1, height: hp(35), width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', zIndex: 1}}>
                        <Video source={{uri: this.state.galleryVideo}}
                            controls={true}
                            paused={true}
                            ref={(ref) => {
                              this.player = ref
                            }}
                            style={styles.backgroundVideo} 
                          />
                    </View>
                : null}
                {this.state.galleryVideo == null ?
                  <Text>No video</Text>
                : null}
            </View>
            

          </View>
        </View>
        
        {this.state.nameFull != '' ?
          <Fragment>
            <View style={{
              backgroundColor: "rgb(255, 255, 255)",
              margin: 8,
              borderRadius: 8,
              shadowColor: "rgba(0, 0, 0, 0.08)",
              shadowRadius: 5,
              shadowOpacity: 1,
            }}>
              <View>
                <Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Interests</Text>
              </View>
              <View style={{ margin: 10 }}>
                    <FlatGrid
                      itemDimension={wp(20)}
                      items={this.state.interests}
                      style={styles.gridViewTags}
                      renderItem={({ item, index }) => (
                        <View style={styles.gridItemTag}>
                          <Text style={styles.gridItemTagLabel}>{item.label}</Text>
                        </View>
                      )}
                      ListEmptyComponent={() => (
                        <Text>No interests</Text>
                      )}
                      extraData={this.state.interests}
                    />
              </View>
            </View>
            <View style={{
              backgroundColor: "rgb(255, 255, 255)",
              margin: 8,
              borderRadius: 8,
              shadowColor: "rgba(0, 0, 0, 0.08)",
              shadowRadius: 5,
              shadowOpacity: 1,
            }}>
              <View>
                <Text style={{ fontSize: 20, color: '#DC4E4E', fontWeight: 'bold', marginLeft: 13, marginTop: 10 }}>Lifestyle and social</Text>
              </View>
              <View style={{ margin: 10 }}>
                    <FlatGrid
                      itemDimension={wp(20)}
                      items={this.state.lifestyleAndSocial}
                      style={styles.gridViewTags}
                      renderItem={({ item, index }) => (
                        <View style={styles.gridItemTag}>
                          <Text style={styles.gridItemTagLabel}>{item.label}</Text>
                        </View>
                      )}
                      ListEmptyComponent={() => (
                        <Text>No lifestyle and social</Text>
                      )}
                      extraData={this.state.lifestyleAndSocial}
                    />
              </View>
            </View>
        </Fragment>
      : null }
      </ScrollView>
      {this.state.isLoading ?
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: "rgb(249, 249, 249)",
    flex: 1
  },
  whereTextInput:{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30 },
  container1: {
    flex: 1,
    justifyContent: 'center'
  },
  whereDataView:{ alignContent: 'center', marginLeft: 30, marginRight: 30 },
  valueText: {
    fontSize: 18,
    marginBottom: 50,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  addPersonalView:{
    backgroundColor: "rgb(255, 255, 255)",
    margin: 8,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  personalDataText:{ marginLeft: 10, marginTop: 5, marginBottom: 10 },
  personalDataView:{ height: 25, width: 25, tintColor: 'grey' },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333'
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
  navBarView: {
    width: "100%",
    height: "100%"
  },
  ovalImage: {
    resizeMode: 'cover',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 120,
    height: 120,
    // marginLeft: 19,
    // marginTop: 22,
    marginTop: hp(3.5),
    borderRadius: 65
  },
  followTabView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 265,
    height: 44,
    marginBottom: 8,
    alignSelf: "center"
  },
  visitorsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "black",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 60,
    margin: 5
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginLeft: 17,
    marginTop: 24
  },
  matchedText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "black",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 70,
    margin: 5
  },
  textThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 24,
    marginRight: 25,
    alignSelf: "flex-end"
  },
  barView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    width: 0,
    height: 0
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  modalBioContainer: {
    flex: 0.4,
    // height: hp(35),
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  modalPersonalInfoContainer: {
    flex: 0.8,
    // height: hp(35),
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  modalBioViewContent:{
    flex: 1,
    alignContent: 'center',
    marginLeft: 30, 
    marginRight: 30,
    justifyContent: 'center'
  },
  touchableCancel: {
    backgroundColor: '#fc5c65',
    flex: 1, 
    justifyContent: 'center'
  },
  touchableOk: {
    backgroundColor: '#20bf6b',
    flex: 1, 
    justifyContent: 'center'
  },
  gridView: {
    marginTop: hp(2),
    flex: 1,
  },
  gridViewTags: {
    marginTop: hp(2)
  },
  gridImage: {
    resizeMode: 'cover',
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: '100%',
    height: '100%'
  },
  gridItem: {
    height: hp(20),
    backgroundColor: 'rgba(238, 238, 238, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItemTag: {
    // height: hp(7),
    // flex: 1,
    padding: wp(2),
    borderRadius: 25,
    backgroundColor: 'rgba(238, 238, 238, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItemTagLabel: {
    fontSize: wp(3)
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    // bottom: hp(5),
    bottom: 0,
    right: 0,
  },
  viewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(238, 238, 238, 0.3)',
    alignContent: 'center',
    flex: 1,
    zIndex: 300
  }
});
