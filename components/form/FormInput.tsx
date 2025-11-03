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
}: {
  control: Control<T, any, any>;
  name: Path<T>;
  placeholder?: string;
  label: string;
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
            <Label htmlFor={name}>{label}</Label>
            <Input
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
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
