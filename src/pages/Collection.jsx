import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    // Get the list of products, search query, and showSearch flag from the context
    const { products, search, showSearch } = useContext(ShopContext);

    // State to manage the visibility of the filter section
    const [showFilter, setShowFilter] = useState(true);

    // State to hold the filtered products based on applied filters
    const [filterProducts, setFilterProducts] = useState([]);

    // State to track selected categories for filtering
    const [category, setCategory] = useState([]);

    // State to track selected subcategories for filtering
    const [subCategory, setSubCategory] = useState([]);

    // State to track the sorting type selected by the user
    const [sortType, setSortType] = useState('relevant');

    // Function to toggle selected categories for filtering
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value)); // Remove category if already selected
        } else {
            setCategory(prev => [...prev, e.target.value]); // Add category if not selected
        }
    };

    // Function to toggle selected subcategories for filtering
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value)); // Remove subcategory if already selected
        } else {
            setSubCategory(prev => [...prev, e.target.value]); // Add subcategory if not selected
        }
    };

    // Function to apply filters based on selected categories, subcategories, and search query
    const applyFilter = () => {
        let productsCopy = products.slice(); // Make a copy of the products array

        // Apply search filter if the search bar is visible and has a value
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter products by selected categories
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        // Filter products by selected subcategories
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        // Update the filtered products state
        setFilterProducts(productsCopy);
    };

    // Function to sort the filtered products based on the selected sort type
    const sortProduct = () => {
        let fpCopy = filterProducts.slice(); // Make a copy of the filtered products array

        // Sort the products based on the selected sort type
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price))); // Sort by price low to high
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price))); // Sort by price high to low
                break;
            default:
                applyFilter(); // Reapply filters if no specific sort type is selected
                break;
        }
    };

    // Apply filters whenever the category, subcategory, search, or showSearch changes
    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    // Sort products whenever the sort type changes
    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Left Side - Filter Section */}
            <div className="min-w-60">
                {/* Filter toggle button for small screens */}
                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium"> CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory} />Men
                        </p>
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory} />Women
                        </p>
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>

                {/* Subcategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium"> TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value={'Topwear'} onChange={toggleSubCategory} />Top Wear
                        </p>
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={toggleSubCategory} />Bottom Wear
                        </p>
                        <p className="flex gap-2">
                            <input type="checkbox" className="w-3" value={'Winterwear'} onChange={toggleSubCategory} />Winter Wear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Products Section */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    {/* Title component for displaying the collection name */}
                    <Title text1={"All "} text2={" COLLECTION"} />

                    {/* Product Sort Dropdown */}
                    <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-200 text-sm px-2">
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Displaying the Filtered and Sorted Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Collection;
