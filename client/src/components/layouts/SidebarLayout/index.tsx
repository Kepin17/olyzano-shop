import React from "react";
import sidebarStyle from "./sidebar.module.css";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SlidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  const { children } = props;
  return <nav className={sidebarStyle.sidebar}>{children}</nav>;
};

export default SlidebarLayout;
