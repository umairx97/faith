import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import CardStack, {
  Card
} from "react-native-card-stack-swiper";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { Actions } from "react-native-router-flux";
export default class Discover extends React.Component {
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

  componentDidMount() {}

  onNearByPressed = () => {
    this.props.navigation.navigate("NearByTab");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View pointerEvents="box-none" style={styles.discoverView}>
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
              <View pointerEvents="box-none" style={styles.colorPrimaryView}>
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
            {/* <View
              pointerEvents="box-none"
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View
                pointerEvents="box-none"
                style={styles.barsTabBar5ItemsView}
              >
                <View
                  pointerEvents="box-none"
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/discover-2.png")}
                    style={styles.discoverImage}
                  />

                  <TouchableHighlight onPress={this.onNearByPressed}>
                    <Image
                      source={require("../../../assets/images/neaby.png")}
                      style={styles.neabyImage}
                    />
                  </TouchableHighlight>
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
                    style={styles.homeIndicatorOnLightView}
                  >
                    <View
                      pointerEvents="box-none"
                      style={styles.rectangle24View}
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
                <View
                  pointerEvents="box-none"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Image
                    source={require("../../../assets/images/favorite.png")}
                    style={styles.favoriteImage}
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
                      justifyContent: "center",
                      alignSelf: "stretch"
                    }}
                  />
                </View>
              </View>
            </View> */}
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
                <Text style={styles.discoverText}>Discover</Text>
                <View
                  pointerEvents="box-none"
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                >
              < TouchableOpacity onPress = {() => {Actions.Nearby();}} >
                  <Image
                    source={require("../../../assets/images/filters-btn-2.png")}
                    style={styles.btnFilterImage}
                  /></ TouchableOpacity>
                </View>
              </View>
              {/* <View
                pointerEvents="box-none"
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch"
                }}
              > */}
              <View style={{flex:1,marginTop:"55%"}}>


        <CardStack
          style={styles.content}

          renderNoMoreCards={() => <Text style={{fontWeight:'700', fontSize:18, color:'gray'}}>No more cards :(</Text>}
          ref={swiper => {
            this.swiper = swiper
          }}

          onSwiped={() => console.log('onSwiped')}
          onSwipedLeft={() => console.log('onSwipedLeft')}
        >
          <Card style={[styles.card, styles.card1]}><Text style={styles.label}>A</Text></Card>
          <Card style={[styles.card, styles.card2]} onSwipedLeft={() => alert('onSwipedLeft')}><Text style={styles.label}>B</Text></Card>
          <Card style={[styles.card, styles.card1]}><Image source={require('../../../assets/images/photos.png')} resizeMode={'contain'} /></Card>
          <Card style={[styles.card, styles.card2]}><Image source={require('../../../assets/images/rectangle-3.png')} resizeMode={'contain'} /></Card>
          <Card style={[styles.card, styles.card1]}><Text style={styles.label}>E</Text></Card>

        </CardStack>


        < View style = {
          {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop:"42%",
          }
        } >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button,styles.red]} onPress={()=>{
              this.swiper.swipeLeft();
            }}>
              <Image source={require('../../../assets/images/red.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,styles.orange]} onPress={() => {
              this.swiper.goBackFromLeft();
            }}>
              <Image source={require('../../../assets/images/back.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,styles.green]} onPress={()=>{
              this.swiper.swipeRight();
            }}>
              <Image source={require('../../../assets/images/green.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
                {/* <View pointerEvents="box-none" style={styles.cardMainView}>
                  <Image
                    source={require("../../../assets/images/photos.png")}
                    style={styles.photosImage}
                  />
                  <View
                    pointerEvents="box-none"
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Text style={styles.maryBurgessText}>Mary Burgess</Text>
                    <Text style={styles.seattleUsaText}>Seattle, USA </Text>
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
                        style={styles.rectangleViewLinearGradient}
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
                      </LinearGradient>
                      <View
                        pointerEvents="box-none"
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "flex-end"
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/slides-2.png")}
                          style={styles.slidesImage}
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
                    <LinearGradient
                      start={{
                        x: 0.77,
                        y: 0.47
                      }}
                      end={{
                        x: -0.03,
                        y: 0.57
                      }}
                      locations={[0, 1]}
                      colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
                      style={styles.colorPrimaryTwoViewLinearGradient}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.colorPrimaryTwoView}
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
                        source={require("../../../assets/images/oval-2.png")}
                        style={styles.oval2Image}
                      />
                      <Text style={styles.textText}>23</Text>
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
                      source={require("../../../assets/images/superlike.png")}
                      style={styles.superlikeImage}
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
                    <View pointerEvents="box-none" style={styles.superlikeView}>
                      <View
                        pointerEvents="box-none"
                        style={styles.iconsStarView}
                      >
                        <View
                          pointerEvents="box-none"
                          style={styles.rectangleTwoView}
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
                          <View
                            pointerEvents="box-none"
                            style={styles.colorTitleTextLightGrayView}
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
                            style={styles.colorTitleTextLightGrayTwoView}
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
                      style={styles.superlikeTwoView}
                    >
                      <View
                        pointerEvents="box-none"
                        style={styles.iconsStarTwoView}
                      >
                        <View
                          pointerEvents="box-none"
                          style={styles.rectangleThreeView}
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
                            colors={["rgb(255, 137, 96)", "rgb(255, 98, 165)"]}
                            style={styles.colorPrimaryThreeViewLinearGradient}
                          >
                            <View
                              pointerEvents="box-none"
                              style={styles.colorPrimaryThreeView}
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
                  <View
                    pointerEvents="box-none"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%"
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/superlike-2.png")}
                      style={styles.superlikeTwoImage}
                    />
                  </View>
                </View> */}
                <View
                  pointerEvents="box-none"
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end"
                  }}
                />
              </View>
            {/* </View> */}
          </View>
        </ScrollView>
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
    height: 729
  },
  colorPrimaryView: {
    width: "100%",
    height: "100%"
  },
  barsTabBar5ItemsView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    height: 83
  },
  discoverText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 34,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.32,
    marginLeft: 16,
    marginTop: 60
  },
  btnFilterImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 40,
    height: 40,
    marginTop: 60,
    marginRight: 14
  },
  cardMainView: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 13,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 10,
    shadowOpacity: 1,
    
    height: 50+"%",
    marginLeft: 16,
    marginTop: 19,
    marginRight: 16
  },
  cardHolder2View: {
    backgroundColor: "rgb(255, 255, 255)",
    opacity: 0.9,
    borderRadius: 13,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 10,
    shadowOpacity: 1,
    width: 323,
    height: 503,
    marginTop: 74
  },
  photosImage: {
    resizeMode: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderRadius: 13,
    width: 343,
    height: 430
  },
  maryBurgessText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(74, 74, 74)",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0.23,
    marginBottom: 4,
    alignSelf: "center"
  },
  seattleUsaText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(193, 192, 201)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: -0.36,
    marginBottom: 18,
    alignSelf: "center"
  },
  rectangleViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16
  },
  rectangleView: {
    width: "100%",
    height: "100%"
  },
  slidesImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 61,
    marginTop: 21,
    marginRight: 15
  },
  colorPrimaryTwoView: {
    width: "100%",
    height: "100%"
  },
  colorPrimaryTwoViewLinearGradient: {
    width: 37,
    height: 16
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
    marginTop: 2
  },
  superlikeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    shadowColor: "rgba(0, 0, 0, 0.12811367)",
    shadowRadius: 5,
    shadowOpacity: 1,
    width: 46,
    height: 46
  },
  superlikeView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 70,
    height: 70,
    justifyContent: "center"
  },
  superlikeTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 70,
    height: 70,
    justifyContent: "center"
  },
  superlikeTwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    shadowColor: "rgba(0, 0, 0, 0.12811367)",
    shadowRadius: 5,
    shadowOpacity: 1,
    width: 46,
    height: 46
  },
  iconsStarView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 46,
    marginLeft: 12,
    marginRight: 12
  },
  rectangleTwoView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  colorTitleTextLightGrayView: {
    backgroundColor: "rgb(218, 217, 226)",
    width: 0,
    height: 0
  },
  colorTitleTextLightGrayTwoView: {
    backgroundColor: "rgb(193, 192, 201)",
    width: 0,
    height: 0
  },
  iconsStarTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 46,
    marginLeft: 12,
    marginRight: 12
  },
  rectangleThreeView: {
    backgroundColor: "rgba(255, 0, 0, 0.0)",
    width: 0,
    height: 0
  },
  colorPrimaryThreeView: {
    width: "100%",
    height: "100%"
  },
  colorPrimaryThreeViewLinearGradient: {
    width: 0,
    height: 0
  },
  discoverImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 22,
    marginTop: 12
  },
  neabyImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginLeft: 45,
    marginTop: 12
  },
  homeIndicatorOnLightView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 34
  },
  favoriteImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    alignSelf: "center"
  },
  profileImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    marginRight: 23
  },
  messageImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 30,
    height: 30,
    marginTop: 12,
    marginRight: 45
  },
  rectangle24View: {
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: 2.5,
    width: 134,
    height: 5,
    marginTop: 20,
    alignSelf: "center"
  },
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#f2f2f2',
    },
    content: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      width: 320,
      height: 400,
      backgroundColor: '#FE474C',
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.5,
    },
    card1: {
      backgroundColor: '#FE474C',
    },
    card2: {
      backgroundColor: '#FEB12C',
    },
    label: {
      lineHeight: 400,
      textAlign: 'center',
      fontSize: 55,
      fontFamily: 'System',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    footer: {
      flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      alignItems:'center'
    },
    buttonContainer: {
      width: 220,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
    },
    orange: {
      width: 55,
      height: 55,
      borderWidth: 6,
      borderColor: 'rgb(246,190,66)',
      borderWidth: 4,
      borderRadius: 55,
      marginTop: -15
    },
    green: {
      width: 75,
      height: 75,
      backgroundColor: '#fff',
      borderRadius: 75,
      borderWidth: 6,
      borderColor: '#01df8a',
    },
    red: {
      width: 75,
      height: 75,
      backgroundColor: '#fff',
      borderRadius: 75,
      borderWidth: 6,
      borderColor: '#fd267d',
    }
});

// //
// //  Discover.js
// //  Project
// //
// //  Created by Boffin Coders.
// //  Copyright © 2018 Boffin Coders. All rights reserved.
// //

// import { Text, StyleSheet, View, Image } from "react-native"
// import React from "react"
// import LinearGradient from "react-native-linear-gradient"
// import { ScrollView } from "react-native-gesture-handler";

// export default class Discover extends React.Component {

// 	static navigationOptions = ({ navigation }) => {

// 		const { params = {} } = navigation.state
// 		return {
// 				header: null,
// 				headerLeft: null,
// 				headerRight: null,
// 			}
// 	}

// 	constructor(props) {
// 		super(props)
// 	}

// 	componentDidMount() {

// 	}

// 	render() {

// 		return(<ScrollView>
// 		 <View
// 				pointerEvents="box-none"
// 				style={styles.discoverView}>
// 				<LinearGradient
// 					start={{
// 						x: 0.51,
// 						y: 0.17,
// 					}}
// 					end={{
// 						x: 0.24,
// 						y: 0.87,
// 					}}
// 					locations={[0, 1]}
// 					colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 					style={styles.colorPrimaryViewLinearGradient}>
// 					<View
// 						pointerEvents="box-none"
// 						style={styles.colorPrimaryView}>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flex: 1,
// 								flexDirection: "column",
// 								justifyContent: "flex-end",
// 							}}/>
// 					</View>
// 				</LinearGradient>
// 				<View
// 					pointerEvents="box-none"
// 					style={{
// 						flex: 1,
// 						flexDirection: "column",
// 						justifyContent: "flex-end",
// 					}}>
// 					<View
// 						pointerEvents="box-none"
// 						style={styles.barsTabBar5ItemsView}>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flexDirection: "row",
// 								alignSelf: "stretch",
// 							}}>
// 							<Image
// 								source={require(".../../../assets/images/discover-2.png")}
// 								style={styles.discoverImage}/>
// 							<Image
// 								source={require(".../../../assets/images/neaby.png")}
// 								style={styles.neabyImage}/>
// 						</View>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flex: 1,
// 								flexDirection: "column",
// 								justifyContent: "flex-end",
// 							}}>
// 							<View
// 								pointerEvents="box-none"
// 								style={styles.homeIndicatorOnLightView}>
// 								<View
// 									pointerEvents="box-none"
// 									style={styles.rectangle24View}>
// 									<View
// 										pointerEvents="box-none"
// 										style={{
// 											flex: 1,
// 											flexDirection: "column",
// 											justifyContent: "flex-end",
// 										}}/>
// 								</View>
// 							</View>
// 						</View>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								position: "absolute",
// 								width: "100%",
// 								height: "100%",
// 							}}>
// 							<Image
// 								source={require(".../../../assets/images/favorite.png")}
// 								style={styles.favoriteImage}/>
// 						</View>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								position: "absolute",
// 								width: "100%",
// 								height: "100%",
// 							}}>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									flexDirection: "row",
// 									justifyContent: "center",
// 									alignSelf: "stretch",
// 								}}/>
// 						</View>
// 					</View>
// 				</View>
// 				<View
// 					pointerEvents="box-none"
// 					style={{
// 						position: "absolute",
// 						width: "100%",
// 						height: "100%",
// 					}}>
// 					<View
// 						pointerEvents="box-none"
// 						style={{
// 							flexDirection: "row",
// 							alignSelf: "stretch",
// 						}}>
// 						<Text
// 							style={styles.discoverText}>Discover</Text>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flexDirection: "row",
// 								flex: 1,
// 								justifyContent: "flex-end",
// 							}}>
// 							<Image
// 								source={require(".../../../assets/images/filters-btn-2.png")}
// 								style={styles.btnFilterImage}/>
// 						</View>
// 					</View>
// 					<View
// 						pointerEvents="box-none"
// 						style={{
// 							flexDirection: "row",
// 							alignSelf: "stretch",
// 						}}>
// 						<View
// 							pointerEvents="box-none"
// 							style={styles.cardMainView}>
// 							<Image
// 								source={require(".../../../assets/images/photos.png")}
// 								style={styles.photosImage}/>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									flex: 1,
// 									flexDirection: "column",
// 									justifyContent: "flex-end",
// 								}}>
// 								<Text
// 									style={styles.maryBurgessText}>Mary Burgess</Text>
// 								<Text
// 									style={styles.seattleUsaText}>Seattle, USA </Text>
// 							</View>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									position: "absolute",
// 									width: "100%",
// 									height: "100%",
// 								}}>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										flexDirection: "row",
// 										alignSelf: "stretch",
// 									}}>
// 									<LinearGradient
// 										start={{
// 											x: 1.07,
// 											y: 0.39,
// 										}}
// 										end={{
// 											x: -0.07,
// 											y: 0.61,
// 										}}
// 										locations={[0, 1]}
// 										colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 										style={styles.rectangleViewLinearGradient}>
// 										<View
// 											pointerEvents="box-none"
// 											style={styles.rectangleView}>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flex: 1,
// 													flexDirection: "column",
// 													justifyContent: "flex-end",
// 												}}/>
// 										</View>
// 									</LinearGradient>
// 									<View
// 										pointerEvents="box-none"
// 										style={{
// 											flexDirection: "row",
// 											flex: 1,
// 											justifyContent: "flex-end",
// 										}}>
// 										<Image
// 											source={require(".../../../assets/images/slides-2.png")}
// 											style={styles.slidesImage}/>
// 									</View>
// 								</View>
// 							</View>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									position: "absolute",
// 									width: "100%",
// 									height: "100%",
// 								}}>
// 								<LinearGradient
// 									start={{
// 										x: 0.77,
// 										y: 0.47,
// 									}}
// 									end={{
// 										x: -0.03,
// 										y: 0.57,
// 									}}
// 									locations={[0, 1]}
// 									colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 									style={styles.colorPrimaryTwoViewLinearGradient}>
// 									<View
// 										pointerEvents="box-none"
// 										style={styles.colorPrimaryTwoView}>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												flex: 1,
// 												flexDirection: "column",
// 												justifyContent: "flex-end",
// 											}}/>
// 									</View>
// 								</LinearGradient>
// 							</View>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									position: "absolute",
// 									width: "100%",
// 									height: "100%",
// 								}}>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										flexDirection: "row",
// 										alignSelf: "stretch",
// 									}}>
// 									<Image
// 										source={require(".../../../assets/images/oval-2.png")}
// 										style={styles.oval2Image}/>
// 									<Text
// 										style={styles.textText}>23</Text>
// 								</View>
// 							</View>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									position: "absolute",
// 									width: "100%",
// 									height: "100%",
// 								}}>
// 								<Image
// 									source={require(".../../../assets/images/superlike.png")}
// 									style={styles.superlikeImage}/>
// 							</View>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									position: "absolute",
// 									width: "100%",
// 									height: "100%",
// 								}}>
// 								<View
// 									pointerEvents="box-none"
// 									style={styles.superlikeView}>
// 									<View
// 										pointerEvents="box-none"
// 										style={styles.iconsStarView}>
// 										<View
// 											pointerEvents="box-none"
// 											style={styles.rectangleTwoView}>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flex: 1,
// 													flexDirection: "column",
// 													justifyContent: "flex-end",
// 												}}/>
// 										</View>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												position: "absolute",
// 												width: "100%",
// 												height: "100%",
// 											}}>
// 											<View
// 												pointerEvents="box-none"
// 												style={styles.colorTitleTextLightGrayView}>
// 												<View
// 													pointerEvents="box-none"
// 													style={{
// 														flex: 1,
// 														flexDirection: "column",
// 														justifyContent: "flex-end",
// 													}}/>
// 											</View>
// 										</View>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												position: "absolute",
// 												width: "100%",
// 												height: "100%",
// 											}}>
// 											<View
// 												pointerEvents="box-none"
// 												style={styles.colorTitleTextLightGrayTwoView}>
// 												<View
// 													pointerEvents="box-none"
// 													style={{
// 														flex: 1,
// 														flexDirection: "column",
// 														justifyContent: "flex-end",
// 													}}/>
// 											</View>
// 										</View>
// 									</View>
// 								</View>
// 							</View>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									position: "absolute",
// 									width: "100%",
// 									height: "100%",
// 								}}>
// 								<View
// 									pointerEvents="box-none"
// 									style={styles.superlikeTwoView}>
// 									<View
// 										pointerEvents="box-none"
// 										style={styles.iconsStarTwoView}>
// 										<View
// 											pointerEvents="box-none"
// 											style={styles.rectangleThreeView}>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flex: 1,
// 													flexDirection: "column",
// 													justifyContent: "flex-end",
// 												}}/>
// 										</View>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												position: "absolute",
// 												width: "100%",
// 												height: "100%",
// 											}}>
// 											<LinearGradient
// 												start={{
// 													x: 0,
// 													y: 0,
// 												}}
// 												end={{
// 													x: 0,
// 													y: 0,
// 												}}
// 												locations={[0, 1]}
// 												colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 												style={styles.colorPrimaryThreeViewLinearGradient}>
// 												<View
// 													pointerEvents="box-none"
// 													style={styles.colorPrimaryThreeView}>
// 													<View
// 														pointerEvents="box-none"
// 														style={{
// 															flex: 1,
// 															flexDirection: "column",
// 															justifyContent: "flex-end",
// 														}}/>
// 												</View>
// 											</LinearGradient>
// 										</View>
// 									</View>
// 								</View>
// 							</View>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									position: "absolute",
// 									width: "100%",
// 									height: "100%",
// 								}}>
// 								<Image
// 									source={require(".../../../assets/images/superlike-2.png")}
// 									style={styles.superlikeTwoImage}/>
// 							</View>
// 						</View>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flexDirection: "row",
// 								flex: 1,
// 								justifyContent: "flex-end",
// 							}}/>
// 					</View>
// 				</View>
// 			</View>
// 			</ScrollView>)
// 	}
// }

// const styles = StyleSheet.create({
// 	discoverView: {
// 		backgroundColor: 'rgb(255, 255, 255)',
// 		flex: 1,
// 	},
// 	colorPrimaryViewLinearGradient: {
// 		height: 729,
// 	},
// 	colorPrimaryView: {
// 		width: "100%",
// 		height: "100%",
// 	},
// 	barsTabBar5ItemsView: {
// 		backgroundColor: 'rgb(248, 248, 248)',
// 		shadowColor: 'rgba(0, 0, 0, 0.3)',
// 		shadowRadius: 0,
// 		shadowOpacity: 1,
// 		height: 83,
// 	},
// 	discoverText: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		color: 'rgb(255, 255, 255)',
// 		fontSize: 34,
// 		fontStyle: "normal",
// 		fontWeight: "normal",
// 		textAlign: "left",
// 		letterSpacing: 0.32,
// 		marginLeft: 16,
// 		marginTop: 60,
// 	},
// 	btnFilterImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 40,
// 		height: 40,
// 		marginTop: 60,
// 		marginRight: 14,
// 	},
// 	cardMainView: {
// 		backgroundColor: 'rgb(255, 255, 255)',
// 		borderRadius: 13,
// 		shadowColor: 'rgba(0, 0, 0, 0.08)',
// 		shadowRadius: 10,
// 		shadowOpacity: 1,
// 		height: 544,
// 		marginLeft: 16,
// 		marginTop: 19,
// 		marginRight: 16,
// 	},
// 	cardHolder2View: {
// 		backgroundColor: 'rgb(255, 255, 255)',
// 		opacity: 0.9,
// 		borderRadius: 13,
// 		shadowColor: 'rgba(0, 0, 0, 0.08)',
// 		shadowRadius: 10,
// 		shadowOpacity: 1,
// 		width: 323,
// 		height: 503,
// 		marginTop: 74,
// 	},
// 	photosImage: {
// 		resizeMode: "stretch",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		borderRadius: 13,
// 		width: 343,
// 		height: 430,
// 	},
// 	maryBurgessText: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		color: 'rgb(74, 74, 74)',
// 		fontSize: 24,
// 		fontStyle: "normal",
// 		fontWeight: "normal",
// 		textAlign: "center",
// 		letterSpacing: 0.23,
// 		marginBottom: 4,
// 		alignSelf: "center",
// 	},
// 	seattleUsaText: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		color: 'rgb(193, 192, 201)',
// 		fontSize: 15,
// 		fontStyle: "normal",
// 		fontWeight: "normal",
// 		textAlign: "center",
// 		letterSpacing: -0.36,
// 		marginBottom: 18,
// 		alignSelf: "center",
// 	},
// 	rectangleViewLinearGradient: {
// 		borderRadius: 8,
// 		width: 37,
// 		height: 16,
// 	},
// 	rectangleView: {
// 		width: "100%",
// 		height: "100%",
// 	},
// 	slidesImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 8,
// 		height: 61,
// 		marginTop: 21,
// 		marginRight: 15,
// 	},
// 	colorPrimaryTwoView: {
// 		width: "100%",
// 		height: "100%",
// 	},
// 	colorPrimaryTwoViewLinearGradient: {
// 		width: 37,
// 		height: 16,
// 	},
// 	oval2Image: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 8,
// 		height: 10,
// 		marginLeft: 1,
// 	},
// 	textText: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		color: 'rgb(255, 255, 255)',
// 		fontSize: 10,
// 		fontStyle: "normal",
// 		fontWeight: "normal",
// 		textAlign: "left",
// 		letterSpacing: 0.09,
// 		marginLeft: 8,
// 		marginTop: 2,
// 	},
// 	superlikeImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		shadowColor: 'rgba(0, 0, 0, 0.12811367)',
// 		shadowRadius: 5,
// 		shadowOpacity: 1,
// 		width: 46,
// 		height: 46,
// 	},
// 	superlikeView: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 70,
// 		height: 70,
// 		justifyContent: "center",
// 	},
// 	superlikeTwoView: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 70,
// 		height: 70,
// 		justifyContent: "center",
// 	},
// 	superlikeTwoImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		shadowColor: 'rgba(0, 0, 0, 0.12811367)',
// 		shadowRadius: 5,
// 		shadowOpacity: 1,
// 		width: 46,
// 		height: 46,
// 	},
// 	iconsStarView: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		height: 46,
// 		marginLeft: 12,
// 		marginRight: 12,
// 	},
// 	rectangleTwoView: {
// 		backgroundColor: 'rgba(255, 0, 0, 0.0)',
// 		width: 0,
// 		height: 0,
// 	},
// 	colorTitleTextLightGrayView: {
// 		backgroundColor: 'rgb(218, 217, 226)',
// 		width: 0,
// 		height: 0,
// 	},
// 	colorTitleTextLightGrayTwoView: {
// 		backgroundColor: 'rgb(193, 192, 201)',
// 		width: 0,
// 		height: 0,
// 	},
// 	iconsStarTwoView: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		height: 46,
// 		marginLeft: 12,
// 		marginRight: 12,
// 	},
// 	rectangleThreeView: {
// 		backgroundColor: 'rgba(255, 0, 0, 0.0)',
// 		width: 0,
// 		height: 0,
// 	},
// 	colorPrimaryThreeView: {
// 		width: "100%",
// 		height: "100%",
// 	},
// 	colorPrimaryThreeViewLinearGradient: {
// 		width: 0,
// 		height: 0,
// 	},
// 	discoverImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 30,
// 		height: 30,
// 		marginLeft: 22,
// 		marginTop: 12,
// 	},
// 	neabyImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 30,
// 		height: 30,
// 		marginLeft: 45,
// 		marginTop: 12,
// 	},
// 	homeIndicatorOnLightView: {
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		height: 34,
// 	},
// 	favoriteImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 30,
// 		height: 30,
// 		marginTop: 12,
// 		alignSelf: "center",
// 	},
// 	profileImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 30,
// 		height: 30,
// 		marginTop: 12,
// 		marginRight: 23,
// 	},
// 	messageImage: {
// 		resizeMode: "center",
// 		backgroundColor: 'rgba(0, 0, 0, 0.0)',
// 		width: 30,
// 		height: 30,
// 		marginTop: 12,
// 		marginRight: 45,
// 	},
// 	rectangle24View: {
// 		backgroundColor: 'rgb(0, 0, 0)',
// 		borderRadius: 2.5,
// 		width: 134,
// 		height: 5,
// 		marginTop: 20,
// 		alignSelf: "center",
// 	},
// })
