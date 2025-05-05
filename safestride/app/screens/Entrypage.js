import React from "react";
import Screen from "../components/Screen";
import colors from "../config/colors";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AppText from "../components/AppText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppButton from "../components/AppButton";

function Entrypage({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/Entry.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <AppText style={styles.backText}>Go back</AppText>
      </TouchableOpacity>

      <Screen style={styles.overlay}>
        <View style={styles.centerContent}>
          <AppText style={styles.text}>Let's do a test!</AppText>
          <AppText style={styles.subtitle}>
            To help us understand your cognitive level, it is important that you
            take the assessment test.
          </AppText>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="START TEST"
            onPress={() => navigation.navigate("Quiz")}
            style={{
              backgroundColor: colors.white,
              borderWidth: 2,
              borderColor: "#000",
            }}
            textStyle={{ fontSize: wp("5%"), color: colors.primary }}
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
  backButton: {
    position: "absolute",
    top: hp("8%"),
    left: wp("5%"),
    zIndex: 10,
  },
  backText: {
    color: colors.primary,
    fontSize: wp("5.5%"),
    fontFamily: "Montserrat_400Regular",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    width: wp("80%"),
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    transform: [{ translateY: hp("7%") }],
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
  text: {
    color: colors.darkGrey,
    fontSize: wp("10%"),
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: hp("1%"),
    fontSize: wp("6.5%"),
    color: colors.darkGrey,
    textAlign: "center",
    paddingHorizontal: wp("8%"),
    fontFamily: "Montserrat_400Regular",
  },
});

export default Entrypage;
