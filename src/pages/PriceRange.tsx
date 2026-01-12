import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const PriceRange = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([5000, 50000]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
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
                Set Your Budget
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Choose your preferred price range
              </p>
            </div>

            {/* Price Range Slider */}
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                {/* Min/Max Labels */}
                <div className="flex justify-between mb-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Min</p>
                    <p className="text-lg md:text-xl font-heading font-bold text-primary">
                      {formatPrice(priceRange[0])}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Max</p>
                    <p className="text-lg md:text-xl font-heading font-bold text-primary">
                      {formatPrice(priceRange[1])}
                    </p>
                  </div>
                </div>

                {/* Dual Slider */}
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={100000}
                  step={1000}
                  className="mb-4"
                />

                {/* Range Labels */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>$100,000</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => navigate("/car-condition")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                Back
              </Button>
              <Button
                onClick={() => navigate("/fuel-type")}
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

export default PriceRange;
