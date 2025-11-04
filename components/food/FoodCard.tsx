import { View } from "react-native";
import { Text } from "../ui/text";

type Food = {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
};

export function FoodCard({ food }: { food: Food }) {
  return (
    <View className="flex flex-row p-2 border border-gray-200 rounded-md">
      <View className="flex-1">
        <Text className="text-lg font-medium text-start">{food.name}</Text>
      </View>
      <View className="flex-none flex-row gap-2">
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
    </View>
  );
}
