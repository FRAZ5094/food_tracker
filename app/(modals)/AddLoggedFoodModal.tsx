import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { db } from "@/db";
import { Food, LoggedFood } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import z from "zod/v4";

export type AddLoggedFoodModalParams = {
  mealName: string;
  day: string;
  foodId?: string;
};

const LoggedFoodFormSchema = z.object({
  servingSizeValue: z.preprocess(
    (val) => {
      // This handles all cases:
      // - `val` is "1.5" -> `Number("1.5")` -> 1.5
      // - `val` is "1."  -> `Number("1.")`  -> 1
      // - `val` is "."   -> `Number(".")`   -> NaN (will fail validation)
      // - `val` is ""    -> undefined
      // - `val` is undefined -> undefined
      // - `val` is 10 (from setValue/reset) -> 10
      if (typeof val === "number") return val;
      return val === "" || val === undefined ? undefined : Number(val);
    },
    // Add custom error messages for better UX
    z
      .number({
        error: "Must be a valid number",
      })
      .gt(0, "Amount must be greater than 0")
  ),
});

export default function AddLoggedFoodModal() {
  const router = useRouter();
  const params = useLocalSearchParams<AddLoggedFoodModalParams>();

  const { data } = useLiveQuery(
    db.query.Food.findFirst({
      where: eq(Food.id, Number(params.foodId)),
    }),
    [params.foodId]
  );

  const servingUnit = data?.servingSizeUnit;
  const selectedFoodName = data?.name;
  const servingSizeValue = data?.servingSizeValue;

  useEffect(() => {
    if (servingSizeValue) {
      setValue("servingSizeValue", servingSizeValue.toString());
    }
  }, [servingSizeValue]);

  const safeAreaInsets = useSafeAreaInsets();
  const canGoBack = router.canGoBack();
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(LoggedFoodFormSchema),
    shouldUnregister: false,
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (!selectedFoodName || !servingUnit) {
      return;
    }
    const proportionOfServing =
      formData.servingSizeValue / data.servingSizeValue;
    const protein = data.protein * proportionOfServing;
    const carbs = data.carbs * proportionOfServing;
    const fat = data.fat * proportionOfServing;

    await db.insert(LoggedFood).values({
      name: selectedFoodName,
      protein: protein,
      carbs: carbs,
      fat: fat,
      servingSizeValue: formData.servingSizeValue,
      servingSizeUnit: servingUnit,
      mealName: params.mealName,
      day: params.day,
    });
    router.back();
  });

  return (
    <View
      style={{
        padding: 16,
        marginTop: safeAreaInsets.top + 32,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "500",
        }}
      >
        Log food
      </Text>
      <Link
        className="flex border border-gray-200 rounded-md p-2 text-center"
        href={{ pathname: `/(modals)/SelectFoodModal`, params }}
      >
        <Text className="font-medium">{selectedFoodName ?? "Select food"}</Text>
      </Link>
      <FormInput
        control={control}
        name="servingSizeValue"
        label={`Amount ${servingUnit ? `(${servingUnit})` : ""}`}
        keyboardType="decimal-pad"
        disabled={!params.foodId}
      />
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
          onPress={onSubmit}
        >
          <Text>Add</Text>
        </Button>
      </View>
    </View>
  );
}
