import React from "react";
import Card from "../components/Card/Card";

const Home = ({
  searchValue,
  cartItems,
  onAddToCart,
  onAddToFavorite,
  setSearchValue,
  onChangeSearchInput,
  items,
  isLoading,
}) => {
  const renderItems = () => {
    return isLoading
      ? [...Array(10)]
      : items
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Card
              key={index}
              onFavorite={(item) => onAddToFavorite(item)}
              onPlus={(item) => onAddToCart(item)}
              title={item.name}
              price={item.price}
              image={item.imageUrl}
              added={cartItems.some((obj) => obj === item)}
              loading={false}
            />
          ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: '${searchValue}'` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search"></img>
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="remove"
            ></img>
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск"
          ></input>
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
