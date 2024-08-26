import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/superbase";
import { getUserData } from "../services/userService";
// import Main from '../main/main' // Import the Main component

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};
const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      //console.log("session: ", session?.user.id);
      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user, session?.user.email);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);
  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    // console.log("suppabese: ",supabase);
    //console.log("res: ", res);
    if (res.success) {
      setUserData({...res.data, email});
    } else {
      console.log("error: ", res.msg);
    }
  };
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
};

export default _layout;
