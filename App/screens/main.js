import React, { Component } from "react";
import { ToastAndroid, View, Text } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { getUser } from "../apis"


const QRcolors = {
    0: "green",
    1: "yellow",
    2: "red"
}
class Main extends Component {

    state = {
        user: {
            "address": "",
            "fullName": "Syed Kashan Adil",
            "userRole": "user",
            "joinDate": "2020-04-24T05:21:31.608Z",
            "_id": "5ea277a252ccb3d6cebf01fd",
            "phoneNumber": "+923493168819",
            status: 1,
            "__v": 0
        }
    }
    async componentDidMount() {

        // const response = await getUser();
        // if (response.status) {
        //     const { user } = response.data;
        //     return this.setState({ user })
        // }
        // return ToastAndroid.show(response.message)
    }
    render() {
        const { user: { _id, status, fullName } } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "#404040ae" }}>

                <View style={{ flex: 0.1 }} />
                <View style={{ flex: 0.2, marginLeft: 20 }}>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{`Hello, ${fullName}`}</Text>
                </View>
                <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                    <QRCode
                        value={_id}
                        color={QRcolors[status]}
                        size={300}

                    />
                </View>
                <View style={{ flex: 0.5 }} />

            </View>
        )
    }
}


export { Main }