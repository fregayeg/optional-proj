import {
  View,
  Text,
  Pressable
} from "react-native";
import React from "react";
import {
  CalendarWeekFillIcon,
  PersonFillIcon
} from "../icons";
import { StateTypes } from "@app/screen/item/model/EStateTypes";
import { styles } from "./style";
import theme from "../../constants/theme";

const CardViewWithoutIcon = ({
  Ndossier,
  total,
  name,
  date,
  traducedState,
  state,
  onPress,
}: {
  Ndossier: string;
  total: string;
  name: string;
  date: string;
  traducedState: string;
  state: StateTypes | string;
  onPress: CallableFunction;
}) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        ...styles.container,
      })}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{Ndossier}</Text>
        <Text style={styles.title}> {total}</Text>
      </View>
      <View style={[{ width: "100%" }, styles.textWithIcon]}>
        <PersonFillIcon color={theme.colors.grayDarker} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.textWithIcon}>
          <CalendarWeekFillIcon color={theme.colors.grayDarker} />
          <Text style={styles.text}>{date}</Text>
        </View>
        <View style={styles.textWithIcon}>
          <View
            style={[
              {
                backgroundColor:
                  state === StateTypes.PartiellementRembourse ||
                  state === StateTypes.EnAttente
                    ? theme.colors.error
                    : state === StateTypes.Rembourse
                    ? theme.colors.success
                    : theme.colors.warning,
              },
              styles.indiceCircle,
            ]}
          />
          <Text style={styles.text}>{
            traducedState
          }</Text>
        </View>
      </View>
    </Pressable>
  );
};


export { CardViewWithoutIcon };
