import { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Step4Props {
  carBrands: string[];
  selectedBrands: string[];
  setSelectedBrands: (v: string[]) => void;
  allBrandsSelected: boolean;
  setAllBrandsSelected: (v: boolean) => void;
}

const Step4Brand: FC<Step4Props> = ({
  carBrands,
  selectedBrands,
  setSelectedBrands,
  allBrandsSelected,
  setAllBrandsSelected,
}) => {
  const handleAllBrandsChange = (checked: boolean) => {
    setAllBrandsSelected(checked);
    setSelectedBrands(checked ? carBrands : []);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      const newSelected = [...selectedBrands, brand];
      setSelectedBrands(newSelected);
      if (newSelected.length === carBrands.length) setAllBrandsSelected(true);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
      setAllBrandsSelected(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="font-semibold">Brand</label>

      <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 mb-4">
        <Checkbox
          checked={allBrandsSelected}
          onCheckedChange={handleAllBrandsChange}
          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <label className="text-base font-semibold text-foreground cursor-pointer flex-1">All Brands</label>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
        {carBrands.map((brand) => (
          <div
            key={brand}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onCheckedChange={(c) => handleBrandChange(brand, c as boolean)}
              className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label className="text-sm text-foreground cursor-pointer flex-1">{brand}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step4Brand;