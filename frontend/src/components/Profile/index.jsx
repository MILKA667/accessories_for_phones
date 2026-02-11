import "./style.css"

export default function Profile({ user, orders }) {
  return (
    <div className="profile_page">
      <h2 className="profile_title">Профиль</h2>
      <div className="profile_card">
        <div className="profile_row">
          <span>Пользователь:</span>
          <strong>{user?.nickname || "Гость"}</strong>
        </div>
        <div className="profile_row">
          <span>Всего заказов:</span>
          <strong>{orders.length}</strong>
        </div>
      </div>

      <div className="profile_orders">
        <h3>Статус заказов</h3>
        {orders.length === 0 && (
          <p className="profile_empty">Заказов пока нет. Создайте дизайн в конструкторе.</p>
        )}
        {orders.map((order) => (
          <div className="profile_order" key={order.id}>
            <div className="profile_order_header">
              <span className="profile_order_id">{order.id}</span>
              <span className="profile_order_status">{order.status}</span>
            </div>
            <div className="profile_order_body">{order.summary?.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


