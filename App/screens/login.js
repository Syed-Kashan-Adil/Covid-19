import React, { Component } from "react";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { Button } from "../components"
import { login } from "../apis"

class Login extends Component {
    state = {
        loading: false,
        phoneNumber: ""
    }
    onStart = async () => {
        this.setState({ loading: true })
        Keyboard.dismiss()
        const { phoneNumber } = this.state
        const response = await login(phoneNumber)
        this.setState({ loading: false })
        if (response.status)
            return this.props.navigation.navigate("Confirmation", { phoneNumber })
    }
    onChange = (phoneNumber) => this.setState({ phoneNumber })
    render() {
        const { navigation } = this.props
        const { loading, phoneNumber } = this.state
        return (

            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, backgroundColor: "#404040ae" }}>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 60, fontWeight: "bold", color: "#E8FD78" }}>Covid App</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff", lineHeight: 15 }}>Becasue Your Life Matters </Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <TextInput
                            style={{ width: "75%", marginHorizontal: "12.5%", borderColor: "#fff", borderWidth: 2, padding: 10, borderRadius: 5, color: "#fff", fontSize: 18, letterSpacing: 3 }}
                            placeholder="Enter Your Phone Number"
                            placeholderTextColor="#fff"
                            keyboardType="phone-pad"
                            onChangeText={this.onChange}
                            value={phoneNumber}
                        // autoFocus={true}
                        >

                        </TextInput>
                    </View>
                    <View style={{ flex: 0.25 }} />
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "flex-end" }}>
                        <Button loading={loading} text="Getting Started" onPress={this.onStart} />
                    </View>
                    <View style={{ flex: 0.05 }} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export { Login }