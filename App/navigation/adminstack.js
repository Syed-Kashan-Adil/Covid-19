import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { QRScanner, UserDetail } from "../screens"


const Stack = createStackNavigator();

export const AdminStack = () => (
    <Stack.Navigator initialRouteName="QRScanner" headerMode={"none"}>
        <Stack.Screen name={"QRScanner"} component={QRScanner} />
        <Stack.Screen name={"UserDetail"} component={UserDetail} />

    </Stack.Navigator>
)