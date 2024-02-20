import * as React from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import { useNavigation } from "@react-navigation/core";
import * as Yup from "yup";
import { Formik } from "formik";
import useAuth from "../../utils/hooks/useAuth";
import useTimeOutMessage from "../../utils/hooks/useTimeOutMessage";
import { useToast } from "react-native-toast-notifications";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Veillez renseignez l'identifiant"),
  password: Yup.string().required("Veillez renseignez le mot de passe"),
});

function LoginScreen() {
  const os = Platform.OS;

  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [message, setMessage] = useTimeOutMessage();
  const toast = useToast();

  const { signIn } = useAuth();

  const onSignIn = async (values) => {
    const { userName, password } = values;
    setSubmitting(true);

    const result = await signIn({ username: userName, password });

    if (result.status === "failed") {
      setMessage(result.message);
      toast.show("Vos coordonnées ne sont pas valides", {
        type: "cmb_error",
      });
    }
    if (result.status === "success") {
      navigation.navigate("Home");
    }

    setSubmitting(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height"}
      className={`flex-1`}
    >
      <View className="w-full bg-indigo-950  h-full">
        <View className="flex h-[35%] bg-indigo-950 justify-center items-center">
          <Image
            source={require("../../../assets/img/logo/logo-dark-full.png")}
            className="w-[175px] h-[175px]"
          />
        </View>
        <View className="flex items-center bg-white w-full h-full rounded-t-3xl border-t-2">
          <View>
            <Text className="text-xl font-semibold mt-10 font-[Poppins]">
              Bienvenue à nouveau !
            </Text>
          </View>
          <View className="w-full">
            <Formik
              // Remove this initial value
              initialValues={{
                userName: "SC24011912320044",
                password: "password",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                if (!disableSubmit) {
                  onSignIn(values);
                } else {
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
                <View className="px-7 mt-10">
                  <View className="space-y-2 mt-2">
                    <Text className="text-left font-[Poppins]">
                      Email ou numéro de téléphone
                    </Text>
                    <View className="w-full justify-center">
                      <TextInput
                        onChangeText={handleChange("userName")}
                        onBlur={handleBlur("userName")}
                        value={values.userName}
                        placeholder="Email ou tél"
                        className="h-[45px] border-b rounded-lg px-3 border-gray-300 text-gray-800"
                      />
                      <Text className="text-left text-red-700 text-xs mt-1 font-[Poppins]">
                        {errors.userName}
                      </Text>
                    </View>
                  </View>

                  <View className="space-y-2 mt-2">
                    <Text className="text-left font-[Poppins]">
                      Mot de passe
                    </Text>
                    <View className="w-full justify-center">
                      <TextInput
                        className="h-[45px] border-b rounded-lg px-3 border-gray-300 text-gray-800"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="Mot de passe"
                      />
                      <Text className="text-left text-red-700 text-xs mt-1 font-[Poppins]">
                        {errors.password}
                      </Text>
                    </View>
                    <View className="absolute bottom-7 right-4">
                      <MaterialCommunityIcons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#aaa"
                        onPress={toggleShowPassword}
                      />
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity>
                      <Text className="text-right mt-2 font-[Poppins]">
                        Mot de passe oublié ?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="mt-5">
                    <TouchableOpacity
                      className="w-full p-3 bg-indigo-950 font-[PoppinsBold] rounded-lg mb-3"
                      onPress={handleSubmit}
                    >
                      <Text className="text-lg text-slate-50 text-center font-[Poppins]">
                        {!isSubmitting
                          ? "Se connecter"
                          : "Connexion en cours ..."}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* <Button onPress={handleSubmit} title="Submit" /> */}
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
