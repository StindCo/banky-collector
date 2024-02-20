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
  CurrencyDollarIcon,
  WalletIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/core";
import { BottomSheet } from "@rneui/themed";
import { useState } from "react";
import AccountCardWithSelect from "../../components/account/AccountCardWithSelect";
import { useSelector } from "react-redux";
import { apiGetAccountsOfUser } from "../../services/AccountServices";
import { apiMakeATransfert } from "../../services/transfertService";

function ReviewScreen({ route, navigation }) {
  const os = Platform.OS;

  const {
    accountTo,
    accountFrom,
    amount,
    accountToObject,
    accountFromObject,
    description,
  } = route.params;

  const [finalSolde, setFinalSolde] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    setFinalSolde(parseFloat(accountFromObject.balance) - parseFloat(amount));
  }, [accountToObject, accountFromObject]);

  const makeApaiement = () => {
    if (!isSubmitting) {
      let dataToSend = {
        recipient: accountTo,
        operatingAccount: accountFrom,
        description: description,
        amount: amount,
        currency: accountFromObject.currency,
        operation: "/api/operation_settings/9",
      };
      setIsSubmitting(true);
      apiMakeATransfert(dataToSend)
        .then(({ data }) => {
          navigation.navigate("Validation", {
            data,
            accountToObject,
            type: "ok",
            accountFromObject,
          });
        })
        .catch((errors) => {
          navigation.navigate("Validation", {
            type: "error",
            errors,
            accountToObject,
            accountFromObject,
          });
          // onTransfertMaking('errors', errors.response.data)
        });
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
              Details de la transaction
            </Text>
          </View>
          <View className=""></View>
        </View>

        <ScrollView>
          <View className="space-y-5 bg-indigo-900 py-5 px-5 rounded-lg shadow-lg m-5">
            {/* <CurrencyDollarIcon color={"#eee"} size={100} /> */}

            <View className="mt-2">
              <Text className="font-[PoppinsBold] text-white text-lg mb-2">
                Informations de l'expéditeur
              </Text>
              <View className="grid grid-flow-row grid-cols-2">
                <View>
                  <Text className="font-[Poppins] text-xs mt-2 text-white">
                    Intitulé du compte
                  </Text>
                </View>
                <View>
                  <Text className="font-[PoppinsBold] text-lg text-gray-300">
                    {accountFromObject.name}
                  </Text>
                </View>
              </View>
              <View className="grid grid-flow-row grid-cols-2">
                <View>
                  <Text className="font-[Poppins] text-xs mt-2 text-white">
                    Numéro de compte
                  </Text>
                </View>
                <View>
                  <Text className="font-[PoppinsBold] text-lg text-gray-300">
                    {accountFromObject.accountNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mx-5 space-y-5 bg-indigo-950 py-5 px-5 rounded-lg shadow-lg my-2">
            {/* <CurrencyDollarIcon color={"#eee"} size={100} /> */}

            <View className="mt-2">
              <Text className="font-[PoppinsBold] text-white text-lg mb-2">
                Informations du destinataire
              </Text>
              <View className="grid grid-flow-row grid-cols-2">
                <View>
                  <Text className="font-[Poppins] text-xs mt-2 text-white">
                    Intitulé du compte
                  </Text>
                </View>
                <View>
                  <Text className="font-[PoppinsBold] text-lg text-gray-300">
                    {accountToObject.name}
                  </Text>
                </View>
              </View>
              <View className="grid grid-flow-row grid-cols-2">
                <View>
                  <Text className="font-[Poppins] text-xs mt-2 text-white">
                    Numéro de compte
                  </Text>
                </View>
                <View>
                  <Text className="font-[PoppinsBold] text-lg text-gray-300">
                    {accountToObject.accountNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-14">
            <View className="mx-5 space-y-5 py-5 px-5">
              {/* <CurrencyDollarIcon color={"#eee"} size={100} /> */}

              <View className="mt-2">
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
                      Montant de transaction
                    </Text>
                  </View>
                  <View>
                    <Text className="font-[PoppinsBold] text-lg ">
                      {amount} {accountFromObject.currency}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center justify-between">
                  <View className="">
                    <Text className="font-[Poppins] text-left ">
                      Solde Final
                    </Text>
                  </View>
                  <View>
                    <Text
                      className={`font-[PoppinsBold] text-lg ${
                        finalSolde < 0 && "text-red-500"
                      }  `}
                    >
                      {finalSolde} {accountFromObject.currency}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={() => makeApaiement()}
              className={`my-8 mx-5 text-center rounded-lg p-4 bg-green-600 ${
                finalSolde < 0 && "bg-green-200"
              } `}
            >
              <Text className="text-center text font-[Poppins] text-white">
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  "Valider la transaction"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ReviewScreen;
