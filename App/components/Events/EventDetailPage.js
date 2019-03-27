


import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    Dimensions,
    BackHandler,
    AsyncStorage
} from "react-native";
import { RkButton, RkText } from "react-native-ui-kitten";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Images } from "../../../assets/imageAll";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import geolib from "geolib";
import { ifIphoneX } from "react-native-iphone-x-helper";
const GLOBAL = require("../Constant/Globals");

const Screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
};
const ASPECT_RATIO = Screen.width / Screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;
var count = 0;

export default class EventDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: "",
            myLat: 0,
            myLong: 0,
            evlat: 0,
            evLong: 0,
            distanceMiles: 0,
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        };

    }
    onDrawerPressed = () => {
        Actions.drawerOpen();
    }
    onBackPressed = () => {
        Actions.pop();
    }
    watchID = null;
    async componentDidMount() {

        if (Platform.OS === "android") {
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message:
                    "<h2>Use Location?</h2> \
                            This app wants to change your device settings:<br/><br/>\
                            Use GPS for location<br/><br/>",
                ok: "YES",
                cancel: "NO"
            }).then(() => {
                locationTracking(dispatch, getState, geolocationSettings);
            });
        }
        var eventLati = await AsyncStorage.getItem("event_lat");
        var eventLongi = await AsyncStorage.getItem("event_long");
        var eventLatitude = parseFloat(eventLati)
        var eventLongitude = parseFloat(eventLongi)

        var lat, long;
        navigator.geolocation.getCurrentPosition(
            position => {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);

                var initialRegion = {
                    latitude: eventLatitude,
                    longitude: eventLongitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };
                this.setState({ initialPosition: initialRegion });
                this.setState({ markerPosition: initialRegion });
                this.getLocationAddress(lat, long);
                this.getDistance(lat, long, eventLatitude, eventLongitude);
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
        );
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                lat = parseFloat(position.coords.latitude);
                long = parseFloat(position.coords.longitude);

                var lastRegion = {
                    latitude: eventLatitude,
                    longitude: eventLongitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };
                this.setState({ initialPosition: lastRegion });
                this.setState({ markerPosition: lastRegion });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
        );

    }
    getDistance(lat1, long1, eventLatitude, eventLongitude) {
        var distanceBetweenFriends = geolib.getDistance(
            {
                lat: lat1,
                lon: long1
            },
            { lat: eventLatitude, lon: eventLongitude }
        );
        var distance = distanceBetweenFriends / 1000;
        this.setState({
            distanceMiles: distance
        })
        //alert(distance)
    }
    async getLocationAddress(the_lat, the_long) {
        try {
            let response = await fetch(
                "http://dev.virtualearth.net/REST/v1/Locations/" +
                the_lat +
                "," +
                the_long +
                "?includeEntityTypes=Address&includeNeighborhood=1&include=ciso2&key=AnRJNPwenLtgDSzoyFtFVIA-JOG6O20LzI_aMtlW6RxAlikWApgR5NhKuW0cMYf9"
            );
            let responseJson = await response.json();

            var name = responseJson.resourceSets[0].resources[0].name;
            this.setState({
                place: name
            });

        } catch (error) {
            Alert.alert(error.toString());
        }

    }

    componentWillMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }
    getLoactionInfo = (coordinate, index) => {
        alert(coordinate, index);
    }
    render() {
        return (
            <View style={styles.container}>
                <View><MapView
                    mapType={"standard"}
                    provider={PROVIDER_GOOGLE}
                    // customMapStyle={GLOBAL.mapStyle}
                    style={styles.map}
                    followsUserLocation={true}

                    showsBuildings={true}
                    minZoomLevel={14}
                    maxZoomLevel={20}
                    region={this.state.initialPosition}
                >
                    <MapView.Marker
                        coordinate={this.state.markerPosition}
                        title={this.state.place}
                    />
                </MapView>

                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View>
                        <Text>Event Name</Text>
                    </View>
                    <View><Text>Event Description</Text></View>
                    <View><Text>Event Type</Text></View>
                </View>
                <View style={{ position: 'absolute', right: 15, top: Screen.height / 3 - 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>{this.state.distanceMiles}miles</Text>
                </View>
                <View style={styles.leftContainer}>
                    <TouchableOpacity onPress={() => this.onBackPressed()}>
                        <Image style={styles.btnDrawerImage} source={Images.arrowBackIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={() => this.onDrawerPressed()}>
                        <Image style={styles.btnNotifiImage} source={require("../../../assets/images/filters-btn-2.png")} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Screen.width,
        height: Screen.height / 3,
        ...ifIphoneX({ height: Screen.height / 3 - 3 }),

    },
    rightContainer: {
        position: "absolute",
        resizeMode: "cover",
        top: 20,
        right: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        width: 55,
        borderRadius: 25
    },
    btnNotifiImage: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        tintColor: 'black',
        width: 30,
        height: 30
    },
    leftContainer: {
        position: "absolute",
        resizeMode: "cover",
        top: 20,
        left: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        width: 55,
        borderRadius: 25
    },
    btnDrawerImage: {
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        width: 30,
        height: 30
    },
})