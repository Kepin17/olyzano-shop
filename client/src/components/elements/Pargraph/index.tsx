import React from "react";

interface ParagraphProps {
  className?: string;
  children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = (props) => {
  const { className, children } = props;
  return <p className={className}>{children}</p>;
};

export default Paragraph;
