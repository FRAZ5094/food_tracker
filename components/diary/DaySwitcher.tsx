import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function DaySwitcher({
  day,
  onDayChange,
}: {
  day: string;
  onDayChange: (day: string) => void;
}) {
  const handleDayChange = (direction: "previous" | "next") => {
    const newDay = new Date(day);
    console.log("newDay", newDay);
    if (direction === "previous") {
      newDay.setDate(newDay.getDate() - 1);
    } else {
      newDay.setDate(newDay.getDate() + 1);
    }
    onDayChange(newDay.toDateString());
  };

  const isToday = day === new Date().toDateString();

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: -scrollOffset.value }],
  //   };
  // });

  return (
    <Animated.View
      className="flex flex-row items-center gap-1 w-full justify-between p-4"
      // style={animatedStyle}
    >
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
    </Animated.View>
  );
}
