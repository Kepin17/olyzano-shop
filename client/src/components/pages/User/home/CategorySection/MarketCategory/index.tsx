import { Link } from "react-router-dom";

const MarketCategoryItem = [
    {
        id: 1,
        categoryName: "Eggs",
        subCategory: [
            {
                id: 1,
                subCategoryName: "Duck Egg",
                link: "#",
            },
            {
                id: 2,
                subCategoryName: "Chieken Egg",
                link: "#",
            },
            {
                id: 3,
                subCategoryName: "Omega Egg",
                link: "#",
            },
        ],
        link: "#",
    },
    {
        id: 2,
        categoryName: "Fruits & Vegetables",
        subCategory: [
            {
                id: 1,
                subCategoryName: "Fruits",
                link: "#",
            },
            {
                id: 2,
                subCategoryName: "Vegetables",
                link: "#",
            },
        ],
        link: "#",
    },
    {
        id: 3,
        categoryName: "Meat & Seafood",
        subCategory: [
            {
                id: 1,
                subCategoryName: "Meat",
                link: "#",
            },
            {
                id: 2,
                subCategoryName: "Seafood",
                link: "#",
            },
        ],
        link: "#",
    },
    {
        id: 4,
        categoryName: "Beverages",
        subCategory: [
            {
                id: 1,
                subCategoryName: "Water",
                link: "#",
            },
            {
                id: 2,
                subCategoryName: "Soda",
                link: "#",
            },
            {
                id: 3,
                subCategoryName: "Tea",
                link: "#",
            },
            {
                id: 4,
                subCategoryName: "Coffee",
                link: "#",
            },
            {
                id: 5,
                subCategoryName: "Juice",
                link: "#",
            },
        ],
        link: "#",
    },
    {
        id: 5,
        categoryName: "Nuts & Seeds",
        subCategory: [
            {
                id: 1,
                subCategoryName: "Nuts",
                link: "#",
            },
            {
                id: 2,
                subCategoryName: "Seeds",
                link: "#",
            },
        ],
        link: "#",
    },
    {
        id: 6,
        categoryName: "Adult Items",
        subCategory: [
            {
                id: 1,
                subCategoryName: "Cigarettes and Lighters",
                link: "#",
            },
            {
                id: 2,
                subCategoryName: "Sexual Health",
                link: "#",
            },
            {
                id: 3,
                subCategoryName: "E-Cigarettes",
                link: "#",
            },
        ],
    },

    {
        id: 7,
        categoryName: "Processed Dairy Products",
        subCategory: [
            {
                id: 1,
                subCategoryName: "Milk",
                link: "#",
            },
            {
                id: 2,
                subCategoryName: "Cheese",
                link: "#",
            },
            {
                id: 3,
                subCategoryName: "Butter",
                link: "#",
            },
            {
                id: 4,
                subCategoryName: "Yogurt",
                link: "#",
            },
        ],
    },
];

const MarketCategory = () => {
    return (
        <>
            {MarketCategoryItem.map((item) => (
                <div className="font-roboto " key={item.id}>
                    <h3 className="text-white font-bold text-xl">
                        {item.categoryName}
                    </h3>
                    <ul className="text-white">
                        {item.subCategory.map((subItem) => (
                            <li key={subItem.id}>
                                <Link to={subItem.link}>
                                    {subItem.subCategoryName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default MarketCategory;
