import { useNavigate } from "react-router-dom";
import { Car, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const CarCondition = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: "new",
      title: "New Car",
      icon: Sparkles,
      path: "/price-range",
    },
    {
      id: "used",
      title: "Used Car",
      icon: Car,
      path: "/price-range",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Are you looking for a
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto mb-8">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => navigate(option.path)}
                  className="action-card group cursor-pointer"
                >
                  <div className="icon-circle mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <option.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="font-heading font-semibold text-base md:text-lg text-foreground">
                    {option.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                Back
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarCondition;
