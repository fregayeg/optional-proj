import {StyleSheet} from "react-native";
import theme from "@app/constants/theme";

export default StyleSheet.create({
  container: {
    width: "90%",
    height: "30%",
    minHeight: 200,
    maxHeight: 270,
    flexDirection: "column",
    backgroundColor: theme.colors.light,
    borderRadius: 9,
    elevation: 1
  },
  // Section 1: header
  headerSection: {
    flex: 0.18,
    flexDirection: "row",
    marginTop: 5,
    marginHorizontal: 10
  },
  headerSectionTitleColumn: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  headerSectionTitleColumnText: {
    fontFamily: "poppins-regular",
    color: "#0079b1",
    fontSize: 18,
    alignSelf: "center"
  },
  headerSectionInitializeColumn: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  headerSectionInitializeColumnText: {
    fontFamily: "poppins-regular",
    color: "#5d93d6",
    fontSize: 15,
    textDecorationLine: "underline",
    alignSelf: "center"
  },
  // Section 1 : First filter
  firstFilterSection: {
    flex: 0.4,
    marginHorizontal: 10
  },
  firstFilterSecText: {
    flex: 0.37
  },
  firstFilterSecName: {
    fontFamily: "poppins-regular",
    color: "#756f86",
  },
  firstFilterSecOptions: {
    flex: 0.7,
    flexDirection: "row"
  },
  firstFilterSecOptionColOne: {
    flex: 0.34,
    flexDirection: "row",
  },
  firstFilterOptionOne: {
    flex: 0.95,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    width: 80,
    height: 36,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  firstFilterOptionOneText: {
    fontFamily: "poppins-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 0,
    marginLeft: 0
  },
  firstFilterSecOptionColTwo: {
    flex: 0.34,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstFilterOptionTwo: {
    flex: 0.95,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    width: 80,
    height: 36,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    left: 10
  },
  firstFilterOptionTwoText: {
    fontFamily: "poppins-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 0,
    marginLeft: 0
  },

  // Section 3 : Second filter
  secondFilterSection: {
    flex: 0.4,
    flexDirection: "row",
  },
  // Second filter option one section
  secondFilterOptionOne: {
    flex: 0.5,
    marginHorizontal: 10
  },
  secondFilterSecTextOne: {
    flex: 0.39
  },
  secondFilterOptionOneText: {
    fontFamily: "poppins-regular",
    color: "#756f86",
    marginTop: 0,
    marginLeft: 0
  },
  secondFilterOptionOneComp: {
    flex: 0.61
  },
  secondFilterOptionOneButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 149,
    height: 38,
    borderRadius: 5,
    marginLeft: 0,
    borderColor: "black",
    borderWidth: 1
  },
  secondFilterDateFrom: {
    fontFamily: "poppins-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 0,
    marginLeft: 0
  },

  secondFilterOptionTwo: {
    flex: 0.5,
    marginHorizontal: 10
  },
  secondFilterSecTextTwo: {
    flex: 0.39
  },
  secondFilterOptionTwoText: {
    fontFamily: "poppins-regular",
    color: "#756f86",
    marginTop: 0,
    marginLeft: 0,
  },
  secondFilterOptionTwoComp: {
    flex: 0.61,
  },
  secondFilterOptionTwoButton: {
    justifyContent:"center",
    alignItems:"center",
    width: 149,
    height: 38,
    borderRadius: 5,
    marginLeft: 0,
    borderColor: "black",
    borderWidth: 1
  },
  secondFilterDateTo: {
    fontFamily: "poppins-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 0,
    marginLeft: 0
  },
  trackStyle: {
    height :6,
    top: -3
  },
  markerStyle: {
    height: 15,
    width: 15,
    backgroundColor: '#0079B1'
  },

});
