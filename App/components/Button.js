import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";


export const Button = ({ text, onPress, loading, disable, }) => {
    return (

        <TouchableOpacity activeOpacity={disable ? 1 : 0.4} style={{ width: "75%", marginHorizontal: "12.5%", borderRadius: 5, backgroundColor: disable ? "#9F1D8D5d" : "#9F1D8DAE", padding: 15 }} onPress={() => (disable || loading) || onPress()}>
            {
                loading ? <ActivityIndicator color="#fff" size={22} /> : <Text style={{ color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "bold", letterSpacing: 2.5 }}>{text.toUpperCase()}</Text>
            }

        </TouchableOpacity>
    )
}
