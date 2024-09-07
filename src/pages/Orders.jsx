// Import necessary libraries and components
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  // Destructure products and currency from ShopContext
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      {/* Section title */}
      <div className="text-2xl">
        <Title text1={"MY "} text2={" ORDER"} />
      </div>

      {/* Order list */}
      <div>
        {
          // Slice the products array to display a limited number of orders (in this case, items 2 to 4)
          products.slice(1, 4).map((item, index) => (
            <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4" key={index}>
              {/* Order item details */}
              <div className="flex items-center gap-6 text-sm">
                {/* Product image */}
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  {/* Product name */}
                  <p className="sm:text-base font-medium">{item.name}</p>

                  {/* Price, quantity, and size */}
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M </p>
                  </div>

                  {/* Order date */}
                  <p className="mt-2">Date: <span className="text-gray-400">JUl 25, 2024</span></p>
                </div>
              </div>

              {/* Order status and track button */}
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready to ship</p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
