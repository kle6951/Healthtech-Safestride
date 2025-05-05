// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcomepage from "./app/screens/Welcomepage";
import Promptpage from "./app/screens/Promptpage";
import Entrypage from "./app/screens/Entrypage";
import Quizpage from "./app/screens/Quizpage";
import Homepage from "./app/screens/Homepage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkIfFirstTime = async () => {
      try {
        const result = await AsyncStorage.getItem("quizResults");
        setInitialRoute(result ? "Home" : "Welcome");
      } catch (e) {
        console.error("Error reading quiz result from storage", e);
        setInitialRoute("Welcome");
      }
    };
    checkIfFirstTime();
  }, []);

  if (!initialRoute) return null; // Or <AppLoading />

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcomepage} />
        <Stack.Screen name="Prompt" component={Promptpage} />
        <Stack.Screen name="Entry" component={Entrypage} />
        <Stack.Screen name="Quiz" component={Quizpage} />
        <Stack.Screen name="Home" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
