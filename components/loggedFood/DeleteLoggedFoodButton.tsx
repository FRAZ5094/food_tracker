import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { db } from "@/db";
import { LoggedFood } from "@/db/schema";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { eq } from "drizzle-orm";
import { Button } from "../ui/button";

export function DeleteLoggedFoodButton({
  loggedFoodId,
}: {
  loggedFoodId: number;
}) {
  const handleDeleteLoggedFood = async (loggedFoodId: number) => {
    await db.delete(LoggedFood).where(eq(LoggedFood.id, loggedFoodId));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0" size="icon">
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this food?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the logged food from this meal.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            onPress={() => handleDeleteLoggedFood(loggedFoodId)}
          >
            <Text>Delete</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
