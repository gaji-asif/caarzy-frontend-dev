import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Step1Condition from "./Step1Condition";
import Step2Price from "./Step2Price";
import Step3FuelBody from "./Step3FuelBody";
import Step4Brand from "./Step4Brand";
import Step5Mileage from "./Step5Mileage";
import Step6Review from "./Step6Review";
import { useCarBrands } from "@/hooks/useCarBrands";

const fuelTypes = [
  { id: "petrol", label: "Petrol" },
  { id: "diesel", label: "Diesel" },
  { id: "electric", label: "Electric" },
  { id: "hybrid", label: "Hybrid" },
  { id: "cng", label: "CNG" },
  { id: "lpg", label: "LPG" },
];

const bodyTypes = [
  { id: "sedan", label: "Sedan" },
  { id: "hatchback", label: "Hatchback" },
  { id: "suv", label: "SUV" },
  { id: "coupe", label: "Coupe" },
  { id: "van", label: "Van" },
  { id: "truck", label: "Truck" },
];

const FALLBACK_BRANDS: string[] = [];

const STEP_TITLES: Record<number, string> = {
  1: "Select car condition",
  2: "Set your budget",
  3: "Choose fuel & body type",
  4: "Select brand",
  5: "Choose mileage",
  6: "Review your search",
};

const MultiStepSearch: FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [condition, setCondition] = useState<"new" | "used">("used");
  const [priceRange, setPriceRange] = useState<[number, number]>([5000, 50000]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [allBrandsSelected, setAllBrandsSelected] = useState(false);
  const [mileageRange, setMileageRange] = useState("");

  // Use the custom hook to fetch car brands
  const { carBrands, loading: loadingBrands } = useCarBrands();

  const next = () => setStep((s) => Math.min(6, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    const params = new URLSearchParams();
    params.set("condition", condition);
    params.set("minPrice", String(priceRange[0]));
    params.set("maxPrice", String(priceRange[1]));
    if (selectedFuelTypes.length) params.set("fuelType", selectedFuelTypes.join(","));
    if (selectedBodyTypes.length) params.set("bodyType", selectedBodyTypes.join(","));
    if (selectedBrands.length) params.set("brand", selectedBrands.join(","));
    if (mileageRange) params.set("mileage", mileageRange);

    navigate(`/search-results`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-md">
      {/* Step header */}
      <div className="mb-6 space-y-1">
        <p className="text-sm text-muted-foreground">Step {step} of 6</p>
        <h2 className="text-lg font-bold">{STEP_TITLES[step]}</h2>
        <div className="inline-flex items-center gap-2 text-sm mt-1">
          <span className="text-muted-foreground">Condition:</span>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
            {condition === "new" ? "New Car" : "Used Car"}
          </span>
        </div>
      </div>

      {/* Step content */}
      {step === 1 && <Step1Condition condition={condition} setCondition={setCondition} />}
      {step === 2 && <Step2Price priceRange={priceRange} setPriceRange={setPriceRange} />}
      {step === 3 && (
        <Step3FuelBody
          fuelTypes={fuelTypes}
          selectedFuelTypes={selectedFuelTypes}
          setSelectedFuelTypes={setSelectedFuelTypes}
          bodyTypes={bodyTypes}
          selectedBodyTypes={selectedBodyTypes}
          setSelectedBodyTypes={setSelectedBodyTypes}
        />
      )}
      {step === 4 && (
        <>
          {loadingBrands ? (
            <p>Loading brands...</p>
          ) : (
            <Step4Brand
              carBrands={carBrands.length ? carBrands : FALLBACK_BRANDS}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              allBrandsSelected={allBrandsSelected}
              setAllBrandsSelected={setAllBrandsSelected}
            />
          )}
        </>
      )}
      {step === 5 && <Step5Mileage mileageRange={mileageRange} setMileageRange={setMileageRange} />}
      {step === 6 && (
        <Step6Review
          data={{
            condition,
            priceRange,
            selectedFuelTypes,
            selectedBodyTypes,
            selectedBrands,
            mileageRange,
          }}
        />
      )}

      {/* Navigation */}
      <div className="mt-6 flex gap-2">
        {step > 1 && <Button variant="outline" onClick={prev}>Back</Button>}
        {step < 6 && <Button onClick={next} className="ml-auto">Next</Button>}
        {step === 6 && <Button onClick={submit} className="ml-auto">Show Cars</Button>}
      </div>
    </div>
  );
};

export default MultiStepSearch;