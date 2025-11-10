import { db } from "@/db";
import { LoggedFood } from "@/db/schema";
import { macrosToCalories } from "@/lib/utils";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm/sql";
import { useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import Animated from "react-native-reanimated";
import { DaySwitcher } from "./DaySwitcher";
import { DiaryHeader } from "./DiaryHeader";
import { GroupCard } from "./GroupCard";

const groups = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
type Groups = (typeof groups)[number];

export function Diary() {
  const today = new Date();
  // const [day, setDay] = useState(new Date().toDateString());
  const [page, setPage] = useState(0);

  const day = useMemo(() => {
    return new Date(today.setDate(today.getDate() + page)).toDateString();
  }, [page]);

  const flatListRef = useRef<FlatList>(null);

  console.log(page);

  const onDayChange = (day: string) => {
    const newPage = page + 1;
    // console.log(day);
    // const newOffset = new Date(day).getDate() - today.getDate();
    // console.log(newOffset);
    // setPage(newOffset);
    console.log(newPage);
    setPage(newPage);
    flatListRef.current?.scrollToIndex({ index: newPage, animated: true });
  };

  const offsets = useMemo(
    () => Array.from({ length: 10 }, (_, index) => index),
    []
  );

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={offsets}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        renderItem={({ item }) => (
          <DiaryBody day={day} onDayChange={onDayChange} />
        )}
      />
    </>
  );
}

function DiaryBody({
  day,
  onDayChange,
}: {
  day: string;
  onDayChange: (day: string) => void;
}) {
  console.log("rendering diary body");
  const { data: loggedFoods } = useLiveQuery(
    db.query.LoggedFood.findMany({
      where: eq(LoggedFood.day, day),
    }),
    [day]
  );
  const dayMacros = useMemo(() => {
    return loggedFoods?.reduce(
      (acc, curr) => {
        return {
          protein: acc.protein + curr.protein,
          carbs: acc.carbs + curr.carbs,
          fat: acc.fat + curr.fat,
        };
      },
      { protein: 0, carbs: 0, fat: 0 }
    );
  }, [loggedFoods]);

  const totalCalories = useMemo(() => {
    return macrosToCalories(dayMacros);
  }, [dayMacros]);
  return (
    <Animated.ScrollView
      stickyHeaderIndices={[1]}
      scrollEventThrottle={16}
      overScrollMode={"never"}
      contentContainerClassName={"w-screen"}
      // stickyHeaderHiddenOnScroll={true}
    >
      <DaySwitcher day={day} onDayChange={onDayChange} />
      <DiaryHeader totalCalories={totalCalories} dayMacros={dayMacros} />
      <View className="h-4 w-full" />
      <View className="p-4 gap-1">
        {groups.map((group) => (
          <GroupCard
            key={group}
            groupName={group}
            day={day}
            loggedFoods={
              loggedFoods?.filter(
                (loggedFood) => loggedFood.groupName === group
              ) ?? []
            }
          />
        ))}
      </View>
    </Animated.ScrollView>
  );
}
