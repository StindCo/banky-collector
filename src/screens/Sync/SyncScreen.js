import * as React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { useState } from "react";
import Loader from "../../components/loading/Loader";
import { useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";

function SyncScreen() {
  const os = Platform.OS;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  React.useEffect(() => {
    (async () => {})();
  }, []);
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {!loading ? (
        <View
          className={`flex w-full mt-14 h-full ${os === "ios" ? "mt-16" : ""}`}
        >
          <View className="flex-row justify-between items-center pb-3 px-5">
            <View className="w-1/4"></View>

            <View className="w-2/4">
              <Text className="text-base text-center font-[Poppins] text-black">
                Synchronisation
              </Text>
            </View>
            <View className="w-1/4 "></View>
          </View>
          <View>
            <View className="mt-8 h-full">
              <Camera className="mt-8 mx-auto w-64 h-64 rounded-lg" type={type}>
                <View>
                  <TouchableOpacity>
                    <Text>Flip Camera</Text>
                  </TouchableOpacity>
                </View>
              </Camera>

              <TouchableOpacity className="mx-5 p-4 rounded-lg bg-indigo-950   mt-8">
                <Text className="text-center font-[Poppins] text-white">
                  Synchroniser les données
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </>
  );
}

export default SyncScreen;
