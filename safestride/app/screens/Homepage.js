import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

function Homepage({ route, navigation }) {
  const [categoryScores, setCategoryScores] = useState(null);
  const [totals, setTotals] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadResults = async () => {
        const fromParams = route?.params?.categoryScores;
        if (fromParams) {
          setCategoryScores(fromParams);
          await AsyncStorage.setItem("quizResults", JSON.stringify(fromParams));
        } else {
          const saved = await AsyncStorage.getItem("quizResults");
          if (saved) setCategoryScores(JSON.parse(saved));
        }

        const history = await AsyncStorage.getItem("sessionHistory");
        if (history) {
          const parsed = JSON.parse(history);
          let score = 0,
            skipped = 0,
            duration = 0;

          parsed.forEach((session) => {
            score += session.score;
            skipped += session.skippedCount;
            duration += session.duration;
          });

          const formattedTime = new Date(duration * 1000)
            .toISOString()
            .substr(11, 8);

          setTotals({ score, skipped, duration, formattedTime });
        }
      };

      loadResults();
    }, [route?.params?.categoryScores])
  );

  if (!categoryScores) return null;

  const pieData = Object.keys(categoryScores).map((type) => ({
    name: type,
    population: categoryScores[type].correct,
    color:
      type === "Recall"
        ? "#47b39c"
        : type === "Analysis"
        ? "#ffc154"
        : "#fc6b56",
    legendFontColor: "#333",
    legendFontSize: wp("3.8%"),
  }));

  return (
    <ImageBackground
      source={require("../../assets/Homepage.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <AppText style={styles.name}>SmartStride</AppText>

      <Screen style={styles.overlay}>
        <View style={styles.centerContent}>
          <AppText style={styles.text}>Every step counts!</AppText>
          <AppText style={styles.subtitle}>Keep Going - Don't give up</AppText>

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
              center={[30, 0]}
              absolute
              hasLegend={true}
            />
          </View>

          {totals && (
            <View style={styles.summaryBox}>
              <View style={styles.statItem}>
                <AppText style={styles.statLabel}>Total Score</AppText>
                <AppText style={styles.statValue}>{totals.score}</AppText>
              </View>
              <View style={styles.statItem}>
                <AppText style={styles.statLabel}>Total Skipped</AppText>
                <AppText style={styles.statValue}>{totals.skipped}</AppText>
              </View>
              <View style={styles.statItem}>
                <AppText style={styles.statLabel}>Total Time</AppText>
                <AppText style={styles.statValue}>
                  {totals.formattedTime}
                </AppText>
              </View>
            </View>
          )}

          <View style={styles.buttonGroup}>
            <AppButton
              title="Start Session"
              onPress={() => navigation.navigate("Prompt")}
              style={styles.buttonPrimary}
              textStyle={{ fontSize: wp("6%") }}
            />
            <AppButton
              title="Retake Test"
              onPress={() =>
                Alert.alert(
                  "Retake Test?",
                  "This will erase previous results.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: async () => {
                        await AsyncStorage.removeItem("quizResults");
                        navigation.navigate("Quiz");
                      },
                    },
                  ]
                )
              }
              style={styles.buttonOutline}
              textStyle={{ color: colors.primary, fontSize: wp("6%") }}
            />
          </View>
        </View>
      </Screen>
    </ImageBackground>
  );
}

// --- Styles ---
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
    fontSize: wp("10%"),
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
    alignItems: "center",
    paddingLeft: wp("10%"),
  },
  summaryBox: {
    marginTop: hp("1%"),
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp("90%"),
    backgroundColor: "#ffffffcc",
    borderRadius: 12,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("4%"),
    marginBottom: hp("2%"),
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: wp("4%"),
    color: "#444",
    marginBottom: 4,
    fontFamily: "Montserrat_400Regular",
  },
  statValue: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: colors.primary,
  },
  buttonGroup: {
    marginTop: hp("1%"),
    width: wp("80%"),
    alignSelf: "center",
  },
  buttonPrimary: {
    backgroundColor: colors.secondary,
    marginBottom: hp("2%"),
    height: hp("8%"),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: "#000",
    height: hp("8%"),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Homepage;
