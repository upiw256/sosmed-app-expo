import { Text, View,Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScreenWraper from "../components/ScreenWraper";
import Loading from "../components/Loading";

const index = () => {
  const route = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loading />
    </View>
  );
};

export default index;
