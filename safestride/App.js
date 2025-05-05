import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcomepage from "./app/screens/Welcomepage";
import Promptpage from "./app/screens/Promptpage";
import Entrypage from "./app/screens/Entrypage";
import Quizpage from "./app/screens/Quizpage";
import Homepage from "./app/screens/Homepage";
import { ActivityIndicator } from "react-native";
import colors from "./app/config/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkStoredResults = async () => {
      try {
        const storedResults = await AsyncStorage.getItem("quizResults");
        if (storedResults) {
          setInitialRoute("Home");
        } else {
          setInitialRoute("Welcome");
        }
      } catch (error) {
        console.error("Failed to load quiz results", error);
        setInitialRoute("Welcome"); // fallback
      }
    };

    checkStoredResults();
  }, []);

  if (!initialRoute) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

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