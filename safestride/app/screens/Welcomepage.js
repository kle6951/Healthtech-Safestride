import React from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import LottieView from "lottie-react-native";
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
      {/* App name at the top center */}
      <AppText style={styles.name}>SmartStride</AppText>

      {/* Main overlay */}
      <Screen style={styles.overlay}>
        {/* Centered text content */}
        <View style={styles.centerContent}>
          <AppText style={styles.text}>Are You Ready?</AppText>
          <AppText style={styles.subtitle}>
            Striving to improve cognitive health in the community
          </AppText>
        </View>

        {/* Button moved further down */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Entry")}
            activeOpacity={0.7}
          >
            <LottieView
              style={styles.animation}
              autoPlay
              loop
              source={require("../../assets/animation/start.json")}
            />
          </TouchableOpacity>
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
  buttonContainer: {
    alignItems: "center",
    marginBottom: -hp("18%"),
  },
  animation: {
    width: wp("90%"),
    height: hp("35%"),
  },
});

export default Welcomepage;
