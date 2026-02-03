import apiClient from "./api";

export const fetchCarBrands = async (token?: string): Promise<string[]> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const res = await apiClient.get("api/all-car-models", { headers });

    const data = res.data;
    let brands: string[] = [];

    if (Array.isArray(data?.data)) {
      brands = data.data.map((item: any) => String(item.name));
    } else if (Array.isArray(data?.brands)) {
      brands = data.brands.map(String);
    } else if (Array.isArray(data)) {
      brands = data.map(String);
    }

    return brands;
  } catch (err) {
    console.error("Error fetching car brands:", err);
    throw err;
  }
};