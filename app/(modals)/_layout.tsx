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
      <Stack.Screen
        name="SelectFoodModal"
        options={{
          presentation: "formSheet",
          headerShown: true,
          title: "Select food",
        }}
      />
      <Stack.Screen
        name="ScanFoodModal"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Scan barcode",
        }}
      />
    </Stack>
  );
}
