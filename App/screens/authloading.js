import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-community/async-storage";


class AuthLoading extends Component {

    async componentDidMount() {

        const token = await AsyncStorage.getItem("token")
        console.log(token)
        if (token) {
            const role = await AsyncStorage.getItem("role");
            return this.props.navigation.navigate(role === "admin" ? "AdminStack" : "UserStack")
        }
        return this.props.navigation.navigate("AuthStack")
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


