import { FC } from "react";

interface Step6Props {
  data: any;
}

const Step6Review: FC<Step6Props> = ({ data }) => {
  return (
    <pre className="text-sm bg-muted p-4 rounded">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default Step6Review;