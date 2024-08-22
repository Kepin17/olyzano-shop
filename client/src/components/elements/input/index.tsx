import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const { type, name, placeholder, className, value, onChange } = props;
  return <input type={type} className={className} id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete="off" />;
};

export default Input;
