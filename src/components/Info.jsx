import React, { useContext } from "react";
import { AppContext } from "../App";

const Info = ({ title, image, discription }) => {
  const { setCardOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="No" />
      <h2> {title}</h2>
      <p className="opacity-6">{discription}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
      </button>
    </div>
  );
};

export default Info;
