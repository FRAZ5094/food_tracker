import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function ProgressBar({
  valuePercentage,
  color = "#3498DB",
  height = 8,
  borderRadius = 2,
}: {
  valuePercentage: number;
  color?: string;
  height?: number;
  borderRadius?: number;
}) {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(valuePercentage, {
      duration: 500,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuePercentage]);

  const barStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value > 100 ? 100 : animatedProgress.value}%`,
    };
  });

  return (
    <View
      style={{
        height,
        flexGrow: 1,
        backgroundColor: "white",
        borderRadius,
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: color,
            borderRadius,
            height,
            paddingRight: 4,
          },
          barStyle,
        ]}
      >
        {/* <Text
          style={{
            fontSize: 12,
            color: "white",
            textAlign: "right",
            fontWeight: "bold",
            marginVertical: "auto",
            padding: 0,
            textAlignVertical: "top",
            // alignItems: "center",
          }}
        >
          {valuePercentage.toFixed(0)}%
        </Text> */}
      </Animated.View>
    </View>
  );
}
