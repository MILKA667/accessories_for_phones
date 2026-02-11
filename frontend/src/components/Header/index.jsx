import "./style.css"

export default function Header({ activeTab, onChangeTab, onOpenAuth, username }) {
  return (
    <div className="header">
      <div className="logo">
        <img src="logo.png" alt="" />
        Binary Beasts
      </div>

      <nav className="menu">
        <li
          className={
            "menu_item" + (activeTab === "models" ? " menu_item_active" : "")
          }
          onClick={() => onChangeTab("models")}
        >
          Выбор модели
        </li>
        <li
          className={
            "menu_item" +
            (activeTab === "constructor" ? " menu_item_active" : "")
          }
          onClick={() => onChangeTab("constructor")}
        >
          Конструктор
        </li>
        <li
          className={
            "menu_item" + (activeTab === "profile" ? " menu_item_active" : "")
          }
          onClick={() => onChangeTab("profile")}
        >
          Профиль
        </li>

        {username ? (
          <div className="username">{username}</div>
        ) : (
          <button className="login_button" type="button" onClick={onOpenAuth}>
            Войти
          </button>
        )}
      </nav>
    </div>
  )
}