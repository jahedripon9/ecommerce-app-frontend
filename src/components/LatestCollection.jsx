import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"; // Importing the ShopContext to access the global state of the shop
import Title from "./Title"; // Importing the Title component to display section titles
import ProductItem from "./ProductItem"; // Importing the ProductItem component to display individual products

const LatestCollection = () => {

    const { products } = useContext(ShopContext); // Using useContext to access products from ShopContext
    const [latestProduct, setLatestProduct] = useState([]); // Declaring a state variable to hold the latest products

    useEffect(() => {
        // Setting the state with the first 10 products from the products array
        setLatestProduct(products.slice(0, 10));
    }, [products]); // Adding products as a dependency to re-run the effect if products change

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                {/* Title component to display the section title */}
                <Title text1={'LATEST'} text2={' COLLECTION'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea cupiditate enim, libero repellendus ut nesciunt.
                </p>
            </div>
            {/* Rendering the latest products in a responsive grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProduct.map((item, index) => (
                    <ProductItem
                        key={index} // Unique key for each item in the list
                        id={item._id} // Passing product id as a prop
                        image={item.image} // Passing product image as a prop
                        name={item.name} // Passing product name as a prop
                        price={item.price} // Passing product price as a prop
                    />
                ))}
            </div>
        </div>
    );
}

export default LatestCollection;
