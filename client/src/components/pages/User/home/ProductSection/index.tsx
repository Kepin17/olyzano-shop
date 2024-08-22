import Button from "../../../../elements/Button";

const ProductSection = () => {
    return (
        <div className="product-section-wrapper w-full h-screen p-10">
            <div className="recomended-product-navigation-wrapper flex flex-nonwrap gap-5">
                <Button
                    type="button"
                    className="px-3 recomended-product-navigation w-40 h-10 bg-slate-800 font-bold font-roboto text-white flex flex-col justify-center items-center rounded-lg"
                >
                    <h3>For You</h3>
                    <hr className="w-full h-0.5 bg-white" />
                </Button>
                <Button
                    type="button"
                    className="px-3 recomended-product-navigation w-40 h-10 bg-slate-800 font-bold font-roboto text-white flex flex-col justify-center items-center rounded-lg"
                >
                    <h3>Vegetables</h3>
                    <hr className="w-full h-0.5 bg-white" />
                </Button>
                <Button
                    type="button"
                    className="px-3 recomended-product-navigation w-40 h-10 bg-slate-800  font-bold font-roboto text-white flex flex-col justify-center items-center rounded-lg"
                >
                    <h3>Basic Necessities</h3>
                    <hr className="w-full h-0.5 bg-white" />
                </Button>
            </div>
        </div>

        //
    );
};

export default ProductSection;
