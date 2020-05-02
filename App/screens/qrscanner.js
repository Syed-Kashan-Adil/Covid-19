import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-community/async-storage";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Header, Body, Right, Button as NativeButton, Icon, Title } from 'native-base'

class QRScanner extends Component {
    onSuccess = e => {
        this.props.navigation.navigate("UserDetail", { id: e.data })
    }

    handleLogout = async () => {
        await AsyncStorage.multiRemove(["token", "userId", "role"])
        return this.props.navigation.navigate("AuthStack", { screen: "Login" })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#9F1D8D" }}>

                    <Body style={{ marginLeft: 30 }}>
                        <Title> QR SCANEER</Title>
                    </Body>
                    <Right>
                        <NativeButton transparent>
                            <TouchableOpacity onPress={this.handleLogout}>
                                <Icon name='logout' type="AntDesign" />
                            </TouchableOpacity>
                        </NativeButton>
                    </Right>
                </Header>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    reactivate={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

export { QRScanner }