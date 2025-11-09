import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: "Diary",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="foods"
        options={{
          title: "Foods",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
