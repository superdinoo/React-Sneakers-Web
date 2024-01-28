import React, { useContext } from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../App";

const Favorites = ({ onAddToFavorite, onDeleteAddFavorite }) => {
  //context
  const { favorite } = useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorite.map((obj) => (
          <Card
            id={obj.id}
            key={obj.id}
            favorited={true}
            onFavorite={onAddToFavorite}
            onDeleteAddFavorite={() => onDeleteAddFavorite(obj.id)}
            {...obj}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
