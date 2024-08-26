import { useEffect, useState } from "react";
import Title from "../../elements/Title";
import { Link, useNavigate } from "react-router-dom";
import { FaBasketShopping } from "react-icons/fa6";
import { FaBell, FaSearch } from "react-icons/fa";
import Input from "../../elements/input";
import Button from "../../elements/Button";
import { MdHourglassEmpty } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";

interface NavbarFragmentProps {
  children: React.ReactNode;
}
const NavbarFragment: React.FC<NavbarFragmentProps> = (props) => {
  const { children } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [showBasketDropdown, setShowBasketDropdown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [dropDownProfile, setDropDownProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = localStorage.getItem("user") || "{}";
    const user = JSON.parse(getUser);
    if (user.data) {
      setToken(user.data.token);
      setUsername(user.data.username);
      setRole(user.data.role);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolling(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showDropdownHandler = () => {
    setShowDropdown(true);
    setShowBasketDropdown(false);
  };

  const showBasketDropdownHandler = () => {
    setShowBasketDropdown(true);
    setShowDropdown(false);
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout success" + response.data);
      localStorage.removeItem("user");

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav
        className={`w-full h-[100px] bg-[${isScrolling ? "#ffff" : "transparent"}] ${isScrolling ? "shadow-lg" : ""} flex items-center justify-between p-10 z-30 fixed top-0
      transition-all duration-300
    `}
      >
        <div className="w-full flex gap-2  items-center">
          <Link to={"/"} className="w-[250px]">
            <Title className=" text-[#E88D67] font-roboto text-2xl font-bold">Olyzano Mall</Title>
          </Link>
          <div className="w-full h-[40px] flex items-center gap-2 bg-white border-2 p-2 rounded-md">
            <FaSearch />
            <Input type="text" name="search" placeholder="Search" className="w-full focus:outline-none bg-transparent"></Input>
          </div>
        </div>
        <div className="flex w-[500px] mx-4 gap-5">
          <ul className="navbar flex items-center gap-5">
            <li className="relative">
              <span className="font-bold font-roboto cursor-pointer" onMouseEnter={showDropdownHandler}>
                About
              </span>
              <div
                className={`dropdown-wrapper w-[200px] h-auto absolute top-6 bg-[#ffff] rounded-md shadow-lg
            transtition-all duration-300 ease-in-out ${showDropdown ? "opacity-100 scale-100" : "opacity-0 scale-0"}
            `}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="dropdown flex flex-col p-2 font-roboto font-semi-bold text-slate-800">
                  <Link to={""} className="hover:text-[#E88D67]">
                    Abous Us
                  </Link>
                  <Link to={""} className="hover:text-[#E88D67]">
                    Partner
                  </Link>
                  <Link to={""} className="hover:text-[#E88D67]">
                    Carrier
                  </Link>
                  <Link to={""} className="hover:text-[#E88D67]">
                    Event
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link to={""} className="relative">
                <FaBasketShopping className="text-black text-2xl" onMouseEnter={showBasketDropdownHandler} />
                <div
                  className="circle-count absolute -bottom-1 -right-1 w-[15px] h-[15px] rounded-full bg-[#E88D67] text-white text-xs flex items-center justify-center
              font-bold
              "
                >
                  0
                </div>
                <div
                  className={`basket-dropdown w-[200px] h-[200px] border-2 absolute top-6 bg-[#ffff] rounded-md shadow-lg 
               flex flex-col items-center justify-center gap-2 transition-all duration-200 ease-in-out ${showBasketDropdown ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                  onMouseLeave={() => setShowBasketDropdown(false)}
                >
                  <div className="textbox p-2 font-roboto font-semi-bold text-slate-800 text-center">
                    <MdHourglassEmpty className="text-5xl m-auto mb-4" />
                    <p className="text-[#E88D67] text-xl font-bold">Cart is empty</p>
                    <p>Please add some items</p>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to={""}>
                <FaBell className="text-black text-2xl" />
              </Link>
            </li>
          </ul>
          {token === "" ? (
            <>
              <Button
                type="button"
                className="w-full h-10 rounded-md bg-[#E88D67] text-white font-roboto font-bold"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                type="button"
                className="w-full h-10 rounded-md bg-[#201E43] text-white font-roboto font-bold"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <div
                className="flex gap-2 items-center cursor-pointer font-roboto relative"
                onMouseEnter={() => {
                  setDropDownProfile(!dropDownProfile);
                }}
                onMouseLeave={() => {
                  setDropDownProfile(false);
                }}
              >
                <p>Hi, {username}</p>
                <IoIosArrowUp
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    transform: dropDownProfile ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                <div
                  className="dropdown border-2 w-[200px] absolute top-6 flex flex-col items-start bg-white rounded-md shadow-lg p-3 font-roboto transition-all duration-300 ease-in-out"
                  style={{
                    opacity: dropDownProfile ? 1 : 0,
                  }}
                >
                  <button className="hover:text-[#E88D67]">Profile</button>
                  <button className="hover:text-[#E88D67]" onClick={logoutHandler}>
                    Logout
                  </button>
                  <button className="hover:text-[#E88D67]">Shipping Status</button>
                  {role === "admin" || (role === "super admin" && <button className="hover:text-[#E88D67]">Admin Dashboard</button>)}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
      {children}

      <footer>
        <small>© 2022 Olyzano Mall</small>
      </footer>
    </>
  );
};

export default NavbarFragment;
