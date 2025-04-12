import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../config/colors";

function Quizpage() {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const choices = [
    { id: "A", text: "A. Berlin" },
    { id: "B", text: "B. Madrid" },
    { id: "C", text: "C. Paris" },
    { id: "D", text: "D. Beijing" },
  ];

  return (
    <Screen style={styles.container}>
      {/* Top Row */}
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

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Question */}
      <AppText style={styles.question}>What is the capital of France?</AppText>

      {/* Choices */}
      {choices.map((choice) => (
        <Pressable
          key={choice.id}
          style={[
            styles.choiceBox,
            selectedChoice === choice.id && {
              backgroundColor: colors.secondary,
              borderColor: colors.secondary,
            },
          ]}
          onPress={() => setSelectedChoice(choice.id)}
        >
          <AppText
            style={[
              styles.choiceText,
              selectedChoice === choice.id && { color: "#fff" },
            ]}
          >
            {choice.text}
          </AppText>
        </Pressable>
      ))}

      {/* Go Back */}
      <TouchableOpacity
        onPress={() => console.log("Go back to previous question")}
      >
        <Text style={styles.goBackText}>← Go back to previous question</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  goBackText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 20,
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
  progressContainer: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
  },
  progressBar: {
    width: "40%",
    height: "100%",
    backgroundColor: colors.primary,
  },
  question: {
    fontSize: 35,
    fontWeight: "600",
    marginBottom: 30,
  },
  choiceBox: {
    backgroundColor: "#f8f8f8",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    minHeight: 80,
  },
  choiceText: {
    fontSize: 25,
    color: "#333",
  },
});

export default Quizpage;
