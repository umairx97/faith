//
//  NearbyFilters.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { Text, StyleSheet, View, Image } from "react-native"
import React from "react"
import LinearGradient from "react-native-linear-gradient"


export default class NearbyFilters extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				pointerEvents="box-none"
				style={styles.nearbyFiltersView}>
				<View
					pointerEvents="box-none"
					style={styles.barsNavigationFilterView}>
					<View
						pointerEvents="box-none"
						style={styles.toplineView}>
						<Text
							style={styles.doneText}>Done</Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
						}}>
						<Text
							style={styles.filterText}>Filter</Text>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								flexDirection: "column",
								justifyContent: "flex-end",
							}}>
							<View
								pointerEvents="box-none"
								style={styles.filtersView}>
								<View
									pointerEvents="box-none"
									style={{
										flex: 1,
										flexDirection: "column",
										justifyContent: "flex-end",
									}}/>
							</View>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={styles.contentsView}>
					<View
						pointerEvents="box-none"
						style={styles.showMeView}>
						<Text
							style={styles.showMeText}>Show me</Text>
						<Text
							style={styles.guysText}>Guys</Text>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								flexDirection: "column",
								justifyContent: "flex-end",
							}}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<Text
								style={styles.girlsText}>Girls</Text>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<Text
								style={styles.bothText}>Both</Text>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={styles.locationsView}>
						<View
							pointerEvents="box-none"
							style={{
								flexDirection: "row",
								alignSelf: "stretch",
							}}>
							<Text
								style={styles.locationText}>Location</Text>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									flex: 1,
									justifyContent: "flex-end",
								}}>
								<Text
									style={styles.sanFranciscoText}>(San Francisco)</Text>
								<Image
									source={require("../../../assets/images/locations.png")}
									style={styles.locationsImage}/>
							</View>
						</View>
						<Text
							style={styles.currentLocationText}>Current location </Text>
					</View>
					<View
						pointerEvents="box-none"
						style={styles.distanceView}>
						<View
							pointerEvents="box-none"
							style={{
								flexDirection: "row",
								alignSelf: "stretch",
							}}>
							<Text
								style={styles.distanceText}>Distance</Text>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									flex: 1,
									justifyContent: "flex-end",
								}}>
								<Text
									style={styles.kmText}>50 km</Text>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								flexDirection: "column",
								justifyContent: "flex-end",
							}}>
							<View
								pointerEvents="box-none"
								style={styles.rectangle6View}>
								<View
									pointerEvents="box-none"
									style={{
										flex: 1,
										flexDirection: "column",
										justifyContent: "flex-end",
									}}/>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<LinearGradient
								start={{
									x: 1,
									y: 0.5,
								}}
								end={{
									x: -0,
									y: 0.5,
								}}
								locations={[0, 1]}
								colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
								style={styles.rectangle6CopyViewLinearGradient}>
								<View
									pointerEvents="box-none"
									style={styles.rectangle6CopyView}>
									<View
										pointerEvents="box-none"
										style={{
											flex: 1,
											flexDirection: "column",
											justifyContent: "flex-end",
										}}/>
								</View>
							</LinearGradient>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={styles.ageView}>
						<View
							pointerEvents="box-none"
							style={{
								flexDirection: "row",
								alignSelf: "stretch",
							}}>
							<Text
								style={styles.ageRangeText}>Age range</Text>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									flex: 1,
									justifyContent: "flex-end",
								}}>
								<Text
									style={styles.textText}>18-25</Text>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								flexDirection: "column",
								justifyContent: "flex-end",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									alignSelf: "stretch",
								}}>
								<LinearGradient
									start={{
										x: 1,
										y: 0.5,
									}}
									end={{
										x: -0,
										y: 0.5,
									}}
									locations={[0, 1]}
									colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
									style={styles.rectangle6CopyTwoViewLinearGradient}>
									<View
										pointerEvents="box-none"
										style={styles.rectangle6CopyTwoView}>
										<View
											pointerEvents="box-none"
											style={{
												flex: 1,
												flexDirection: "column",
												justifyContent: "flex-end",
											}}/>
									</View>
								</LinearGradient>
								<View
									pointerEvents="box-none"
									style={{
										flexDirection: "row",
										flex: 1,
										justifyContent: "flex-end",
									}}>
									<View
										pointerEvents="box-none"
										style={styles.rectangle6TwoView}>
										<View
											pointerEvents="box-none"
											style={{
												flex: 1,
												flexDirection: "column",
												justifyContent: "flex-end",
											}}/>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						flex: 1,
						flexDirection: "column",
						justifyContent: "flex-end",
					}}>
					<View
						pointerEvents="box-none"
						style={styles.iphoneXBarsTabBar5ItemsView}>
						<View
							pointerEvents="box-none"
							style={styles.barView}>
							<View
								pointerEvents="box-none"
								style={{
									flex: 1,
									flexDirection: "column",
									justifyContent: "flex-end",
								}}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<Image
								source={require("../../../assets/images/home-indicator---on-light.png")}
								style={styles.homeIndicatorOnLightImage}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<Image
								source={require("../../../assets/images/discover.png")}
								style={styles.discoverImage}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<Image
								source={require("../../../assets/images/neaby-2.png")}
								style={styles.neabyImage}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<View
								pointerEvents="box-none"
								style={styles.favoriteView}>
								<View
									pointerEvents="box-none"
									style={{
										flex: 1,
										flexDirection: "column",
										justifyContent: "flex-end",
									}}/>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<Image
								source={require("../../../assets/images/message-2.png")}
								style={styles.messageImage}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<Image
								source={require("../../../assets/images/profile-2.png")}
								style={styles.profileImage}/>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	nearbyFiltersView: {
		backgroundColor: 'rgb(255, 255, 255)',
		flex: 1,
	},
	barsNavigationFilterView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 116,
		justifyContent: "center",
	},
	contentsView: {
		backgroundColor: 'rgb(255, 255, 255)',
		height: 697,
	},
	iphoneXBarsTabBar5ItemsView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 83,
	},
	showMeView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 82,
		marginLeft: 16,
		marginTop: 35,
		marginRight: 16,
	},
	locationsView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 83,
		marginLeft: 16,
		marginTop: 40,
		marginRight: 16,
	},
	distanceView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 92,
		marginLeft: 16,
		marginTop: 39,
		marginRight: 16,
	},
	ageView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 91,
		marginLeft: 16,
		marginTop: 40,
		marginRight: 16,
	},
	showMeText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -3,
	},
	guysText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(193, 192, 201)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.41,
		marginLeft: 38,
		marginTop: 28,
	},
	rectangleViewLinearGradient: {
		width: 114,
		height: 18,
		alignSelf: "flex-end",
	},
	rectangleView: {
		width: "100%",
		height: "100%",
	},
	girlsText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(193, 192, 201)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.41,
		marginTop: 47,
		alignSelf: "center",
	},
	bothText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(255, 255, 255)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: 43,
		marginRight: 40,
		alignSelf: "flex-end",
	},
	locationText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -3,
	},
	locationsImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 20,
		height: 20,
		marginTop: 47,
		marginRight: 17,
	},
	sanFranciscoText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(155, 155, 155)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		letterSpacing: -0.41,
		marginTop: 47,
		marginRight: 39,
	},
	currentLocationText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(38, 38, 40)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginLeft: 15,
		marginTop: 24,
	},
	distanceText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -3,
	},
	kmText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(155, 155, 155)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		letterSpacing: -0.41,
	},
	rectangle6View: {
		backgroundColor: 'rgb(239, 239, 239)',
		borderRadius: 3.5,
		height: 7,
		marginBottom: 17,
	},
	rectangle6CopyView: {
		width: "100%",
		height: "100%",
	},
	rectangle6CopyViewLinearGradient: {
		borderRadius: 3.5,
		width: 200,
		height: 7,
		marginBottom: 17,
	},
	ageRangeText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -3,
	},
	textText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(155, 155, 155)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		letterSpacing: -0.41,
		marginRight: 2,
	},
	rectangle6CopyTwoViewLinearGradient: {
		borderRadius: 3.5,
		width: 97,
		height: 7,
		marginLeft: 37,
		marginBottom: 16,
	},
	rectangle6CopyTwoView: {
		width: "100%",
		height: "100%",
	},
	rectangle6TwoView: {
		backgroundColor: 'rgb(239, 239, 239)',
		borderRadius: 3.5,
		width: 306,
		height: 7,
		marginBottom: 16,
	},
	barView: {
		backgroundColor: 'rgb(248, 248, 248)',
		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowRadius: 0,
		shadowOpacity: 1,
		width: 0,
		height: 0,
	},
	homeIndicatorOnLightImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 0,
		height: 0,
	},
	discoverImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 0,
		height: 0,
	},
	neabyImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 0,
		height: 0,
	},
	favoriteView: {
		backgroundColor: 'rgb(193, 192, 201)',
		width: 0,
		height: 0,
	},
	messageImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 0,
		height: 0,
	},
	profileImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 0,
		height: 0,
	},
	toplineView: {
		backgroundColor: 'rgb(248, 248, 248)',
		height: 116,
	},
	filterText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(38, 38, 40)',
		fontSize: 34,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0.32,
		marginLeft: 15,
		marginTop: 55,
	},
	filtersView: {
		backgroundColor: 'rgb(218, 217, 226)',
		height: 1,
	},
	doneText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(255, 104, 154)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: 66,
		marginRight: 16,
		alignSelf: "flex-end",
	},
})
