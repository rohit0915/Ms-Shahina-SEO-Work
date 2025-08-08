/** @format */

import React, { useRef, useState, forwardRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const ProductCard = forwardRef(({ src, title, slug, price, id, showprice }, ref) => {
  return (
    <Link to={`/product/${slug}?id=${id}`}>
      <div className="Item cursor-pointer" ref={ref}>
        <div className="thumbnail">
          <ImageLazyLoading
            img={src}
            alt={title}
            className="w-full h-full text-[10px]"
          />
        </div>
        {showprice &&
          <p className="text-2xl font-black text-primary">
            ${price}
          </p>
        }
        <h4 className="text-xl font-normal">{title}</h4>
      </div>
    </Link>
  );
});

const AllProducts = ({ products, setLimit, limit, hasNextPage }) => {
  const lastProductRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const lastProductIndex = products.length - 1;
    if (products[lastProductIndex]) {
      const lastProductElement = lastProductRef.current;
      if (lastProductElement) {
        const { top } = lastProductElement.getBoundingClientRect();
        const scrollToPosition = top + window.scrollY;
        window.scrollTo({
          top: scrollToPosition,
          behavior: "smooth",
        });
        console.log("Scrolling to:", scrollToPosition);
      }
    }

    setTimeout(() => {
      setLimit(limit + 10);
      setIsLoading(false);
    }, 100);
  };

  const handleTouchLoadMore = (e) => {
    e.preventDefault();
    handleLoadMore(e);
  };

  return products?.length > 0 ? (
    <div className="w-full" style={{ minHeight: "100vh" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center py-5 product_container cursor-pointer">
        {products?.map((item, index) => (
          <ProductCard
            key={item._id}
            id={item._id}
            src={item?.productImages?.[0]?.image}
            title={item.name}
            slug={item.slug}
            showprice={item.isShowAddToCart}
            price={
              item.multipleSize === false
                ? item.price
                : item.sizePrice?.[0]?.price
            }
            ref={index === products.length - 1 ? lastProductRef : null}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center py-5">
          <button
            onClick={handleLoadMore}
            onTouchStart={handleTouchLoadMore}
            className="load_more"
          >
            {isLoading ? <ClipLoader color="#fff" /> : "Load More"}
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="Not-Found">
      <ImageLazyLoading
        img={"/Image/no-results.png"}
        alt={"No Results Found"}
      />
      <h5>Sorry, we couldn't find any matching products.</h5>
    </div>
  );
};

export default AllProducts;
