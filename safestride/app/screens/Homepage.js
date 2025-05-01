import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

function Homepage() {
  return (
    <ImageBackground
      source={require("../../assets/Homepage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* App name at the top center */}
      <AppText style={styles.name}>SmartStride</AppText>

      <Screen style={styles.overlay}>
        <View style={styles.centerContent}>
          <AppText style={styles.text}>Welcome Back!</AppText>
          <AppText style={styles.subtitle}>Keep Going - Don't give up</AppText>
        </View>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  name: {
    position: "absolute",
    top: hp("9%"),
    alignSelf: "center",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: wp("6.5%"),
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp("5%"),
    paddingBottom: hp("10%"),
  },
  centerContent: {
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    transform: [{ translateY: hp("5%") }],
  },
  text: {
    color: colors.darkGrey,
    fontSize: wp("8%"),
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  subtitle: {
    marginTop: hp("1%"),
    fontSize: wp("5%"),
    color: colors.darkGrey,
    textAlign: "center",
    paddingHorizontal: wp("8%"),
    fontFamily: "Montserrat_400Regular",
  },
});

export default Homepage;
