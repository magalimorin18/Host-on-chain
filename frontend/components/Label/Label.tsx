import React from "react";

interface Props {
  label: string;
}

const Label: React.FC<Props> = ({ label }) => {
  return (
    <label
      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
      htmlFor="inline-full-name"
    >
      {label}
    </label>
  );
};

export default Label;
