import { ShoppingCart, Tag, ArrowLeftRight, Key } from "lucide-react";

const actions = [
  {
    title: "Buy",
    description: "Find your perfect ride",
    icon: ShoppingCart,
  },
  {
    title: "Sell",
    description: "Get the best value",
    icon: Tag,
  },
  {
    title: "Trade",
    description: "Swap your vehicle",
    icon: ArrowLeftRight,
  },
  {
    title: "Rent",
    description: "Flexible car rental",
    icon: Key,
  },
];

const ActionBoxes = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Description */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground mb-3">
            What would you like to do today?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Whether you're looking to buy your dream car, sell your current ride, 
            trade for something new, or rent for a trip — we've got you covered.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {actions.map((action, index) => (
            <div
              key={action.title}
              className="action-card flex flex-col items-center text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="icon-circle mb-4">
                <action.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="font-heading font-semibold text-lg md:text-xl text-foreground mb-1">
                {action.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {action.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionBoxes;
