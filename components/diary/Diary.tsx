import { db } from "@/db";
import { LoggedFood } from "@/db/schema";
import { macrosToCalories } from "@/lib/utils";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm/sql";
import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import { MealCard } from "./MealCard";

const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
type Meal = (typeof meals)[number];

export function Diary({ day }: { day: string }) {
  const { data: loggedFoods } = useLiveQuery(
    db.query.LoggedFood.findMany({
      where: eq(LoggedFood.day, day),
    }),
    [day]
  );

  const dayMacros = useMemo(() => {
    return loggedFoods?.reduce(
      (acc, curr) => {
        return {
          protein: acc.protein + curr.protein,
          carbs: acc.carbs + curr.carbs,
          fat: acc.fat + curr.fat,
        };
      },
      { protein: 0, carbs: 0, fat: 0 }
    );
  }, [loggedFoods]);

  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row gap-2">
        <Text>
          Total: {macrosToCalories(dayMacros)}
          kcal
        </Text>
      </View>
      <View className="flex flex-row gap-2">
        <Text>Protein: {dayMacros.protein}g</Text>
        <Text>Carbs: {dayMacros.carbs}g</Text>
        <Text>Fat: {dayMacros.fat}g</Text>
      </View>
      {meals.map((meal) => (
        <MealCard
          key={meal}
          mealName={meal}
          day={day}
          loggedFoods={
            loggedFoods?.filter((loggedFood) => loggedFood.mealName === meal) ??
            []
          }
        />
      ))}
    </View>
  );
}
