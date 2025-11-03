import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { db } from "@/db";
import { CreateFoodSchema, Food } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput } from "react-native";

export default function CreateFoodModal() {
  const canGoBack = router.canGoBack();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(CreateFoodSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await db.insert(Food).values(data).returning();
    console.log(res);
  });

  console.log(errors.name);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {error && <ThemedText>{error.message}</ThemedText>}
          </>
        )}
        name="name"
      />
      <Button
        title="Save"
        onPress={() => {
          console.log("onSubmit");
          onSubmit();
        }}
      />
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
