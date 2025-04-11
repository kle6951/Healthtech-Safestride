import React from "react";
import Screen from "../components/Screen";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function Promptpage() {
  return (
    <Screen style={styles.container}>
      <View style={styles.promptBox}>
        <AppText style={styles.text}>Count backward from 20</AppText>
      </View>
      <View style={styles.buttonRow}>
        <AppButton
          title="Skip"
          onPress={() => console.log("Option One Pressed")}
          style={styles.button}
        />
        <AppButton
          title="Complete"
          onPress={() => console.log("Option Two Pressed")}
          style={styles.button}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  promptBox: {
    backgroundColor: colors.screenWhite,
    borderRadius: 25,
    width: 375,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
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
