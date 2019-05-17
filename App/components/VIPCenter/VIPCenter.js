//
//  VIPCenter.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { Text, StyleSheet, View, Image,TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

export default class VIPCenter extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null
    };
  };

  constructor(props) {
    super(props);
    // console.disableYellowBox = true;
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView>
        <View pointerEvents="box-none" style={styles.vipCenterView}>
          <Image
            source={require("../../../assets/images/bg-gray-2.png")}
            style={styles.bgGrayImage}
          />
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
                x: 0.19,
                y: -0.1
              }}
              end={{
                x: 0.81,
                y: 1.1
              }}
              locations={[0, 0.61, 1]}
              colors={[
                "rgb(255, 97, 163)",
                "rgb(150, 72, 242)",
                "rgb(90, 82, 242)"
              ]}
              style={styles.congratulationsViewLinearGradient}
            >
              <View pointerEvents="box-none" style={styles.congratulationsView}>
                <View pointerEvents="box-none" style={styles.group21View}>
                  <Image
                    source={require("../../../assets/images/photos-5.png")}
                    style={styles.photosImage}
                  />
                  <View
                    pointerEvents="box-none"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <View pointerEvents="box-none" style={styles.groupView}>
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-7.png")}
                          style={styles.fill7Image}
                        />
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end"
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/fill-13.png")}
                            style={styles.fill13Image}
                          />
                        </View>
                      </View>
                      <View
                        pointerEvents="box-none"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          justifyContent: "center"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-9.png")}
                          style={styles.fill9Image}
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
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            alignSelf: "stretch"
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/fill-19-2.png")}
                            style={styles.fill19Image}
                          />
                          <View
                            pointerEvents="box-none"
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              justifyContent: "flex-end"
                            }}
                          >
                            <Image
                              source={require("../../../assets/images/fill-17-2.png")}
                              style={styles.fill17Image}
                            />
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
                        <Text style={styles.vipMemberText}>VIP Mem</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.congratulationsText}>Congratulations</Text>
                <View
                  pointerEvents="box-none"
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-end"
                  }}
                >
                  <Text style={styles.expirationDateAprText}>
                    Expiration Date: April 31, 2019{" "}
                  </Text>
                  <TouchableOpacity
                    style={[styles.button, styles.green]}
                    onPress={() => {
                      this.swiper.swipeRight();
                    }}
                  >
                    <LinearGradient
                      start={{
                        x: 0.76,
                        y: 0.5
                      }}
                      end={{
                        x: -0.01,
                        y: 0.54
                      }}
                      locations={[0, 1]}
                      colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
                      style={styles.renewalBtnViewLinearGradient}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.renewalBtnView}
                      >
                        <Text style={styles.renewalText}>Renewal</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View
                  pointerEvents="box-none"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <View pointerEvents="box-none" style={styles.group96View}>
                    <View
                      pointerEvents="box-none"
                      style={{
                        flexDirection: "row",
                        alignSelf: "stretch"
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/fill-41.png")}
                        style={styles.fill41Image}
                      />
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "flex-end"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-47.png")}
                          style={styles.fill47Image}
                        />
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
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-90.png")}
                          style={styles.fill90Image}
                        />
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end"
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/fill-29-2.png")}
                            style={styles.fill29Image}
                          />
                        </View>
                      </View>
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-67.png")}
                          style={styles.fill67Image}
                        />
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end"
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/fill-79.png")}
                            style={styles.fill79Image}
                          />
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
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-53.png")}
                          style={styles.fill53Image}
                        />
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end"
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/fill-57.png")}
                            style={styles.fill57Image}
                          />
                        </View>
                      </View>
                      <Image
                        source={require("../../../assets/images/group-28.png")}
                        style={styles.group28Image}
                      />
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
                          <Image
                            source={require("../../../assets/images/fill-69.png")}
                            style={styles.fill69Image}
                          />
                          <Image
                            source={require("../../../assets/images/fill-75.png")}
                            style={styles.fill75Image}
                          />
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
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-55.png")}
                          style={styles.fill55Image}
                        />
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end"
                          }}
                        >
                          <View pointerEvents="box-none">
                            <Image
                              source={require("../../../assets/images/fill-88.png")}
                              style={styles.fill88Image}
                            />
                            <Image
                              source={require("../../../assets/images/fill-37-3.png")}
                              style={styles.fill37Image}
                            />
                          </View>
                          <Image
                            source={require("../../../assets/images/fill-59.png")}
                            style={styles.fill59Image}
                          />
                        </View>
                      </View>
                      <Image
                        source={require("../../../assets/images/fill-45.png")}
                        style={styles.fill45Image}
                      />
                      <View
                        pointerEvents="box-none"
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-71.png")}
                          style={styles.fill71Image}
                        />
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
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-61.png")}
                          style={styles.fill61Image}
                        />
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end"
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/fill-92.png")}
                            style={styles.fill92Image}
                          />
                          <Image
                            source={require("../../../assets/images/fill-22.png")}
                            style={styles.fill22Image}
                          />
                          <Image
                            source={require("../../../assets/images/fill-77.png")}
                            style={styles.fill77Image}
                          />
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
                        <Image
                          source={require("../../../assets/images/fill-73.png")}
                          style={styles.fill73Image}
                        />
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
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/fill-65.png")}
                          style={styles.fill65Image}
                        />
                        <Image
                          source={require("../../../assets/images/fill-63.png")}
                          style={styles.fill63Image}
                        />
                        <View pointerEvents="box-none">
                          <Image
                            source={require("../../../assets/images/fill-49.png")}
                            style={styles.fill49Image}
                          />
                          <Image
                            source={require("../../../assets/images/fill-31-2.png")}
                            style={styles.fill31Image}
                          />
                        </View>
                        <Image
                          source={require("../../../assets/images/fill-94.png")}
                          style={styles.fill94Image}
                        />
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
                            style={styles.group83View}
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
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
            <View
              pointerEvents="box-none"
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View pointerEvents="box-none" style={styles.vipPrivilegeView}>
                <View
                  pointerEvents="box-none"
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch"
                  }}
                >
             
                  <View
                    pointerEvents="box-none"
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "flex-end"
                    }}
                  >
                    <Text style={styles.vipPrivilegeText}>VIP PRIVILEGE</Text>
                  </View>
                </View>
                <View pointerEvents="box-none" style={styles.usernameView}>
                  <Text style={styles.seeWhoLikedYouText}>
                    See who liked you
                  </Text>
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
                      style={styles.group2Copy4View}
                    >
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/icons-like-copy.png")}
                          style={styles.iconsLikeCopyFiveImage}
                        />
                        <View
                          pointerEvents="box-none"
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end"
                          }}
                        >
                          <Text style={styles.spotlightText}>Spotlight</Text>
                        </View>
                      </View>
                      <Text style={styles.youWillBeOnSpotlText}>
                        You will be on spotlight and be seen by thousands{" "}
                      </Text>
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
                    <View pointerEvents="box-none" style={styles.group3View}>
                      <Text style={styles.youLlSeeEveryoneText}>
                        You'll see everyone who liked you
                      </Text>
                      <View
                        pointerEvents="box-none"
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <View pointerEvents="box-none" style={styles.group2View}>
                      <Text style={styles.seeWhoVisitedYouText}>
                        See who visited you
                      </Text>
                      <Text style={styles.youLlSeeEveryoneCopyText}>
                        You'll see everyone who liked you
                      </Text>
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
                      style={styles.group2CopyView}
                    >
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          alignSelf: "stretch"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/icons-like-copy-4.png")}
                          style={styles.iconsLikeCopyTwoImage}
                        />
                        <Text style={styles.unlimitedRewindsText}>
                          Unlimited rewinds
                        </Text>
                      </View>
                    </View>
                    <View
                      pointerEvents="box-none"
                      style={styles.group2Copy2View}
                    >
                      <Text style={styles.incognitoModeText}>
                        Incognito mode
                      </Text>
                      <Text style={styles.youCanBrowseOtherText}>
                        You can browse others anonymously
                      </Text>
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
                      style={styles.group2Copy3View}
                    >
                      <Text style={styles.extraSuperlikesText}>
                        Extra superlikes
                      </Text>
                      <Text style={styles.youCanSuperlikeUpText}>
                        You can superlike up to 5 times a day
                      </Text>
                      <View
                        pointerEvents="box-none"
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                pointerEvents="box-none"
                style={styles.iphoneXHomeIndicatorHomeIndicatorOnLightView}
              >
                <View pointerEvents="box-none" style={styles.rectangle24View}>
                  <View
                    pointerEvents="box-none"
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
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
            <View
              pointerEvents="box-none"
              style={styles.iphoneXBarsNavigationNavigationBar1ActionView}
            >
              <View
                pointerEvents="box-none"
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <Text style={styles.titleText} />
                <Text style={styles.doneText} />
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
                  source={require("../../../assets/images/icons-arrow-left.png")}
                  style={styles.iconsArrowLeftImage}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  vipCenterView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  bgGrayImage: {
    resizeMode: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 375,
    height: 815
  },
  congratulationsViewLinearGradient: {
    height: 521,
    marginLeft: -1,
    marginTop: 87
  },
  congratulationsView: {
    width: "100%",
    height: "100%"
  },
  vipPrivilegeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 523,
    marginLeft: 17,
    marginRight: 15,
    marginBottom: 28
  },
  iphoneXHomeIndicatorHomeIndicatorOnLightView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 34,
    marginBottom: -396
  },
  iphoneXBarsNavigationNavigationBar1ActionView: {
    backgroundColor: "rgba(248, 248, 248, 0.82)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    height: 88
  },
  iconsVipCenterImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 99
  },
  vipPrivilegeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0.16,
    width: 113,
    marginTop: 6,
    marginRight: 98
  },
  usernameView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 458,
    marginTop: 19
  },
  seeWhoLikedYouText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 66,
    marginTop: -2
  },
  group2Copy4View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 70,
    marginRight: 8
  },
  group3View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 50,
    marginRight: 8
  },
  group2View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 51,
    marginTop: 23,
    marginRight: 8
  },
  group2CopyView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 71,
    marginTop: 23
  },
  group2Copy2View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 51,
    marginTop: 22,
    marginRight: 8
  },
  group2Copy3View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 51,
    marginTop: 23,
    marginRight: 8
  },
  youLlSeeEveryoneText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.36,
    marginTop: 22,
    marginRight: 56,
    alignSelf: "flex-end"
  },
  iconsLikeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 10
  },
  seeWhoVisitedYouText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -2,
    marginRight: 125,
    alignSelf: "flex-end"
  },
  youLlSeeEveryoneCopyText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.36,
    marginTop: 2,
    marginRight: 56,
    alignSelf: "flex-end"
  },
  iconsLikeCopyImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 10
  },
  iconsLikeCopyTwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  },
  unlimitedRewindsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 26,
    marginTop: -2
  },
  incognitoModeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -2,
    marginRight: 158,
    alignSelf: "flex-end"
  },
  youCanBrowseOtherText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.36,
    marginTop: 2,
    marginRight: 36,
    alignSelf: "flex-end"
  },
  iconsLikeCopyThreeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 10
  },
  extraSuperlikesText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -2,
    marginRight: 154,
    alignSelf: "flex-end"
  },
  youCanSuperlikeUpText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.36,
    marginTop: 2,
    marginRight: 33,
    alignSelf: "flex-end"
  },
  iconsLikeCopyFourImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 10
  },
  iconsLikeCopyFiveImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 10
  },
  spotlightText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -2,
    marginRight: 206
  },
  youWillBeOnSpotlText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.36,
    width: 269,
    marginTop: 2,
    alignSelf: "flex-end"
  },
  group21View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 233,
    height: 163,
    marginTop: 131,
    marginRight: 67,
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  congratulationsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 28,
    letterSpacing: 0.16,
    marginTop: 42,
    alignSelf: "center"
  },
  expirationDateAprText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0.16,
    width: 201,
    marginBottom: 12,
    alignSelf: "center"
  },
  renewalBtnView: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  renewalBtnViewLinearGradient: {
    borderRadius: 22,
    width: 167,
    height: 44,
    marginBottom: 45,
    alignSelf: "center",
    justifyContent: "center"
  },
  group96View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 299,
    height: 173,
    marginTop: 54,
    alignSelf: "center"
  },
  photosImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderWidth: 7,
    borderColor: "rgba(255, 255, 255, 0.56)",
    borderStyle: "solid",
    width: 116,
    height: 116,
    alignSelf: "center"
  },
  groupView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 51,
    marginBottom: 1
  },
  fill7Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 25,
    height: 30,
    marginLeft: 26,
    marginTop: 21
  },
  fill13Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 24,
    height: 30,
    marginTop: 21,
    marginRight: 26
  },
  fill9Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 180,
    height: 51,
    alignSelf: "center"
  },
  fill19Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 10,
    height: 10,
    marginLeft: 42,
    marginTop: 16
  },
  fill17Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 9,
    height: 10,
    marginTop: 16,
    marginRight: 44
  },
  vipMemberText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontFamily: "Impact",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 22,
    alignSelf: "center"
  },
  fill41Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 6,
    marginLeft: 131,
    marginTop: 28
  },
  fill47Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 3,
    marginTop: 8,
    marginRight: 108
  },
  fill90Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 6,
    marginLeft: 27,
    marginBottom: 3
  },
  fill29Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 21,
    height: 21,
    marginRight: 14,
    marginBottom: 12
  },
  fill67Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 21,
    height: 18,
    marginLeft: 7,
    marginBottom: 11
  },
  fill79Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 6,
    height: 8,
    marginRight: 15,
    marginBottom: 1
  },
  fill53Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 6,
    marginLeft: 16,
    marginTop: 96
  },
  fill57Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 18,
    height: 13,
    marginTop: 54,
    marginRight: 14
  },
  group28Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 19,
    height: 14,
    marginTop: 46,
    alignSelf: "flex-end"
  },
  fill69Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 15,
    height: 14,
    marginLeft: 26
  },
  fill75Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 7,
    marginLeft: 19,
    marginBottom: 14
  },
  fill55Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 6,
    marginLeft: 118,
    marginTop: 2
  },
  fill59Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 23,
    height: 21,
    marginTop: 46,
    marginRight: 23
  },
  fill45Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 8,
    marginTop: 21,
    marginRight: 37,
    alignSelf: "flex-end"
  },
  fill71Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 18,
    height: 9,
    marginBottom: 20
  },
  fill61Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 20,
    height: 20,
    marginLeft: 30,
    marginTop: 47
  },
  fill77Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 3,
    marginTop: 36,
    marginRight: 96
  },
  fill22Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 25,
    height: 25,
    marginRight: 12
  },
  fill92Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 6,
    marginTop: 31
  },
  fill73Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 17,
    height: 21,
    marginLeft: 17,
    marginBottom: 4
  },
  fill65Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 12,
    height: 12,
    marginLeft: 25,
    marginTop: 50
  },
  fill63Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 18,
    height: 26,
    marginLeft: 1,
    marginTop: 47
  },
  fill94Image: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 6,
    marginLeft: 10,
    marginTop: 53
  },
  group83View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 5,
    height: 6,
    marginRight: 59
  },
  renewalText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0.16,
    alignSelf: "center"
  },
  titleText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  doneText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  iconsArrowLeftImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 49
  },
  rectangle24View: {
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: 2.5,
    width: 134,
    height: 5,
    marginTop: 20,
    alignSelf: "center"
  }
});
