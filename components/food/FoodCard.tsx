import { macrosToCalories } from "@/lib/utils";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";

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
  return (
    <Pressable
      className="flex flex-row p-4 border border-gray-200 rounded-md bg-white"
      onPress={onPress}
    >
      <View className="flex-1">
        <Text className="text-lg font-medium text-start">{food.name}</Text>
        <Text className="text-sm text-gray-500">{calories} kcal</Text>
      </View>
      <View className="flex-none flex-row gap-2 items-center">
        <Text className="text-center">
          <Text className="text-sm">Protein </Text>
          <Text className="text-sm font-medium">{food.protein}g</Text>
        </Text>
        <Text className="text-center">
          <Text className="text-sm">Carbs </Text>
          <Text className="text-sm font-medium">{food.carbs}g</Text>
        </Text>
        <Text className="text-center">
          <Text className="text-sm">Fat </Text>
          <Text className="text-sm font-medium">{food.fat}g</Text>
        </Text>
      </View>
    </Pressable>
  );
}
