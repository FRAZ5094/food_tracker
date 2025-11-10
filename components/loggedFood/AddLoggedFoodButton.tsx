import { AddLoggedFoodModalParams } from "@/app/(modals)/AddLoggedFoodModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";

export function AddLoggedFoodButton({
  day,
  groupName,
}: {
  day: string;
  groupName: string;
}) {
  const params: AddLoggedFoodModalParams = { day, groupName };
  const searchParams = new URLSearchParams(params);
  return (
    <Link
      className="flex-col items-center justify-center"
      href={`/(modals)/SelectFoodModal?${searchParams.toString()}`}
    >
      <MaterialCommunityIcons name="plus" size={24} color="black" />
    </Link>
  );
}
