import React from "react";
import style from "./Card.module.scss";
import { useState } from "react";
import ContentLoader from "react-content-loader";

const Card = ({
  title,
  price,
  image,
  id,
  added = false,
  onFavorite,
  onDeleteAddFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) => {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, price, image });
    setIsAdded(!isAdded);
  };
  const onClickFavorite = () => {
    onFavorite({ id, title, price, image });
    if (onDeleteAddFavorite) {
      onDeleteAddFavorite(id);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className={style.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {" "}
          <div key={id} onClick={onClickFavorite} className={style.favorite}>
            <img
              src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
              alt="unliked"
            />
          </div>
          <img width={133} height={112} src={image} alt="sneakers" />
          <h5 className="mb-10">{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b> {`${price}  руб`}</b>
            </div>
            <img
              className={style.plus}
              onClick={onClickPlus}
              src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
