import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import SignUpForm from './components/SignUpForm';
import firebase from 'firebase/app';
import LoginForm from "./components/LoginForm";
import ProfilScreen from "./components/ProfilScreen";
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
    state = {user:null}

    componentWillMount(){
        const fireBaseConfig ={
            apiKey: "AIzaSyCSZ7E1KllQBWMjetSbqKmfW7_DdPtPYp4",
            authDomain: "ovelse5-ec2ee.firebaseapp.com",
            databaseURL: "https://ovelse5-ec2ee.firebaseio.com/",
            projectId: "ovelse5-ec2ee",
            storageBucket: "ovelse5-ec2ee.appspot.com",
            messagingSenderId: "734463752384",
            appId: "1:734463752384:web:1fc8dbf164eb8da1965525",
            measurementId: "G-RNNM8PEH2M"
        }
        firebase.initializeApp(fireBaseConfig);
        firebase
            .auth()
            .onAuthStateChanged(user => {
                console.log('onAuthStateChanged', { U: user });

                this.setState({ user });
            });

    }

    render() {
        const {user} = this.state
        if(!user){
            return (
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        Change code in the editor and watch it change on your phone! Save to get a shareable url.
                    </Text>
                    <Card>
                        <SignUpForm />
                    </Card>
                    <Card>
                        <LoginForm />
                    </Card>
                </View>
            )
        } else {
            return (

                <ProfilScreen user={user}/>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
