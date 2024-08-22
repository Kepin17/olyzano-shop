import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = (props) => {
  const { children, className = "text-3xl font-bold font-roboto" } = props;
  return <h1 className={className}>{children}</h1>;
};

export default Title;
