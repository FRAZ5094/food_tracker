import { db } from "@/db";
import { LoggedFood } from "@/db/schema";
import { eq, sum } from "drizzle-orm";

type MacrosOfDay = {
  protein: number;
  carbs: number;
  fat: number;
};

export const getMacrosOfDay = (day: string) =>
  db
    .select({
      protein: sum(LoggedFood.protein),
      carbs: sum(LoggedFood.carbs),
      fat: sum(LoggedFood.fat),
    })
    .from(LoggedFood)
    .groupBy(LoggedFood.day)
    .where(eq(LoggedFood.day, day));
