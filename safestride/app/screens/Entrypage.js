import React from "react";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function Entrypage() {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.text}>Have you taken the assessment test?</AppText>

      <LottieView
        style={styles.animation}
        autoPlay
        loop
        source={require("../../assets/animation/entry.json")}
      />

      <View style={styles.buttonRow}>
        <AppButton
          title="NO"
          onPress={() => console.log("NO pressed")}
          style={styles.button}
        />
        <AppButton
          title="YES"
          onPress={() => console.log("YES pressed")}
          style={styles.button}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screenWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  animation: {
    width: 350,
    height: 300,
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default Entrypage;
