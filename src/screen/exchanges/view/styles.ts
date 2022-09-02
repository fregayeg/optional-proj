import theme from "@app/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  exchangeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.grayLighter,
  },
  recherche: {
    width: "90%",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.light,
    elevation: 1,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  specialFilterButton:{
    marginRight: 10,
    marginVertical: 15,
    elevation: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 10
  },
  icon: {
    top: 13,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 25,
    width: 40,
    height: 43,
    left: 19,
  },
  buttonFilterContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 15,
  },
  filterButton: {
    flex: 0.25,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    fontSize: 20,
  },
  filter1: {
    top: 14,
    left: 84,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(250,250,250,1)",
    fontSize: 26,
  },
  verticalListContainer: {
    flex: 0.75,
    backgroundColor: "transparent",
    marginTop: 3,
    marginBottom: 3,
  },
  listContainer: {
    flex: 1,
  },
  listItemContainer: {
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
  listItemRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemTitle: {
    fontSize: 14,
    fontFamily: "poppins-bold",
    color: "#003666",
  },
  loadMoreContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    height: 40,
    backgroundColor: theme.colors.grayLight,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  showMoreText: {
    color: theme.colors.primaryDark,
  },
  stackCards: {
    width: Dimensions.get("window").width,
    height: "83%",
    position: "relative",
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
