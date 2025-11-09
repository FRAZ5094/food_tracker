import { createFood } from "@/api/food/createFood";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { CreateFoodSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function CreateFoodModal() {
  const canGoBack = router.canGoBack();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(CreateFoodSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    await createFood(data);
    router.dismissAll();
  });

  return (
    <View
      style={{
        padding: 16,
        marginTop: 36,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "500",
        }}
      >
        Add a new food
      </Text>
      <FormInput control={control} name="name" label={"Name"} />
      <FormInput
        control={control}
        name="servingSizeValue"
        label="Serving size"
      />
      <FormInput
        control={control}
        name="servingSizeUnit"
        label="Serving units"
      />
      <FormInput control={control} name="protein" label="Protein (g)" />
      <FormInput control={control} name="carbs" label="Carbs (g)" />
      <FormInput control={control} name="fat" label="Fat (g)" />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Button
          style={{
            flex: 1,
          }}
          variant={"secondary"}
          onPress={() => {
            if (canGoBack) {
              router.back();
            } else {
              router.dismissAll();
            }
          }}
        >
          <Text>Cancel</Text>
        </Button>
        <Button
          style={{
            flex: 1,
          }}
          onPress={() => {
            onSubmit();
          }}
        >
          <Text>Save</Text>
        </Button>
      </View>
    </View>
  );
}
