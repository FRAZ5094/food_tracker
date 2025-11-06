import { Text } from "@/components/ui/text";
import { getProductDataFromBarcode } from "@/lib/OpenFoodFacts/getProductFromBarcode";
import { CameraView, useCameraPermissions } from "expo-camera";
import { isDevice } from "expo-device";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanFoodModal() {
  const [permission, requestPermission] = useCameraPermissions();

  const barcodeScanning = useRef(false);
  useEffect(() => {
    if (!isDevice) {
      Alert.alert("This feature is only available on real devices");
      router.back();
    }
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
        onBarcodeScanned={async (scanData) => {
          if (barcodeScanning.current) return;
          barcodeScanning.current = true;
          const barcode = scanData.data;
          const product = await getProductDataFromBarcode(barcode);
          //   const food = await getFoodByName(product.name);
          //   if (food) {
          //     router.dismissTo({
          //       pathname: `/(modals)/AddLoggedFoodModal`,
          //       params: {
          //         foodId: food.id.toString(),
          //       },
          //     });
          //     return;
          //   }
          //   await db.insert(Food).values({
          //     ...product,
          //     servingSizeUnit: "g",
          //     servingSizeValue: 100,
          //   });
          console.log(product);
          barcodeScanning.current = false;
          router.back();
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
