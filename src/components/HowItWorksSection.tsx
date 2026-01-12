const steps = [
  {
    step: 1,
    title: "Browse or List Cars",
    description: "Explore verified listings",
  },
  {
    step: 2,
    title: "Connect with Buyers or Sellers",
    description: "Chat securely in-app",
  },
  {
    step: 3,
    title: "Seal the Deal",
    description: "Complete transactions quickly. Secure payments and no hidden fees.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            How It Works
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Get started in 3 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="feature-card group text-center"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold font-heading group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              <h3 className="font-heading font-semibold text-lg md:text-xl text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
