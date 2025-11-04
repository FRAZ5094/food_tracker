import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Text } from "../ui/text";

export function FormInput<T extends FieldValues>({
  control,
  name,
  placeholder = "",
  label,
  type = "text",
}: {
  control: Control<T, any, any>;
  name: Path<T>;
  placeholder?: string;
  label: string;
  type?: "text" | "number";
}) {
  return (
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
          <View className="gap-2">
            <Label tabIndex={-1} htmlFor={name}>
              {label}
            </Label>
            <Input
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={(text) => {
                if (type === "number") {
                  onChange(Number(text));
                } else {
                  onChange(text);
                }
              }}
              value={value}
              keyboardType={type === "number" ? "decimal-pad" : "default"}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              opacity: error ? 100 : 0,
            }}
            className="text-destructive"
          >
            {error?.message ?? "a"}
          </Text>
        </>
      )}
      name={name}
    />
  );
}
