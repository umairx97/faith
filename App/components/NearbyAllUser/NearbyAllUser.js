//
//  NearbyAllUser.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

import GridView from "react-native-super-grid";

const items = [
  { name: "TURQUOISE", code: "#1abc9c" },
  { name: "EMERALD", code: "#2ecc71" },
  { name: "PETER RIVER", code: "#3498db" },
  { name: "AMETHYST", code: "#9b59b6" },
  { name: "WET ASPHALT", code: "#34495e" },
  { name: "GREEN SEA", code: "#16a085" },
  { name: "NEPHRITIS", code: "#27ae60" },
  { name: "BELIZE HOLE", code: "#2980b9" },
  { name: "WISTERIA", code: "#8e44ad" },
  { name: "MIDNIGHT BLUE", code: "#2c3e50" },
  { name: "SUN FLOWER", code: "#f1c40f" },
  { name: "CARROT", code: "#e67e22" },
  { name: "ALIZARIN", code: "#e74c3c" },
  { name: "CLOUDS", code: "#ecf0f1" },
  { name: "CONCRETE", code: "#95a5a6" },
  { name: "ORANGE", code: "#f39c12" },
  { name: "PUMPKIN", code: "#d35400" },
  { name: "POMEGRANATE", code: "#c0392b" },
  { name: "SILVER", code: "#bdc3c7" },
  { name: "ASBESTOS", code: "#7f8c8d" }
];

export default class NearbyAllUser extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onAllUserPressed = () => {
    this.props.navigation.navigate("Discover");
  };
  onSpotlightPressed = () => {
    //this.props.navigation.navigate('Discover');
  };
  onNearbyPressed = () => {
    this.props.navigation.navigate("NearbyFilters");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <GridView
              itemDimension={130}
              items={items}
              style={styles.gridView}
              renderItem={item => (
                <View
                  style={[styles.itemContainer, { backgroundColor: item.code }]}
                >
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.code}</Text>
                </View>
              )}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
// 	<View
// 			pointerEvents="box-none"
// 			style={styles.nearbyAllUserView}>
// 			<View
// 				pointerEvents="box-none"
// 				style={styles.contentsView}>
// 				<View
// 					pointerEvents="box-none"
// 					style={styles.bgWhiteView}>
// 					<View
// 						pointerEvents="box-none"
// 						style={{
// 							flex: 1,
// 							flexDirection: "column",
// 							justifyContent: "flex-end",
// 						}}/>
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
// 						style={styles.barsNavigationNearbyFiltersView}>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flexDirection: "row",
// 								alignSelf: "stretch",
// 								alignItems: "center",
// 							}}>
// 							<Text
// 								style={styles.nearbyText}>Nearby</Text>
// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									flexDirection: "row",
// 									flex: 1,
// 									justifyContent: "flex-end",
// 									alignItems: "center",
// 								}}>
// 								<Image
// 									source={require("../../../assets/images/filters-btn.png")}
// 									style={styles.filtersBtnImage}/>
// 							</View>
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
// 								style={styles.filtersView}>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										flex: 1,
// 										flexDirection: "column",
// 										justifyContent: "flex-end",
// 									}}/>
// 							</View>
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
// 						style={styles.tabView}>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flexDirection: "row",
// 								alignSelf: "stretch",
// 							}}>
// 							  <TouchableOpacity
// 					onPress={this.onAllUserPressed}
// 					style={styles.facebookButton}>
// 				<Text
// 								style={styles.allUserText}>All user</Text>

// 				</TouchableOpacity>
// 				<TouchableOpacity
// 					onPress={this.onSpotlightPressed}
// 					style={styles.facebookButton}>
// 				<Text
// 								style={styles.spotlightText}>Spotlight</Text>

// 				</TouchableOpacity>

// 							<View
// 								pointerEvents="box-none"
// 								style={{
// 									flexDirection: "row",
// 									flex: 1,
// 									justifyContent: "flex-end",
// 								}}>
// 								<Text
// 									style={styles.newText}>New</Text>

// 		<TouchableOpacity
// 					onPress={this.onNearbyPressed}
// 					style={styles.facebookButton}>
// 				<Text style={styles.nearbyTwoText}>Nearby</Text>

// 				</TouchableOpacity>

// 							</View>
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
// 								style={styles.rectangleView}>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										flex: 1,
// 										flexDirection: "column",
// 										justifyContent: "flex-end",
// 									}}/>
// 							</View>
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
// 							style={styles.col18vView}>
// 							<View
// 								pointerEvents="box-none"
// 								style={styles.items1View}>
// 								<LinearGradient
// 									start={{
// 										x: 0.5,
// 										y: 0.77,
// 									}}
// 									end={{
// 										x: 0.5,
// 										y: 1,
// 									}}
// 									locations={[0, 1]}
// 									colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)']}
// 									style={styles.rectangle3ImageLinearGradient}>
// 									<Image
// 										source={require("../../../assets/images/rectangle-3-11.png")}
// 										style={styles.rectangle3Image}/>
// 								</LinearGradient>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										position: "absolute",
// 										width: "100%",
// 										height: "100%",
// 									}}>
// 									<View
// 										pointerEvents="box-none"
// 										style={{
// 											flexDirection: "row",
// 											alignSelf: "stretch",
// 										}}>
// 										<Text
// 											style={styles.augustaCastroText}>Augusta Castro</Text>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												flexDirection: "row",
// 												flex: 1,
// 												justifyContent: "flex-end",
// 											}}>
// 											<LinearGradient
// 												start={{
// 													x: 1.07,
// 													y: 0.39,
// 												}}
// 												end={{
// 													x: -0.07,
// 													y: 0.61,
// 												}}
// 												locations={[0, 1]}
// 												colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 												style={styles.genderAgeSmallViewLinearGradient}>
// 												<View
// 													pointerEvents="box-none"
// 													style={styles.genderAgeSmallView}>
// 													<View
// 														pointerEvents="box-none"
// 														style={{
// 															flexDirection: "row",
// 															alignSelf: "stretch",
// 														}}>
// 														<Image
// 															source={require("../../../assets/images/oval-2.png")}
// 															style={styles.oval2Image}/>
// 														<Text
// 															style={styles.textText}>23</Text>
// 													</View>
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
// 									justifyContent: "center",
// 								}}>
// 								<View
// 									pointerEvents="box-none"
// 									style={styles.items2View}>
// 									<LinearGradient
// 										start={{
// 											x: 0.5,
// 											y: 0.77,
// 										}}
// 										end={{
// 											x: 0.5,
// 											y: 1,
// 										}}
// 										locations={[0, 1]}
// 										colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)']}
// 										style={styles.rectangle3TwoImageLinearGradient}>
// 										<Image
// 											source={require("../../../assets/images/rectangle-3-16.png")}
// 											style={styles.rectangle3TwoImage}/>
// 									</LinearGradient>
// 									<View
// 										pointerEvents="box-none"
// 										style={{
// 											position: "absolute",
// 											width: "100%",
// 											height: "100%",
// 										}}>
// 										<Image
// 											source={require("../../../assets/images/videos.png")}
// 											style={styles.videosImage}/>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												flex: 1,
// 												flexDirection: "column",
// 												justifyContent: "flex-end",
// 											}}>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flexDirection: "row",
// 													alignSelf: "stretch",
// 												}}>
// 												<Text
// 													style={styles.minaHowellText}>Mina Howell</Text>
// 												<View
// 													pointerEvents="box-none"
// 													style={{
// 														flexDirection: "row",
// 														flex: 1,
// 														justifyContent: "flex-end",
// 													}}>
// 													<LinearGradient
// 														start={{
// 															x: 1.07,
// 															y: 0.39,
// 														}}
// 														end={{
// 															x: -0.07,
// 															y: 0.61,
// 														}}
// 														locations={[0, 1]}
// 														colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 														style={styles.genderAgeSmallTwoViewLinearGradient}>
// 														<View
// 															pointerEvents="box-none"
// 															style={styles.genderAgeSmallTwoView}>
// 															<Text
// 																style={styles.textTwoText}/>
// 															<View
// 																pointerEvents="box-none"
// 																style={{
// 																	position: "absolute",
// 																	width: "100%",
// 																	height: "100%",
// 																}}>
// 																<Image
// 																	source={require("../../../assets/images/oval-2.png")}
// 																	style={styles.oval2TwoImage}/>
// 															</View>
// 														</View>
// 													</LinearGradient>
// 												</View>
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
// 									style={styles.items3View}>
// 									<LinearGradient
// 										start={{
// 											x: 0.5,
// 											y: 0.77,
// 										}}
// 										end={{
// 											x: 0.5,
// 											y: 1,
// 										}}
// 										locations={[0, 1]}
// 										colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)']}
// 										style={styles.rectangle3ThreeImageLinearGradient}>
// 										<Image
// 											source={require("../../../assets/images/rectangle-3-6.png")}
// 											style={styles.rectangle3ThreeImage}/>
// 									</LinearGradient>
// 									<View
// 										pointerEvents="box-none"
// 										style={{
// 											position: "absolute",
// 											width: "100%",
// 											height: "100%",
// 										}}>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												flexDirection: "row",
// 												alignSelf: "stretch",
// 											}}>
// 											<Text
// 												style={styles.hettieBarberText}>Hettie Barber</Text>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flexDirection: "row",
// 													flex: 1,
// 													justifyContent: "flex-end",
// 												}}>
// 												<LinearGradient
// 													start={{
// 														x: 1.07,
// 														y: 0.39,
// 													}}
// 													end={{
// 														x: -0.07,
// 														y: 0.61,
// 													}}
// 													locations={[0, 1]}
// 													colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 													style={styles.genderAgeSmallThreeViewLinearGradient}>
// 													<View
// 														pointerEvents="box-none"
// 														style={styles.genderAgeSmallThreeView}>
// 														<Text
// 															style={styles.textThreeText}/>
// 													</View>
// 												</LinearGradient>
// 											</View>
// 										</View>
// 									</View>
// 								</View>
// 							</View>
// 						</View>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flexDirection: "row",
// 								flex: 1,
// 								justifyContent: "flex-end",
// 							}}>
// 							<View
// 								pointerEvents="box-none"
// 								style={styles.col18vTwoView}>
// 								<View
// 									pointerEvents="box-none"
// 									style={styles.items1TwoView}>
// 									<LinearGradient
// 										start={{
// 											x: 0.5,
// 											y: 0.77,
// 										}}
// 										end={{
// 											x: 0.5,
// 											y: 1,
// 										}}
// 										locations={[0, 1]}
// 										colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)']}
// 										style={styles.rectangle3FourImageLinearGradient}>
// 										<Image
// 											source={require("../../../assets/images/rectangle-3-8.png")}
// 											style={styles.rectangle3FourImage}/>
// 									</LinearGradient>
// 									<View
// 										pointerEvents="box-none"
// 										style={{
// 											position: "absolute",
// 											width: "100%",
// 											height: "100%",
// 										}}>
// 										<Image
// 											source={require("../../../assets/images/videos.png")}
// 											style={styles.videosTwoImage}/>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												flex: 1,
// 												flexDirection: "column",
// 												justifyContent: "flex-end",
// 											}}>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flexDirection: "row",
// 													alignSelf: "stretch",
// 												}}>
// 												<Text
// 													style={styles.susieDelgadoText}>Susie Delgado</Text>
// 												<View
// 													pointerEvents="box-none"
// 													style={{
// 														flexDirection: "row",
// 														flex: 1,
// 														justifyContent: "flex-end",
// 													}}>
// 													<LinearGradient
// 														start={{
// 															x: 1.07,
// 															y: 0.39,
// 														}}
// 														end={{
// 															x: -0.07,
// 															y: 0.61,
// 														}}
// 														locations={[0, 1]}
// 														colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 														style={styles.genderAgeSmallFourViewLinearGradient}>
// 														<View
// 															pointerEvents="box-none"
// 															style={styles.genderAgeSmallFourView}>
// 															<Text
// 																style={styles.textFourText}/>
// 															<View
// 																pointerEvents="box-none"
// 																style={{
// 																	position: "absolute",
// 																	width: "100%",
// 																	height: "100%",
// 																}}>
// 																<Image
// 																	source={require("../../../assets/images/oval-2.png")}
// 																	style={styles.oval2ThreeImage}/>
// 															</View>
// 														</View>
// 													</LinearGradient>
// 												</View>
// 											</View>
// 										</View>
// 									</View>
// 								</View>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										position: "absolute",
// 										width: "100%",
// 										height: "100%",
// 										justifyContent: "center",
// 									}}>
// 									<View
// 										pointerEvents="box-none"
// 										style={styles.items2TwoView}>
// 										<LinearGradient
// 											start={{
// 												x: 0.5,
// 												y: 0.77,
// 											}}
// 											end={{
// 												x: 0.5,
// 												y: 1,
// 											}}
// 											locations={[0, 1]}
// 											colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)']}
// 											style={styles.rectangle3FiveImageLinearGradient}>
// 											<Image
// 												source={require("../../../assets/images/rectangle-3-18.png")}
// 												style={styles.rectangle3FiveImage}/>
// 										</LinearGradient>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												position: "absolute",
// 												width: "100%",
// 												height: "100%",
// 											}}>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flexDirection: "row",
// 													alignSelf: "stretch",
// 												}}>
// 												<Text
// 													style={styles.corneliaGilbertText}>Cornelia Gilbert</Text>
// 												<View
// 													pointerEvents="box-none"
// 													style={{
// 														flexDirection: "row",
// 														flex: 1,
// 														justifyContent: "flex-end",
// 													}}>
// 													<LinearGradient
// 														start={{
// 															x: 1.07,
// 															y: 0.39,
// 														}}
// 														end={{
// 															x: -0.07,
// 															y: 0.61,
// 														}}
// 														locations={[0, 1]}
// 														colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 														style={styles.genderAgeSmallFiveViewLinearGradient}>
// 														<View
// 															pointerEvents="box-none"
// 															style={styles.genderAgeSmallFiveView}>
// 															<Image
// 																source={require("../../../assets/images/oval-2-2.png")}
// 																style={styles.oval2FourImage}/>
// 															<View
// 																pointerEvents="box-none"
// 																style={{
// 																	position: "absolute",
// 																	width: "100%",
// 																	height: "100%",
// 																}}>
// 																<View
// 																	pointerEvents="box-none"
// 																	style={styles.rectangle3View}>
// 																	<View
// 																		pointerEvents="box-none"
// 																		style={{
// 																			flex: 1,
// 																			flexDirection: "column",
// 																			justifyContent: "flex-end",
// 																		}}/>
// 																</View>
// 															</View>
// 															<View
// 																pointerEvents="box-none"
// 																style={{
// 																	position: "absolute",
// 																	width: "100%",
// 																	height: "100%",
// 																}}>
// 																<View
// 																	pointerEvents="box-none"
// 																	style={{
// 																		flexDirection: "row",
// 																		alignSelf: "stretch",
// 																	}}>
// 																	<View
// 																		pointerEvents="box-none"
// 																		style={styles.rectangle3TwoView}>
// 																		<View
// 																			pointerEvents="box-none"
// 																			style={{
// 																				flex: 1,
// 																				flexDirection: "column",
// 																				justifyContent: "flex-end",
// 																			}}/>
// 																	</View>
// 																	<Text
// 																		style={styles.textFiveText}>23</Text>
// 																</View>
// 															</View>
// 														</View>
// 													</LinearGradient>
// 												</View>
// 											</View>
// 										</View>
// 									</View>
// 								</View>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										position: "absolute",
// 										width: "100%",
// 										height: "100%",
// 									}}>
// 									<View
// 										pointerEvents="box-none"
// 										style={styles.items3TwoView}>
// 										<LinearGradient
// 											start={{
// 												x: 0.5,
// 												y: 0.77,
// 											}}
// 											end={{
// 												x: 0.5,
// 												y: 1,
// 											}}
// 											locations={[0, 1]}
// 											colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.5)']}
// 											style={styles.rectangle3SixImageLinearGradient}>
// 											<Image
// 												source={require("../../../assets/images/rectangle-3-3.png")}
// 												style={styles.rectangle3SixImage}/>
// 										</LinearGradient>
// 										<View
// 											pointerEvents="box-none"
// 											style={{
// 												position: "absolute",
// 												width: "100%",
// 												height: "100%",
// 											}}>
// 											<View
// 												pointerEvents="box-none"
// 												style={{
// 													flexDirection: "row",
// 													alignSelf: "stretch",
// 												}}>
// 												<Text
// 													style={styles.claraMatthewsText}>Clara Matthews</Text>
// 												<View
// 													pointerEvents="box-none"
// 													style={{
// 														flexDirection: "row",
// 														flex: 1,
// 														justifyContent: "flex-end",
// 													}}>
// 													<LinearGradient
// 														start={{
// 															x: 1.07,
// 															y: 0.39,
// 														}}
// 														end={{
// 															x: -0.07,
// 															y: 0.61,
// 														}}
// 														locations={[0, 1]}
// 														colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
// 														style={styles.genderAgeSmallSixViewLinearGradient}>
// 														<View
// 															pointerEvents="box-none"
// 															style={styles.genderAgeSmallSixView}>
// 															<Text
// 																style={styles.textSixText}/>
// 															<View
// 																pointerEvents="box-none"
// 																style={{
// 																	position: "absolute",
// 																	width: "100%",
// 																	height: "100%",
// 																}}>
// 																<Image
// 																	source={require("../../../assets/images/oval-2.png")}
// 																	style={styles.oval2FiveImage}/>
// 															</View>
// 														</View>
// 													</LinearGradient>
// 												</View>
// 											</View>
// 										</View>
// 									</View>
// 								</View>
// 							</View>
// 						</View>
// 					</View>
// 				</View>
// 			</View>
// 			<View
// 				pointerEvents="box-none"
// 				style={{
// 					flex: 1,
// 					flexDirection: "column",
// 					justifyContent: "flex-end",
// 				}}>
// 				<View
// 					pointerEvents="box-none"
// 					style={styles.iphoneXBarsTabBar5ItemsView}>
// 					<View
// 						pointerEvents="box-none"
// 						style={{
// 							flexDirection: "row",
// 							alignSelf: "stretch",
// 						}}>
// 						<Image
// 							source={require("../../../assets/images/discover.png")}
// 							style={styles.discoverImage}/>
// 						<Image
// 							source={require("../../../assets/images/neaby-2.png")}
// 							style={styles.neabyImage}/>
// 					</View>
// 					<View
// 						pointerEvents="box-none"
// 						style={{
// 							flex: 1,
// 							flexDirection: "column",
// 							justifyContent: "flex-end",
// 						}}>
// 						<View
// 							pointerEvents="box-none"
// 							style={styles.homeIndicatorOnLightView}>
// 							<View
// 								pointerEvents="box-none"
// 								style={styles.rectangle24View}>
// 								<View
// 									pointerEvents="box-none"
// 									style={{
// 										flex: 1,
// 										flexDirection: "column",
// 										justifyContent: "flex-end",
// 									}}/>
// 							</View>
// 						</View>
// 					</View>
// 					<View
// 						pointerEvents="box-none"
// 						style={{
// 							position: "absolute",
// 							width: "100%",
// 							height: "100%",
// 						}}>
// 						<Image
// 							source={require("../../../assets/images/favorite.png")}
// 							style={styles.favoriteImage}/>
// 					</View>
// 					<View
// 						pointerEvents="box-none"
// 						style={{
// 							position: "absolute",
// 							width: "100%",
// 							height: "100%",
// 						}}>
// 						<View
// 							pointerEvents="box-none"
// 							style={{
// 								flexDirection: "row",
// 								justifyContent: "center",
// 								alignSelf: "stretch",
// 							}}/>
// 					</View>
// 				</View>
// 			</View>
// 		</View>
// 		</ScrollView>
//	}
//}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 5,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  },
  nearbyAllUserView: {
    backgroundColor: "rgb(255, 255, 255)",
    flex: 1
  },
  contentsView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 860
  },
  iphoneXBarsTabBar5ItemsView: {
    backgroundColor: "rgb(248, 248, 248)",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 0,
    shadowOpacity: 1,
    height: 83
  },
  bgWhiteView: {
    backgroundColor: "rgb(255, 255, 255)",
    height: 812
  },
  barsNavigationNearbyFiltersView: {
    backgroundColor: "rgb(248, 248, 248)",
    height: 145,
    justifyContent: "center"
  },
  tabView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 30,
    marginLeft: 16,
    marginTop: 115,
    marginRight: 14
  },
  col18vView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 176,
    height: 706,
    marginLeft: 8,
    marginTop: 9
  },
  col18vTwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 176,
    height: 706,
    marginTop: 9,
    marginRight: 8
  },
  nearbyText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 34,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.32,
    marginLeft: 15
  },
  filtersBtnImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 40,
    height: 39,
    marginRight: 15
  },
  filtersView: {
    backgroundColor: "rgb(218, 217, 226)",
    height: 1
  },
  items1View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items2View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items3View: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  rectangle3Image: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3ImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  augustaCastroText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  genderAgeSmallView: {
    width: "100%",
    height: "100%"
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
  rectangle3TwoImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3TwoImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  videosImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginTop: 7,
    marginRight: 7,
    alignSelf: "flex-end"
  },
  minaHowellText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallTwoViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  genderAgeSmallTwoView: {
    width: "100%",
    height: "100%"
  },
  textTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2TwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  rectangle3ThreeImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3ThreeImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  hettieBarberText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallThreeViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 3,
    marginBottom: 8
  },
  genderAgeSmallThreeView: {
    width: "100%",
    height: "100%"
  },
  textThreeText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  items1TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items2TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  items3TwoView: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    height: 230,
    justifyContent: "center"
  },
  rectangle3FourImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3FourImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  videosTwoImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 28,
    height: 28,
    marginTop: 7,
    marginRight: 7,
    alignSelf: "flex-end"
  },
  susieDelgadoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallFourView: {
    width: "100%",
    height: "100%"
  },
  genderAgeSmallFourViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8
  },
  textFourText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2ThreeImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  rectangle3FiveImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  rectangle3FiveImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  corneliaGilbertText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallFiveViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 5,
    marginBottom: 8,
    justifyContent: "center"
  },
  genderAgeSmallFiveView: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  oval2FourImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 9,
    height: 12,
    marginLeft: 1
  },
  rectangle3View: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 5,
    height: 2,
    marginLeft: 5
  },
  rectangle3TwoView: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 5,
    height: 2,
    marginLeft: 7,
    marginTop: 1
  },
  textFiveText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.09,
    marginLeft: 5,
    marginRight: 8
  },
  rectangle3SixImage: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%"
  },
  rectangle3SixImageLinearGradient: {
    borderRadius: 4,
    width: 176,
    height: 230
  },
  claraMatthewsText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 14,
    letterSpacing: -0.08,
    marginLeft: 7,
    marginBottom: 11
  },
  genderAgeSmallSixViewLinearGradient: {
    borderRadius: 8,
    width: 37,
    height: 16,
    marginRight: 3,
    marginBottom: 8
  },
  genderAgeSmallSixView: {
    width: "100%",
    height: "100%"
  },
  textSixText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(0, 0, 0)",
    fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0
  },
  oval2FiveImage: {
    resizeMode: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    width: 8,
    height: 10,
    marginLeft: 1
  },
  allUserText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(255, 104, 154)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3
  },
  spotlightText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 46,
    marginTop: -3
  },
  nearbyTwoText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3,
    marginRight: 3
  },
  newText: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    color: "rgb(38, 38, 40)",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    lineHeight: 22,
    letterSpacing: -0.41,
    marginTop: -3,
    marginRight: 43
  },
  rectangleView: {
    backgroundColor: "rgb(255, 104, 154)",
    width: 60,
    height: 3
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
  }
});
