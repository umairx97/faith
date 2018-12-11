/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
//import App from './App/components/TopScrollTabBarNavigator/UniversalTabView';
import {name as appName} from './app.json';
//------For Firebase------
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

//-------------------------
AppRegistry.registerComponent(appName, () => App);
