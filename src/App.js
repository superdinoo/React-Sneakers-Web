import React, { createContext } from "react";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

//контекст
export const AppContext = createContext({});

function App() {
  const [cartOpened, setCardOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  // получение данных через axios. Серверная часть на мокапи
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get(
        "https://6550e51f7d203ab6626e4d65.mockapi.io/items"
      );
      //получение данных с корзины
      const cartResponse = await axios.get(
        "https://6550e51f7d203ab6626e4d65.mockapi.io/cart"
      );
      setIsLoading(false);

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
    }
    fetchData();
  }, []);

  // получение товара в корзине  и отправка данных на сервер
  const onAddToCart = (item) => {
    try {
      if (cartItems.find((obj) => obj.id === item.id)) {
        setCartItems((prev) => prev.filter((obj) => obj.id !== item.id));
      } else {
        axios.post("https://6550e51f7d203ab6626e4d65.mockapi.io/cart", item);
        setCartItems((prev) => [...prev, item]);
      }
    } catch (error) {
      alert("Ошибка");
    }
  };

  ///Добавляем понравившиеся товары  и в базу данных, но в мокапи ограничение )))
  const onAddToFavorite = (item) => {
    if (!favorite.some((favItem) => favItem.id === item.id)) {
      setFavorite((prev) => [...prev, item]);
    }
  };

  const onDeleteAddFavorite = (id) => {
    setFavorite((prev) => prev.filter((item) => item.id !== id));
  };

  // Инпут , где мы следим за событием
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  //удаление товаров
  const onRemoveItem = (id) => {
    axios.delete(`https://6550e51f7d203ab6626e4d65.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  //манипуляции с added для корректной работы галочки, не получилось)
  // const isItemAdded = (id) => {
  //   return cartItems.some((obj) => obj.id === id);
  // };
  return (
    <AppContext.Provider
      value={{ cartItems, favorite, items, setCardOpened, setCartItems }}
    >
      <div className="wrapper clear">
        <div>
          <Drawer
            onRemove={onRemoveItem}
            totalPrice={totalPrice}
            items={cartItems}
            onClose={() => setCardOpened(!cartOpened)}
            opened={cartOpened}
          />
        </div>
        <Header onClickCart={() => setCardOpened(!cartOpened)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                items={items}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                onAddToFavorite={onAddToFavorite}
                onDeleteAddFavorite={onDeleteAddFavorite}
              />
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
