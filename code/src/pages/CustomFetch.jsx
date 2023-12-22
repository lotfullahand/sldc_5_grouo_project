const CustomFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${apiUrl}/products?per_page=${itemsPerPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${btoa(
                `${consumerKey}:${consumerSecret}`
              )}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Calculate the date one year ago from the current date
        const currentDate = new Date(); // Get the current date
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1); // Calculate one year ago

        // Filter data based on date criteria
        const filteredData = data.filter((product) => {
          const productDate = new Date(product.date_created);
          return productDate >= oneYearAgo && productDate <= currentDate;
        });

        setProducts(filteredData);
        setLoading(false);
        console.log(filteredData);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center leading-7">Product List</h1>
      <ul className="card mt-4 bg-base-200 px-4 py-4 shadow-2xl">
        {products.map((product) => (
          <li key={product.id} className="mt-4 py-4 px-4 bg-base-100 shadow-md">
            <h2>Name: {product.name}</h2>
            <p>Price: INR {product.price} </p>
            <p>Date: {product.date_created}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomFetch;
