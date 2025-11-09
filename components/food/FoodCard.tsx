import { macrosToCalories } from "@/lib/utils";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";
import { MacrosBreakdownChart } from "./MacrosBreakdownChart";

type Food = {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
};

export function FoodCard({
  food,
  onPress,
}: {
  food: Food;
  onPress?: () => void;
}) {
  const calories = macrosToCalories(food);

  const handlePress = () => onPress?.();

  return (
    <Pressable
      className="flex flex-row p-4 border gap-2 border-gray-200 rounded-md bg-white"
      onPress={handlePress}
    >
      <View className="flex-1">
        <Text className="text-lg font-medium text-start">{food.name}</Text>
        <Text className="text-sm text-gray-500">{calories} kcal</Text>
      </View>
      <MacrosBreakdownChart macros={food} />
    </Pressable>
  );
}
