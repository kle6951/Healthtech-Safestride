import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Pressable,
  Alert,
  Animated,
  Platform,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import questions from "../data/Questions";

function Quizpage({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answers, setAnswers] = useState({});
  const progress = useRef(new Animated.Value(0)).current;

  const currentQuestion = questions[currentQuestionIndex];

  const animateProgress = (toValue) => {
    Animated.timing(progress, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const targetProgress = (currentQuestionIndex + 1) / questions.length;
    animateProgress(targetProgress);
  }, [currentQuestionIndex]);

  const handleSelect = (choiceId) => {
    setSelectedChoice(choiceId);
    setAnswers({ ...answers, [currentQuestionIndex]: choiceId });
  };

  const submitQuiz = async () => {
    const categoryScores = {};

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === q.answer;
      if (!categoryScores[q.type]) {
        categoryScores[q.type] = { correct: 0, total: 0 };
      }
      categoryScores[q.type].total += 1;
      if (isCorrect) categoryScores[q.type].correct += 1;
    });

    try {
      await AsyncStorage.setItem("quizResults", JSON.stringify(categoryScores));
      navigation.navigate("Home", { categoryScores });
    } catch (e) {
      console.error("Failed to save quiz results", e);
      Alert.alert("Error", "Failed to save results.");
    }
  };

  const handleNext = () => {
    if (selectedChoice === null) {
      Alert.alert(
        "Select an answer",
        "Please choose an option before continuing."
      );
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(answers[currentQuestionIndex + 1] || null);
    } else {
      Alert.alert("Submit Quiz?", "Are you ready to submit your answers?", [
        { text: "Cancel", style: "cancel" },
        { text: "Submit", style: "default", onPress: submitQuiz },
      ]);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedChoice(answers[currentQuestionIndex - 1] || null);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(answers[currentQuestionIndex + 1] || null);
    } else {
      Alert.alert("Submit Quiz?", "Are you ready to submit your answers?", [
        { text: "Cancel", style: "cancel" },
        { text: "Submit", style: "default", onPress: submitQuiz },
      ]);
    }
  };

  return (
    <Screen style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Quit Quiz?",
              "Are you sure you want to exit the quiz? Your progress will be lost.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes, Quit",
                  style: "destructive",
                  onPress: () => navigation.navigate("Entry"),
                },
              ]
            )
          }
        >
          <AntDesign name="left" size={wp("8%")} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.centeredTitle}>
          <AppText style={styles.title}>Assessment</AppText>
        </View>

        <TouchableOpacity onPress={handleSkip}>
          <AppText style={styles.text}>Skip</AppText>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      {/* Question */}
      <AppText style={styles.question}>{currentQuestion.question}</AppText>

      {/* Choices */}
      {currentQuestion.choices.map((choiceText) => {
        const choiceId = choiceText[0];
        const isSelected = selectedChoice === choiceId;
        return (
          <Pressable
            key={choiceId}
            style={[
              styles.choiceBox,
              isSelected && {
                backgroundColor: colors.secondary,
                borderColor: colors.secondary,
              },
            ]}
            onPress={() => handleSelect(choiceId)}
          >
            <AppText
              style={[styles.choiceText, isSelected && { color: "#fff" }]}
            >
              {choiceText}
            </AppText>
          </Pressable>
        );
      })}

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          <Text
            style={[
              styles.goBackText,
              currentQuestionIndex === 0 && { color: "#aaa" },
            ]}
          >
            ← Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.goBackText}>
            {currentQuestionIndex === questions.length - 1
              ? "Submit →"
              : "Next →"}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? hp("6%") : hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  goBackText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginTop: hp("2%"),
    textDecorationLine: "underline",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("2%"),
    paddingHorizontal: wp("2%"),
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: hp("2.5%"),
  },
  centeredTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  text: {
    fontSize: wp("5.5%"),
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  progressContainer: {
    height: hp("2.5%"),
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: wp("3%"),
    overflow: "hidden",
    marginBottom: hp("3%"),
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  question: {
    fontSize: wp("6.5%"),
    fontWeight: "600",
    marginBottom: hp("3%"),
  },
  choiceBox: {
    backgroundColor: "#f8f8f8",
    paddingVertical: hp("3%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("4%"),
    marginBottom: hp("2%"),
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    minHeight: hp("10%"),
  },
  choiceText: {
    fontSize: wp("5.5%"),
    color: "#333",
  },
});

export default Quizpage;
