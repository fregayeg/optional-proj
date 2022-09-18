import * as React from "react";
import {
  View,
  Text
} from "react-native";
import { styles } from "./styles";

export const ErrorMsg = () => {
  
  return (
    <View style={styles.container}>
    <Text style={{color: "#dc1515"}}>{"Error! Something wrong"}</Text>
  </View>
)
}

export const LoadingMsg = () => {
  
  return (
    <View style={styles.container}>
    <Text
      style={{ alignSelf: "center", color: "#00e820", fontWeight: "bold" }}
>
  {"Loading ..."}
  </Text>
  </View>
)
}
