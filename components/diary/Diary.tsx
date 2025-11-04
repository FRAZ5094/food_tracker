import { db } from "@/db";
import { LoggedFood } from "@/db/schema";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm/sql";
import { View } from "react-native";
import { MealCard } from "./MealCard";

const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
type Meal = (typeof meals)[number];

export function Diary({ day }: { day: string }) {
  const { data: loggedFood } = useLiveQuery(
    db.query.LoggedFood.findMany({
      where: eq(LoggedFood.day, day),
    })
  );
  return (
    <View className="flex flex-col gap-2">
      {meals.map((meal) => (
        <MealCard
          key={meal}
          mealName={meal}
          day={day}
          loggedFoods={
            loggedFood?.filter((loggedFood) => loggedFood.mealName === meal) ??
            []
          }
        />
      ))}
    </View>
  );
}
