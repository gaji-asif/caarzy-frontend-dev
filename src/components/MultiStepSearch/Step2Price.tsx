import { FC } from "react";
import { Slider } from "@/components/ui/slider";

interface Step2Props {
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
}

const Step2Price: FC<Step2Props> = ({ priceRange, setPriceRange }) => {
  return (
    <div className="max-w-md mx-auto mb-4">
      <div className="text-center mb-2">
        <h3 className="text-sm font-medium">Set Your Budget</h3>
      </div>
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex justify-between mb-4 text-xs text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          min={0}
          max={100000}
          step={1000}
        />
      </div>
    </div>
  );
};

export default Step2Price;