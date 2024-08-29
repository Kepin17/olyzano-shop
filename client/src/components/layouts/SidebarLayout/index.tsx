import React from "react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SlidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  const { children } = props;
  return <nav className="w-[300px] h-[93vh] overflow-y-scroll bg-white shadow-xl">{children}</nav>;
};

export default SlidebarLayout;
