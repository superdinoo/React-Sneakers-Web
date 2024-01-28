import React from "react";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import "./Orders.css";

const Orders = () => {
  return (
    <div className="col-2">
      <div className="form-layout">
        <div className="form-container">
          <p className="sign-in-txt">Авторизоваться через: </p>
          <div className="social-login">
            <i>
              <FaFacebook size={20} />
            </i>
            <i>
              <FaTwitter size={20} />
            </i>
            <i>
              <FaGithub size={20} />
            </i>
          </div>
          <div className="divider">
            <p>
              <span className="ili">Или</span>
            </p>
          </div>
          <form className="form" action="">
            <input className="input" type="text" placeholder="Имя" />
            <input className="input" type="text" placeholder="Почта" />
            <input className="input" type="text" placeholder="Пароль" />
          </form>
          <button>Создай свой профиль</button>
        </div>
        <div className="form-footer">
          <p>
            Регистрируясь, вы соглашаетесь с условиями и политикой нашего сайта
            <span className="secondary-color"> Условия и политика</span> и
            <span className="secondary-color">
              {""} Политика использования файлов cookie
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
