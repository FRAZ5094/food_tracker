import Animated, { SharedValue, useAnimatedRef } from "react-native-reanimated";
import {
  CARBS_COLOR,
  FAT_COLOR,
  PROTEIN_COLOR,
} from "../food/MacrosBreakdownChart";
import { GoalProgressBar } from "./GoalProgressBar";

const proteinGoal = 170;
const carbsGoal = 200;
const fatGoal = 50;
const totalCaloriesGoal = 2200;

export function DiaryHeader({
  totalCalories,
  dayMacros,
  scrollOffset,
}: {
  totalCalories: number;
  dayMacros: { protein: number; carbs: number; fat: number };
  scrollOffset: SharedValue<number>;
}) {
  const aref = useAnimatedRef();

  //   const headerHeight = useDerivedValue(() => {
  //     const measured = measure(aref);
  //     return measured?.height ?? 0;
  //   });
  const daySwitcherHeight = 72;
  // const stylez = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: Math.max(scrollOffset.value - daySwitcherHeight, 0),
  //       },
  //     ],
  //   };
  // });
  return (
    <Animated.View
      ref={aref}
      className="flex flex-col gap-2 z-10 rounded-b-md bg-white p-4 shadow-lg"
      // style={stylez}
    >
      <GoalProgressBar
        title="Calories"
        goal={totalCaloriesGoal}
        value={totalCalories}
        color="#3498DB"
        units="kcal"
      />
      <GoalProgressBar
        title="Protein"
        goal={proteinGoal}
        value={dayMacros.protein}
        color={PROTEIN_COLOR}
      />
      <GoalProgressBar
        title="Carbs"
        goal={carbsGoal}
        value={dayMacros.carbs}
        color={CARBS_COLOR}
      />
      <GoalProgressBar
        title="Fat"
        goal={fatGoal}
        value={dayMacros.fat}
        color={FAT_COLOR}
      />
    </Animated.View>
  );
}
