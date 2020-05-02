import React, { Component } from "react";
import { ToastAndroid, View, ActivityIndicator, TouchableOpacity, PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Prompt from "react-native-input-prompt"
import Geolocation from 'react-native-geolocation-service';
import QRCode from 'react-native-qrcode-svg';
import { Header, Body, Right, Button as NativeButton, Icon, Title } from 'native-base'
import { getUser, saveLocation } from "../apis"
import { Button } from "../components"


const QRcolors = {
    0: "green",
    1: "yellow",
    2: "red"
}
class Main extends Component {

    state = {
        user: {},
        loading: false,
        visible: true
    }


    async componentDidMount() {
        this.startTracking()
        this.setState({ loading: true })
        const response = await getUser();
        this.setState({ loading: false })
        if (response.status) {
            const { user } = response.data;
            return this.setState({ user })
        }
        return ToastAndroid.show(response.message)
    }
    handleLogout = async () => {
        await AsyncStorage.multiRemove(["token", "userId", "role"])
        return this.props.navigation.navigate("AuthStack")
    }

    startTracking = async () => {
        const hasLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (hasLocationPermission) {
            Geolocation.watchPosition(
                (position) => {
                    const { coords: { latitude, longitude }, timestamp } = position;
                    saveLocation(latitude, longitude, timestamp);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, distanceFilter: 1, interval: 5000 }
            );
        }
    }

    addTemprature = () => {
        this.setState({ visible: true })
    }
    render() {
        const { user: { _id, status, fullName }, loading, visible } = this.state

        return (

            <View style={{ flex: 1, backgroundColor: "#404040ae" }}>
                <Header style={{ backgroundColor: "#9F1D8D" }}>

                    <Body style={{ marginLeft: 40 }}>
                        <Title>{fullName ? fullName.toUpperCase() : "Please Wait".toUpperCase()} </Title>
                    </Body>
                    <Right>
                        <NativeButton transparent>
                            <TouchableOpacity onPress={this.handleLogout}>
                                <Icon name='logout' type="AntDesign" />
                            </TouchableOpacity>
                        </NativeButton>
                    </Right>
                </Header>

                {

                }
                <View style={{ flex: 0.2 }}>
                    {/* <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{`Hello, ${fullName}`}</Text> */}
                </View>
                <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                    {
                        loading ? <ActivityIndicator size={"large"} color={"#fff"} /> :

                            <QRCode
                                value={_id}
                                backgroundColor={QRcolors[status]}
                                color={"#000"}

                                // backgroundColor={QRcolors[status]}
                                size={300}

                            />
                    }
                </View>
                <View style={{ flex: 0.45, justifyContent: "flex-end" }}>
                    <Button text="ADD YOUR TEMPRATURE" onPress={() => { }} />
                </View>
                <View style={{ flex: 0.05 }} />
                <Prompt
                    visible={visible}
                    title="Enter Your Temprature In °F"
                    cancelButtonTextStyle={{ opacity: 0 }}
                    placeholder="e.g 100"

                    onSubmit={text =>
                        this.setState({
                            temprature: text,
                            visible: !visible
                        })
                    }
                />
            </View>
        )
    }
}


export { Main }