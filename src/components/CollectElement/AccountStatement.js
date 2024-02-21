import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import React, { useCallback, useEffect, useState } from "react";
import { apiGetTransactionsOfAnAcount } from "../../services/transactionsService";
import TransactionList from "../Transactions/TransactionList";
import { apiGetEntriesOfAnAcount } from "../../services/EntriesService";
import EntryList from "./EntryList";
import generateTemplate from "../../utils/ExportTemplates";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const moment = require("moment");

const LIST_OF_SEARCH_QUERY_TAG = [
  {
    displayName: "Custom date",
    tag: "from",
  },
  {
    displayName: "Custom date",
    tag: "to",
  },
  {
    displayName: "Aujourd'hui",
    tag: "today",
  },
  {
    displayName: "Cette semaine",
    tag: "week",
  },
  {
    displayName: "Ce mois",
    tag: "month",
  },
  {
    displayName: "Cette année",
    tag: "year",
  },
  {
    displayName: "Toutes les transactions",
    tag: "all",
  },
];

export default function AccountStatement({ account = null }) {
  const [selectedQuerytag, setSelectedQueryTag] = useState("today");
  const [entries, setEntries] = useState([]);
  const [isEntrieLoading, setIsEntrieLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

  const [beforeDate, setBeforeDate] = useState(null);
  const [afterDate, setAfterDate] = useState(null);

  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);

  const getEntries = useCallback(
    async (AccountId, toDate = null, fromDate = null) => {
      setIsEntrieLoading(false);

      let queryTag =
        toDate != null || fromDate != null ? "unknown" : selectedQuerytag;

      let afterDate = null;
      let beforeDate = null;

      switch (queryTag) {
        case "today":
          var x = new Date();
          x.setHours(x.getHours() - 24);
          afterDate = moment(x).format("DD-MM-YYYY");
          break;

        case "week":
          var x = new Date();
          x.setDate(x.getDate() - 7);
          afterDate = moment(x).format("DD-MM-YYYY");
          break;

        case "month":
          var x = new Date();
          x.setDate(x.getDate() - 30);
          afterDate = moment(x).format("DD-MM-YYYY");
          break;
        case "year":
          var x = new Date();
          x.setFullYear(x.getFullYear() - 1);
          afterDate = moment(x).format("DD-MM-YYYY");
          break;

        default:
          afterDate = fromDate;
          beforeDate = toDate;
          break;
      }

      setBeforeDate(beforeDate);
      setAfterDate(afterDate);

      const { data } = await apiGetEntriesOfAnAcount(
        AccountId ?? "",
        beforeDate,
        afterDate
      );

      setEntries(data);
      setIsEntrieLoading(true);
    },
    [selectedQuerytag, toDate, fromDate]
  );

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html: "",
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const html = await generateTemplate(
      account,
      entries,
      afterDate,
      beforeDate
    );

    const { uri } = await Print.printToFileAsync({
      html,
      base64: true,
      width: 612,
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  useEffect(() => {
    getEntries(account.id, toDate, fromDate);
  }, [selectedQuerytag, toDate, fromDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFromDate(moment(date).format("DD-MM-YYYY"));

    hideDatePicker();
  };

  const showToDatePicker = () => {
    setToDatePickerVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDatePickerVisibility(false);
  };

  const handleToConfirm = (date) => {
    setToDate(moment(date).format("DD-MM-YYYY"));
    hideToDatePicker();
  };

  return (
    <View className="py-2 h-full mb-3">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="pr-10"
      >
        {LIST_OF_SEARCH_QUERY_TAG.map((value, index) => (
          <View key={index} className="mx-2">
            {value.tag != "custom" &&
            value.tag != "from" &&
            value.tag != "to" ? (
              <TouchableOpacity
                onPress={() => {
                  setToDate(null);
                  setFromDate(null);
                  setSelectedQueryTag(value.tag);
                }}
                className={`p-2 px-4 bg-slate-200  rounded-lg ${
                  value.tag == selectedQuerytag &&
                  toDate == null &&
                  fromDate == null &&
                  "bg-indigo-950"
                }`}
              >
                <Text
                  className={`font-[Poppins] text-slate-800 text-sm ${
                    value.tag == selectedQuerytag &&
                    toDate == null &&
                    fromDate == null &&
                    "text-slate-100"
                  }`}
                >
                  {value.displayName}
                </Text>
              </TouchableOpacity>
            ) : null}

            {value.tag == "from" ? (
              <TouchableOpacity
                onPress={showDatePicker}
                className={`p-1.5 px-4 bg-slate-200  rounded-lg ${
                  fromDate && "bg-indigo-950"
                }`}
              >
                <Text className={`font-[Poppins] ${fromDate && "text-white"}`}>
                  <Text className="font-[Poppins]">Du : </Text>
                  <Text className="font-[PoppinsBold]">
                    {fromDate ?? "                    "}
                  </Text>
                </Text>
              </TouchableOpacity>
            ) : null}

            {value.tag == "to" ? (
              <TouchableOpacity
                onPress={showToDatePicker}
                className={`p-1.5 px-4 bg-slate-200  rounded-lg ${
                  toDate && "bg-indigo-950"
                }`}
              >
                <Text className={`font-[Poppins] ${toDate && "text-white"}`}>
                  <Text className="font-[Poppins]">Au : </Text>
                  <Text className="font-[PoppinsBold]">
                    {toDate ?? "                    "}
                  </Text>
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}

        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View>
          <DateTimePickerModal
            isVisible={isToDatePickerVisible}
            mode="date"
            onConfirm={handleToConfirm}
            onCancel={hideToDatePicker}
          />
        </View>
      </ScrollView>

      <ScrollView className="absolute px-2 w-full bottom-[70px] h-[280px]">
        <EntryList
          isTransactionLoading={isEntrieLoading}
          transactions={entries}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={printToFile}
        className="fixed bottom-1 bg-indigo-950 p-3 rounded-lg"
      >
        <Text className="text-slate-100 text-center font-[Poppins]">
          Imprimer le relevé
        </Text>
      </TouchableOpacity>
    </View>
  );
}
