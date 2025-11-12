import { normalizeBarcode } from "./normalizeBarcode";

type ProductResponse = {
  code: string;
  product: {
    product_name: string;
    serving_quantity: number;
    serving_quantity_unit: string;
    serving_size: string;
    nutriments: {
      carbohydrates_100g: number;
      fat_100g: number;
      proteins_100g: number;
    };
  };
};

type ProductData = {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  servingQuantity: number;
  servingQuantityUnit: string;
  servingSize: string;
};

export async function getProductDataFromBarcode(
  barcode: string
): Promise<ProductData> {
  const normalizedBarcode = normalizeBarcode(barcode);
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${normalizedBarcode}?fields=product_name,nutriments,serving_quantity,serving_quantity_unit,serving_size`
  );

  const data = (await response.json()) as ProductResponse;

  return {
    name: data.product.product_name,
    protein: data.product.nutriments.proteins_100g,
    carbs: data.product.nutriments.carbohydrates_100g,
    fat: data.product.nutriments.fat_100g,
    servingQuantity: data.product.serving_quantity,
    servingQuantityUnit: data.product.serving_quantity_unit,
    servingSize: data.product.serving_size,
  };
}
