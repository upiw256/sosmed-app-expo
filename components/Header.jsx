import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import ButtonBack from "./ButtonBack";

const Header = ({ title, showButton = true, mb = 10 }) => {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showButton && (
        <View style={{ position: "absolute", left: 0 }}>
          <ButtonBack router={router} />
        </View>
      )}

      <Text style={styles.title}>{title || ""}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(2.7),
    fontWeight: theme.font.semibold,
    color: theme.colors.text,
  },
});
