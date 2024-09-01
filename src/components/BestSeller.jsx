import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"; // Importing the ShopContext to access the global state of the shop
import Title from "./Title"; // Importing the Title component
import ProductItem from "./ProductItem"; // Importing the ProductItem component

const BestSeller = () => {
    const { products } = useContext(ShopContext); // Using useContext to access products from ShopContext
    const [bestSeller, setBestSeller] = useState([]); // Declaring a state variable to hold the best-selling products

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller); // Filtering products to get only the best-sellers
        setBestSeller(bestProduct.slice(0, 5)); // Setting the state with the top 5 best-selling products
    }, [products]); // Adding products as a dependency so the effect re-runs if products change

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                {/* Title component to display the section title */}
                <Title text1={"BEST "} text2={" SELLERS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ab molestiae corrupti accusamus maxime earum!
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {/* Mapping over bestSeller to render each ProductItem */}
                {bestSeller.map((item, index) => (
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

export default BestSeller;
