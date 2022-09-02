import { StyleSheet } from "react-native";
import theme from "@app/constants/theme";

/**
 * FRE - The stylesheet describes the new filter zone for exchanges
 * it has exactly 3 sections:
 *  1 - Header
 *  2 - First filter: direction
 *  3 - Second filter: date interval
 *
 */
export default StyleSheet.create({
  container: {
    width: "90%",
    height: "30%",
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
    justifyContent: "flex-start",
    alignItems:"center"
  },
  headerSectionTitleColumnText: {
    fontFamily: "poppins-regular",
    color: "#0079b1",
    fontSize: 18,
  },
  headerSectionInitializeColumn: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems:"center"
  },
  headerSectionInitializeColumnText: {
    fontFamily: "poppins-regular",
    color: "#5d93d6",
    fontSize: 15,
    textDecorationLine: "underline",
  },

  // Section 2 : First filter
  firstFilterSection: {
    flex: 0.38,
    flexDirection:"column",
    marginHorizontal: 10
  },
  firstFilterSectionText: {
    flex: 0.4,
    flexDirection:"row"
  },
  firstFilterSectionName: {
    fontFamily: "poppins-regular",
    color: "#756f86",
  },
  firstFilterSectionOptions: {
    flex: 0.7,
    flexDirection: "row"
  },
  firstFilterSectionOptionColOne: {
    flex: 0.35,
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
    flex: 0.35,
    flexDirection: "row",
  },
  firstFilterOptionTwo: {
    flex: 0.95,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    height: 36,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    left: 7
  },
  firstFilterOptionTwoText: {
    fontFamily: "poppins-regular",
    color: "rgba(74,74,74,1)",
    marginTop: 0,
    marginLeft: 0
  },

  // Section 3 : Second filter 
  secondFilterSection: {
    flex: 0.35,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10
  },
  // Second filter option one section
  secondFilterOptionOne: {
    flex: 0.4,
  },
  secondFilterTextOneContainer: {
    flex: 0.4
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
    height: 38,
    width: "90%",
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
    flexDirection:"column",
  },
  secondFilterSecTextTwoContainer: {
    flex: 0.4,
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
    height: 38,
    width: "80%",
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
  bottomSheetDatePickerButton:{
    fontFamily: "poppins-regular",
    color: "#0079b1",
    fontSize: 20
  }
});
