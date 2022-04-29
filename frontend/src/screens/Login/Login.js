import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
    StatusBar,

} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from "expo-auth-session";
import LottieView from 'lottie-react-native';
import TextButton from '../../component/TextButton';
import { SIZES } from '../../constants/index';
import { REACT_APP_API } from '../../../APIUrl';
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/userActions";

WebBrowser.maybeCompleteAuthSession();

const auth0ClientId = "fmIHlH0lBYabhVc6pHKcAs1IzqchnnXZLuYKQAiy";
const authorizationEndpoint = "https://gae-gw.systems/oauth/authorize/";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });



const SignInScreen = ({navigation, addUser}) => {

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);


    // Request
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            usePKCE: true,
            redirectUri,
            clientId: auth0ClientId,
            // id_token will return a JWT token
            responseType: "code",
            // retrieve the user's profile
            scopes: ["users:me", "users:list"],
        },
       
        { authorizationEndpoint }
    );

    React.useEffect(() => {
        if (result?.type === 'success') {
            const { code } = result.params;
            fetch(`${REACT_APP_API}/auth/mobile/token`, {
                method: 'POST',
                body: JSON.stringify({code: code, code_verifier: request.codeVerifier}),
                headers: {
                    'content-type': 'application/json',

                },
            })
                .then(res => res.json())
                .then((data) => {
                    setAccessToken(data._id);
                    return data._id;
                })
                .then(id => fetch(`${REACT_APP_API}/users/me/${id}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    },
                }))
                .then(res => res.json())
                .then((data) => {
                    setUser(data)
                    console.log(data);
                    addUser(data)
                })
                
                .catch(setError);

        }
    }, [result]);

    React.useEffect(() => {
        if(Object.keys(user).length !== 0){
            navigation.replace('MainTabScreen')
        }
    },[user])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#BF6B7B' barStyle="light-content" />
            <View style={styles.header}>
                <LottieView
                    source={require('../../assets/images/splash.json')}
                    autoPlay
                    loop={true}
                    speed={0.5}
                />

            </View>
            <TextButton
                label="Sign Up"
                buttonContainerStyle={{
                    height: 55,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    width: 200,
                    marginLeft: 100,
                    marginBottom: 100
                }}
                onPress={() => promptAsync({ useProxy })}
            />

        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      addUser: (user) =>
        dispatch(actions.loginUser(user)),
  };
  };


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BF6B7B'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
        display: 'flex',
    },
    btn: {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default connect(null, mapDispatchToProps)(SignInScreen);