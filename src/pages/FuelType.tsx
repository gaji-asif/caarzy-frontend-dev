import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const fuelTypes = [
  { id: "petrol", label: "Petrol" },
  { id: "diesel", label: "Diesel" },
  { id: "electric", label: "Electric" },
  { id: "hybrid", label: "Hybrid" },
  { id: "cng", label: "CNG" },
  { id: "lpg", label: "LPG" },
];

const FuelType = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prev) => [...prev, id]);
    } else {
      setSelectedTypes((prev) => prev.filter((type) => type !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                What's your car type?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Choose the Fuel type of the car
              </p>
            </div>

            {/* Checkbox Options */}
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-4">
                {fuelTypes.map((fuel) => (
                  <label
                    key={fuel.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <Checkbox
                      id={fuel.id}
                      checked={selectedTypes.includes(fuel.id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(fuel.id, checked as boolean)
                      }
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span className="font-medium text-foreground">
                      {fuel.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate("/price-range")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                Back
              </Button>
              <Button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FuelType;
