import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedOperationTextByTag } from "../home/HomeScreen";
import moment from "moment";
import { createCollect } from "../../services/CollectorService";
import * as Crypto from "expo-crypto";

function ReviewScreen({ route, navigation }) {
  const os = Platform.OS;

  const { currency, toDate, amount, typeOperation, recipient, description } =
    route.params;

  const [finalSolde, setFinalSolde] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const makeACollect = async () => {
    if (!isSubmitting) {
      try {
        let dataToSend = {
          currency,
          amount,
          id_operation: Crypto.randomUUID(),
          typeOperation,
          recipient,
          description: description ?? "",
          id_agent: user.id,
          is_synchronized: 1,
          created_at: toDate ?? new Date().toISOString(),
        };

        createCollect(dataToSend)
          .then(() => {
            navigation.navigate("Validation", {
              type: "ok",
              data: dataToSend,
            });
          })
          .catch((err) => console.log(err));
      } catch (error) {
        navigation.navigate("Validation", {
          type: "error",
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height"}
      className={`flex-1 mt-12 w-full h-full ${os === "ios" ? "mt-14" : ""}`}
    >
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
              Details de la collecte
            </Text>
          </View>
          <View className=""></View>
        </View>

        <ScrollView>
          <View className="space-y-5 bg-indigo-950 py-5 px-5 rounded-lg shadow-lg m-5">
            {/* <CurrencyDollarIcon color={"#eee"} size={100} /> */}

            <View className="mt-2">
              <Text className="font-[PoppinsBold] text-white text-base mb-2">
                Informations sur la collecte
              </Text>
              <View className="grid grid-flow-row grid-cols-2">
                <View>
                  <Text className="font-[Poppins] text-xs mt-2 text-white">
                    Type d'opération
                  </Text>
                </View>
                <View>
                  <Text className="font-[PoppinsBold] text-sm text-gray-300">
                    {getSelectedOperationTextByTag(typeOperation)}
                  </Text>
                </View>
              </View>
              <View className="grid grid-flow-row grid-cols-2">
                <View>
                  <Text className="font-[Poppins] text-xs mt-2 text-white">
                    {typeOperation == "saving_card"
                      ? "Numéro carte Buakisa carte"
                      : "Numéro de compte"}
                  </Text>
                </View>
                <View>
                  <Text className="font-[PoppinsBold] text-sm text-gray-300">
                    {recipient}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-4">
            <View className="mx-5 space-y-5 py-5 px-5">
              {/* <CurrencyDollarIcon color={"#eee"} size={100} /> */}

              <View className="">
                <View className="flex flex-row mb-3 items-center justify-between">
                  <View className="">
                    <Text className="font-[Poppins] text-left ">Motif</Text>
                  </View>
                  <View>
                    <Text className="font-[Poppins] w-32 text-right text-xs">
                      {description}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row items-center justify-between">
                  <View className="">
                    <Text className="font-[Poppins] text-left ">
                      Montant de la collecte
                    </Text>
                  </View>
                  <View>
                    <Text className="font-[PoppinsBold] text-sm ">
                      {amount} {currency}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={() => makeACollect()}
              className={`my-8 mx-5 text-center rounded-lg p-4 bg-green-600 ${
                finalSolde < 0 && "bg-green-200"
              } `}
            >
              <Text className="text-center text-sm font-[Poppins] text-white">
                {isSubmitting ? <ActivityIndicator /> : "Valider la collecte"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ReviewScreen;
