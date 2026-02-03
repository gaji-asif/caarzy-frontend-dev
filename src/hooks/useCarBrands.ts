import { useState, useEffect } from "react";
import { fetchCarBrands } from "@/services/carService";
import { useToast } from "@/hooks/use-toast";

export const useCarBrands = () => {
  const [carBrands, setCarBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const token = localStorage.getItem("authToken");

    fetchCarBrands(token)
      .then((brands) => {
        if (!mounted) return;
        if (brands.length === 0) {
          setCarBrands([]);
        } else {
          setCarBrands(brands);
        }
      })
      .catch(() => {
        toast({
          title: "Could not load brands",
          description: "Using default brand list.",
          variant: "destructive",
        });
        if (mounted) setCarBrands([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [toast]);

  return { carBrands, loading };
};