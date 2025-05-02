import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import Welcomepage from "./app/screens/Welcomepage";
import Promptpage from "./app/screens/Promptpage";
import Entrypage from "./app/screens/Entrypage";
import Quizpage from "./app/screens/Quizpage";
import Homepage from "./app/screens/Homepage";

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
    // <Homepage></Homepage>
    // <Promptpage></Promptpage>
  );
}
