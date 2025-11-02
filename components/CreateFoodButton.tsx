import { Link } from "expo-router";

export function CreateFoodButton() {
  return (
    <Link href="/(modals)/CreateFoodModal" style={{ color: "white" }}>
      Create food
    </Link>
  );
}
