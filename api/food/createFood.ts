import { db } from "@/db";
import { Food } from "@/db/schema";

export function createFood(food: {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  servingSizeValue: number;
  servingSizeUnit: string;
}) {
  const roundedFood = {
    ...food,
    protein: Number(food.protein.toFixed(1)),
    carbs: Number(food.carbs.toFixed(1)),
    fat: Number(food.fat.toFixed(1)),
  };

  return db.insert(Food).values(roundedFood).returning();
}
