//
//  UserProfile.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { Text, StyleSheet, View, Image,BackHandler } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";
import { Actions } from "react-native-router-flux";
export default class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null
    };
  };

  renderViewMore(onPress) {
    return <Text onPress={onPress}>View more</Text>;
  }
  renderViewLess(onPress) {
    return <Text onPress={onPress}>View less</Text>;
  }

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
  }

  backAndroid () {
    Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

  render() {
    return (
      <ScrollView>
        <View pointerEvents="box-none" style={styles.userProfileView}>
          <View pointerEvents="box-none" style={styles.contentsView}>
            <View
              pointerEvents="box-none"
              style={{
                flexDirection: "row",
                alignSelf: "stretch"
              }}
            >
              <Image
                source={require("../../../assets/images/photos-2.png")}
                style={styles.photosImage}
              />
            </View>
            <View pointerEvents="box-none" style={styles.nameView}>
              <View
                pointerEvents="box-none"
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.maryBurgessText}>Mary Burgess</Text>
                <View
                  pointerEvents="box-none"
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <LinearGradient
                    start={{
                      x: 1.07,
                      y: 0.39
                    }}
                    end={{
                      x: -0.07,
                      y: 0.61
                    }}
                    locations={[0, 1]}
                    colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
                    style={styles.buttonsGenderViewLinearGradient}
                  >
                    <View
                      pointerEvents="box-none"
                      style={styles.buttonsGenderView}
                    >
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/oval-2.png")}
                          style={styles.oval2Image}
                        />
                        <Text style={styles.textText}>23</Text>
                      </View>
                    </View>
                  </LinearGradient>
                  <View pointerEvents="box-none" style={styles.filtersView}>
                    <Image
                      source={require("../../../assets/images/shape-4.png")}
                      style={styles.shapeImage}
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.seattleUsaText}>Seattle, USA </Text>
            </View>
            <View style={styles.aboutView}>
              <Text style={styles.aboutText}>About</Text>

              <ViewMoreText
                numberOfLines={3}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={{
                  marginLeft: 10,
                  marginRight: 10,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              >
                <Text style={styles.myNameIsMaryBurgText}>
                  My name is Mary Burgess and I enjoy meeting new people and
                  finding ways to help them have an uplifting experience. I
                  enjoy reading, and the knowledge ... and perspective that my
                  reading gives me has strengthened my teaching skills and
                  presentation abilities.opportunities, through which I was able
                  to have fewer returned products and increased repeat
                  customers, when compared with co-workers.
                </Text>
              </ViewMoreText>
            </View>
            <View style={styles.friendsView}>
              <Text style={styles.friendsText}>Friends</Text>
              <View
                pointerEvents="box-none"
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <Image
                  source={require("../../../assets/images/user-1.png")}
                  style={styles.user1Image}
                />
                <Image
                  source={require("../../../assets/images/user-3.png")}
                  style={styles.user3Image}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <Image
                  source={require("../../../assets/images/user-2.png")}
                  style={styles.user2Image}
                />
              </View>
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
                    justifyContent: "center",
                    alignSelf: "stretch"
                  }}
                />
              </View>
            </View>
            <View style={styles.basicProfileView}>
              <Text style={styles.basicProfileText}>Basic profile</Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 10
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Height : </Text>
                <Text>160cm</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Weight:</Text>
                <Text>65kg</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Relationship Status :{" "}
                </Text>
                <Text>Single</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Joined Date : </Text>
                <Text>Dec 25, 2017</Text>
              </View>
            </View>
            <View
              pointerEvents="box-none"
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View pointerEvents="box-none" style={styles.interestingView}>
                <View
                  pointerEvents="box-none"
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    alignItems: "center"
                  }}
                >
                  <View
                    pointerEvents="box-none"
                    style={styles.buttonsInterestingView}
                  >
                    <View pointerEvents="box-none" style={styles.items1View}>
                      <Text style={styles.guitarText}>Guitar</Text>
                    </View>
                  </View>
                  <View
                    pointerEvents="box-none"
                    style={styles.buttonsInterestingCopyView}
                  >
                    <View pointerEvents="box-none" style={styles.items1TwoView}>
                      <Text style={styles.guitarTwoText} />
                    </View>
                  </View>
                  <View
                    pointerEvents="box-none"
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <View
                      pointerEvents="box-none"
                      style={styles.buttonsInterestingCopy2View}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.items1ThreeView}
                      >
                        <Text style={styles.guitarThreeText} />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  pointerEvents="box-none"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Text style={styles.interestingText}>Interesting</Text>
                  <View
                    pointerEvents="box-none"
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  >
                    <View
                      pointerEvents="box-none"
                      style={{
                        flexDirection: "row",
                        alignSelf: "stretch"
                      }}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.buttonsInterestingCopy3View}
                      >
                        <View
                          pointerEvents="box-none"
                          style={styles.items1FourView}
                        >
                          <Text style={styles.guitarFourText} />
                        </View>
                      </View>
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "flex-end"
                        }}
                      >
                        <View
                          pointerEvents="box-none"
                          style={styles.buttonsInterestingCopy4View}
                        >
                          <View
                            pointerEvents="box-none"
                            style={styles.items1FiveView}
                          >
                            <Text style={styles.guitarFiveText} />
                          </View>
                        </View>
                        <View
                          pointerEvents="box-none"
                          style={styles.buttonsInterestingCopy5View}
                        >
                          <View
                            pointerEvents="box-none"
                            style={styles.items1SixView}
                          >
                            <Text style={styles.guitarSixText} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View pointerEvents="box-none" style={styles.lookingForView}>
                <Text style={styles.lookingForText}>Looking for</Text>
                <View
                  pointerEvents="box-none"
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-end"
                  }}
                >
                  <View
                    pointerEvents="box-none"
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View
                      pointerEvents="box-none"
                      style={styles.buttonsInterestingTwoView}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.items1SevenView}
                      >
                        <Text style={styles.guitarSevenText} />
                      </View>
                    </View>
                    <View
                      pointerEvents="box-none"
                      style={styles.buttonsInterestingCopyTwoView}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.items1EightView}
                      >
                        <Text style={styles.guitarEightText} />
                      </View>
                    </View>
                    <View
                      pointerEvents="box-none"
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "flex-end"
                      }}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.buttonsInterestingCopy2TwoView}
                      >
                        <View
                          pointerEvents="box-none"
                          style={styles.items1NineView}
                        >
                          <Text style={styles.guitarNineText} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              pointerEvents="box-none"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            >
              <Image
                source={require("../../../assets/images/btn-close.png")}
                style={styles.btnCloseImage}
              />
              <View
                pointerEvents="box-none"
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              >
                <LinearGradient
                  start={{
                    x: 0.5,
                    y: 0.17
                  }}
                  end={{
                    x: 0.5,
                    y: 1.05
                  }}
                  locations={[0, 1]}
                  colors={["rgb(255, 255, 255)", "rgba(216, 216, 216, 0.0)"]}
                  style={styles.blurViewLinearGradient}
                >
                  <View pointerEvents="box-none" style={styles.blurView}>
                    <View
                      pointerEvents="box-none"
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-end"
                      }}
                    />
                  </View>
                </LinearGradient>
              </View>
            </View>
            <View
              pointerEvents="box-none"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            >
              <View pointerEvents="box-none" style={styles.buttonBottomView}>
                <Image
                  source={require("../../../assets/images/buttons-superlike.png")}
                  style={styles.buttonsSuperlikeImage}
                />
                <View
                  pointerEvents="box-none"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center"
                  }}
                >
                  <View
                    pointerEvents="box-none"
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch",
                      alignItems: "center"
                    }}
                  >
                    <View
                      pointerEvents="box-none"
                      style={styles.buttonsLikeView}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.superlikeView}
                      >
                        <View
                          pointerEvents="box-none"
                          style={styles.iconsStarView}
                        >
                          <View
                            pointerEvents="box-none"
                            style={styles.rectangleView}
                          >
                            <View
                              pointerEvents="box-none"
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "flex-end"
                              }}
                            />
                          </View>
                          <View
                            pointerEvents="box-none"
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%"
                            }}
                          >
                            <LinearGradient
                              start={{
                                x: 0,
                                y: 0
                              }}
                              end={{
                                x: 0,
                                y: 0
                              }}
                              locations={[0, 1]}
                              colors={[
                                "rgb(255, 137, 96)",
                                "rgb(255, 98, 165)"
                              ]}
                              style={styles.colorPrimaryViewLinearGradient}
                            >
                              <View
                                pointerEvents="box-none"
                                style={styles.colorPrimaryView}
                              >
                                <View
                                  pointerEvents="box-none"
                                  style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    justifyContent: "flex-end"
                                  }}
                                />
                              </View>
                            </LinearGradient>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Image
                      source={require("../../../assets/images/buttons-message.png")}
                      style={styles.buttonsMessageImage}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  userProfileView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  contentsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 1508,
    marginRight: -21,
    marginBottom: 10
  },
  iphoneXHomeIndicatorHomeIndicatorOnLightImage: {
    resizeMode: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 375,
    height: 34,
    marginBottom: -740
  },
  photosImage: {
    resizeMode: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 375,
    height: 567
  },
  slidesImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 9,
    height: 67,
    marginTop: 60,
    marginRight: 37
  },
  nameView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 343,
    height: 59,
    marginLeft: 16,
    marginTop: 19
  },
  aboutView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    marginRight: 15,
    marginLeft: 15,
    marginTop: 38,
    justifyContent: "flex-end",
    textAlign: "justify"
  },
  friendsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 108,
    marginLeft: 15,
    marginTop: 23
  },
  basicProfileView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 207,
    height: 164,
    marginLeft: 15,
    marginTop: 35
  },
  interestingView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 307,
    height: 139,
    marginLeft: 16,
    marginBottom: 30,
    justifyContent: "center"
  },
  lookingForView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 320,
    height: 88,
    marginLeft: 16,
    marginBottom: 56
  },
  btnCloseImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 40,
    height: 40,
    marginLeft: 16,
    marginTop: 60
  },
  blurView: {
    width: "100%",
    height: "100%"
  },
  blurViewLinearGradient: {
    width: 375,
    height: 202,
    marginBottom: 8
  },
  buttonBottomView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 220,
    height: 61,
    marginLeft: 78,
    justifyContent: "center"
  },
  maryBurgessText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.23
  },
  filtersView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 36,
    height: 36,
    justifyContent: "center"
  },
  buttonsGenderView: {
    width: "100%",
    height: "100%"
  },
  buttonsGenderViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginTop: 7,
    marginRight: 107
  },
  seattleUsaText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.36,
    marginTop: 4
  },
  oval2Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.09,
    marginLeft: 8,
    marginRight: 8
  },
  shapeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 20,
    height: 5,
    marginLeft: 8,
    marginRight: 8
  },
  aboutText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.23
  },
  myNameIsMaryBurgText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    width: 344,
    marginRight: 1,
    marginBottom: -95
  },
  showMoreText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 104, 154)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginBottom: 3
  },
  friendsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.23
  },
  user1Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 64,
    height: 64,
    marginTop: 15
  },
  user3Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 65,
    height: 64,
    marginLeft: 14,
    marginTop: 15
  },
  user2Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 64,
    height: 64,
    marginTop: 44,
    alignSelf: "center"
  },
  user5Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 65,
    height: 64,
    marginTop: 44,
    marginRight: 1
  },
  user4Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 65,
    height: 64,
    marginTop: 44,
    marginRight: 14
  },
  basicProfileText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.23
  },
  singleText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: -0.41,
    marginTop: 109,
    marginRight: 3
  },
  cmText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: -0.41,
    marginLeft: 63,
    marginTop: 20
  },
  kgText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: -0.41,
    marginLeft: 67,
    marginTop: 10
  },
  dec252017Text: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(155, 155, 155)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: -0.41,
    marginRight: 7,
    marginBottom: 5,
    alignSelf: "flex-end"
  },
  buttonsInterestingView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 79,
    height: 36,
    justifyContent: "center"
  },
  buttonsInterestingCopyView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 78,
    height: 36,
    marginLeft: 15
  },
  buttonsInterestingCopy2View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 87,
    height: 36,
    marginRight: 33
  },
  interestingText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.23
  },
  buttonsInterestingCopy3View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 111,
    height: 36
  },
  buttonsInterestingCopy5View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 95,
    height: 36
  },
  buttonsInterestingCopy4View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 71,
    height: 36,
    marginRight: 15
  },
  items1View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    height: 36,
    justifyContent: "center"
  },
  guitarText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: -0.41,
    marginLeft: 17,
    marginRight: 17
  },
  items1TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    width: 0,
    height: 0,
    justifyContent: "center"
  },
  guitarTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1ThreeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    width: 0,
    height: 0,
    justifyContent: "center"
  },
  guitarThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1FourView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    width: 0,
    height: 0,
    justifyContent: "center"
  },
  guitarFourText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1FiveView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    width: 0,
    height: 0,
    justifyContent: "center"
  },
  guitarFiveText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1SixView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    width: 0,
    height: 0,
    justifyContent: "center"
  },
  guitarSixText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  lookingForText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.23
  },
  buttonsInterestingTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 81,
    height: 36
  },
  buttonsInterestingCopyTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 110,
    height: 36,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonsInterestingCopy2TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 100,
    height: 36
  },
  items1SevenView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    width: 0,
    height: 0,
    justifyContent: "center"
  },
  guitarSevenText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1EightView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    height: 36,
    marginRight: 1
  },
  guitarEightText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1NineView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 1,
    borderColor: "rgb(218, 217, 226)",
    borderStyle: "solid",
    width: 0,
    height: 0,
    justifyContent: "center"
  },
  guitarNineText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  buttonsSuperlikeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    shadowColor: "rgba(0, 0, 0, 0.12811367)",
    shadowRadius: 5,
    shadowOpacity: 1,
    width: 61,
    height: 62,
    alignSelf: "center"
  },
  buttonsLikeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 60,
    height: 60,
    justifyContent: "center"
  },
  buttonsMessageImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    shadowColor: "rgba(0, 0, 0, 0.12811367)",
    shadowRadius: 5,
    shadowOpacity: 1,
    width: 61,
    height: 61,
    marginLeft: -220
  },
  superlikeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 60,
    justifyContent: "center"
  },
  iconsStarView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 38,
    marginLeft: 11,
    marginRight: 11
  },
  rectangleView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  colorPrimaryViewLinearGradient: {
    width: 0,
    height: 0
  },
  colorPrimaryView: {
    width: "100%",
    height: "100%"
  }
});
