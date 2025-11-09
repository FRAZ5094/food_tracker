import Animated from "react-native-reanimated";
import { ProgressBar } from "../ProgressBar";
import { Text } from "../ui/text";

export function GoalProgressBar({
  title,
  goal,
  value,
  color,
  units = "g",
}: {
  title: string;
  goal: number;
  value: number;
  color: string;
  units?: string;
}) {
  return (
    <Animated.View className="flex flex-col gap-0">
      <Animated.View className="flex flex-row gap-2 justify-between">
        <Text className="text-base font-medium">
          {title}: {value.toFixed(0)}
          {units}
        </Text>
        <Text className="text-sm text-gray-500">
          {goal.toFixed(0)}
          {units}
        </Text>
      </Animated.View>
      <ProgressBar valuePercentage={(value / goal) * 100} color={color} />
    </Animated.View>
  );
}
