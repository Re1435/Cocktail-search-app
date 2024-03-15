import React, { useState, useEffect } from "react";
import "../App.css";

const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const CocktailSearch = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, message: "" });

  const fetchCocktail = async (url) => {
    setLoading(true);

    try {
      const response = await fetch(url);

      if (!response) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      if (responseData.drinks === null) {
        setError({ status: true, message: "No Data Found" });
        setLoading(false);
      } else {
        setData(responseData.drinks);
        setLoading(false);
        setError({ status: false, message: "" });
      }
    } catch (error) {
      setError({
        status: true,
        message: error.message || "Error fetching data",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = `${URL}${search}`;
    fetchCocktail(url);
  }, [search]);

  return (
    <>
      <div className='search-container'>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr />
      {loading && <h2>Loading...</h2>}
      {!loading && error.status && <h2>{error.message}</h2>}
      {!loading && !error.status && (
        <ul className='cocktail-data'>
          {data.map(({ idDrink, strDrink, strDrinkThumb }) => (
            <li key={idDrink}>
              <img src={strDrinkThumb} alt='drink-img' />
              <p>{strDrink}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CocktailSearch;
