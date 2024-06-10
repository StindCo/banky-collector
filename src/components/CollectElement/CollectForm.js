import * as React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const moment = require("moment");

import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as Yup from "yup";
import { Formik } from "formik";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { Dialog } from "@rneui/base";
import ScanQrCode from "./ScanQrCode";
import { useToast } from "react-native-toast-notifications";

const validationSchema = Yup.object().shape({
  currency: Yup.string().required("Veuillez renseigner la devise"),
  amount: Yup.string().required("Veuillez renseigner le montant"),
  customerName: Yup.string().required("Veuillez renseigner le nom du client"),
  asset: Yup.string().required("Veuillez renseigner le compte concerné"),
  description: Yup.string().max(365, "Veuillez renseigner la description"),
});

export const getSelectedOperationTextByTag = (tag) => {
  if (tag == "saving") return "Epargne";
  else if (tag == "S") return "Bwakisa carte";
  else if (tag == "L") return "Crédit";
  else if (tag == "D") return "Dépôt";
};

function CollectForm({ route }) {
  const os = Platform.OS;
  const { typeOperation } = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [visibleError, setVisibleError] = useState(false);

  const makeATransfert = (values) => {
    navigation.navigate("Review", {
      ...values,
      goal: typeOperation,
      date: toDate,
    });
  };

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const handleToConfirm = (date) => {
    setToDate(date.toISOString());
    hideToDatePicker();
  };

  const toggleErrorDialog = () => {
    setVisibleError(!visibleError);
  };

  return (
    <>
      <Formik
        // Remove this initial value
        initialValues={{
          currency: "USD",
          asset: "",
          amount: "",
          customerName: "",
          description: "",
          userInfo: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            makeATransfert(values);
          } else {
          }
        }}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          touched,
          handleSubmit,
          values,
        }) => (
          <>
            <ScrollView className="flex-1 mt-[15%] px-5">
              <View className="py-2 flex-row items-center space-x-3 border-b border-gray-200 pb-3">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="p-1 border border-[#1e1b4b] rounded-xl"
                >
                  <ChevronLeftIcon size={20} color={"#1e1b4b"} />
                </TouchableOpacity>
                <Text className="text-[12px] items-center font-[Poppins] text-center font-semibold">
                  Nouvelle collecte: {"  "}
                  <Text className="font-[PoppinsBold]  text-base">
                    {getSelectedOperationTextByTag(typeOperation)}
                  </Text>
                </Text>
              </View>
              <ScrollView className="pb-6">
                <View className="w-full mt-5 space-y-8 px-5">
                  <View className="space-y-3">
                    <View className="w-full">
                      <View className="w-full space-y-1">
                        <Text className="text-gray-600 text-xs font-[Poppins]">
                          Nom du client
                        </Text>
                        <TextInput
                          onChangeText={handleChange("customerName")}
                          defaultValue={values.customerName}
                          placeholder="Insérer le nom complet ..."
                          className="text-sm border-b border-gray-400 pb-2"
                        />
                        <Text className="text-red-700 text-[10px] mb-1">
                          {touched.customerName && errors.customerName}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row justify-between w-full">
                      <View className="w-3/4 0 space-y-2">
                        <Text className="text-gray-600 text-xs font-[Poppins]">
                          Montant
                        </Text>
                        <TextInput
                          onChangeText={handleChange("amount")}
                          defaultValue={values.amount}
                          placeholder="Insérer le montant"
                          className="text-sm border-b border-gray-400 pb-2 font-[Poppins]"
                          keyboardType="number-pad"
                        />

                        <Text className="text-red-700 text-[10px] mb-1">
                          {touched.amount && errors.amount}
                        </Text>
                      </View>
                      <View className="w-1/5 border-gray-400 space-y-2">
                        <Text className="text-gray-600 text-xs font-[Poppins]">
                          Devise
                        </Text>
                        <TouchableOpacity className="flex-row justify-between items-center">
                          <RNPickerSelect
                            onValueChange={handleChange("currency")}
                            items={[
                              { label: "Dollar americain", value: "USD" },
                              { label: "Francs congolais", value: "CDF" },
                            ]}
                          >
                            <View className="mx-2 mt-1 flex-row items-center space-x-1">
                              <Text
                                className={`font-[PoppinsBold] flex-row items-center text-slate-800 text-xs `}
                              >
                                {values.currency}
                              </Text>
                              <ChevronDownIcon size={14} color={"#000"} />
                            </View>
                          </RNPickerSelect>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className="w-full">
                      <View className="w-full  space-y-1">
                        <Text className="text-gray-600 text-xs font-[Poppins]">
                          {typeOperation == "saving_card"
                            ? "Numéro carte Bwakisa carte"
                            : "Numéro de compte"}
                        </Text>
                        <TextInput
                          onChangeText={handleChange("asset")}
                          defaultValue={values.asset}
                          keyboardType={
                            typeOperation != "S"
                              ? "number-pad"
                              : "ascii-capable"
                          }
                          placeholder={
                            typeOperation == "S"
                              ? "Insérer numéro carte Bwakisa carte"
                              : "Insérer numéro de compte"
                          }
                          className="text-sm border-b  border-gray-400 pb-2"
                        />
                        <Text className="text-red-700 text-[10px] mb-1">
                          {touched.asset && errors.asset}
                        </Text>
                        <View className="absolute bottom-8 right-2">
                          <TouchableOpacity onPress={() => toggleErrorDialog()}>
                            <MaterialCommunityIcons
                              name={"qrcode"}
                              size={30}
                              color="#555"
                              // onPress={}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View className="w-full">
                      <View className="w-full space-y-1">
                        <Text className="text-gray-600 text-xs font-[Poppins]">
                          Numéro de téléphone / Adresse email
                        </Text>
                        <TextInput
                          onChangeText={handleChange("userInfo")}
                          defaultValue={values.userInfo}
                          placeholder="Insérer la description ..."
                          className="text-sm border-b border-gray-400 pb-2"
                        />
                        <Text className="text-red-700 text-[10px] mb-1">
                          {touched.userInfo && errors.userInfo}
                        </Text>
                      </View>
                    </View>

                    <View className="w-full">
                      <View className="w-full space-y-1">
                        <Text className="text-gray-600 text-xs font-[Poppins]">
                          Description (facultatif)
                        </Text>
                        <TextInput
                          onChangeText={handleChange("description")}
                          defaultValue={values.description}
                          placeholder="Insérer la description ..."
                          className="text-sm border-b border-gray-400 pb-5"
                        />
                        <Text className="text-red-700 text-[10px] mb-1">
                          {touched.description && errors.description}
                        </Text>
                      </View>
                    </View>

                    {typeOperation == "S" && (
                      <View className="w-full">
                        <View className="w-full  space-y-1">
                          <Text className="text-gray-600 text-xs font-[Poppins]">
                            Date (facultatif)
                          </Text>

                          <TouchableOpacity
                            onPress={showToDatePicker}
                            className=" mt-1 border-b py-3 flex-row items-center justify-between space-x-1"
                          >
                            <Text
                              className={`font-[Poppins] flex-row items-center text-zinc-800 text-xs `}
                            >
                              {toDate != null
                                ? moment(toDate).format("DD-MM-YYYY")
                                : "Selectionnez la date"}
                            </Text>
                            <ChevronDownIcon size={14} color={"#000"} />
                          </TouchableOpacity>
                          <Text className="text-red-700 text-[10px] mb-1"></Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className={`w-full p-3 mt-2 bg-indigo-950 rounded-lg`}
                >
                  <Text className="text-sm font-[PoppinsBold] text-white text-center">
                    Enregistrer
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              <View>
                <DateTimePickerModal
                  isVisible={isToDatePickerVisible}
                  mode="date"
                  onConfirm={handleToConfirm}
                  onCancel={hideToDatePicker}
                />
              </View>
            </ScrollView>

            <Dialog
              overlayStyle={{
                backgroundColor: "white",
              }}
              isVisible={visibleError}
              onBackdropPress={toggleErrorDialog}
            >
              <View className="bg-white w-full m-0">
                <Text className="mb-2 text-center font-[PoppinsBold] border-gray-200 pb-1">
                  Scanner le code Qr
                </Text>

                <View>
                  <ScanQrCode
                    handle={(value) => {
                      try {
                        let data = JSON.parse(value);
                        setFieldValue("asset", data?.asset);
                        setFieldValue("currency", data?.currency);
                        setFieldValue("customerName", data?.name);
                      } catch (error) {
                        toast.show("Format du code Qr non pris en charge", {
                          type: "cmb_error",
                        });
                      }
                    }}
                    setClose={setVisibleError}
                  />
                </View>
              </View>
            </Dialog>
          </>
        )}
      </Formik>
    </>
  );
}

export default CollectForm;
