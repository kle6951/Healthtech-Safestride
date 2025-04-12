import React, { useState, useRef } from "react";
import { StyleSheet, View, Animated, Easing, Dimensions } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const { width } = Dimensions.get("window");

// temporary data
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
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleNextPrompt = () => {
    // Slide out current
    Animated.timing(slideAnim, {
      toValue: -width, // move current out to the left
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Update prompt + reset position to right
      const nextIndex = (index + 1) % prompts.length;
      setIndex(nextIndex);
      setCurrentPrompt(prompts[nextIndex]);
      slideAnim.setValue(width); // position new prompt offscreen right

      // Slide in new
      Animated.timing(slideAnim, {
        toValue: 0, // move into center
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Screen style={styles.container}>
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
          title="Skip"
          onPress={handleNextPrompt}
          style={styles.button}
        />
        <AppButton
          title="Complete"
          onPress={handleNextPrompt}
          style={styles.button}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screenWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  promptBox: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    width: 375,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    overflow: "hidden",
  },
  animatedWrapper: {
    width: 375,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    fontSize: 35,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    gap: 15,
  },
  button: {
    flex: 1,
  },
});

export default Promptpage;
