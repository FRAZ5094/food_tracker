import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Text } from "../ui/text";

export function InputFoodBarcodeDialog({
  onBarcodeEntered,
}: {
  onBarcodeEntered: (barcode: string) => void;
}) {
  const [barcode, setBarcode] = useState("");

  const onSubmit = async () => {
    onBarcodeEntered(barcode);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Text>Enter barcode manually</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter barcode</DialogTitle>
          <DialogDescription>
            Enter the barcode of the food you want to add.
          </DialogDescription>
        </DialogHeader>
        <View className="grid gap-4">
          <View className="grid gap-3">
            <Label htmlFor="barcode">Barcode</Label>
            <Input
              id="barcode"
              keyboardType="numeric"
              value={barcode}
              onChangeText={setBarcode}
            />
          </View>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onPress={onSubmit}>
            <Text>Add food</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
