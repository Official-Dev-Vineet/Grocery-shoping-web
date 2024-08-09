import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = async (searchQuery) => {
    if (searchQuery.length >= 1) {
      try {
        setLoading(true);
        fetch(`http://localhost:5000/search?query=${searchQuery}`)
          .then((res) => res.json())
          .then((data) => {
            data.code === 200 && setResults(data);
            data.code === 403 && setResults((pre) => pre);
          });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults(results);
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 300);

  useEffect(() => {
    if (query.length >= 1) {
      debouncedHandleSearch(query );
    } else {
      setResults({ count: 0, products: [] });
    }
  }, [query]);

  return (
    <div className="App">
      <h1>Grocery Search</h1>
      <div className="inputBox">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products"
        />
        {loading ? (
          <p>Loading...</p>
        ) : results.count > 0 ? (
          <table className="resultTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Color</th>
                <th>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {results.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.color}</td>
                  <td>{product.weight}kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results</p>
        )}
        <p>Results found: {results?.count}</p>
      </div>
    </div>
  );
}

export default App;
