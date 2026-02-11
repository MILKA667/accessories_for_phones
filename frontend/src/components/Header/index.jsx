import { useNavigate } from "react-router-dom";
import "./style.css"

export default function Header() {
    let username = null;
    username = localStorage.getItem("nickname");
    const navigate = useNavigate()


    return (
        <div className="header">
            <div className="logo"
                onClick={() => navigate("/")}>
                <img src="logo.png" alt="" />
                CaseLab

            </div>

            {username ? (
                <div className="username"
                    onClick={() => navigate("/profile")}
                >{username}</div>
            ) : (
                <label style={{ display: "flex", flexDirection: "row" }}>
                    <div className="login_button">Войти</div>
                </label>
            )}
        </div>
    );
}