import { Diary } from "@/components/diary/Diary";
import { useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const [day, setDay] = useState(new Date().toDateString());
  return (
    <View className="p-4 flex flex-col gap-4">
      <Diary day={day} />
    </View>
  );
}
