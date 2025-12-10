import React, { useContext, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../reduxToolKit-store/productSlice";
import { globalContext } from "../myCongtext/MyContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Allproduct.css"

// ✅ Product Card
const ProductCard = ({ item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(${product.title} added to cart!);
    };

    return (
        <div className="bg-black text-white rounded-lg shadow-md overflow-hidden border border-gray-700">
            <Link to={/product/${item.id}}>
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-contain bg-black"
                />
            </Link>
            <div className="p-4">
                <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                    ))}
                </div>
                <h5 className="text-lg font-semibold">{item.title}</h5>
                <p className="text-sm text-gray-400">{item.info}</p>

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold">₹{item.finalPrice}</span>
                    <span className="line-through text-gray-500 text-sm">
                        ₹{item.originalPrice}
                    </span>
                </div>

                <button
                    className="bg-red-600 hover:bg-green-500 w-full mt-3 py-2 rounded-lg"
                    onClick={() => handleAddToCart(item)}
                >
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    );
};

// ✅ Sidebar
const Sidebar = ({ setSort, filters, setFilters, priceRange, setPriceRange }) => {
    const handleCheckboxChange = (type, value) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            if (newFilters[type].includes(value)) {
                newFilters[type] = newFilters[type].filter((v) => v !== value);
            } else {
                newFilters[type] = [...newFilters[type], value];
            }
            return newFilters;
        });
    };

    return (
        <div className="bg-black text-white border-r border-gray-700 w-64 p-2 space-y-6">
            <div className="overflow-y-scroll y_scrolling bgg">
                {/* Sort */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Sort By</h3>
                    <ul className="space-y-1 text-gray-300 cursor-pointer">
                        <li onClick={() => setSort("latest")}>Latest</li>
                        <li onClick={() => setSort("featured")}>Featured</li>
                        <li onClick={() => setSort("topRated")}>Top Rated</li>
                        <li onClick={() => setSort("lowToHigh")}>Price (Lowest First)</li>
                        <li onClick={() => setSort("highToLow")}>Price (Highest First)</li>
                    </ul>
                </div>

                {/* Filter - Brands */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Filter By</h3>
                    <p className="text-gray-400 mb-1">Brands</p>
                    <ul className="space-y-1 text-gray-300">
                        {["JBL", "boAt", "Sony"].map((brand) => (
                            <li key={brand}>
                                <input
                                    type="checkbox"
                                    checked={filters.brand.includes(brand)}
                                    onChange={() => handleCheckboxChange("brand", brand)}
                                />{" "}
                                {brand}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Filter - Category */}
                <div>
                    <p className="text-gray-400 mb-1">Category</p>
                    <ul className="space-y-1 text-gray-300">
                        {["Headphones", "Earbuds", "Wired"].map((cat) => (
                            <li key={cat}>
                                <input
                                    type="checkbox"
                                    checked={filters.category.includes(cat)}
                                    onChange={() => handleCheckboxChange("category", cat)}
                                />{" "}
                                {cat}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className=" text-white border-r border-gray-700 w-55 p-2 space-y-6">
                    {/* other filters ... */}

                    {/* ✅ Price Filter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Price Range</h4>
                        <p className="text-gray-300">Up to ₹{priceRange}</p>
                        <input
                            type="range"
                            min="0"
                            max="20000"
                            step="500"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-40"
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

// ✅ All Products Page
// In AllProductsPage
const AllProductsPage = () => {
    const { data } = useContext(globalContext);

    const [sort, setSort] = useState(null);
    const [filters, setFilters] = useState({ brand: [], category: [] });

    // ✅ new state for price
    const [priceRange, setPriceRange] = useState(20000); // max price default

    const filteredProducts = useMemo(() => {
        let result = [...data];

        // filter by brand
        if (filters.brand.length > 0) {
            result = result.filter((p) => filters.brand.includes(p.brand));
        }

        // filter by category
        if (filters.category.length > 0) {
            result = result.filter((p) => filters.category.includes(p.category));
        }

        // ✅ filter by price
        result = result.filter((p) => p.finalPrice <= priceRange);

        // sorting
        if (sort === "lowToHigh") {
            result.sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (sort === "highToLow") {
            result.sort((a, b) => b.finalPrice - a.finalPrice);
        } else if (sort === "latest") {
            result.sort((a, b) => b.id - a.id);
        }

        return result;
    }, [data, sort, filters, priceRange]);

    return (
        <div className="bg-black min-h-screen text-white allprodctsdisplay flex">
            <Sidebar setSort={setSort} filters={filters} setFilters={setFilters} priceRange={priceRange} setPriceRange={setPriceRange} />

            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-6">All Products</h2>
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-400">No Products Found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} item={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default AllProductsPage;