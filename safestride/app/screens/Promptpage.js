import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import allPrompts from "../data/Prompts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

const motivationalMessages = [
  "Nice work! You’re keeping your brain and body in sync.",
  "Sharp thinking! Keep moving.",
  "Even small steps like these make a big difference.",
  "Love how you’re staying active and alert.",
];

function getFilteredPrompts(categoryScores) {
  const totalCorrect = Object.values(categoryScores).reduce(
    (sum, cat) => sum + cat.correct,
    0
  );

  let difficultyRule = "low";
  if (totalCorrect >= 7) difficultyRule = "high";
  else if (totalCorrect >= 4) difficultyRule = "medium";

  const result = [];

  const getRandomFromArray = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  ["Recall", "Analysis", "Sensory"].forEach((type) => {
    const byType = allPrompts.filter((p) => p.type === type);

    if (difficultyRule === "high") {
      const easy = getRandomFromArray(
        byType.filter((p) => p.difficulty === "easy"),
        1
      );
      const medium = getRandomFromArray(
        byType.filter((p) => p.difficulty === "medium"),
        1
      );
      result.push(...easy, ...medium);
    } else if (difficultyRule === "medium") {
      const easy = getRandomFromArray(
        byType.filter((p) => p.difficulty === "easy"),
        1
      );
      const medium = getRandomFromArray(
        byType.filter((p) => p.difficulty === "medium"),
        1
      );
      result.push(...easy, ...medium);
    } else {
      const easy = getRandomFromArray(
        byType.filter((p) => p.difficulty === "easy"),
        2
      );
      result.push(...easy);
    }
  });

  return result.filter(Boolean);
}

function Promptpage({ navigation }) {
  const [prompts, setPrompts] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const load = async () => {
      const result = await AsyncStorage.getItem("quizResults");
      if (!result) return;
      const scores = JSON.parse(result);
      const filtered = getFilteredPrompts(scores);
      setPrompts(filtered);
      setCurrentPrompt(filtered[0]);
    };
    load();
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `00:${m}:${sec}`;
  };

  const handleNextPrompt = (skipped = false) => {
    if (skipped) setSkippedCount((prev) => prev + 1);

    const nextIndex = index + 1;

    if (nextIndex >= prompts.length) {
      setIsRunning(false);
      Speech.stop();
      setModalVisible(false);
      setCurrentPrompt(null);
      return;
    }

    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const nextPrompt = prompts[nextIndex];
      Speech.stop();
      setIndex(nextIndex);
      setCurrentPrompt(nextPrompt);
      setSelectedAnswer(null);
      slideAnim.setValue(width);
      Speech.speak(nextPrompt.message, { language: "en", rate: 0.9 });
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleComplete = () => setModalVisible(true);

  const checkAnswer = () => {
    if (!currentPrompt) return;

    if (selectedAnswer === currentPrompt.answer) {
      setScore((prev) => prev + 1);
      const msg =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ];
      Alert.alert("Good job!", msg);
    } else {
      Alert.alert("Try again", "That’s not the correct answer.");
    }

    setModalVisible(false);

    if (index >= prompts.length - 1) {
      setIsRunning(false);
      setCurrentPrompt(null);
    }

    handleNextPrompt();
  };

  // Save session summary to AsyncStorage
  useEffect(() => {
    const saveResults = async () => {
      const sessionSummary = {
        date: new Date().toISOString(),
        score,
        skippedCount,
        duration: secondsElapsed,
      };
      const prev = await AsyncStorage.getItem("sessionHistory");
      const parsed = prev ? JSON.parse(prev) : [];
      await AsyncStorage.setItem(
        "sessionHistory",
        JSON.stringify([sessionSummary, ...parsed])
      );
    };

    if (currentPrompt === null && prompts.length > 0) {
      saveResults();
    }
  }, [currentPrompt]);

  return (
    <ImageBackground
      source={require("../../assets/Prompt.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Screen style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Exit Session", "Are you sure you want to exit?", [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: () => navigation.goBack() },
              ])
            }
          >
            <AntDesign name="closecircle" size={40} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentWrapper}>
          <AppText style={styles.timer}>{formatTime(secondsElapsed)}</AppText>

          <Progress.Bar
            progress={(index + 1) / prompts.length}
            width={width * 0.8}
            color="#21b524"
            style={{ marginBottom: 20 }}
          />

          <AppText style={styles.score}>Score: {score}</AppText>

          {currentPrompt && (
            <View style={styles.promptBox}>
              <Animated.View
                style={[
                  styles.animatedWrapper,
                  { transform: [{ translateX: slideAnim }] },
                ]}
              >
                <AppText style={styles.text}>{currentPrompt.message}</AppText>
              </Animated.View>
            </View>
          )}

          {currentPrompt && (
            <View style={styles.buttonRow}>
              <AppButton
                title="SKIP"
                onPress={() => handleNextPrompt(true)}
                style={styles.buttonLeft}
                textStyle={{ color: colors.primary }}
              />
              <AppButton
                title="COMPLETE"
                onPress={handleComplete}
                style={styles.buttonRight}
              />
            </View>
          )}

          <TouchableOpacity style={styles.greenCircle} onPress={toggleTimer}>
            <AntDesign
              name={isRunning ? "stepforward" : "pause"}
              size={60}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Answer Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <AppText style={styles.modalQuestion}>
                {currentPrompt?.message}
              </AppText>
              {currentPrompt?.options.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option[0] && styles.optionSelected,
                  ]}
                  onPress={() => setSelectedAnswer(option[0])}
                >
                  <AppText>{option}</AppText>
                </TouchableOpacity>
              ))}
              <AppButton title="Submit" onPress={checkAnswer} />
            </View>
          </View>
        </Modal>

        {/* Final Summary Modal */}
        <Modal
          visible={currentPrompt === null && prompts.length > 0}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <AppText style={styles.modalQuestion}>Session Summary</AppText>
              <AppText>
                🧠 Accuracy: {score} / {prompts.length}
              </AppText>
              <AppText>⏱ Duration: {formatTime(secondsElapsed)}</AppText>
              <AppText>⏭ Skipped: {skippedCount}</AppText>

              <AppText style={{ marginTop: 15, textAlign: "center" }}>
                {score / prompts.length >= 0.7
                  ? "Great job staying focused and coordinated!"
                  : skippedCount > prompts.length / 2
                  ? "You skipped quite a few. Maybe take a break and try again later."
                  : "Keep practicing to improve your brain-body sync!"}
              </AppText>

              <Image
                source={require("../../assets/Result.png")}
                style={{
                  width: wp("70%"),
                  height: hp("45%"),
                  marginTop: 20,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />

              <View style={{ marginTop: 25, width: "100%" }}>
                <AppButton title="Finish" onPress={() => navigation.goBack()} />
              </View>
            </View>
          </View>
        </Modal>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.03,
    zIndex: 10,
  },
  contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  promptBox: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
    width: width * 0.9,
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.05,
    overflow: "hidden",
  },
  animatedWrapper: {
    width: width * 0.9,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
  },
  text: {
    color: colors.darkGrey,
    textAlign: "center",
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  timer: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: colors.darkGrey,
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.darkGrey,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
  },
  buttonLeft: {
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: "#000",
  },
  buttonRight: {
    flex: 1,
    marginLeft: 10,
  },
  greenCircle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    backgroundColor: "#21b524",
    marginTop: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#d0f0c0",
    borderColor: "#21b524",
  },
});

export default Promptpage;
