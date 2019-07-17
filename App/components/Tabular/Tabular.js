import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Tab1 from '../Discover/Discover';
import Tab2 from '../Profile/Profile';
import Tab3 from '../UserProfile/UserProfile';
export default class Tabular extends Component {
    static navigationOptions = {
        header: null,
        };
  render() {
    return (
      <Container>        
        <Tabs>
          <Tab heading="Dis">
            <Tab1 />
          </Tab>
          <Tab heading="Pro">
            <Tab2 />
          </Tab>
          <Tab heading="User">
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}