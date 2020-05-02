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


export const registration = async (fullName, address, asAdmin, adminKey) => {
    try {
        const body = JSON.stringify({ fullName, address, asAdmin, adminKey })
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
        const response = await fetch(`${endpoint}/get_user`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const userDetail = async (userId) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/user_detail?userId=${userId}`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const saveLocation = async (latitude, longitude, timestamp) => {
    try {
        const body = JSON.stringify({ latitude, longitude, timestamp })
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/add_location`, { method: "POST", body, headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const checkTemprature = async () => {
    try {

        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/check_temprature`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}

export const addTemprature = async (temprature) => {
    try {
        const body = JSON.stringify({ temprature })
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/add_temprature`, { method: "POST", body, headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const getTempratureRecord = async (userId) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/get_temprature_record/?userId=${userId}`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}


export const updateCovidStatus = async (userId, status) => {
    try {
        const body = JSON.stringify({ userId, status })
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${endpoint}/covid_status`, { method: "POST", body, headers: { "Content-Type": "application/json", "Authorization": token } });
        const responseJson = await response.json();
        return responseJson
    } catch (err) {
        return err;
    }
}