import { getFoodByName } from "@/api/food/getFoodByName";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { db } from "@/db";
import { Food } from "@/db/schema";
import { getProductDataFromBarcode } from "@/lib/OpenFoodFacts/getProductFromBarcode";
import { CameraView, useCameraPermissions } from "expo-camera";
import { isDevice } from "expo-device";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Alert, View } from "react-native";

export default function ScanFoodModal() {
  const [permission, requestPermission] = useCameraPermissions();
  const barcodeScanning = useRef(false);

  const returnToAddLoggedFoodModal = (foodId: number) => {
    // router.dismissTo({
    //   pathname: `/(modals)/AddLoggedFoodModal`,
    //   params: {
    //     foodId: foodId.toString(),
    //   },
    // });
  };

  const returnToFoodsPage = () => {
    router.dismissTo({
      pathname: "/foods",
    });
  };

  const handleBarcodeScanned = async (barcode: string) => {
    if (barcodeScanning.current) return;
    barcodeScanning.current = true;
    const product = await getProductDataFromBarcode(barcode);
    let food = await getFoodByName(product.name);
    if (food) {
      // returnFoodId(food.id);
      returnToFoodsPage();

      //toast telling them that this food has already been added
      barcodeScanning.current = false;
      return;
    }
    food = await db
      .insert(Food)
      .values({
        ...product,
        servingSizeUnit: "g",
        servingSizeValue: 100,
      })
      .returning()
      .then(([food]) => food);
    if (!food) {
      Alert.alert("Error", "Failed to add food");
      return;
    }
    barcodeScanning.current = false;
    // returnFoodId(food.id);
    returnToFoodsPage();
  };

  useEffect(() => {
    if (!isDevice) {
      // router.back();
    }
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View className="flex-1 flex flex-col p-4 justify-center">
        <Text className="text-center text-base font-medium pb-4">
          We need your permission to show the camera
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 flex flex-col p-4 justify-center">
        <Text className="text-center text-base font-medium pb-4">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>
          <Text>Grant permission</Text>
        </Button>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
        onBarcodeScanned={async (scanData) => {
          const barcode = scanData.data;
          handleBarcodeScanned(barcode);
        }}
      />
      {/* <View style={styles.buttonContainer}>
        <Button style={styles.button}>
          <Text style={styles.text}>Flip Camera</Text>
        </Button>
      </View> */}
    </View>
  );
}
