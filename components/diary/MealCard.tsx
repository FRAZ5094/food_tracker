import { macrosToCalories } from "@/lib/utils";
import { StyleSheet, View } from "react-native";
import { AddLoggedFoodButton } from "../loggedFood/AddLoggedFoodButton";
import { DeleteLoggedFoodButton } from "../loggedFood/DeleteLoggedFoodButton";
import { Text } from "../ui/text";

type LoggedFood = {
  id: number;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  servingSizeValue: number;
  servingSizeUnit: string;
};
export function GroupCard({
  groupName,
  loggedFoods,
  day,
}: {
  groupName: string;
  loggedFoods: LoggedFood[];
  day: string;
}) {
  return (
    <View className="flex flex-col border border-gray-200 rounded-md bg-white">
      <View className="flex flex-row justify-between px-2 py-1">
        <Text className="text-lg font-medium">{groupName}</Text>
        <AddLoggedFoodButton day={day} groupName={groupName} />
      </View>
      {loggedFoods.length > 0 && (
        <>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View className="flex flex-col gap-2 p-2">
            {loggedFoods.map((loggedFood) => (
              <View
                key={loggedFood.id}
                className="flex flex-row items-center justify-between"
              >
                <View className="flex-1">
                  <Text className="text-base font-medium">
                    {loggedFood.name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {loggedFood.servingSizeValue} {loggedFood.servingSizeUnit}
                  </Text>
                </View>
                <DeleteLoggedFoodButton loggedFoodId={loggedFood.id} />
                <View className="flex flex-col gap-1 items-end">
                  <View className="flex flex-row gap-1">
                    <Text className="text-sm">P: {loggedFood.protein}g</Text>
                    <Text className="text-sm">C: {loggedFood.carbs}g</Text>
                    <Text className="text-sm">F: {loggedFood.fat}g</Text>
                  </View>
                  <Text className="text-xs text-gray-500">
                    {macrosToCalories(loggedFood)} kcal
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
