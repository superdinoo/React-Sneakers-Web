import React, { useState, useContext } from "react";
import Info from "../Info";
import { AppContext } from "../../App";
import style from "./Drawer.module.scss";

const Drawer = ({ onClose, onRemove, items = [], totalPrice, opened }) => {
  const { setCartItems } = useContext(AppContext);
  const [isComlete, setIsComlete] = useState(false);

  const onClickOrder = () => {
    setIsComlete(!isComlete);
    setCartItems([]);
  };

  return (
    <div className={`${style.overlay} ${opened ? style.overlayVisable : ""}`}>
      <div className={style.drawer}>
        <h2 className="mb-30 d-flex justify-between ">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
          ></img>
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{item.title}</p>
                    <b>{`${item.price}  руб`}</b>
                  </div>

                  <img
                    onClick={() => onRemove(item.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="remove"
                  ></img>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b> {totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isComlete ? "Заказ офрмлен!" : "Корзина пустая"}
            discription={
              isComlete
                ? "Ваш заказ №1 скоро будет передан курьерской доставке"
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            }
            image={
              isComlete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
