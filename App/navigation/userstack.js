import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Main } from "../screens"


const Stack = createStackNavigator();

export const UserStack = () => (
    <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name={"Main"} component={Main} />

    </Stack.Navigator>
)