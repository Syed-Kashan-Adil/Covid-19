import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ToastAndroid } from "react-native"
import AsyncStorage from '@react-native-community/async-storage';
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { Button } from "../components";
import { verifyOtp } from "../apis"


class Confirmation extends Component {
    state = {
        loading: false,
        code: ""
    }
    onChange = (code) => {
        this.setState({ code })
    }
    onVerfication = async () => {
        this.setState({ loading: true })
        const { code } = this.state;
        const { route: { params: { phoneNumber } }, navigation } = this.props
        const response = await verifyOtp(phoneNumber, Number(code));
        this.setState({ loading: false })
        console.log(response.data)
        if (response.status) {
            const { data: { firstTimeLogin, token, user: { _id } } } = response;
            await AsyncStorage.setItem("userId", JSON.stringify(_id))
            await AsyncStorage.setItem("token", token)
            return navigation.navigate(firstTimeLogin ? "Registration" : "UserStack")
        }
        return ToastAndroid.show(response.message, ToastAndroid.LONG)


    }
    render() {
        const { loading, code } = this.state
        const { route: { params: { phoneNumber } } } = this.props
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, backgroundColor: "#404040ae" }}>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#E8FD78" }}>Let's Verify Your Phone Number</Text>
                    </View>
                    <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 22 }}>We have sent 4 digits code to </Text>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", }}>{phoneNumber}</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: 'center' }} >
                        <SmoothPinCodeInput
                            cellStyle={{
                                borderBottomWidth: 2,
                                borderColor: '#fff',
                            }}
                            cellStyleFocused={{
                                borderColor: '#fff',
                            }}
                            textStyle={{ color: "#fff", fontSize: 20 }}
                            value={code}
                            onTextChange={this.onChange}
                        />
                    </View>
                    <View style={{ flex: 0.15 }} />
                    <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                        <Button disable={code.length !== 4} loading={loading} text="Verify My Number" onPress={this.onVerfication} />
                    </View>
                    <View style={{ flex: 0.05 }} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


export { Confirmation }