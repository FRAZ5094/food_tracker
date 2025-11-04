import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="CreateFoodModal"
        options={{
          presentation: "formSheet",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddLoggedFoodModal"
        options={{
          presentation: "formSheet",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
