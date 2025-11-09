import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function DaySwitcher({
  day,
  setDay,
}: {
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleDayChange = (direction: "previous" | "next") =>
    setDay((day) => {
      const newDay = new Date(day);
      if (direction === "previous") {
        newDay.setDate(newDay.getDate() - 1);
      } else {
        newDay.setDate(newDay.getDate() + 1);
      }
      return newDay.toDateString();
    });

  const isToday = day === new Date().toDateString();

  return (
    <View className="flex flex-row items-center gap-1 w-full justify-between">
      <Button
        variant={"outline"}
        size={"icon"}
        onPress={() => handleDayChange("previous")}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={24}
          color="black"
          onPress={() => handleDayChange("previous")}
        />
      </Button>
      <Text className="text-xl font-medium">{isToday ? "Today" : day}</Text>
      <Button
        variant={"outline"}
        size={"icon"}
        onPress={() => handleDayChange("next")}
      >
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="black"
          onPress={() => handleDayChange("next")}
        />
      </Button>
    </View>
  );
}
