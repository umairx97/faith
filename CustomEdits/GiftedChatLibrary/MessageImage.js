/* Riccardo
*   I only made this change:
*   In Lightbox component added this props -> onClose={() => this.props.customOnClose()}
+   So in this way from the app React Native I am able to understand when to resume the immersive in Android (remove the menu keys below)
*/
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, View, ViewPropTypes, } from 'react-native';
// @ts-ignore
import Lightbox from 'react-native-lightbox';
const styles = StyleSheet.create({
    container: {},
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
    },
});
export default class MessageImage extends Component {
    render() {
        const { containerStyle, lightboxProps, imageProps, imageStyle, currentMessage, } = this.props;
        if (!!currentMessage) {
            return (<View style={[styles.container, containerStyle]}>
          <Lightbox activeProps={{
                style: styles.imageActive,
            }} {...lightboxProps} onClose={() => this.props.customOnClose()}>
            <Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: currentMessage.image }}/>
          </Lightbox>
        </View>);
        }
        return null;
    }
}
MessageImage.defaultProps = {
    currentMessage: {
        image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
};
MessageImage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    imageStyle: PropTypes.object,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
};
//# sourceMappingURL=MessageImage.js.map