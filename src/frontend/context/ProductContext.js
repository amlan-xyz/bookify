import {createContext,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export const ProductsContext = createContext();

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([])
  const [filteredProducts,setFilteredProducts]=useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [rangeValue, setRangeValue] = useState(5000);
  const [searchBook, setSearchBook] = useState("");
  const [loading,setLoading]=useState(false);

const navigate=useNavigate();

	const getProducts=async()=>{
		try {
			setLoading(true);
			const response = await fetch("/api/products");
			const { products } = await response.json();
			if (response.status === 200) {
			  setProducts(products);
			  setFilteredProducts(products)
			}
			setLoading(false)
		  } catch (error) {
			console.log("ERROR", error);
		  }
	}	

	const handleCategory = (item) => {
		setSelectedCategories((prevCategories) => {
			if (prevCategories.includes(item)) {

				return prevCategories.filter((category) => category !== item);
			  } else {
				return [...prevCategories, item];
			  }
		});
		console.log(selectedCategories)
	  };


	  const handleRating = (rating) => {
		setSelectedRatings((prevRatings) => {
		  if (prevRatings.includes(rating)) {
			return prevRatings.filter((selectedRating) => selectedRating !== rating);
		  } else {
			return [...prevRatings, rating];
		  }
		});
	  };
	

	  const handleSort = (e) => {
		setSortOrder(e.target.value);
	  };
	
	  const handleClearFilters = () => {
		setSelectedCategories([]);
		setSelectedRatings([]);
		setSortOrder("");
		setRangeValue(5000);
	  };
	
	  const filteredByCategory =
		selectedCategories.length === 0
		  ? filteredProducts
		  : filteredProducts.filter((product) =>
			  selectedCategories.includes(product.categoryName)
			);
	
	  const filteredByRating = filteredByCategory.filter((product) => {
		if (selectedRatings.length === 0) {
		  return true;
		} else {
		  return selectedRatings.some(
			(rating) => product.rating >= parseFloat(rating)
		  );
		}
	  });
	
	  const filteredByPriceRange = filteredByRating.filter(
		(product) => product.price <= rangeValue
	  );
	
	  const sortedProducts = [...filteredByPriceRange];
	  if (sortOrder === "lowToHigh") {
		sortedProducts.sort((a, b) => a.price - b.price);
	  } else if (sortOrder === "highToLow") {
		sortedProducts.sort((a, b) => b.price - a.price);
	  }
	
	  const handleSearch = (e) => {
		setSearchBook(e.target.value);  
		navigate('/products')
	};
	
	  const filteredBooks = sortedProducts.filter((book) => {
		const bookName = book.title.toLowerCase().includes(searchBook.toLowerCase());
		return bookName;
	  });

	const filterByPrice=(price)=>{
		setFilteredProducts(products.filter(product=>product.price<=price));
	}

	const value={loading,getProducts,filteredProducts,filterByPrice,setRangeValue,selectedCategories,sortOrder,selectedRatings,rangeValue,setSelectedCategories,setSearchBook,setSortOrder,searchBook,handleCategory,handleRating,handleSort,handleClearFilters,handleSearch,filteredBooks}

  return (
    <>
      <ProductsContext.Provider value={value}>
        {children}
      </ProductsContext.Provider>
    </>
  );
}

