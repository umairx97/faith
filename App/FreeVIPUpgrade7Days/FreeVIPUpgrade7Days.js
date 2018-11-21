//
//  FreeVIPUpgrade7Days.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { View, StyleSheet, Image, Text } from "react-native"
import React from "react"
import LinearGradient from "react-native-linear-gradient"


export default class FreeVIPUpgrade7Days extends React.Component {

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
				style={styles.freeVipUpgrade7DaysView}>
				<View
					pointerEvents="box-none"
					style={styles.bgWhiteView}>
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
					<View
						pointerEvents="box-none"
						style={styles.artworkView}>
						<Image
							source={require("../../assets/images/combined-shape.png")}
							style={styles.combinedShapeImage}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<LinearGradient
								start={{
									x: 0.79,
									y: 0.38,
								}}
								end={{
									x: -0.04,
									y: 0.66,
								}}
								locations={[0, 1]}
								colors={['rgb(255, 137, 96)', 'rgb(255, 98, 165)']}
								style={styles.colorPrimaryViewLinearGradient}>
								<View
									pointerEvents="box-none"
									style={styles.colorPrimaryView}>
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
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<View
								pointerEvents="box-none"
								style={styles.burstView}>
								<View
									pointerEvents="box-none"
									style={{
										flexDirection: "row",
										alignSelf: "stretch",
									}}>
									<View
										pointerEvents="box-none"
										style={styles.group24View}>
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
											flexDirection: "row",
											flex: 1,
											justifyContent: "flex-end",
										}}>
										<View
											pointerEvents="box-none"
											style={styles.group6View}>
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
										<View
											pointerEvents="box-none"
											style={styles.group36View}>
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
												flexDirection: "row",
												flex: 1,
												justifyContent: "flex-end",
											}}>
											<View
												pointerEvents="box-none"
												style={styles.group18View}>
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
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<View
										pointerEvents="box-none"
										style={{
											flexDirection: "row",
											alignSelf: "stretch",
										}}>
										<View
											pointerEvents="box-none"
											style={styles.group27View}>
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
												flexDirection: "row",
												flex: 1,
												justifyContent: "flex-end",
											}}>
											<View
												pointerEvents="box-none"
												style={styles.group9View}>
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
											<View
												pointerEvents="box-none"
												style={styles.group39View}>
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
												style={styles.group3View}>
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
													flexDirection: "row",
													flex: 1,
													justifyContent: "flex-end",
												}}>
												<View
													pointerEvents="box-none"
													style={styles.group21View}>
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
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<View
										pointerEvents="box-none"
										style={{
											flexDirection: "row",
											alignSelf: "stretch",
										}}>
										<View
											pointerEvents="box-none"
											style={styles.group30View}>
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
												flexDirection: "row",
												flex: 1,
												justifyContent: "flex-end",
											}}>
											<View
												pointerEvents="box-none"
												style={styles.group12View}>
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
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<View
										pointerEvents="box-none"
										style={{
											flexDirection: "row",
											alignSelf: "stretch",
										}}>
										<View
											pointerEvents="box-none"
											style={styles.group33View}>
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
												flexDirection: "row",
												flex: 1,
												justifyContent: "flex-end",
											}}>
											<View
												pointerEvents="box-none"
												style={styles.group15View}>
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
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
							<View
								pointerEvents="box-none"
								style={styles.artwork2View}>
								<Image
									source={require("../../assets/images/circle-star-bg.png")}
									style={styles.circleStarBgImage}/>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<Image
										source={require("../../assets/images/oval.png")}
										style={styles.ovalImage}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<Image
										source={require("../../assets/images/vip-level.png")}
										style={styles.vipLevelImage}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
										justifyContent: "center",
									}}>
									<Image
										source={require("../../assets/images/circle-star-bg.png")}
										style={styles.circleStarBgTwoImage}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<Image
										source={require("../../assets/images/oval.png")}
										style={styles.ovalTwoImage}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<Image
										source={require("../../assets/images/vip-level.png")}
										style={styles.vipLevelTwoImage}/>
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
						height: "100%",
					}}>
					<View
						pointerEvents="box-none"
						style={styles.navView}>
						<Text
							style={styles.freeVipUpgradeText}>Free VIP Upgrade</Text>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									alignSelf: "stretch",
									alignItems: "center",
								}}>
								<Image
									source={require("../../assets/images/shape.png")}
									style={styles.shapeImage}/>
								<View
									pointerEvents="box-none"
									style={{
										flexDirection: "row",
										flex: 1,
										justifyContent: "flex-end",
										alignItems: "center",
									}}>
									<Text
										style={styles.skipText}>Skip</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	freeVipUpgrade7DaysView: {
		backgroundColor: 'rgb(255, 255, 255)',
		flex: 1,
	},
	bgWhiteView: {
		backgroundColor: 'rgb(255, 255, 255)',
		height: 1102,
	},
	artworkView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 365,
	},
	navView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 21,
		marginLeft: 16,
		marginTop: 55,
		marginRight: 16,
		justifyContent: "center",
	},
	combinedShapeImage: {
		resizeMode: "stretch",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 375,
		height: 264,
	},
	colorPrimaryViewLinearGradient: {
		height: 264,
	},
	colorPrimaryView: {
		width: "100%",
		height: "100%",
	},
	burstView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		opacity: 0.1,
		height: 264,
	},
	artwork2View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 280,
		height: 261,
		marginTop: 104,
		alignSelf: "center",
		justifyContent: "center",
	},
	group24View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 160,
		height: 277,
		marginLeft: 24,
	},
	group6View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 155,
		height: 277,
		marginRight: 32,
	},
	group36View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 166,
		height: 158,
		marginBottom: -13,
	},
	group18View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 171,
		height: 158,
		marginRight: -3,
		marginBottom: -13,
	},
	group27View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 181,
		height: 277,
	},
	group9View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 186,
		height: 277,
		marginRight: -3,
	},
	group39View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 149,
		height: 80,
		marginBottom: -13,
	},
	group3View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 67,
		height: 277,
		marginLeft: 1,
	},
	group21View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 153,
		height: 80,
		marginRight: -3,
		marginBottom: -13,
	},
	group30View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 176,
		height: 277,
	},
	group12View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 182,
		height: 277,
		marginRight: -3,
	},
	group33View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 171,
		height: 220,
		marginTop: 57,
	},
	group15View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 176,
		height: 220,
		marginTop: 57,
		marginRight: -3,
	},
	circleStarBgImage: {
		resizeMode: "stretch",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 280,
		height: 261,
	},
	ovalImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 123,
		height: 123,
		marginTop: 87,
		alignSelf: "center",
	},
	vipLevelImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 37,
		height: 37,
		marginTop: 174,
		marginRight: 83,
		alignSelf: "flex-end",
	},
	circleStarBgTwoImage: {
		resizeMode: "stretch",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 280,
		height: 261,
	},
	ovalTwoImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 123,
		height: 123,
		marginTop: 87,
		alignSelf: "center",
	},
	vipLevelTwoImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 37,
		height: 37,
		marginTop: 174,
		marginRight: 83,
		alignSelf: "flex-end",
	},
	freeVipUpgradeText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(255, 255, 255)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 14,
		letterSpacing: -0.1,
		paddingTop: 3,
		alignSelf: "center",
	},
	shapeImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 12,
		height: 21,
	},
	skipText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(255, 255, 255)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		lineHeight: 14,
		letterSpacing: -0.1,
		paddingTop: 3,
	},
	enjoy7DaysOfFreeText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 24,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: 0.23,
		alignSelf: "center",
	},
	usernameView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 458,
		marginTop: 34,
	},
	seeWhoLikedYouText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginLeft: 66,
		marginTop: -2,
	},
	group2Copy4View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 70,
		marginRight: 8,
	},
	group3TwoView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 50,
		marginRight: 8,
	},
	group2View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 51,
		marginTop: 23,
		marginRight: 8,
	},
	group2CopyView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 71,
		marginTop: 23,
	},
	group2Copy2View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 51,
		marginTop: 22,
		marginRight: 8,
	},
	group2Copy3View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 51,
		marginTop: 23,
		marginRight: 8,
	},
	youLlSeeEveryoneText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(193, 192, 201)',
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.36,
		marginTop: 22,
		marginRight: 56,
		alignSelf: "flex-end",
	},
	iconsLikeView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 30,
		height: 30,
		marginLeft: 10,
	},
	seeWhoVisitedYouText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -2,
		marginRight: 125,
		alignSelf: "flex-end",
	},
	youLlSeeEveryoneCopyText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(193, 192, 201)',
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.36,
		marginTop: 2,
		marginRight: 56,
		alignSelf: "flex-end",
	},
	iconsLikeCopyImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 30,
		height: 30,
		marginLeft: 10,
	},
	iconsLikeCopyTwoImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 30,
		height: 30,
		marginLeft: 10,
		marginTop: 10,
	},
	unlimitedRewindsText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginLeft: 26,
		marginTop: -2,
	},
	incognitoModeText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -2,
		marginRight: 158,
		alignSelf: "flex-end",
	},
	youCanBrowseOtherText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(193, 192, 201)',
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.36,
		marginTop: 2,
		marginRight: 36,
		alignSelf: "flex-end",
	},
	iconsLikeCopyThreeImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 30,
		height: 30,
		marginLeft: 10,
	},
	extraSuperlikesText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -2,
		marginRight: 154,
		alignSelf: "flex-end",
	},
	youCanSuperlikeUpText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(193, 192, 201)',
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.36,
		marginTop: 2,
		marginRight: 33,
		alignSelf: "flex-end",
	},
	iconsLikeCopyFourImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 30,
		height: 30,
		marginLeft: 10,
	},
	iconsLikeCopyFiveImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 30,
		height: 30,
		marginLeft: 10,
		marginTop: 10,
	},
	spotlightText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -2,
		marginRight: 206,
	},
	youWillBeOnSpotlText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(193, 192, 201)',
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.36,
		width: 269,
		marginTop: 2,
		alignSelf: "flex-end",
	},
	getStartedText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(255, 255, 255)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: 9,
		alignSelf: "center",
	},
	rectangle24View: {
		backgroundColor: 'rgb(0, 0, 0)',
		borderRadius: 2.5,
		width: 134,
		height: 5,
		marginTop: 20,
		alignSelf: "center",
	},
})
