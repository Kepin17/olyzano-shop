import React from "react";

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = (props) => {
  const { children, htmlFor } = props;
  return (
    <label htmlFor={htmlFor} className={`font-roboto font-semibold text-md `}>
      {children}
    </label>
  );
};

export default Label;
