import { Link } from "expo-router";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function CreateFoodButton() {
  return (
    <Link href="/(modals)/CreateFoodModal" asChild>
      <Button variant="default" className="w-full">
        <Text>Add food</Text>
      </Button>
    </Link>
  );
}
