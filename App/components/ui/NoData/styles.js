import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
    mainView: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: "center",
        alignContent: 'center'
    },
    text: {
        fontSize: hp(3.5),
        color: 'grey',
        opacity: 0.4
    },
    textBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: hp(3.5)
    },
    button: {
        width: wp(80),
        marginTop: hp(5),
        backgroundColor: '#EA2027',
        borderRadius: 5,
        padding: wp(5)
    }
};