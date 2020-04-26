import AsyncStorage from "@react-native-community/async-storage";

const endpoint = "https://covid-19-application.herokuapp.com"

export const login = async (phoneNumber) => {
    try {
        const body = JSON.stringify({ phoneNumber })
        const response = await fetch(`${endpoint}/login`, { method: "POST", body, headers: { "Content-Type": "application/json" } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const verifyOtp = async (phoneNumber, code) => {
    try {
        const body = JSON.stringify({ phoneNumber, code })
        const response = await fetch(`${endpoint}/verify_otp`, { method: "POST", body, headers: { "Content-Type": "application/json" } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const registration = async (fullName, address) => {
    try {
        const body = JSON.stringify({ fullName, address })
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/registration`, { method: "POST", body, headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const getUser = async () => {
    try {
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/registration`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}