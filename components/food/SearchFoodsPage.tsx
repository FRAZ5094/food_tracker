import { CreateFoodButton } from "@/components/food/CreateFoodButton";
import { FoodCard } from "@/components/food/FoodCard";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useState } from "react";
import { View } from "react-native";
import { OpenScanFoodModalButton } from "./OpenScanFoodModalButton";

export default function SearchFoodsPage({
  onFoodSelected,
}: {
  onFoodSelected?: (foodId: number) => void;
}) {
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
      <View className="flex flex-row gap-2 items-center">
        <Input
          className="flex-1"
          placeholder="Search foods"
          value={search}
          onChangeText={setSearch}
        />
        <OpenScanFoodModalButton />
      </View>
      {filteredFoods?.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          onPress={() => onFoodSelected?.(food.id)}
        />
      ))}
      <CreateFoodButton />
    </View>
  );
}
