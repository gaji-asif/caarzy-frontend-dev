import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Heart, Fuel, Gauge, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CarListing {
  id: number;
  name: string;
  description: string;
  image: string;
  mileage: string;
  price: number;
  vat: string;
  fuelType: string;
  year: number;
}

const sampleCars: CarListing[] = [
  {
    id: 1,
    name: "BMW 3 Series 320i",
    description: "Luxury sedan with premium features, leather interior, and advanced safety systems.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop",
    mileage: "45,000 km",
    price: 35990,
    vat: "VAT Included",
    fuelType: "Hybrid",
    year: 2022,
  },
  {
    id: 2,
    name: "Mercedes-Benz C-Class",
    description: "Elegant design with cutting-edge technology, panoramic sunroof, and premium sound system.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop",
    mileage: "32,500 km",
    price: 42500,
    vat: "VAT Included",
    fuelType: "Petrol",
    year: 2023,
  },
  {
    id: 3,
    name: "Tesla Model 3",
    description: "Full electric vehicle with autopilot, long range battery, and minimalist interior design.",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop",
    mileage: "28,000 km",
    price: 38750,
    vat: "VAT Included",
    fuelType: "Electric",
    year: 2023,
  },
  {
    id: 4,
    name: "Audi A4 Quattro",
    description: "All-wheel drive performance with virtual cockpit, Matrix LED headlights, and sport suspension.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
    mileage: "51,200 km",
    price: 33200,
    vat: "VAT Included",
    fuelType: "Diesel",
    year: 2021,
  },
];

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState<number[]>([]);

  // Read query params and filter sample data
  const params = new URLSearchParams(location.search);
  const qFuel = params.get("fuelType") || "";
  const qFuelList = qFuel ? qFuel.split(",").map((s) => s.toLowerCase()) : [];
  const qBody = params.get("bodyType") || "";
  const qBodyList = qBody ? qBody.split(",").map((s) => s.toLowerCase()) : [];
  const qBrand = params.get("brand") || "";
  const qMin = params.get("minPrice");
  const qMax = params.get("maxPrice");
  const qMileage = params.get("mileage") || "";

  const parseMileageNumber = (m?: string) => {
    if (!m) return 0;
    const digits = m.replace(/[^0-9]/g, "");
    return parseInt(digits || "0", 10);
  };

  const filteredCars = sampleCars.filter((car) => {
    // fuel filter
    if (qFuelList.length && !qFuelList.includes(car.fuelType.toLowerCase())) return false;

    // brand filter (match by name)
    if (qBrand && !car.name.toLowerCase().includes(qBrand.toLowerCase())) return false;

    // price filter
    const min = qMin ? parseInt(qMin, 10) : undefined;
    const max = qMax ? parseInt(qMax, 10) : undefined;
    if (min !== undefined && car.price < min) return false;
    if (max !== undefined && car.price > max) return false;

    // body filter (only if car has bodyType property)
    if (qBodyList.length && (car as any).bodyType) {
      const carBody = ((car as any).bodyType || "").toLowerCase();
      if (!qBodyList.includes(carBody)) return false;
    }

    // mileage filter
    if (qMileage) {
      const carMileage = parseMileageNumber(car.mileage);
      if (qMileage === "<20000" && !(carMileage < 20000)) return false;
      if (qMileage === "20000-50000" && !(carMileage >= 20000 && carMileage <= 50000)) return false;
      if (qMileage === ">50000" && !(carMileage > 50000)) return false;
    }

    return true;
  });

  const toggleFavorite = (carId: number) => {
    setFavorites((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              Search Results
            </h1>
            <p className="text-muted-foreground">
              Found {filteredCars.length} cars matching your criteria
            </p>
          </div>

          {/* Car Listings */}
          <div className="space-y-4 mb-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-card rounded-xl shadow-card overflow-hidden flex flex-col md:flex-row"
              >
                {/* Car Image */}
                <div className="relative w-full md:w-48 lg:w-56 flex-shrink-0">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(car.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-transform hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(car.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Car Details */}
                <div className="flex-1 p-4 md:p-5">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-3">
                      <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                        {car.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {car.description}
                      </p>
                    </div>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Gauge className="w-4 h-4 text-primary" />
                        <span>{car.mileage}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Fuel className="w-4 h-4 text-primary" />
                        <span className="text-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {car.fuelType}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-heading font-bold text-primary">
                          €{car.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {car.vat}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <Button
            onClick={() => navigate("/multi-search")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Multi Search
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
