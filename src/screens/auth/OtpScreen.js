import * as React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useNavigation } from "@react-navigation/core";

function OtpScreen() {
  const os = Platform.OS;
  const [code, setCode] = useState(null);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height"}
      className={`flex-1`}
    >
      <View className="w-full h-full">
        <View className="flex justify-center -mt-20 items-center w-full h-full px-10">
          <View className="w-full">
            <Text className="text-2xl text-center font-[PoppinsBold] font-semibold mt-10">
              Vérification du compte
            </Text>
          </View>
          <View>
            <Text className="text-lg font-[Poppins] mt-10 text-center text-gray-700">
              Entrez les 4 chiffres que nous avons envoyés au +243 859 070 705
            </Text>
          </View>
          <View className="w-full">
            <OTPInputView
              pinCount={4}
              editable={true}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                color: "#000",
                width: 50,
                height: 75,
                borderWidth: 0,
                borderBottomWidth: 2,
                fontSize: 32,
              }}
              codeInputHighlightStyle={{
                color: "#000",
                borderColor: "#000064",
              }}
              onCodeFilled={(code) => {
                setCode(code);
              }}
              style={{
                width: "100%",
                height: 200,
              }}
              keyboardType="number-pad"
            />
          </View>
          <View className="items-center">
            <Text className="text-gray-700 text-center font-[Poppins]">
              Vous n'avez pas reçu le code de vérification ?
            </Text>
            <TouchableOpacity className="mt-3">
              <Text className="text-primary font-[Poppins] font-medium underline">
                Renvoyer le code
              </Text>
            </TouchableOpacity>
          </View>
          <View className="absolute w-full bottom-0">
            <TouchableOpacity
              className="w-full p-3 bg-indigo-950 rounded-lg mb-3"
              onPress={() => navigation.navigate("Application")}
            >
              <Text className="text-lg font-[PoppinsBold]  text-white text-center">
                {"Vérifier maintenant"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default OtpScreen;
