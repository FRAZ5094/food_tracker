import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Text } from "../ui/text";

const PROTEIN_COLOR = "#2ECC71";
const CARBS_COLOR = "#E74C3C";
const FAT_COLOR = "#F1C40F";

export function MacrosBreakdownChart({
  macros,
}: {
  macros: { protein: number; carbs: number; fat: number };
}) {
  const renderLegend = (text: string, value: number, color: string) => {
    return (
      <View className="flex flex-row items-center gap-1 mr-2">
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 999,
            backgroundColor: color || "white",
          }}
        />
        <Text style={{ color: "black", fontSize: 12 }}>
          {text || ""}: {value.toFixed(0)}%
        </Text>
      </View>
    );
  };

  const radius = 32;
  const circleThickness = 16;
  const innerRadius = radius - circleThickness;

  const total = macros.protein + macros.carbs + macros.fat;
  const proteinPercentage = (macros.protein / total) * 100;
  const carbsPercentage = (macros.carbs / total) * 100;
  const fatPercentage = (macros.fat / total) * 100;

  return (
    <View>
      <View className="flex flex-row items-center  gap-4">
        <View className="flex flex-col items-start">
          {renderLegend("Protein", proteinPercentage, PROTEIN_COLOR)}
          {renderLegend("Carbs", carbsPercentage, CARBS_COLOR)}
          {renderLegend("Fat", fatPercentage, FAT_COLOR)}
        </View>
        <PieChart
          radius={radius}
          innerRadius={innerRadius}
          strokeColor="white"
          strokeWidth={4}
          donut
          data={[
            { value: macros.protein, color: PROTEIN_COLOR },
            { value: macros.carbs, color: CARBS_COLOR },
            { value: macros.fat, color: FAT_COLOR },
          ]}
          showValuesAsLabels={true}
          showText
          textColor="transparent"
          //   showTextBackground={true}
          //   centerLabelComponent={() => {
          //     return (
          //       <View className="flex flex-col items-center justify-center">
          //         <Text className="text-base font-medium">
          //           {macrosToCalories(macros)}
          //         </Text>
          //         <Text className="text-sm text-gray-500">kcal/100g</Text>
          //       </View>
          //     );
          //   }}
        />
      </View>
    </View>
  );
}
