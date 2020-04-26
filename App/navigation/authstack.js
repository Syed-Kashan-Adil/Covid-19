import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Confirmation, Registration } from "../screens"


const Stack = createStackNavigator();

export const AuthStack = () => (
    <Stack.Navigator initialRouteName="Login" headerMode={"none"}>
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"Confirmation"} component={Confirmation} />
        <Stack.Screen name={"Registration"} component={Registration} />
    </Stack.Navigator>
)