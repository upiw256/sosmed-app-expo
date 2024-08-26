import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWraper from "../components/ScreenWraper";
import { StatusBar } from "expo-status-bar";
import ButtonBack from "../components/ButtonBack";
import { useRouter } from "expo-router";
import { wp, hp } from "../helpers/common";
import { theme } from "../constants/theme";
import Input from "../components/Input";
import Icon from "../assets/icons";
import Button from "../components/Button";
import { supabase } from "../lib/superbase";

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      alert("Please fill all the fields");
      return;
    }
    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();
    setLoading(true);
    // TODO: Do signup

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    // console.log("Email: ", email);
    // console.log("Password: ", password);
    // console.log("Name: ", name);
    // console.log("session: ", session);
    // console.log("error: ", error);
    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <ScreenWraper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ButtonBack router={router} />
        <View>
          <Text style={styles.welcomeText}>Let's,</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text>Please fill the detail to create an account</Text>
          <Input
            icon={
              <Icon
                name="mail"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.primary}
              />
            }
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={
              <Icon
                name="user"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.primary}
              />
            }
            placeholder="Enter your name"
            onChangeText={(value) => (nameRef.current = value)}
          />
          <Input
            icon={
              <Icon
                name="lock"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.primary}
              />
            }
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />
          <Text style={styles.forgotPassword}>Forgot Password</Text>
          <Button title="Sign Up" onPress={onSubmit} loading={loading} />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.push("login")}>
            <Text style={[styles.footerText, { color: theme.colors.primary }]}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWraper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.font.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.font.semibold,
    color: theme.colors.text,
  },
  footer: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: hp(1.6),
  },
});
