import Animated, { useAnimatedRef } from "react-native-reanimated";
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
}: {
  totalCalories: number;
  dayMacros: { protein: number; carbs: number; fat: number };
}) {
  const aref = useAnimatedRef();
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
