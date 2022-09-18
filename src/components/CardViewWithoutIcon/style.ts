import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: theme.colors.light,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "#003666",
  },
  textWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    color: theme.colors.grayDarker,
    marginLeft: 5,
  },
  indiceCircle: {
    borderRadius: 10,
    width: 10,
    height: 10,
  },
});
