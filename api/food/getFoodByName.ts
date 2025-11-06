import { db } from "@/db";
import { Food } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getFoodByName(name: string) {
  const food = await db.query.Food.findFirst({
    where: eq(Food.name, name),
  });
  if (!food) {
    return null;
  }
  return food;
}
