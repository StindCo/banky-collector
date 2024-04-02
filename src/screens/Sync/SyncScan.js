import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/core";
import { CheckCircleIcon } from "react-native-heroicons/outline";

export default function SyncScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);

    setTimeout(() => {
      navigation.navigate("ReviewCommit", {
        url: data,
      });
    }, 1000);
  };

  const renderCamera = () => {
    return (
      <View
        className="flex  flex-col items-center justify-center"
        style={styles.cameraContainer}
      >
        {scanned ? (
          <>
            <View className="mx-auto mt-5">
              <CheckCircleIcon size={180} color={"green"} />
            </View>

            <View>
              <Text className="text-xs text-center font-[Poppins]">
                Rédirection en cours ...
              </Text>
            </View>
          </>
        ) : (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.camera}
            />
          </>
        )}
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>En attente de la permission</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenue à l'interface de synchronisation
      </Text>
      <Text style={styles.paragraph}>
        Veuillez scanner le Qr code afin de continuer
      </Text>
      <View>{renderCamera()}</View>
      <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
        <Text style={styles.buttonText}>Synchroniser</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "5px",
  },
  title: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
    marginBottom: 0,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginBottom: 10,
  },
  cameraContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    height: 500,
    width: 350,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#000064",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
});
