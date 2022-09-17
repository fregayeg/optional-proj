import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    marginHorizontal: 10
  },
  header: {
    flex: 0.17,
    flexDirection: "row",
    marginHorizontal: 20

  },
  headerColOne: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  headerOptionOneText: {
    fontFamily: "poppins-regular",
    color: "#0079b1",
    fontSize: 20
  },
  headerColTwo: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  datePickerSection: {
    flex: 0.83,
    width: "90%"
  },
  divider: {
    borderBottomColor: 'black',
    width: "90%",
    opacity: 0.1,
    borderBottomWidth: 1,
    marginBottom: "2%"
  },
});
