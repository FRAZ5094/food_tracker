import { db } from "@/db";
import { LoggedFood } from "@/db/schema";
import { macrosToCalories } from "@/lib/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { eq } from "drizzle-orm";
import { View } from "react-native";
import { AddLoggedFoodButton } from "../loggedFood/AddLoggedFoodButton";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

type LoggedFood = {
  id: number;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
};
export function MealCard({
  mealName,
  loggedFoods,
  day,
}: {
  mealName: string;
  loggedFoods: LoggedFood[];
  day: string;
}) {
  const handleDeleteLoggedFood = async (loggedFoodId: number) => {
    await db.delete(LoggedFood).where(eq(LoggedFood.id, loggedFoodId));
  };
  return (
    <View className="flex flex-col border border-gray-200 rounded-md p-2">
      <View className="flex flex-row items-center justify-between">
        <Text>{mealName}</Text>
        <AddLoggedFoodButton day={day} mealName={mealName} />
      </View>
      {loggedFoods.map((loggedFood) => (
        <View
          key={loggedFood.id}
          className="flex flex-row items-center justify-between"
        >
          <View className="flex-1">
            <Text>{loggedFood.name}</Text>
            <Text>{macrosToCalories(loggedFood)} kcal</Text>
          </View>
          <Button
            variant="ghost"
            size="icon"
            onPress={() => handleDeleteLoggedFood(loggedFood.id)}
          >
            <MaterialCommunityIcons name="delete" size={24} color="black" />
          </Button>
        </View>
      ))}
    </View>
  );
}
