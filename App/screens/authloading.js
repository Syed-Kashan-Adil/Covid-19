import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-community/async-storage";


class AuthLoading extends Component {

    async componentDidMount() {

        const token = await AsyncStorage.getItem("token")
        console.log(token)
        this.props.navigation.navigate(token ? "UserStack" : "AuthStack")
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#404040ae", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} color={"#fff"} />
            </View>
        )
    }
}

export { AuthLoading }


