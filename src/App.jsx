import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProduct = async () => {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();
    console.log(data.products);
    if (data && data.products) {
      setProduct(data.products);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const setSelctedPage = (selectpage) => {
    if (
      selectpage >= 1 &&
      selectpage <= product.length / 10 &&
      selectpage !== page
    ) {
      setPage(selectpage);
    }
  };
  return (
    <>
      <div className="App">
        {product.length > 0 &&
          product.slice(page * 10 - 10, page * 10).map((pro) => {
            return (
              <div className="card" key={pro.id}>
                <img className="card-img" src={pro.thumbnail} alt={pro.title} />
                <div className="card-text">{pro.title}</div>
              </div>
            );
          })}
      </div>
      <div className="pagination">
        <span
          className={page > 1 ? "" : "disable"}
          onClick={() => setSelctedPage(page - 1)}
        >
          Prev
        </span>
        <span>
          {[...Array(product.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selectedpage" : ""}
                key={i}
                onClick={() => setSelctedPage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
        </span>
        <span
          className={page < product.length / 10 ? "" : "disable"}
          onClick={() => setSelctedPage(page + 1)}
        >
          Next
        </span>
      </div>
    </>
  );
}

export default App;
