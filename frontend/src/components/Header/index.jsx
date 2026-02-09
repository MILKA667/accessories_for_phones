import "./style.css"

export default function Header() {
    let username = null;
    username = localStorage.getItem("nickname");


    return (
        <div className="header">
            <div className="logo">
                <img src="logo.png" alt="" />
                accessories_for_phones
            </div>

            {username ? (
                <div className="username">{username}</div>  
            ) : (
                <label style={{ display: "flex", flexDirection: "row"}}>
                    <div className="login_button">Войти</div>
                    <span>|</span>
                    <div className="reg_button">Зарегистрироваться</div>
                </label>
            )}
        </div>
    );
}