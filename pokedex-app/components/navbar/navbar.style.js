import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  filterIcon: {
    width: 24, // Adjust as needed
    height: 24, // Adjust as needed
  },
  navbarText: {
    fontSize: SIZES.medium, // Adjust as needed
    fontFamily: FONT.bold, // Adjust as needed
  },
  input: {
    flex: 1, // Allow the input to take available space
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
  },
  additionalText: {
    fontSize: SIZES.small, // Adjust as needed
  },
});

export default styles;
