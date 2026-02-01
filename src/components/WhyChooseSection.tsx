import { ShieldCheck, BadgeDollarSign, Handshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Listings",
    subtitle: "Verified & Secure",
    description:
      "Verified cars from reliable sellers",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Value Deals",
    subtitle: "Competitive Pricing",
    description:
      "Competitive & Dynamic pricing for buyers and sellers.",
  },
  {
    icon: Handshake,
    title: "Seamless Transactions",
    subtitle: "Easy & Fast",
    description:
      "Secure payments and hassle free processes.",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-10 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            Why Choose{" "}
            <span className="text-foreground">Caa</span>
            <span className="text-primary">rzy</span>?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            The smarter way to buy, sell, trade, and rent cars
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="icon-circle mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg md:text-xl text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-3">
                {feature.subtitle}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
