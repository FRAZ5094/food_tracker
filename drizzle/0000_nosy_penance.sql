CREATE TABLE `food` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`protein` real NOT NULL,
	`carbs` real NOT NULL,
	`fat` real NOT NULL,
	`serving_size_value` real NOT NULL,
	`serving_size_unit` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `food_name_unique` ON `food` (`name`);--> statement-breakpoint
CREATE TABLE `logged_food` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`protein` real NOT NULL,
	`carbs` real NOT NULL,
	`fat` real NOT NULL,
	`serving_size_value` real NOT NULL,
	`serving_size_unit` text NOT NULL,
	`meal_id` integer NOT NULL,
	FOREIGN KEY (`meal_id`) REFERENCES `meal`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `meal` (
	`id` integer PRIMARY KEY NOT NULL,
	`meal_name` text NOT NULL,
	`meal_order` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `meal_meal_name_unique` ON `meal` (`meal_name`);