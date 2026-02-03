import { FC } from "react";
import { Car, Sparkles } from "lucide-react";

interface Step1Props {
  condition: "new" | "used";
  setCondition: (c: "new" | "used") => void;
}

const Step1Condition: FC<Step1Props> = ({ condition, setCondition }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      <button
        type="button"
        onClick={() => setCondition("new")}
        className={`action-card group ${
          condition === "new" ? "ring-2 ring-primary bg-primary/5" : ""
        }`}
      >
        <div className="icon-circle mx-auto mb-2">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className={`text-center font-semibold ${condition === "new" ? "text-primary" : "text-foreground"}`}>
          New Car
        </h3>
      </button>

      <button
        type="button"
        onClick={() => setCondition("used")}
        className={`action-card group ${
          condition === "used" ? "ring-2 ring-primary bg-primary/5" : ""
        }`}
      >
        <div className="icon-circle mx-auto mb-2">
          <Car className="w-6 h-6" />
        </div>
        <h3 className={`text-center font-semibold ${condition === "used" ? "text-primary" : "text-foreground"}`}>
          Used Car
        </h3>
      </button>
    </div>
  );
};

export default Step1Condition;