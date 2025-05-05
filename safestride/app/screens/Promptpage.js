// PromptpageWithAnswerModal.js
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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Progress from "react-native-progress";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const { width, height } = Dimensions.get("window");

const motivationalMessages = [
  "Nice work! You’re keeping your brain and body in sync.",
  "Sharp thinking! Keep moving.",
  "Even small steps like these make a big difference.",
  "Love how you’re staying active and alert.",
];

function Promptpage() {
  const [prompts, setPrompts] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const generatePromptSet = (categoryScores) => {
    const allPrompts = require("../data/Prompt").default; // make sure default export
    const totalCorrect = Object.values(categoryScores).reduce(
      (sum, cat) => sum + cat.correct,
      0
    );

    let promptSet = [];

    for (const [category, { correct }] of Object.entries(categoryScores)) {
      const relevant = allPrompts.filter((p) => p.type === category);
      const easy = relevant.filter((p) => p.difficulty === "easy");
      const medium = relevant.filter((p) => p.difficulty === "medium");
      const hard = relevant.filter((p) => p.difficulty === "hard");

      if (totalCorrect >= 7) {
        promptSet.push(...easy.slice(0, 1), ...medium.slice(0, 1));
      } else if (totalCorrect >= 4) {
        promptSet.push(...easy.slice(0, 1), ...medium.slice(0, 1));
      } else {
        promptSet.push(...easy.slice(0, 2));
      }
    }

    return promptSet.slice(0, 6);
  };

  useEffect(() => {
    const loadPrompts = async () => {
      const saved = await AsyncStorage.getItem("quizResults");
      if (saved) {
        const parsed = JSON.parse(saved);
        const generated = generatePromptSet(parsed);
        setPrompts(generated);
        setCurrentPrompt(generated[0]);
      }
    };
    loadPrompts();
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `00:${minutes}:${seconds}`;
  };

  const handleNextPrompt = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      const nextIndex = (index + 1) % prompts.length;
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
    const correct = currentPrompt.answer;
    if (selectedAnswer === correct) {
      setScore((prev) => prev + 1);
      const msg =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ];
      Alert.alert("Congratulations", msg);
    } else {
      Alert.alert("Oops!", "That’s not quite right. Try the next one!");
    }
    setModalVisible(false);
    handleNextPrompt();
  };

  if (!currentPrompt) return null;

  return (
    <ImageBackground
      source={require("../../assets/Prompt.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Screen style={styles.container}>
        <View style={styles.contentWrapper}>
          <AppText style={styles.timer}>{formatTime(secondsElapsed)}</AppText>
          <Progress.Bar
            progress={(index + 1) / prompts.length}
            width={width * 0.8}
            color="#21b524"
            style={{ marginBottom: 20 }}
          />
          <AppText style={styles.score}>Score: {score}</AppText>

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

          <View style={styles.buttonRow}>
            <AppButton
              title="SKIP"
              onPress={handleNextPrompt}
              style={styles.buttonLeft}
              textStyle={{ color: colors.primary }}
            />
            <AppButton
              title="COMPLETE"
              onPress={handleComplete}
              style={styles.buttonRight}
            />
          </View>

          <TouchableOpacity style={styles.greenCircle} onPress={toggleTimer}>
            <AntDesign
              name={isRunning ? "stepforward" : "pause"}
              size={60}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <AppText style={styles.modalQuestion}>
                {currentPrompt.message}
              </AppText>
              {currentPrompt.options?.map((option, idx) => (
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
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  contentWrapper: { alignItems: "center", justifyContent: "center" },
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
