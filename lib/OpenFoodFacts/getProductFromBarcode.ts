import { normalizeBarcode } from "./normalizeBarcode";

type ProductResponse = {
  code: string;
  product: {
    product_name: string;
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
};

export async function getProductDataFromBarcode(
  barcode: string
): Promise<ProductData> {
  const normalizedBarcode = normalizeBarcode(barcode);
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${normalizedBarcode}?fields=product_name,nutriments`
  );
  const data = (await response.json()) as ProductResponse;
  return {
    name: data.product.product_name,
    protein: data.product.nutriments.proteins_100g,
    carbs: data.product.nutriments.carbohydrates_100g,
    fat: data.product.nutriments.fat_100g,
  };
}
