import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

export function OpenScanFoodModalButton() {
  return (
    <Link href="/(modals)/ScanFoodModal" className="p-2" asChild>
      <TouchableOpacity>
        <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
      </TouchableOpacity>
    </Link>
  );
}
