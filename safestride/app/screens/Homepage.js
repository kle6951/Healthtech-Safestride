import React from "react";
import Screen from "../components/Screen";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

function Homepage() {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.text}>
        Striving to improve cognitive health in the community
      </AppText>
      <TouchableOpacity onPress={console.log("press")} activeOpacity={0.7}>
        <LottieView
          style={styles.animation}
          autoPlay
          loop
          source={require("../../assets/animation/start.json")}
        />
      </TouchableOpacity>
    </Screen>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 350,
    height: 300,
    marginTop: 0,
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: -80,
  },
});

export default Homepage;
