import { CreateFoodButton } from "@/components/food/CreateFoodButton";
import { FoodCard } from "@/components/food/FoodCard";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useState } from "react";
import { View } from "react-native";

export default function TabTwoScreen() {
  const {
    data: foods,
    error,
    updatedAt,
  } = useLiveQuery(db.query.Food.findMany());
  const [search, setSearch] = useState("");

  const filteredFoods = foods?.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <View className="p-4 flex flex-col gap-4">
      <Input
        placeholder="Search foods"
        value={search}
        onChangeText={setSearch}
      />
      {filteredFoods?.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
      <CreateFoodButton />
    </View>
  );
}
