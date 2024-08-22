import "./Home.css";
import HeaderSection from "./HeaderSection";
import FlashsaleSection from "./Flashsale";
import ProductSection from "./ProductSection";
import HomeNavigation from "./HomeNavigation";
import CategorySection from "./CategorySection";
import NavbarFragment from "../../../fragments/NavbarFragment";

const HomePage = () => {
  return (
    <>
      <NavbarFragment>
        <HeaderSection />
        <HomeNavigation />
        <CategorySection />
        <FlashsaleSection />
        <ProductSection />
      </NavbarFragment>
    </>
  );
};

export default HomePage;
