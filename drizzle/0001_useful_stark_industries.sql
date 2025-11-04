DROP TABLE `meal`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_logged_food` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`protein` real NOT NULL,
	`carbs` real NOT NULL,
	`fat` real NOT NULL,
	`serving_size_value` real NOT NULL,
	`serving_size_unit` text NOT NULL,
	`meal_name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_logged_food`("id", "name", "protein", "carbs", "fat", "serving_size_value", "serving_size_unit", "meal_name") SELECT "id", "name", "protein", "carbs", "fat", "serving_size_value", "serving_size_unit", "meal_name" FROM `logged_food`;--> statement-breakpoint
DROP TABLE `logged_food`;--> statement-breakpoint
ALTER TABLE `__new_logged_food` RENAME TO `logged_food`;--> statement-breakpoint
PRAGMA foreign_keys=ON;