import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcomepage from "./app/screens/Welcomepage";
import Promptpage from "./app/screens/Promptpage";
import Entrypage from "./app/screens/Entrypage";
import Quizpage from "./app/screens/Quizpage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcomepage} />
        <Stack.Screen name="Prompt" component={Promptpage} />
        <Stack.Screen name="Entry" component={Entrypage} />
        <Stack.Screen name="Quiz" component={Quizpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}