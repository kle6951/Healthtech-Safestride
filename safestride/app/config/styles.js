import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.darkGrey,
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "montserrat",
  },
};
