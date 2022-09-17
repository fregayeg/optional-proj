import {
  StyleSheet,
  Dimensions
} from "react-native";
import theme from "@app/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme.colors.grayLighter,
  },
  stackCards: {
    paddingTop: 10,
    paddingBottom: 10,
    width: Dimensions.get("window").width,
    height: "83%",
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
  filter: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 15,
  },
  search: {
    width: "90%",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.light,
    elevation: 1,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  showMore: {
    width: (Dimensions.get("window").width * 90) / 100,
    marginBottom: 15,
    height: 40,
    backgroundColor: theme.colors.grayLight,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  showMoreText: {
    fontSize: 14,
    color: theme.colors.primaryDark,
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
});
