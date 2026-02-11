import { useState } from "react"
import "./style.css"

export default function AuthModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState("login") // login | register
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === "register") {
      if (!nickname.trim() || !email.trim() || !password.trim()) return
      onSuccess(nickname.trim())
    } else {
      if (!email.trim() || !password.trim()) return
      onSuccess(email.trim())
    }
  }

  return (
    <div className="auth_backdrop" onClick={onClose}>
      <div className="auth_modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth_tabs">
          <button
            type="button"
            className={
              "auth_tab" + (mode === "login" ? " auth_tab_active" : "")
            }
            onClick={() => setMode("login")}
          >
            Войти
          </button>
          <button
            type="button"
            className={
              "auth_tab" + (mode === "register" ? " auth_tab_active" : "")
            }
            onClick={() => setMode("register")}
          >
            Зарегистрироваться
          </button>
        </div>

        <form className="auth_form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label className="auth_field">
              <span>Никнейм</span>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Например, binary.artist"
              />
            </label>
          )}

          <label className="auth_field">
            <span>Почта или логин</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="auth_field">
            <span>Пароль</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </label>

          <button type="submit" className="auth_submit">
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <button type="button" className="auth_close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  )
}


