import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function Welcomepage({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/Main.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <AppText style={styles.name}>SmartStride</AppText>

      <Screen style={styles.overlay}>
        {/* Centered Text Content */}
        <View style={styles.centerContent}>
          <AppText style={styles.text}>Are You Ready?</AppText>
          <AppText style={styles.subtitle}>
            Striving to improve cognitive health in the community
          </AppText>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            title="Get Started"
            onPress={() => navigation.navigate("Entry")}
            style={styles.button}
            textStyle={{ fontSize: wp("5%") }}
          />
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
    paddingBottom: hp("5%"),
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
  buttonContainer: {
    width: wp("80%"),
    alignItems: "center",
  },
});

export default Welcomepage;
