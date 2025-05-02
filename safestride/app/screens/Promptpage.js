import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const { width, height } = Dimensions.get("window");

const prompts = [
  { type: "recall", message: "Name three cities you've visited before." },
  { type: "recall", message: "List five things you ate in the past 24 hours." },
  { type: "recall", message: "What was the last movie you watched?" },
  { type: "recall", message: "Name three people you talked to today." },
  {
    type: "recall",
    message: "Describe a childhood memory that makes you smile.",
  },
  { type: "analysis", message: "Why do you think people enjoy music?" },
  {
    type: "analysis",
    message: "Is it better to plan or to act spontaneously? Why?",
  },
  { type: "analysis", message: "What does success mean to you?" },
  { type: "analysis", message: "Do challenges help people grow? Explain." },
  {
    type: "analysis",
    message: "Why is teamwork important in achieving goals?",
  },
  { type: "sensory", message: "Describe the smell of fresh bread." },
  { type: "sensory", message: "What does rain feel like on your skin?" },
  {
    type: "sensory",
    message: "Close your eyes and describe the sounds around you.",
  },
  {
    type: "sensory",
    message: "Think of your favorite food. What does it taste like?",
  },
  {
    type: "sensory",
    message: "Describe the texture of sand between your fingers.",
  },
];

function Promptpage() {
  const [index, setIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

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
      slideAnim.setValue(width);

      Speech.speak(nextPrompt.message, {
        language: "en",
        rate: 0.9,
      });

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/Prompt.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Screen style={styles.container}>
        <View style={styles.contentWrapper}>
          <AppText style={styles.timer}>{formatTime(secondsElapsed)}</AppText>

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
              onPress={handleNextPrompt}
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
});

export default Promptpage;
