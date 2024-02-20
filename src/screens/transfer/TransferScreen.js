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
import {
  apiGetAccounts,
  apiGetAccountsByAccountNumber,
  apiGetAccountsOfUser,
} from "../../services/AccountServices";
import AccountCardWithSearchEngine from "../../components/account/AccountCardWithSearchEngine";
import { Formik } from "formik";

const validationSchema = Yup.object().shape({
  accountFrom: Yup.string().required("Veillez renseigner le compte expéditeur"),
  accountTo: Yup.string().required("Veillez renseigner le compte destinataire"),
  amount: Yup.string().required("Veillez renseigner le montant"),
  description: Yup.string().required("Veillez renseigner le motif"),
});

function TransferScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();

  const [accounts, setAccounts] = useState([]);
  const [accountFromSelected, setAccountFromSelected] = useState({});
  const [
    isAccountModalForExpediteurVisible,
    setIsAccountModalVisibleForExpediteur,
  ] = useState(false);

  const [accountToSelected, setAccountToSelected] = useState({});
  const [accountToNumber, setAccountToNumber] = useState("");
  const [filteredAccountTo, setFilteredAccountTo] = useState([]);
  const [
    isAccountModalForDestinataireVisible,
    setIsAccountModalVisibleForDestinataire,
  ] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const [isAccountLoading, setIsAccountLoading] = useState(true);

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const getAccounts = async (holderId) => {
    setIsAccountLoading(true);

    const { data } = await apiGetAccountsOfUser(holderId);

    if (holderId == null) {
      setFilteredAccountTo(data);
    } else {
      setAccounts(data);
    }
  };

  const getAllAccounts = async (accountNumber) => {
    setIsAccountLoading(true);

    const { data } = await apiGetAccountsByAccountNumber(accountNumber);

    setFilteredAccountTo(data);

    setIsAccountLoading(false);
  };

  React.useEffect(() => {
    getAccounts(user.customer.id);
  }, [user]);

  const onChangeAccountToNumber = (accountNumber) => {
    setAccountToNumber(accountNumber);
    setIsAccountLoading(true);
    if (accountNumber.length > 12) {
      getAllAccounts(accountNumber);
    }
  };

  const makeATransfert = (values) => {
    navigation.navigate("Review", {
      ...values,
      accountNumberTo: accountToNumber,
      accountToObject: accountToSelected,
      accountFromObject: accountFromSelected,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={os === "ios" ? "padding" : "height"}
      className={`flex-1 mt-14 w-full h-full ${os === "ios" ? "mt-16" : ""}`}
    >
      <Formik
        // Remove this initial value
        initialValues={{
          accountTo: "",
          accountFrom: "",
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
                    Effectuer un transfert
                  </Text>
                </View>
                <View className=""></View>
              </View>
              <ScrollView>
                <View className="w-full mt-5 space-y-8 px-5">
                  <View>
                    <Text className="text-lg  font-[PoppinsBold] font-medium">
                      Veuillez entrer les détails du transfert
                    </Text>
                  </View>
                  <View className="space-y-8">
                    <View className="pb-3  space-y-3">
                      <Text className="text-gray-600 font-[Poppins]">
                        Transférer à partir du compte
                      </Text>
                      <TouchableOpacity
                        className="flex-row justify-between items-center"
                        onPress={() =>
                          setIsAccountModalVisibleForExpediteur(true)
                        }
                      >
                        <Text className="text-base font-[Poppins]">
                          {accountFromSelected?.id
                            ? accountFromSelected.name
                            : "Sélectionner un compte"}
                        </Text>
                        <View className="mr-2">
                          <ChevronDownIcon color="#000064" size="16" />
                        </View>
                      </TouchableOpacity>

                      <Text className="text-gray-600 border-b pb-3 border-gray-400 font-[Poppins]">
                        Solde disponible : {accountFromSelected.solde}
                      </Text>

                      <Text className="text-red-700">
                        {touched.accountFrom && errors.accountFrom}
                      </Text>
                    </View>
                    <View className="pb-3   space-y-2">
                      <Text className="text-gray-600 font-[Poppins]">
                        Transférer vers
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          setIsAccountModalVisibleForDestinataire(true)
                        }
                        className="flex-row  border-b border-gray-400 pb-3 justify-between items-center"
                      >
                        <Text className="text-base font-[Poppins]">
                          {accountToSelected?.id
                            ? accountToSelected.name
                            : "Sélectionner un compte"}
                        </Text>
                        <View className="mr-2">
                          <ChevronDownIcon color="#000064" size="16" />
                        </View>
                      </TouchableOpacity>

                      <Text className="text-red-700">
                        {touched.accountTo && errors.accountTo}
                      </Text>
                    </View>

                    <View className="flex-row justify-between w-full">
                      <View className="w-3/4 0 space-y-2">
                        <Text className="text-gray-600 font-[Poppins]">
                          Montant
                        </Text>
                        <TextInput
                          onChangeText={handleChange("amount")}
                          defaultValue={values.amount}
                          className="text-xl border-b border-gray-400 pb-3 font-[Poppins]"
                          keyboardType="number-pad"
                        />

                        <Text className="text-red-700">
                          {touched.amount && errors.amount}
                        </Text>
                      </View>
                      <View className="w-1/5 pb-3   border-gray-400 space-y-2">
                        <Text className="text-gray-600 font-[Poppins]">
                          Devise
                        </Text>
                        <TouchableOpacity className="flex-row justify-between items-center">
                          <Text className="text-lg font-[Poppins]">
                            {accountFromSelected.currency}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="w-full">
                      <View className="w-full  space-y-1">
                        <Text className="text-gray-600 font-[Poppins]">
                          Motif
                        </Text>
                        <TextInput
                          onChangeText={handleChange("description")}
                          defaultValue={values.description}
                          className="text-base border-b border-gray-400 pb-5"
                        />
                        <Text className="text-red-700">
                          {touched.description && errors.description}
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

            <BottomSheet
              modalProps={{}}
              containerStyle={{ backgroundColor: "transparent" }}
              backdropStyle={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
              onBackdropPress={() =>
                setIsAccountModalVisibleForExpediteur(false)
              }
              isVisible={isAccountModalForExpediteurVisible}
            >
              <View className="bg-white rounded-tl-2xl rounded-tr-2xl p-3 min-h-[300px]">
                <View className="py-2 mb-3">
                  <Text className="text-base font-[Poppins] text-center font-semibold">
                    Veuillez sélectionner un compte ci-dessous
                  </Text>
                </View>
                <ScrollView className="h-full">
                  {accounts.map((value, index) => (
                    <AccountCardWithSelect
                      key={index}
                      account={{
                        id: value.id,
                        name: value.name,
                        currency: value.currency,
                        accountNumber: value.accountNumber,
                        balance: value.balance,
                        description: `${value.accountNumber} `,
                        solde: `${parseFloat(value.balance).toFixed(2)} ${
                          value.currency
                        }`,
                      }}
                      accountSelected={accountFromSelected}
                      setAccountSelected={(value) => {
                        setFieldValue("accountFrom", value.id);
                        setIsAccountModalVisibleForExpediteur(false);
                        setAccountFromSelected(value);
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
            </BottomSheet>

            <BottomSheet
              modalProps={{}}
              containerStyle={{ backgroundColor: "transparent" }}
              backdropStyle={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
              onBackdropPress={() =>
                setIsAccountModalVisibleForDestinataire(false)
              }
              isVisible={isAccountModalForDestinataireVisible}
            >
              <View className="bg-white rounded-tl-2xl rounded-tr-2xl p-3 min-h-[400px]">
                <View className="py-2 border-b border-gray-200 pb-3">
                  <Text className="text-base font-[Poppins] text-center font-semibold">
                    Veuillez sélectionner le compte ci-dessous
                  </Text>
                </View>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(accountNumber) =>
                    onChangeAccountToNumber(accountNumber)
                  }
                  value={accountToNumber}
                  className="h-[45px] border rounded-lg my-3 px-3 w-full border-gray-300 text-gray-800"
                  placeholder="Inserer le numéro de compte du destinataire"
                />
                {isAccountLoading ? (
                  <ActivityIndicator />
                ) : (
                  <ScrollView className="h-full">
                    {filteredAccountTo.map((value, index) => (
                      <AccountCardWithSearchEngine
                        key={index}
                        account={{
                          id: value.id,
                          name: value.name,
                          description: `${accountToNumber} `,
                          accountNumber: accountToNumber
                        }}
                        accountSelected={accountToSelected}
                        setAccountSelected={(value) => {
                          setFieldValue("accountTo", value.id);
                          setIsAccountModalVisibleForDestinataire(false);
                          setAccountToSelected(value);
                        }}
                      />
                    ))}

                    {filteredAccountTo.length == 0 && (
                      <View className="text-center flex flex-col justify-center space-y-3 rounded-lg border-orange-500 border p-3 mx-auto mt-5 items-center">
                        <ExclamationCircleIcon size={30} color={"#f59e0b"} />
                        <Text className="text-center font-[Poppins] text-orange-500">
                          Numéro de compte introuvable
                        </Text>
                      </View>
                    )}
                  </ScrollView>
                )}
              </View>
            </BottomSheet>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default TransferScreen;
