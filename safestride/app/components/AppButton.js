import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function AppButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AppText style={[styles.text, textStyle]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp("2%"),
    width: "100%",
    // height: hp("7%"),
  },
  text: {
    color: colors.white,
    fontSize: wp("4.5%"),
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
