import { AddLoggedFoodModalParams } from "@/app/(modals)/AddLoggedFoodModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

export function AddLoggedFoodButton({
  day,
  mealName,
}: {
  day: string;
  mealName: string;
}) {
  const params: AddLoggedFoodModalParams = { day, mealName };
  const searchParams = new URLSearchParams(params);
  return (
    <Link
      className="flex-col items-center justify-center"
      href={`/(modals)/AddLoggedFoodModal?${searchParams.toString()}`}
    >
      <MaterialCommunityIcons name="plus" size={24} color="black" />
    </Link>
  );
}
