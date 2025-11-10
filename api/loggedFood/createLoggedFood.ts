import { db } from "@/db";
import { LoggedFood } from "@/db/schema";

export async function createLoggedFood(food: {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  servingSizeValue: number;
  servingSizeUnit: string;
  groupName: string;
  day: string;
}) {
  return await db.insert(LoggedFood).values({
    ...food,
  });
}
