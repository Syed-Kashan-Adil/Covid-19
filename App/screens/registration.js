import React, { Component } from "react";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import { Button } from "../components"
import { registration } from "../apis"

class Registration extends Component {
    state = {
        loading: false,
        fullName: "",
        address: ""
    }
    onStart = async () => {
        this.setState({ loading: true })
        Keyboard.dismiss()
        const { fullName, address } = this.state
        const response = await registration(fullName, address)
        this.setState({ loading: false })
        if (response.status)
            return this.props.navigation.navigate("UserStack")

    }
    onChange = (text, key) => this.setState({ [key]: text })
    render() {
        const { navigation } = this.props
        const { loading, fullName, address } = this.state
        const disable = !fullName.length || !address.length
        return (

            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, backgroundColor: "#404040ae" }}>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
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