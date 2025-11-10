import { AddLoggedFoodModalParams } from "@/app/(modals)/AddLoggedFoodModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

export function AddLoggedFoodButton(params: AddLoggedFoodModalParams) {
  return (
    <Link href={{ pathname: `/(modals)/SelectFoodModal`, params }}>
      <MaterialCommunityIcons
        className="self-end"
        name="plus"
        size={24}
        color="black"
      />
    </Link>
  );
}
