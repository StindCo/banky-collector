import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { BanknotesIcon } from "react-native-heroicons/outline";
import { BottomSheet, Dialog } from "@rneui/base";
import generateTemplate from "../../utils/ExportTicketDePerception";
import * as Print from "expo-print";
import { useSelector } from "react-redux";
import { updateCollect } from "../../services/CollectorService";

const moment = require("moment");

export const getSelectedOperationTextByTag = (tag) => {
  if (tag == "saving") return "Epargne";
  else if (tag == "S") return "Bwakisa carte";
  else if (tag == "L") return "Crédit";
  else if (tag == "D") return "Dépot";
};

export default function Collect({ collect, bgStyle }) {
  const [visible, setVisible] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [collectSelected, setCollectedSelected] = useState({});

  useEffect(() => {
    setCollectedSelected(collect);
  }, [collect]);

  const [visibleError, setVisibleError] = useState(false);

  const toggleErrorDialog = () => {
    setVisibleError(!visibleError);
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    setIsPrinting(true);
    try {
      const html = await generateTemplate(collectSelected, user);
      setIsPrinting(false);
      await Print.printAsync({
        html,
        base64: true,
        width: 612,
      });

      // await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };



  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className={`flex-row mt-3 justify-between items-start p-2 py-3 rounded-lg  ${bgStyle}`}
      >
        <View className="w-3/5 flex-row space-x-4 items-center">
          <View className="flex w-18 pl-2 items-center justify-center">
            <View>
              <BanknotesIcon size={25} color={"#166534"} />
            </View>
          </View>
          <View className="space-y-1 text-left w-4/5">
            <Text className="font-[PoppinsBold] text-xs text-gray-700 text-left">
              {collectSelected.asset}
            </Text>
            <Text className="text-[9px] font-[Poppins] text-gray-600">
              {moment(collectSelected.data1).format("DD-MM-YYYY HH:mm")}
            </Text>
          </View>
        </View>

        <Text className="pr-1 text-xs font-[PoppinsBold]">
          {collectSelected.amount} {collectSelected.currency}
        </Text>
      </TouchableOpacity>

      <BottomSheet
        overlayStyle={{
          backgroundColor: "white",
        }}
        isVisible={visible}
        onBackdropPress={toggleVisible}
      >
        <View className="bg-white w-full p-6 rounded-t-2xl">
          <Text className="border-b text-center mb-2 font-[PoppinsBold] border-gray-200 pb-1">
            Détails de la collecte
          </Text>

          <View className="space-y-2 text">
            <View className="space-y-2 px-4 w-full border-b pb-2 border-gray-200">
              <View className="flex flex-row items-center">
                <Text className="text-[10px] w-2/4 font-[Poppins]">
                  Type :{" "}
                </Text>
                <Text className="text-[10px] font-[PoppinsBold]">
                  {getSelectedOperationTextByTag(collectSelected?.goal)}
                </Text>
              </View>

              <View className="flex flex-row items-center">
                <Text className="text-[10px] w-2/4 font-[Poppins]">
                  {collectSelected?.goal == "S" ? "Carte" : "Compte"} :{" "}
                </Text>
                <Text className="text-[10px] font-[PoppinsBold]">
                  {collectSelected.asset}
                </Text>
              </View>

              <View className="flex flex-row items-center">
                <Text className="text-[10px] w-2/4 font-[Poppins]">
                  Montant :{" "}
                </Text>
                <Text className="font-[PoppinsBold] underline">
                  {collectSelected.amount} {collectSelected.currency}
                </Text>
              </View>

              <View className="flex flex-row items-center">
                <Text className="text-[10px] w-2/4 font-[Poppins]">
                  Contact :{" "}
                </Text>
                <Text className="text-[10px] font-[PoppinsBold]">
                  {collectSelected?.data3}
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="text-[10px] w-2/4 font-[Poppins]">
                  Date :{" "}
                </Text>
                <Text className="text-[10px] font-[PoppinsBold]">
                  {moment(collectSelected.data1).format("DD-MM-YYYY HH:mm")}
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="text-[10px] w-2/4 font-[Poppins]">
                  Motif :
                </Text>
                <Text className="text-[10px] font-[PoppinsBold]">
                  {collectSelected?.data4 == "" ? "-" : collectSelected?.data4}
                </Text>
              </View>

              <View className="flex flex-row items-center">
                <Text className="text-[10px] w-2/4 font-[Poppins]">
                  Erreur :
                </Text>
                <Text className="text-[10px] text-red-500 font-[PoppinsBold]">
                  {collectSelected?.data5 == "" ||
                  collectSelected?.data5 == null
                    ? "-"
                    : collectSelected?.data5}
                </Text>
              </View>
            </View>
            <View className="space-y-2">
              <TouchableOpacity
                onPress={() => printToFile()}
                className="bg-indigo-900 rounded p-2"
              >
                <Text className="text-white font-[Poppins] text-center">
                  {isPrinting
                    ? "Impression en cours ..."
                    : "Imprimer le ticket"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setVisibleError(true);
                }}
                className="bg-red-600 rounded p-2"
              >
                <Text className="text-white font-[Poppins] text-center">
                  {collectSelected?.data5 == ""
                    ? "Signaler une erreur"
                    : "Voir l'erreur"}
                </Text>
              </TouchableOpacity>
            </View>
            <View></View>
          </View>
        </View>
      </BottomSheet>

      <Dialog
        overlayStyle={{
          backgroundColor: "white",
        }}
        isVisible={visibleError}
        onBackdropPress={toggleErrorDialog}
      >
        <View className="bg-white w-full m-0">
          <Text className="mb-2 font-[PoppinsBold] border-gray-200 pb-1">
            Rapport d'erreur
          </Text>

          <View className="space-y-2">
            <View className="space-y-2 w-full  pb-2 border-gray-200">
              <TextInput
                className="pb-5 border-b border-gray-200"
                defaultValue={collectSelected?.data5}
                onChangeText={(text) => setErrorMessage(text)}
                placeholder="Ecrivez le message d'erreur"
              />
            </View>
            <View className="space-x-2 w-full flex flex-row">
              <TouchableOpacity
                onPress={() => {
                  let updatedCollect = {
                    ...collect,
                    data5: errorMessage,
                  };

                  setCollectedSelected(updatedCollect);
                  updateCollect(updatedCollect);
                  toggleErrorDialog();
                }}
                className="bg-red-600 w-1/2 rounded p-2"
              >
                <Text className="text-white text-xs font-[Poppins] text-center">
                  Enregister
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setErrorMessage("");
                  let updatedCollect = {
                    ...collect,
                    data5: "",
                  };

                  setCollectedSelected(updatedCollect);
                  updateCollect(updatedCollect);
                  toggleErrorDialog();
                }}
                className="bg-orange-600 w-1/2 rounded p-2"
              >
                <Text className="text-white text-xs px-5 font-[Poppins] text-center">
                  Supprimer
                </Text>
              </TouchableOpacity>
            </View>
            <View></View>
          </View>
        </View>
      </Dialog>
    </>
  );
}
