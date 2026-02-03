import { FC } from "react";

interface Step5Props {
  mileageRange: string;
  setMileageRange: (v: string) => void;
}

const Step5Mileage: FC<Step5Props> = ({ mileageRange, setMileageRange }) => {
  return (
    <div className="space-y-3">
      <label className="font-semibold">Mileage</label>
      <select
        className="w-full p-2 rounded"
        value={mileageRange}
        onChange={(e) => setMileageRange(e.target.value)}
      >
        <option value="">Any mileage</option>
        <option value="<20000">&lt; 20,000 km</option>
        <option value="20000-50000">20k – 50k km</option>
        <option value=">50000">&gt; 50,000 km</option>
      </select>
    </div>
  );
};

export default Step5Mileage;