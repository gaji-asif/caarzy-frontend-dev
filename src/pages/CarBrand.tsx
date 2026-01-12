import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const carBrands = [
  "Audi", "BMW", "Mercedes-Benz", "Toyota", "Honda", "Ford",
  "Chevrolet", "Volkswagen", "Nissan", "Hyundai", "Kia", "Mazda",
  "Subaru", "Lexus", "Porsche", "Ferrari", "Lamborghini", "Jaguar",
  "Land Rover", "Volvo", "Tesla", "Jeep", "Dodge", "Ram",
  "Cadillac", "Buick", "GMC", "Chrysler", "Acura", "Infiniti",
  "Lincoln", "Alfa Romeo", "Maserati", "Bentley", "Rolls-Royce", "Aston Martin",
  "McLaren", "Bugatti", "Peugeot", "Renault", "Citroën", "Fiat",
  "Skoda", "Seat", "Mini", "Mitsubishi", "Suzuki", "Isuzu"
];

const CarBrand = () => {
  const navigate = useNavigate();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [allBrandsSelected, setAllBrandsSelected] = useState(false);

  const handleAllBrandsChange = (checked: boolean) => {
    setAllBrandsSelected(checked);
    if (checked) {
      setSelectedBrands(carBrands);
    } else {
      setSelectedBrands([]);
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      const newSelected = [...selectedBrands, brand];
      setSelectedBrands(newSelected);
      if (newSelected.length === carBrands.length) {
        setAllBrandsSelected(true);
      }
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
      setAllBrandsSelected(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              Choose Car Brand
            </h1>
            <p className="text-muted-foreground">
              Select your preferred car brands
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card mb-6">
            {/* All Brands Option */}
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 mb-4">
              <Checkbox
                id="all-brands"
                checked={allBrandsSelected}
                onCheckedChange={handleAllBrandsChange}
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="all-brands"
                className="text-base font-semibold text-foreground cursor-pointer flex-1"
              >
                All Brands
              </label>
            </div>

            {/* Brand Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {carBrands.map((brand) => (
                <div
                  key={brand}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand, checked as boolean)
                    }
                    className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm text-foreground cursor-pointer flex-1"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/fuel-type")}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => navigate("/search-results")}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarBrand;
