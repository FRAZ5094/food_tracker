import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const food = sqliteTable("food", {
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

export const loggedFood = sqliteTable("logged_food", {
  id: integer().primaryKey().notNull(),
  loggedName: text("logged_name").notNull(),
  loggedProtein: real("logged_protein").notNull(),
  loggedCarbs: real("logged_carbs").notNull(),
  loggedFat: real("logged_fat").notNull(),
  loggedServingSizeValue: real("logged_serving_size_value").notNull(),
  loggedServingSizeUnit: text("logged_serving_size_unit").notNull(),
  mealId: integer("meal_id")
    .references(() => meal.id)
    .notNull(),
});

export const meal = sqliteTable("meal", {
  id: integer().primaryKey().notNull(),
  mealName: text("meal_name").notNull().unique(),
  mealOrder: integer("meal_order").notNull(),
});
