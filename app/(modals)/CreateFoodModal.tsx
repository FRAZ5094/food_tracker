import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Button, StyleSheet } from "react-native";

export default function CreateFoodModal() {
  const canGoBack = router.canGoBack();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Button title="Save" onPress={() => {}} />
      <Button
        title="Cancel"
        onPress={() => {
          if (canGoBack) {
            router.back();
          } else {
            router.dismissAll();
          }
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
