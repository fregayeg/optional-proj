import * as React from "react";
import {Text, View} from "react-native";
import theme from "../constants/theme";

export const Badge = ({text, active}: { text: string; active: boolean }) => {
    
  return (
    <View
      style={{
        backgroundColor: active ? theme.colors.primary : theme.colors.grayLight,
        paddingVertical: 7,
        paddingHorizontal: 12,
        marginHorizontal: 2,
        marginBottom: 10,
        borderRadius: 20,
        elevation: active ? 5 : 0
      }}
    >
      <Text
        style={{
          color: active ? theme.colors.light : theme.colors.grayDarker,
          fontSize: 12,
          fontWeight: "500",
        }}
      >
        {text}
      </Text>
    </View>
  )
};
