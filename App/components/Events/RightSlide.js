import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Images } from '../../../assets/imageAll';

export default class RightSlide extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: "rgb(252, 252, 252)",
                marginTop:70
            }}>
                <View style={styles.panel2View}>
                    <View style={styles.levelView}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "stretch"
                            }}
                        >
                            <View style={styles.rectangle2TwoView}>
                                <Image
                                    source={Images.hideEventIcon}
                                    style={styles.logoutImage}
                                />
                            </View>
                            <TouchableOpacity onPress={this.onFacebookPressed}>
                                <Text style={styles.myWalletText}>Hide Event</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={styles.panel2View}>
                    <View style={styles.levelView}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "stretch"
                            }}
                        >
                            <View style={styles.rectangle2TwoView}>
                                <Image
                                    source={Images.reviewEvent}
                                    style={styles.logoutImage}
                                />
                            </View>
                            <TouchableOpacity onPress={this.onFacebookPressed}>
                                <Text style={styles.myWalletText}>Report Event</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={styles.panel2View}>
                    <View style={styles.levelView}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "stretch"
                            }}
                        >
                            <View style={styles.rectangle2TwoView}>
                                <Image
                                    source={Images.likeEvent}
                                    style={styles.logoutImage}
                                />
                            </View>
                            <TouchableOpacity onPress={this.onFacebookPressed}>
                                <Text style={styles.myWalletText}>Like Event & Review Event</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={styles.panel2View}>
                    <View style={styles.levelView}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "stretch"
                            }}
                        >
                            <View style={styles.rectangle2TwoView}>
                                <Image
                                    source={Images.ShareEvent}
                                    style={styles.logoutImage}
                                />
                            </View>
                            <TouchableOpacity onPress={this.onFacebookPressed}>
                                <Text style={styles.myWalletText}>Share Event</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={styles.panel2View}>
                    <View style={styles.levelView}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "stretch"
                            }}
                        >
                            <View style={styles.rectangle2TwoView}>
                                <Image
                                    source={Images.listEvent}
                                    style={styles.logoutImage}
                                />
                            </View>
                            <TouchableOpacity onPress={this.onFacebookPressed}>
                                <Text style={styles.myWalletText}>List of Users going to Event</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={styles.panel2View}>
                    <View style={styles.levelView}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignSelf: "stretch"
                            }}
                        >
                            <View style={styles.rectangle2TwoView}>
                                <Image
                                    source={Images.saveEvent}
                                    style={styles.logoutImage}
                                />
                            </View>
                            <TouchableOpacity onPress={this.onFacebookPressed}>
                                <Text style={styles.myWalletText}>Save to Favorite</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    panel2View: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 6,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowRadius: 5,
        shadowOpacity: 1,
        marginBottom: 10,
        marginLeft: 17,
        marginTop: 15,
        marginRight: 16
    },
    levelView: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        height: 35,
        marginLeft: 1,
        marginTop: 9,
        marginRight: 1
    },
    rectangle2TwoView: {
        borderRadius: 8,
        width: 25,
        height: 25,
        marginLeft: 14
    },
    logoutImage: {
        resizeMode: "center",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        alignSelf: "center",
       marginTop:2,
        width: 20,
        height: 20
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
})