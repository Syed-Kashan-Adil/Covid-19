import React, { Component } from "react";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, ToastAndroid } from "react-native"
import prompt from 'react-native-prompt-android';
import AsyncStorage from "@react-native-community/async-storage";
import { Switch } from "native-base"
import { Button, } from "../components"
import { registration } from "../apis"

class Registration extends Component {
    state = {
        loading: false,
        fullName: "",
        address: "",
        asAdmin: false,
    }
    onStart = async () => {
        const { asAdmin } = this.state
        if (asAdmin) {
            return prompt(
                'Enter Admin Code',
                'Please enter code for admin account provided by organization',
                [
                    { text: 'OK', onPress: adminKey => this.onRegister(adminKey) },
                ],
                {
                    type: 'numeric',
                    cancelable: true,
                    placeholder: ''
                }
            )
        }
        return this.onRegister()

    }
    onChange = (text, key) => this.setState({ [key]: text })
    onRegister = async (adminKey = "") => {
        this.setState({ loading: true })
        Keyboard.dismiss()
        const { fullName, address, asAdmin } = this.state
        const response = await registration(fullName, address, asAdmin, adminKey)
        this.setState({ loading: false })
        if (response.status) {
            await AsyncStorage.removeItem("registeration")
            await AsyncStorage.setItem("role", asAdmin ? "admin" : "user")
            return this.props.navigation.navigate(asAdmin ? "AdminStack" : "UserStack")

        }
        return ToastAndroid.show(response.message, ToastAndroid.LONG)
    }
    render() {
        const { navigation } = this.props
        const { loading, fullName, address, asAdmin } = this.state
        const disable = !fullName.length || !address.length
        return (

            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, backgroundColor: "#404040ae" }}>
                    <View style={{ flex: 0.05 }} />
                    <View style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#E8FD78" }}>Tell Us About Youself</Text>
                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", lineHeight: 15 }}>It will help us to maintain your record</Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <TextInput
                            style={{ width: "75%", marginHorizontal: "12.5%", borderColor: "#fff", borderWidth: 2, padding: 10, borderRadius: 5, color: "#fff", fontSize: 18, letterSpacing: 3 }}
                            placeholder="Full Name"
                            placeholderTextColor="#fff"
                            onChangeText={(text) => this.onChange(text, "fullName")}
                            value={fullName}
                        />



                    </View>
                    <View style={{ flex: 0.2 }} >
                        <TextInput
                            style={{ width: "75%", marginHorizontal: "12.5%", borderColor: "#fff", borderWidth: 2, padding: 10, borderRadius: 5, color: "#fff", fontSize: 18, letterSpacing: 3 }}
                            placeholder="Residential Address"
                            placeholderTextColor="#fff"
                            onChangeText={(text) => this.onChange(text, "address")}
                            multiline={true}
                            value={address}
                        />
                    </View>
                    <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start" }} >

                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", textDecorationStyle: "solid", textDecorationLine: "underline" }}>Register As Admin</Text>

                        <View style={{ marginBottom: 0, marginLeft: 10 }}>
                            <Switch value={asAdmin} trackColor={{ true: "#9F1D8DAE" }} thumbColor="#9F1D8DAE" onValueChange={(asAdmin) => this.setState({ asAdmin })} />

                        </View>

                    </View>
                    <View style={{ flex: 0.05 }} />
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "flex-end" }}>
                        <Button disable={disable} loading={loading} text="Save" onPress={this.onStart} />
                    </View>
                    <View style={{ flex: 0.05 }} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export { Registration }