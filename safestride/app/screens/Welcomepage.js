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

function Welcomepage({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/Main.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* App name at the top center */}
      <AppText style={styles.name}>SmartStride</AppText>

      {/* Central content */}
      <Screen style={styles.overlay}>
        <View style={styles.centerContent}>
          <AppText style={styles.text}>
            Striving to improve cognitive health in the community
          </AppText>
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
    top: 75,
    alignSelf: "center",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 25,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    transform: [{ translateY: -85 }], 
  },
  text: {
    color: colors.primary,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -40,
  },
  animation: {
    width: 350,
    height: 300,
    marginTop: -20,
  },
});

export default Welcomepage;
