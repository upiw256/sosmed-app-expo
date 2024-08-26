import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import ScreenWraper from "../components/ScreenWraper";
import { StatusBar } from "expo-status-bar";
import { wp, hp } from "../helpers/common";

import { theme } from "../constants/theme";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const welcome = () => {

  const router = useRouter();
  return (
    <ScreenWraper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets/images/welcome.png")}
        />
        <View style={{ gap: 10 }}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>
            Where every thought finds a home and every image tell a story
          </Text>
        </View>
        <View style={styles.footer}>
          <Button
            title="Welcome"
            onPress={() => router.push("signUp")}
            buttonStyle={{
              marginHorizontal: wp(3),
            }}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Alredy have an account?</Text>
            <Pressable onPress={() => router.push("login")}>
              <Text style={[styles.loginText, { color: theme.colors.primary, fontWeight: theme.font.semibold }]}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWraper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    width: hp(30),
    height: wp(100),
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: wp(4),
    textAlign: "center",
    fontWeight: theme.font.extraBold,
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
