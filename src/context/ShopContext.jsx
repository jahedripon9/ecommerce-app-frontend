import PropTypes from "prop-types"; // Import PropTypes for type checking
import { products } from '../assets/frontend_assets/assets.js'; // Import product data
import { createContext, useState } from "react";

// Create a new context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    // Static data related to the shop
    const currency = "$"; // Default currency
    const delivery_fee = 10; // Standard delivery fee

    // State for search functionality
    const [search, setSearch] = useState(''); // Stores the search query
    const [showSearch, setShowSearch] = useState(false); // Controls the visibility of the search bar

    // Combine all the state and static data into a single value object
    const value = {
        products, // Product list
        currency, // Currency symbol
        delivery_fee, // Delivery fee
        search, setSearch, // Search state and setter
        showSearch, setShowSearch // Search bar visibility state and setter
    };

    return (
        // Provide the value object to all children of ShopContextProvider
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

// Define prop types for the component
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children are passed and are of node type
};

export default ShopContextProvider;
