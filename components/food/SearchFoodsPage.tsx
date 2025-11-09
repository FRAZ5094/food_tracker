import { FoodCard } from "@/components/food/FoodCard";
import { db } from "@/db";
import { FlashList } from "@shopify/flash-list";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { Input } from "../ui/input";
import { OpenScanFoodModalButton } from "./OpenScanFoodModalButton";

export default function SearchFoodsPage({
  onFoodSelected,
}: {
  onFoodSelected?: (foodId: number) => void;
}) {
  const { data: foods } = useLiveQuery(db.query.Food.findMany());
  const [search, setSearch] = useState("");

  // const testFoods = useMemo(
  //   () =>
  //     Array.from({ length: 100 }, (_, index) => ({
  //       id: index,
  //       name: `Food ${index + 1}`,
  //       protein: Math.random() * 100,
  //       carbs: Math.random() * 100,
  //       fat: Math.random() * 100,
  //     })),
  //   []
  // );

  const filteredFoods = useMemo(
    () =>
      foods?.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, foods]
  );

  const listHeader = useMemo(
    () => (
      <View className="flex flex-row items-center mb-4">
        <Input
          className="flex-1"
          placeholder="Search foods"
          value={search}
          onChangeText={setSearch}
        />
        <OpenScanFoodModalButton />
      </View>
    ),
    [search]
  );

  return (
    <FlashList
      data={filteredFoods}
      ListHeaderComponent={listHeader}
      contentContainerClassName="p-4"
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderItem={({ item }) => (
        <FoodCard
          key={item.id}
          food={item}
          onPress={() => onFoodSelected?.(item.id)}
        />
      )}
    />
    // </View>
  );
}
