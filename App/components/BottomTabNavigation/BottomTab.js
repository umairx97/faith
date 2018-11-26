import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
  },
});
 
const Page = ({label, text = ''}) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {label}
    </Text>
    <Text style={styles.instructions}>
      {text}
    </Text>
  </View>
);
 
const iconsSet = {
    discover: require("../../../assets/images/discover.png"),
  neaby: require("../../../assets/images/neaby.png"),
  message: require("../../../assets/images/message.png"),
  profile: require("../../../assets/images/profile.png"),

};
 
const Tab = ({ tab, page, isTabActive, onPressHandler, onTabLayout, styles }) => {
  const { label, icon } = tab;
  const style = {
    // marginHorizontal: 1,
    // paddingVertical: 1,
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styles.backgroundColor,
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
  };
 
  const iconStyle = {
    tintColor: styles.textColor,
    resizeMode: 'contain',
    width: 22,
    height: 22,
   
  };
  return (
    <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
      <Animated.View style={containerStyle}>
       
        <Animated.Image style={iconStyle} source={icon} />
      </Animated.View>
    </TouchableOpacity>
  );
};
 
export default class UnderlineTabBarExample extends Component {
  _scrollX = new Animated.Value(0);
  // 6 is a quantity of tabs
  interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
    scale: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [1, 1.2, 1],
      extrapolate: 'clamp',
    }),
    opacity: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    }),
    textColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['#000', '#fff', '#000'],
    }),
    backgroundColor: this._scrollX.interpolate({
      inputRange: [idx - 1, idx, idx + 1],
      outputRange: ['rgba(0,0,0,0.1)', '#000', 'rgba(0,0,0,0.1)'],
      extrapolate: 'clamp',
    }),
  }));
  render() {
    return (
      <View style={[styles.container]}>
        <ScrollableTabView
          renderTabBar={() => (
            <TabBar
              underlineColor="#000"
              tabBarStyle={{ backgroundColor: "#fff", borderTopColor: '#d2d2d2', borderTopWidth: 1 }}
              renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
                <Tab
                  key={page}
                  tab={tab}
                  page={page}
                  isTabActive={isTabActive}
                  onPressHandler={onPressHandler}
                  onTabLayout={onTabLayout}
                  styles={this.interpolators[page]}
                />
              )}
            />
          )}
          onScroll={(x) => this._scrollX.setValue(x)}
        >
          <Page tabLabel={{icon: iconsSet.discover}} />
          <Page tabLabel={{icon: iconsSet.neaby}} />
          <Page tabLabel={{ icon: iconsSet.message}} />
          <Page tabLabel={{ icon: iconsSet.profile}} />
         
        </ScrollableTabView>
      </View>
    );
  }
}
 
 