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
const moment = require("moment");

import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as Yup from "yup";
import { apiGetAccountsOfUser } from "../../services/AccountServices";
import { Formik } from "formik";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const validationSchema = Yup.object().shape({
  currency: Yup.string().required("Veuillez renseigner la devise"),
  amount: Yup.string().required("Veuillez renseigner le montant"),
  recipient: Yup.string().required("Veuillez renseigner le compte concerné"),
  description: Yup.string().max(365, "Veuillez renseigner la description"),
});

export const getSelectedOperationTextByTag = (tag) => {
  if (tag == "saving") return "Epargne";
  else if (tag == "saving_card") return "Buakisa carte";
  else if (tag == "loan") return "Crédit";
};

function CollectForm({ route }) {
  const os = Platform.OS;
  const { typeOperation } = route.params;
  const navigation = useNavigation();
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
  const [toDate, setToDate] = useState(null);

  const [disableSubmit, setDisableSubmit] = useState(false);

  const makeATransfert = (values) => {
    navigation.navigate("Review", {
      ...values,
      typeOperation,
      toDate,
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

  return (
    <Formik
      // Remove this initial value
      initialValues={{
        currency: "USD",
        recipient: "",
        amount: "",
        description: "",
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
          <View className="flex-1 mt-[20%] px-5">
            <View className="py-2 border-b border-gray-200 pb-3">
              <Text className="text-base font-[Poppins] text-center font-semibold">
                Nouvelle collecte: {"  "}
                <Text className="font-[PoppinsBold]">
                  {getSelectedOperationTextByTag(typeOperation)}
                </Text>
              </Text>
            </View>
            <ScrollView>
              <View className="w-full mt-5 space-y-8 px-5">
                <View className="space-y-3">
                  <View className="flex-row justify-between w-full">
                    <View className="w-3/4 0 space-y-2">
                      <Text className="text-gray-600 text-xs font-[Poppins]">
                        Montant
                      </Text>
                      <TextInput
                        onChangeText={handleChange("amount")}
                        defaultValue={values.amount}
                        placeholder="Inserer le montant"
                        className="text-sm border-b border-gray-400 pb-2 font-[Poppins]"
                        keyboardType="number-pad"
                      />

                      <Text className="text-red-700">
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
                            { label: "Dollars américain", value: "USD" },
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
                          ? "Numéro carte Buakisa carte"
                          : "Numéro de compte"}
                      </Text>
                      <TextInput
                        onChangeText={handleChange("recipient")}
                        defaultValue={values.recipient}
                        keyboardType="number-pad"
                        placeholder={
                          typeOperation == "saving_card"
                            ? "Inserer numéro carte Buakisa carte"
                            : "Inserer numéro de compte"
                        }
                        className="text-sm border-b  border-gray-400 pb-2"
                      />
                      <Text className="text-red-700">
                        {touched.recipient && errors.recipient}
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
                        placeholder="Inserer la description ..."
                        className="text-sm border-b border-gray-400 pb-5"
                      />
                      <Text className="text-red-700">
                        {touched.description && errors.description}
                      </Text>
                    </View>
                  </View>

                  {typeOperation == "saving_card" && (
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
                        <Text className="text-red-700"></Text>
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
          </View>
        </>
      )}
    </Formik>
  );
}

export default CollectForm;
