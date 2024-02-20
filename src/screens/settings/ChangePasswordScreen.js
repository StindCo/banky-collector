import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ExclamationCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/core";
import { BottomSheet } from "@rneui/themed";
import { useState } from "react";
import AccountCardWithSelect from "../../components/account/AccountCardWithSelect";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useToast } from "react-native-toast-notifications";

import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiChangePassword } from "../../services/AuthService";
import useAuth from "../../utils/hooks/useAuth";

const validationSchema = Yup.object().shape({
  actualPassword: Yup.string().required("Password Required"),
  newPassword: Yup.string()
    .required("Enter your new password")
    .min(8, "Too Short!")
    .matches(/^[A-Za-z0-9_-]*$/, "Only Letters & Numbers Allowed"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Password not match"
  ),
});

function ChangePasswordScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordConfirmation, setPasswordConfirmation] = useState(false);

  const toggleShowPasswordConfirmation = () => {
    setPasswordConfirmation(!showPasswordConfirmation);
  };

  const [showOldPassword, setOldPassword] = useState(false);

  const toast = useToast();
  const { signOut } = useAuth();

  const toggleOldPassword = () => {
    setOldPassword(!showOldPassword);
  };

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const makeATransfert = (values) => {
    if (user != null) {
      console.log(user)
      apiChangePassword(user.id, values)
        .then(({ data }) => {
          toast.show("Mot de passe changé avec success", {
            type: "cmb_normal",
          });
          signOut();
        })
        .catch(({ response }) => {
          console.log(response.data);
          if (response.status == 400) {
            toast.show("Le mot de passe actuel n'est pas correct !", {
              type: "cmb_error",
            });
          }
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height"}
      className={`flex-1 mt-14 w-full h-full ${os === "ios" ? "mt-16" : ""}`}
    >
      <Formik
        // Remove this initial value
        initialValues={{
          actualPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          makeATransfert(values);
        }}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          setErrors,
          touched,
          handleSubmit,
          values,
        }) => (
          <>
            <View className="flex-1">
              <View className="flex-row w-full justify-between items-center px-5 pb-3">
                <View
                  className={`rounded-full p-1 ${
                    os !== "ios" && "border border-primary"
                  } `}
                >
                  <TouchableOpacity
                    className="mr-2"
                    onPress={() => navigation.goBack()}
                  >
                    <ChevronLeftIcon color="#000064" size="22" />
                  </TouchableOpacity>
                </View>
                <View className="">
                  <Text className="text-base text-center font-[Poppins] text-black">
                    Changer le mot de passe
                  </Text>
                </View>
                <View className=""></View>
              </View>
              <ScrollView>
                <View className="w-full mt-5 space-y-8 px-5">
                  <View>
                    <Text className="text-lg  font-[PoppinsBold] font-medium">
                      Veuillez remplir le formulaire
                    </Text>
                  </View>
                  <View className="space-y-8">
                    <View className="flex-row justify-between w-full">
                      <View className="w-full 0 space-y-2">
                        <Text className="text-gray-600 font-[Poppins]">
                          Ancien mot de passe
                        </Text>
                        <TextInput
                          onChangeText={handleChange("actualPassword")}
                          defaultValue={values.oldPassword}
                          secureTextEntry={!showOldPassword}
                          className="text-lg border-b border-gray-400 pb-3 font-[Poppins]"
                          placeholder="Ancien mot de passe ..."
                        />

                        <View className="absolute bottom-10 right-4">
                          <MaterialCommunityIcons
                            name={showOldPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#aaa"
                            onPress={toggleOldPassword}
                          />
                        </View>

                        <Text className="text-red-700">
                          {touched.actualPassword && errors.actualPassword}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row justify-between w-full">
                      <View className="w-full 0 space-y-2">
                        <Text className="text-gray-600 font-[Poppins]">
                          Nouveau mot de passe
                        </Text>
                        <TextInput
                          onChangeText={handleChange("newPassword")}
                          defaultValue={values.newPassword}
                          secureTextEntry={!showPassword}
                          className="text-lg border-b border-gray-400 pb-3 font-[Poppins]"
                          placeholder="Nouveau mot de passe ..."
                        />

                        <View className="absolute bottom-10 right-4">
                          <MaterialCommunityIcons
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#aaa"
                            onPress={toggleShowPassword}
                          />
                        </View>

                        <Text className="text-red-700">
                          {touched.newPassword && errors.newPassword}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row justify-between w-full">
                      <View className="w-full 0 space-y-2">
                        <Text className="text-gray-600 font-[Poppins]">
                          Confirmation du nouveau mot de passe
                        </Text>
                        <TextInput
                          onChangeText={handleChange("confirmNewPassword")}
                          defaultValue={values.newPasswordValidation}
                          secureTextEntry={!showPasswordConfirmation}
                          className="text-lg border-b border-gray-400 pb-3 font-[Poppins]"
                        />

                        <View className="absolute bottom-10 right-4">
                          <MaterialCommunityIcons
                            name={showPasswordConfirmation ? "eye-off" : "eye"}
                            size={24}
                            color="#aaa"
                            onPress={toggleShowPasswordConfirmation}
                          />
                        </View>

                        <Text className="text-red-700">
                          {touched.confirmNewPassword &&
                            errors.confirmNewPassword}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View className="flex content-center w-full border-t border-gray-300 py-2 px-2 mb-3">
              <TouchableOpacity
                onPress={handleSubmit}
                className={`w-full p-3 bg-indigo-950 rounded-lg`}
              >
                <Text className="text-lg font-[PoppinsBold] text-white text-center">
                  Envoyer
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default ChangePasswordScreen;
