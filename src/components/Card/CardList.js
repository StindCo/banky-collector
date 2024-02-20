import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Card from "./Card";
import { useNavigation } from "@react-navigation/core";

function CardList({
  accounts,
  filterText = null,
  isAccountLoad: isAccountsLoad = false,
}) {
  const [accountsFiltered, setAcccountsFiltered] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const navigation = useNavigation();


  React.useEffect(() => {
    setIsLoaded(false);
    const accountsFiltered = accounts.filter((value) => {
      return (
        filterText &&
        value.accountNumber.toLowerCase().includes(filterText.toLowerCase())
      );
    });

    setAcccountsFiltered(filterText ? accountsFiltered : accounts);
    setIsLoaded(true);
  }, [accounts, filterText]);

  React.useEffect(() => {
    setIsLoaded(isAccountsLoad);
  }, [isAccountsLoad]);

  return (
    <View>
      {isLoaded ? (
        <View className="space-y-3">
          {accountsFiltered.map((account, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Account", { account })}
            >
              <Card
                name={account.name}
                balance={account.balance}
                profileId={account.profileId}
                currency={account.currency}
                accountNumber={account.accountNumber}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </View>
  );
}

export default CardList;
