import SearchFoodsPage from "@/components/food/SearchFoodsPage";
import { router, useLocalSearchParams } from "expo-router";

export default function SelectFoodModal() {
  //Getting existing params and adding to new params
  const params = useLocalSearchParams();

  const onFoodSelected = (foodId: number) => {
    router.dismissTo({
      pathname: "/(modals)/AddLoggedFoodModal",
      params: { ...params, foodId: foodId.toString() },
    });
  };

  return <SearchFoodsPage onFoodSelected={onFoodSelected} />;
}
