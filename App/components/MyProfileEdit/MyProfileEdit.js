//
//  MyProfileEdit.js
//  Project
//
//  Created by Boffin Coders.
//  Copyright © 2018 Boffin Coders. All rights reserved.
//

import { Text, StyleSheet, View, Image } from "react-native"
import React from "react"
import { ScrollView } from "react-native-gesture-handler";


export default class MyProfileEdit extends React.Component {

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
	
		return <ScrollView>
		 <View
				pointerEvents="box-none"
				style={styles.myProfileEditView}>
				<View
					pointerEvents="box-none"
					style={styles.iphoneXBarsNavigationNavigationBar1ActionView}>
					<View
						pointerEvents="box-none"
						style={{
							flexDirection: "row",
							alignSelf: "stretch",
						}}>
						<Text
							style={styles.titleText}/>
						<View
							pointerEvents="box-none"
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "flex-end",
							}}>
							<Text
								style={styles.doneText}>Done</Text>
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
							source={require("../../../assets/images/icons-arrow-left.png")}
							style={styles.iconsArrowLeftImage}/>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={styles.editPhotosView}>
					<View
						pointerEvents="box-none"
						style={{
							flexDirection: "row",
							alignSelf: "stretch",
						}}>
						<View
							pointerEvents="box-none"
							style={styles.photo1View}>
							<Image
								source={require("../../../assets/images/rectangle-8-copy-5.png")}
								style={styles.rectangle8Copy5Image}/>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									width: "100%",
									height: "100%",
								}}>
								<View
									pointerEvents="box-none"
									style={styles.viewView}>
									<Text
										style={styles.textText}>1</Text>
								</View>
							</View>
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
								style={styles.photo2View}>
								<Image
									source={require("../../../assets/images/rectangle-8-copy-4.png")}
									style={styles.rectangle8Copy4Image}/>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
									}}>
									<View
										pointerEvents="box-none"
										style={styles.viewTwoView}>
										<Text
											style={styles.textTwoText}>2</Text>
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
							style={styles.photo4View}>
							<Image
								source={require("../../../assets/images/rectangle-8.png")}
								style={styles.rectangle8Image}/>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									width: "100%",
									height: "100%",
								}}>
								<View
									pointerEvents="box-none"
									style={styles.viewFourView}>
									<Text
										style={styles.textFourText}>4</Text>
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
							justifyContent: "center",
						}}>
						<View
							pointerEvents="box-none"
							style={styles.photo3View}>
							<Image
								source={require("../../../assets/images/rectangle-8-copy-3.png")}
								style={styles.rectangle8Copy3Image}/>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									width: "100%",
									height: "100%",
								}}>
								<Image
									source={require("../../../assets/images/videos-2.png")}
									style={styles.videosImage}/>
								<View
									pointerEvents="box-none"
									style={{
										flex: 1,
										flexDirection: "column",
										justifyContent: "flex-end",
									}}>
									<View
										pointerEvents="box-none"
										style={styles.viewThreeView}>
										<Text
											style={styles.textThreeText}>3</Text>
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
							style={styles.photo5View}>
							<View
								pointerEvents="box-none"
								style={styles.viewFiveView}>
								<Text
									style={styles.textFiveText}>5</Text>
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
							style={styles.photo6View}>
							<View
								pointerEvents="box-none"
								style={styles.viewSixView}>
								<Text
									style={styles.textSixText}>6</Text>
							</View>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={styles.basicInforView}>
					<View
						pointerEvents="box-none"
						style={styles.usernameView}>
						<View
							pointerEvents="box-none"
							style={{
								flexDirection: "row",
								alignSelf: "stretch",
							}}>
							<Text
								style={styles.usernameText}>Username</Text>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									flex: 1,
									justifyContent: "flex-end",
								}}>
								<Text
									style={styles.landonGibsonText}>Landon Gibson</Text>
							</View>
						</View>
					</View>
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
							style={styles.birthdayView}>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									alignSelf: "stretch",
								}}>
								<Text
									style={styles.birthdayText}>Birthday</Text>
								<View
									pointerEvents="box-none"
									style={{
										flexDirection: "row",
										flex: 1,
										justifyContent: "flex-end",
									}}>
									<Text
										style={styles.april181988Text}>April 18, 1988</Text>
									<Image
										source={require("../../../assets/images/shape-2.png")}
										style={styles.shapeImage}/>
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
							style={styles.genderView}>
							<View
								pointerEvents="box-none"
								style={{
									flexDirection: "row",
									alignSelf: "stretch",
								}}>
								<Text
									style={styles.genderText}>Gender</Text>
								<View
									pointerEvents="box-none"
									style={{
										flexDirection: "row",
										flex: 1,
										justifyContent: "flex-end",
									}}>
									<Text
										style={styles.maleText}>Male</Text>
									<Image
										source={require("../../../assets/images/shape-2.png")}
										style={styles.shapeCopyImage}/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
			</ScrollView>
	}
}

const styles = StyleSheet.create({
	myProfileEditView: {
		backgroundColor: 'rgb(255, 255, 255)',
		flex: 1,
	},
	iphoneXBarsNavigationNavigationBar1ActionView: {
		backgroundColor: 'rgba(248, 248, 248, 0.82)',
		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowRadius: 0,
		shadowOpacity: 1,
		height: 88,
	},
	editPhotosView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 342,
		marginLeft: 16,
		marginTop: 16,
		marginRight: 16,
	},
	basicInforView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 167,
		marginLeft: 16,
		marginTop: 60,
		marginRight: -2,
	},
	photo1View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 225,
		height: 225,
		justifyContent: "center",
	},
	photo2View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 106,
		height: 106,
		justifyContent: "center",
	},
	photo4View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 106,
		height: 106,
		justifyContent: "center",
	},
	photo3View: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 106,
		height: 106,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	photo5View: {
		backgroundColor: 'rgb(193, 192, 201)',
		borderRadius: 8,
		width: 106,
		height: 106,
		alignSelf: "center",
	},
	photo6View: {
		backgroundColor: 'rgb(193, 192, 201)',
		borderRadius: 8,
		width: 106,
		height: 106,
		alignSelf: "flex-end",
	},
	rectangle8Copy5Image: {
		resizeMode: "stretch",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		borderRadius: 8,
		width: 225,
		height: 225,
	},
	viewView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 24,
		height: 24,
		marginRight: 10,
		marginBottom: 10,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	textText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.1,
		marginLeft: 7,
		marginRight: 6,
	},
	rectangle8Copy4Image: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		borderRadius: 8,
		width: 106,
		height: 106,
	},
	viewTwoView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 24,
		height: 24,
		marginRight: 10,
		marginBottom: 10,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	textTwoText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.1,
		marginLeft: 7,
		marginRight: 6,
	},
	rectangle8Copy3Image: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		borderRadius: 8,
		width: 106,
		height: 106,
	},
	videosImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 20,
		height: 20,
		marginLeft: 7,
		marginTop: 6,
	},
	viewThreeView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 24,
		height: 24,
		marginRight: 10,
		marginBottom: 10,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	textThreeText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.1,
		marginLeft: 7,
		marginRight: 6,
	},
	rectangle8Image: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		borderRadius: 8,
		width: 106,
		height: 106,
	},
	viewFourView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 24,
		height: 24,
		marginRight: 10,
		marginBottom: 10,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	textFourText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.1,
		marginLeft: 7,
		marginRight: 6,
	},
	viewFiveView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 24,
		height: 24,
		marginRight: 10,
		marginBottom: 10,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	textFiveText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.1,
		marginLeft: 7,
		marginRight: 6,
	},
	viewSixView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 24,
		height: 24,
		marginRight: 10,
		marginBottom: 10,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	textSixText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(74, 74, 74)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		letterSpacing: -0.1,
		marginLeft: 7,
		marginRight: 6,
	},
	usernameView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 43,
	},
	birthdayView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 43,
	},
	genderView: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		height: 43,
	},
	usernameText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(38, 38, 40)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -3,
	},
	landonGibsonText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(155, 155, 155)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		letterSpacing: -0.41,
		marginTop: 1,
		marginRight: 17,
	},
	birthdayText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(38, 38, 40)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -3,
	},
	shapeImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 7,
		height: 12,
		marginTop: 6,
		marginRight: 18,
	},
	april181988Text: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(155, 155, 155)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		letterSpacing: -0.41,
		marginTop: 1,
		marginRight: 10,
	},
	genderText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(38, 38, 40)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 22,
		letterSpacing: -0.41,
		marginTop: -3,
	},
	shapeCopyImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 7,
		height: 12,
		marginTop: 5,
		marginRight: 18,
	},
	maleText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(155, 155, 155)',
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		letterSpacing: -0.41,
		marginTop: 1,
		marginRight: 10,
	},
	titleText: {
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		color: 'rgb(0, 0, 0)',
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		letterSpacing: 0,
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
		marginTop: 50,
		marginRight: 16,
	},
	iconsArrowLeftImage: {
		resizeMode: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.0)',
		width: 30,
		height: 30,
		marginLeft: 10,
		marginTop: 49,
	}
})
