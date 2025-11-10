import { db } from "@/db";
import { LoggedFood } from "@/db/schema";
import { macrosToCalories } from "@/lib/utils";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm/sql";
import { useMemo, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";
import { DaySwitcher } from "./DaySwitcher";
import { DiaryHeader } from "./DiaryHeader";
import { GroupCard } from "./MealCard";

const groups = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
type Groups = (typeof groups)[number];

export function Diary() {
  const [day, setDay] = useState(new Date().toDateString());
  const { data: loggedFoods } = useLiveQuery(
    db.query.LoggedFood.findMany({
      where: eq(LoggedFood.day, day),
    }),
    [day]
  );
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(animatedRef);

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

  const scrollViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -scrollOffset.value }],
    };
  });

  return (
    <View>
      <Animated.ScrollView
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        ref={animatedRef}
      >
        <DaySwitcher day={day} setDay={setDay} scrollOffset={scrollOffset} />
        <DiaryHeader
          totalCalories={totalCalories}
          dayMacros={dayMacros}
          scrollOffset={scrollOffset}
        />
        <View className="h-4 w-full" />
        <View className="p-4">
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
    </View>
  );
}
