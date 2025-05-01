import React from "react";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AntDesign from "@expo/vector-icons/AntDesign";

function Entrypage({ navigation }) {
  return (
    <Screen style={styles.container}>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => navigation.navigate("Welcome")}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AntDesign name="closecircle" size={45} color={colors.secondary} />
      </TouchableOpacity>

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
          onPress={() => navigation.navigate("Quiz")}
          style={styles.button}
        />
        <AppButton
          title="YES"
          onPress={() => navigation.navigate("Prompt")}
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
  closeIcon: {
    position: "absolute",
    top: 5,
    left: 20,
    zIndex: 10,
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
