import { View } from "react-native";
import { ProgressBar } from "../ProgressBar";
import { Text } from "../ui/text";

export function GoalProgressBar({
  goal,
  value,
  color,
  units = "g",
}: {
  goal: number;
  value: number;
  color: string;
  units?: string;
}) {
  const text = `${value.toFixed(0)}/${goal.toFixed(0)}`;
  return (
    <View className="flex flex-row gap-2">
      <ProgressBar valuePercentage={(value / goal) * 100} color={color} />
      <Text className="text-base font-medium text-right w-20">{text}</Text>
    </View>
  );
}
