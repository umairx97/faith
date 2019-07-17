import React, {
    Component
} from 'react';
import {
    Text,
    Image,
    View,
    TouchableHighlight
} from 'react-native';
import styles from "./styles";
import { Images } from '../../../../assets/imageAll';

export class NoDataComponent extends Component {

    render() {
        return (
            <View style={styles.mainView}>
                <Image source={Images.findFriendList} styles={styles.manupopUp} />
                <Text style={styles.text}>{this.props.text}</Text>
                <TouchableHighlight style={styles.button} underlayColor="#ff6d72" onPress={() => this.props.onPress()}>
                    <View>
                        <Text style={styles.textBtn}>Discover new people</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}