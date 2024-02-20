import * as React from 'react'
import {View, Text, Platform, ScrollView, TouchableOpacity, Image} from 'react-native';
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/core";

function NotificationScreen() {
    const os = Platform.OS
    const navigation = useNavigation()

    return (
        <View className={`flex w-full h-full ${os === "ios" ? 'mt-20' : ''}`}>
            <View className="flex-row justify-between items-center pb-3 px-5">
                <TouchableOpacity className={`w-1/3 rounded-full`} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon color="black"/>
                </TouchableOpacity>
                <View className="w-1/3">
                    <Text className="text-base text-center text-black">Notifications</Text>
                </View>
                <View className="w-1/3"></View>
            </View>
        </View>
    )
}

export default NotificationScreen;