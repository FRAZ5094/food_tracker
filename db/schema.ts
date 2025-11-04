import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod/v4";

export const Food = sqliteTable("food", {
  id: integer().primaryKey().notNull(),
  name: text().notNull().unique(),
  // in the units of the serving size
  protein: real().notNull(),
  carbs: real().notNull(),
  fat: real().notNull(),
  // serving size of the food in in the units
  servingSizeValue: real("serving_size_value").notNull(),
  servingSizeUnit: text("serving_size_unit").notNull(),
});

export const CreateFoodSchema = createInsertSchema(Food, {
  name: z.string().min(1),
}).omit({
  id: true,
});

export const LoggedFood = sqliteTable("logged_food", {
  id: integer().primaryKey().notNull(),
  name: text("name").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fat: real("fat").notNull(),
  servingSizeValue: real("serving_size_value").notNull(),
  servingSizeUnit: text("serving_size_unit").notNull(),
  mealId: integer("meal_id")
    .references(() => Meal.id)
    .notNull(),
});

export const Meal = sqliteTable("meal", {
  id: integer().primaryKey().notNull(),
  mealName: text("meal_name").notNull().unique(),
  mealOrder: integer("meal_order").notNull(),
});
