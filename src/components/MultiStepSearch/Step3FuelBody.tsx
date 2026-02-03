import React, { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Step3Props {
  fuelTypes: { id: string; label: string }[];
  selectedFuelTypes: string[];
  setSelectedFuelTypes: React.Dispatch<React.SetStateAction<string[]>>;
  bodyTypes: { id: string; label: string }[];
  selectedBodyTypes: string[];
  setSelectedBodyTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const Step3FuelBody: FC<Step3Props> = ({
  fuelTypes,
  selectedFuelTypes,
  setSelectedFuelTypes,
  bodyTypes,
  selectedBodyTypes,
  setSelectedBodyTypes,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Fuel Type */}
      <div>
        <h4 className="mb-2 font-semibold">Fuel Type</h4>
        <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
          {fuelTypes.map((f) => (
            <div
              key={f.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={selectedFuelTypes.includes(f.id)}
                onCheckedChange={(c) =>
                  setSelectedFuelTypes((p) => (c ? [...p, f.id] : p.filter((x) => x !== f.id)))
                }
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label className="text-sm text-foreground cursor-pointer flex-1">{f.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div>
        <h4 className="mb-2 font-semibold">Body Type</h4>
        <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
          {bodyTypes.map((b) => (
            <div
              key={b.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={selectedBodyTypes.includes(b.id)}
                onCheckedChange={(c) =>
                  setSelectedBodyTypes((p) => (c ? [...p, b.id] : p.filter((x) => x !== b.id)))
                }
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label className="text-sm text-foreground cursor-pointer flex-1">{b.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3FuelBody;