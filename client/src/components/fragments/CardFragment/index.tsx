import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaCity } from "react-icons/fa";

interface CardFragmentProps {
  key: number;
  slidePositionNumber: number;
  children: React.ReactNode;
}

interface cardHeaderProps {
  img: string;
}

interface cardBodyProps {
  children?: React.ReactNode;
  promoPrice: number;
  currentPrice: number;
  discount: number;
}

interface cardFooterProps {
  currentStock: number;
  stock: number;
  rating?: number;
  totalRating?: number;
  isflashsale?: boolean;
  storePlace?: string;
}

type CardFragmentComponent = React.FC<CardFragmentProps> & {
  CardHeader: React.FC<cardHeaderProps>;
  CardBody: React.FC<cardBodyProps>;
  CardFooter: React.FC<cardFooterProps>;
};

const CardFragment: CardFragmentComponent = (props) => {
  const { key, slidePositionNumber, children } = props;

  return (
    <Link to="" key={key}>
      <div
        className="card w-[240px] h-[400px] 2 my-2 mx-2 rounded-lg bg-white shadow-lg overflow-hidden
    transtion-all duration-1000 ease-in-out
  "
        style={{
          transform: `translateX(-${slidePositionNumber}rem)`,
        }}
      >
        {children}
      </div>
    </Link>
  );
};

const CardHeader: React.FC<cardHeaderProps> = (props) => {
  const { img } = props;
  return (
    <div className="header-card w-full h-[220px] overflow-hidden ">
      <img src={img} alt="" width={"100%"} />
    </div>
  );
};

const CardBody: React.FC<cardBodyProps> = (props) => {
  const { children, promoPrice, currentPrice, discount } = props;
  return (
    <div className="body-textbox p-3">
      <div className="body-title w-full h-[50px] overflow-hidden">
        <h3 className="font-roboto font-bold text-[15px]">{children}</h3>
      </div>
      <p>$ {promoPrice} </p>
      <small>
        <s className="text-slate-500">Rp. {currentPrice}</s> <span className="foont-roboto text-[#E88D67] font-bold"> ({discount}% off)</span>
      </small>
    </div>
  );
};

const CardFooter: React.FC<cardFooterProps> = (props) => {
  const { currentStock, stock, rating, totalRating, isflashsale, storePlace } = props;
  return (
    <div className="footer-card px-3 ">
      {isflashsale && (
        <div className={`stockStatusBar-wrapper w-full h-[5px] rounded-md bg-[#F3F7EC] overflow-hidden`}>
          <div className={`statusBar h-full bg-[#E88D67]`} style={{ width: `${(currentStock / stock) * 100}%` }}></div>
        </div>
      )}
      <div>
        {isflashsale ? (
          <p className="text-[13px] font-roboto mt-2">{currentStock > 0 ? `${currentStock <= stock / 2 ? "Almost Sold Out" : "Stock Available"}` : "Sold Out"}</p>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <FaCity />
              <small>{storePlace}</small>
            </div>

            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <small>
                {rating} ({totalRating})
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CardFragment.CardHeader = CardHeader;
CardFragment.CardBody = CardBody;
CardFragment.CardFooter = CardFooter;

export default CardFragment;
