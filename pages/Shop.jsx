import React, {useState} from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterBtns from "../components/FilterBtns/FilterBtns";
import "./Shop.css"
import ListingCard from "../components/ListingCard/ListingCard";
import ScentDescription from "../components/ScentDescription/ScentDescription";

function Shop({ candles, 
                loading, 
                addToCart, 
                filter,
                changeFilter, 
                toggleDescription,
                setScentInfo,}){

    if (loading) return <p>Loading candles...</p>;

    const [sale, setSale] = useState(false);

    const toggleSale = () => setSale(!sale);

    const [search, setSearch] = useState("");

    const changeSearchText = (input) => {setSearch(input)}

    return(
        <div>
            <div id="shopTopOfPage"></div>
            <div id="shopTitleContainer">
                <h2>Shop Candles</h2>
                <div id="SearchBarContainer">
                    <SearchBar changeSearchText={changeSearchText}/>
                </div>
                <FilterBtns changeFilter={changeFilter} filter={filter} sale={sale} toggleSale={toggleSale}/>
            </div>
            <div id="Listings">
                {candles
                    .filter(candle => {
                        const matchesCollection = filter === "all" || candle.collection.toLowerCase() == filter;

                        const matchesSale = !sale || candle.sale == true;

                        const matchesSearch = (search === "") || candle.name.toLowerCase().includes(search.toLowerCase());

                        const hiding = !(candle.hiding ?? false);

                        return hiding && matchesCollection && matchesSale && matchesSearch;
                    })
                    .map(candle => (
                        <ListingCard 
                        key={candle.id} 
                        listing={candle}
                        addToCart={addToCart}
                        toggleDescription={toggleDescription}
                        setScentInfo={setScentInfo}
                        />
                    ))
                }
            </div>
        </div>

    )
}
export default Shop