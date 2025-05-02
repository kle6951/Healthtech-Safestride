import React from "react";
import { View, Dimensions, ImageBackground, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

const screenWidth = Dimensions.get("window").width;

function Homepage() {
  const pieData = [
    {
      name: "Recall",
      population: 40,
      color: "#47b39c",
      legendFontColor: "#333",
      legendFontSize: wp("3.8%"),
    },
    {
      name: "Count",
      population: 35,
      color: "#ffc154",
      legendFontColor: "#333",
      legendFontSize: wp("3.8%"),
    },
    {
      name: "Sensory",
      population: 25,
      color: "#fc6b56",
      legendFontColor: "#333",
      legendFontSize: wp("3.8%"),
    },
  ];

  return (
    <ImageBackground
      source={require("../../assets/Homepage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <AppText style={styles.name}>SmartStride</AppText>

      <Screen style={styles.overlay}>
        <View style={styles.centerContent}>
          <AppText style={styles.text}>Welcome Back!</AppText>
          <AppText style={styles.subtitle}>Keep Going - Don't give up</AppText>

          {/* Pie Chart */}
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              width={screenWidth}
              height={hp("30%")}
              chartConfig={{
                color: () => "#000",
                labelColor: () => "#333",
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"0"}
              center={[30, 0]} // cleanly shift right by 30 units
              absolute
              hasLegend={true}
            />
          </View>
          <View style={styles.buttonGroup}>
            <AppButton
              title="Start Session"
              onPress={() => console.log("Start pressed")}
              style={styles.buttonPrimary}
              textStyle={{ fontSize: wp("6%") }}
            />
            <AppButton
              title="Retake Test"
              onPress={() => console.log("Progress pressed")}
              style={styles.buttonOutline}
              textStyle={{ color: colors.primary, fontSize: wp("6%") }}
            />
          </View>
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
    transform: [{ translateY: hp("8%") }],
  },
  text: {
    color: colors.darkGrey,
    fontSize: wp("11%"),
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: hp("1%"),
    fontSize: wp("5%"),
    color: colors.darkGrey,
    textAlign: "center",
    paddingHorizontal: wp("8%"),
    fontFamily: "Montserrat_400Regular",
  },
  chartContainer: {
    marginTop: hp("4%"),
    width: "100%",
    alignItems: "center", // center the entire chart
    paddingLeft: wp("10%"),
  },
  buttonGroup: {
    marginTop: hp("7%"), // increase the space above the buttons
    width: wp("80%"),
    alignSelf: "center",
  },

  buttonPrimary: {
    backgroundColor: colors.secondary,
    marginBottom: hp("2%"),
    height: hp("7%"),
  },

  buttonOutline: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: "#000",
    height: hp("7%"),
  },
});

export default Homepage;
