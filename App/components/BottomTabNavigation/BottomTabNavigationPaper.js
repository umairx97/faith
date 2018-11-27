import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Profile from '../Profile/Profile'
import Discover from '../Discover/Discover'
import UniversalTabView from '../TopScrollTabBarNavigator/UniversalTabView'
// const Profile = () => <Profile/>;

// const Discover = () => <Discover/>;

// const NearbyAllUser = () => <UniversalTabView/>;

export default class MyBottomTab extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'Profile', title: 'Profile', icon: 'person' },
      { key: 'Discover', title: 'Discover', icon: 'home' },
      { key: 'UniversalTabView', title: 'AllUser', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    Profile: Profile,
    Discover: Discover,
    UniversalTabView: UniversalTabView,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}