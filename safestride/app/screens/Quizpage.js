import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../config/colors";

function Quizpage() {
  return (
    <Screen style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => console.log("back")}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AntDesign name="left" size={40} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.centeredTitle}>
          <AppText style={styles.title}>Assessment</AppText>
        </View>

        <TouchableOpacity onPress={() => console.log("skip")}>
          <AppText style={styles.text}>Skip</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  centeredTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1, 
  },
  text: {
    fontSize: 25,
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
});

export default Quizpage;