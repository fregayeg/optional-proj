import * as React from "react";
import {
  View,
  Text
} from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

export const ErrorMsg = () => {

  const { t } = useTranslation('translation');

  return (
    <View style={styles.container}>
    <Text style={{color: "#dc1515"}}>{t('Commun.error')}</Text>
  </View>
)
}

export const LoadingMsg = () => {

  const { t } = useTranslation('translation');

  return (
    <View style={styles.container}>
    <Text
      style={{ alignSelf: "center", color: "#00e820", fontWeight: "bold" }}
>
  {t('Commun.loading')}
  </Text>
  </View>
)
}
