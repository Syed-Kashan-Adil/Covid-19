import 'react-native-gesture-handler';
import React, { Component } from "react";
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack, UserStack, AdminStack } from "./navigation"
import { AuthLoading } from "./screens"

const Stack = createStackNavigator();


class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading" headerMode={"none"}>
          <Stack.Screen name={"AuthLoading"} component={AuthLoading} />
          <Stack.Screen name={"AuthStack"} component={AuthStack} />
          <Stack.Screen name={"UserStack"} component={UserStack} />
          <Stack.Screen name={"AdminStack"} component={AdminStack} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default () => <MenuProvider>
  <App />
</MenuProvider>;
