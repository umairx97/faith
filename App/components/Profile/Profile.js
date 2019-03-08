//
//  Profile.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { Text, StyleSheet, View, Image, TouchableOpacity , BackHandler} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
export default class Profile extends React.Component {
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
  onEditPressed() {
    Actions.userProfile();
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: "rgb(249, 249, 249)"}}>
        <View style={styles.profileView}>
          <LinearGradient
            start={{
              x: 0.79,
              y: 0.41
            }}
            end={{
              x: -0.04,
              y: 0.62
            }}
            locations={[0, 1]}
            colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
            style={styles.navBarViewLinearGradient}
          ><View style={styles.navBarView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              />
            </View>
          </LinearGradient>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          ><View style={styles.iphoneXBarsTabBar5ItemsView}>
              <View style={styles.barView}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-end"
                  }}
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
                  source={require("../../../assets/images/home-indicator---on-light.png")}
                  style={styles.homeIndicatorOnLightImage}
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
                  source={require("../../../assets/images/discover.png")}
                  style={styles.discoverImage}
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
                  source={require("../../../assets/images/neaby.png")}
                  style={styles.neabyImage}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.favoriteView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <Image
                  source={require("../../../assets/images/message-2.png")}
                  style={styles.messageImage}
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
                  source={require("../../../assets/images/profile.png")}
                  style={styles.profileImage}
                />
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
            <View style={styles.accountInforView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
              <TouchableOpacity onPress={()=>{alert("hello m h")}}>
                <Image source={require("../../../assets/images/oval.png")}
                  style={styles.ovalImage}
                />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text style={styles.landonGibsonText}>Landon Gibson</Text>
                  <TouchableOpacity onPress={this.onEditPressed}>
                    <Image
                      source={require("../../../assets/images/icons-edit.png")}
                      style={styles.iconsEditImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-end"
                }}
              >
                <View style={styles.followTabView}>
                  <Text style={styles.visitorsText}>VISITORS</Text>
                  <View
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Text style={styles.likesTwoText}>LIKES</Text>
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
                        alignSelf: "stretch"
                      }}
                    >
                      <Text style={styles.textText}>2318</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "flex-end"
                        }}
                      >
                        <Text style={styles.matchedText}>MATCHED</Text>
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
                    <Text style={styles.textTwoText}>364</Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Text style={styles.textThreeText}>15</Text>
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
                <Image
                  source={require("../../../assets/images/vip-level.png")}
                  style={styles.vipLevelImage}
                />
              </View>
            </View>
          </View>
          <View style={styles.panel1View}>
            <View style={styles.likesView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2View}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.likesText}>Likes</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/shape-2.png")}
                    style={styles.shapeImage}
                  />
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>

                    <View style={styles.colorWhiteView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <View>
                      <View style={styles.rectangleView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.colorWhiteTwoView}>
                      <View
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
            <View style={styles.visitorsView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2TwoView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.visitsText}>Visits</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/shape-2.png")}
                    style={styles.shapeTwoImage}
                  />
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleTwoView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={require("../../../assets/images/shape-3.png")}
                      style={styles.shapeThreeImage}
                    />
                    <View>
                      <View style={styles.rectangleTwoView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                    </View>

                    <View>
                      <View style={styles.colorWhiteThreeView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>

                      <View style={styles.colorWhiteFourView}>
                        <View
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

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View style={styles.groupsView}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.rectangle2ThreeView}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-end"
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={this.onFacebookPressed}>
                    <Text style={styles.groupsText}>Groups</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/shape-2.png")}
                      style={styles.shapeFourImage}
                    />
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center"
                  }}
                >
                  <View style={styles.iconsLikeCopyTwoView}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "stretch"
                      }}
                    >
                      <View style={styles.rectangleThreeView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                      <Image
                        source={require("../../../assets/images/groups.png")}
                        style={styles.groupsImage}
                      />
                      <View>
                        <View style={styles.rectangleThreeView}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              justifyContent: "flex-end"
                            }}
                          />
                        </View>
                      </View>
                      <View>
                        <View style={styles.colorWhiteFiveView}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              justifyContent: "flex-end"
                            }}
                          />
                        </View>
                        <View style={styles.colorWhiteSixView}>
                          <View
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
          </View>
          <View style={styles.panel2View}>
            <View style={styles.walletView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2FourView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.myWalletText}>My wallet</Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/shape-2.png")}
                    style={styles.shapeFiveImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyThreeView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleFourView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={require("../../../assets/images/wallet.png")}
                      style={styles.walletImage}
                    />
                    <View>
                      <View style={styles.rectangleFourView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={styles.colorWhiteSevenView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                      <View style={styles.colorWhiteEightView}>
                        <View
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
            <View style={styles.levelView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2FiveView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.vipCenterText}>VIP center</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/shape-2.png")}
                    style={styles.shapeSixImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyFourView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleFiveView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={require("../../../assets/images/shape-5.png")}
                      style={styles.shapeSevenImage}
                    />
                    <View>
                      <View style={styles.rectangleFiveView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={styles.colorWhiteNineView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                      <View style={styles.colorWhiteTenView}>
                        <View
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
            <View style={styles.friendsView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2SixView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.findFriendsText}>Find friends</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/shape-2.png")}
                    style={styles.shapeEightImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopyFiveView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleSixView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={require("../../../assets/images/friends.png")}
                      style={styles.friendsImage}
                    />
                    <View>
                      <View style={styles.rectangleSixView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={styles.colorWhiteElevenView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                      <View style={styles.colorWhiteTwelveView}>
                        <View
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
            <View style={styles.blacklistView}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              >
                <View style={styles.rectangle2SevenView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  />
                </View>
                <TouchableOpacity onPress={this.onFacebookPressed}>
                  <Text style={styles.blacklistText}>Blacklist</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/shape-2.png")}
                    style={styles.shapeNineImage}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%"
                }}
              >
                <View style={styles.iconsLikeCopySixView}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch"
                    }}
                  >
                    <View style={styles.rectangleSevenView}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "flex-end"
                        }}
                      />
                    </View>
                    <Image
                      source={require("../../../assets/images/blacklist.png")}
                      style={styles.blacklistImage}
                    />
                    <View>
                      <View style={styles.rectangleSevenView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={styles.colorWhiteThirteenView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                      <View style={styles.colorWhiteFourteenView}>
                        <View
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
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View style={styles.settingsView}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch"
                  }}
                >
                  <View style={styles.rectangle2EightView}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-end"
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={this.onFacebookPressed}>
                    <Text style={styles.settingsText}>Settings</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "flex-end"
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/shape-2.png")}
                      style={styles.shapeTenImage}
                    />
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <View style={styles.iconsLikeCopySevenView}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "stretch"
                      }}
                    >
                      <View style={styles.rectangleEightView}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-end"
                          }}
                        />
                      </View>
                      <Image
                        source={require("../../../assets/images/settings.png")}
                        style={styles.settingsImage}
                      />
                      <View>
                        <View style={styles.rectangleEightView}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              justifyContent: "flex-end"
                            }}
                          />
                        </View>
                      </View>
                      <View>
                        <View style={styles.colorWhiteFifteenView}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              justifyContent: "flex-end"
                            }}
                          />
                        </View>
                        <View style={styles.colorWhiteSixteenView}>
                          <View
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
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: "rgb(249, 249, 249)",
    flex: 1
  },
  facebookButton: {
    flex: 1,
    backgroundColor: "rgb(38, 114, 203)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 316,
    height: 48,
    marginBottom: 33,
    marginTop: 200,
    alignSelf: "center"
  },
  navBarViewLinearGradient: {
    height: 231
  },
  navBarView: {
    width: "100%",
    height: "100%"
  },
  iphoneXBarsTabBar5ItemsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 83
  },
  accountInforView: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
    height: 212,
    marginLeft: 18,
    marginTop: 86,
    marginRight: 16
  },
  panel1View: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
    height: 152,
    marginLeft: 19,
    marginTop: 15,
    marginRight: 15
  },
  panel2View: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 5,
    shadowOpacity: 1,
    height: 256,
    marginLeft: 17,
    marginTop: 15,
    marginRight: 16
  },
  likesView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 36,
    marginTop: 14,
    marginRight: 1
  },
  visitorsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 36,
    marginTop: 15,
    marginRight: 1
  },
  groupsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 22,
    marginLeft: 14,
    marginRight: 18,
    marginBottom: 14,
    justifyContent: "center"
  },
  rectangle2View: {
    backgroundColor: "rgb(237, 74, 71)",
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 14
  },
  likesText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 12,
    marginTop: 3
  },
  shapeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 17,
    marginTop: 3
  },
  rectangleView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  colorWhiteView: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 0
  },
  colorWhiteTwoView: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 0
  },
  rectangle2TwoView: {
    backgroundColor: "rgb(80, 227, 194)",
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 14
  },
  visitsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 12,
    marginTop: 3
  },
  shapeTwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 17,
    marginTop: 3
  },
  rectangleTwoView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  shapeThreeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2ThreeView: {
    backgroundColor: "rgba(144, 19, 254, 0.92)",
    borderRadius: 8,
    width: 22,
    height: 22
  },
  groupsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 12
  },
  shapeFourImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12
  },
  iconsLikeCopyTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 3
  },
  rectangleThreeView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  groupsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  walletView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 36,
    marginLeft: 1,
    marginTop: 14,
    marginRight: 1
  },
  levelView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 36,
    marginLeft: 1,
    marginTop: 15,
    marginRight: 1
  },
  friendsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 38,
    marginTop: 15,
    marginRight: 1
  },
  blacklistView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 38,
    marginTop: 13,
    marginRight: 1
  },
  settingsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 38,
    marginRight: 1
  },
  rectangle2FourView: {
    backgroundColor: "rgb(240, 85, 34)",
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 15
  },
  myWalletText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeFiveImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyThreeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 18,
    marginTop: 3
  },
  rectangleFourView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  walletImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2FiveView: {
    backgroundColor: "rgb(74, 144, 226)",
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 15
  },
  vipCenterText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeSixImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyFourView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 18,
    marginTop: 3
  },
  rectangleFiveView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  shapeSevenImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2SixView: {
    backgroundColor: "rgba(126, 211, 33, 0.84)",
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 16
  },
  findFriendsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeEightImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopyFiveView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 19,
    marginTop: 3
  },
  rectangleSixView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  friendsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2SevenView: {
    backgroundColor: "rgb(74, 74, 74)",
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 16
  },
  blacklistText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeNineImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopySixView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 19,
    marginTop: 3
  },
  rectangleSevenView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  blacklistImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  rectangle2EightView: {
    backgroundColor: "rgb(218, 217, 226)",
    borderRadius: 8,
    width: 22,
    height: 22,
    marginLeft: 16
  },
  settingsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
    marginLeft: 11,
    marginTop: 3
  },
  shapeTenImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 7,
    height: 12,
    marginTop: 5,
    marginRight: 17
  },
  iconsLikeCopySevenView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 16,
    height: 16,
    marginLeft: 19,
    marginTop: 3
  },
  rectangleEightView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    height: 0
  },
  settingsImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  ovalImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 94,
    height: 94,
    marginLeft: 19,
    marginTop: 22
  },
  iconsEditImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 24,
    height: 24,
    marginTop: 47,
    marginRight: 15
  },
  landonGibsonText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.23,
    marginTop: 42,
    marginRight: 4
  },
  followTabView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 265,
    height: 44,
    marginBottom: 8,
    alignSelf: "center"
  },
  vipLevelImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginLeft: 82,
    marginTop: 89
  },
  visitorsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(194, 196, 202)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 50
  },
  likesTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(194, 196, 202)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 31,
    alignSelf: "center"
  },
  textText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginLeft: 3,
    marginTop: 20
  },
  matchedText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(194, 196, 202)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    letterSpacing: 0,
    width: 55
  },
  textTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 20,
    alignSelf: "center"
  },
  textThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    marginTop: 20,
    marginRight: 16,
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
  homeIndicatorOnLightImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  discoverImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  neabyImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  favoriteView: {
    backgroundColor: "rgb(193, 192, 201)",
    width: 0,
    height: 0
  },
  messageImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 0,
    height: 0
  }
});
