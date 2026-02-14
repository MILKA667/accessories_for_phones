import { useEffect, useState } from 'react'
import OrderPreview from '../OrderPreview'
import { MODELS } from '../../phones'
import './style.css'

function Profile() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(savedOrders)
  }, [])

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter(order => order.id !== id)
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Мои заказы</h1>
        <p>Всего заказов: {orders.length}</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>У вас еще нет заказов</p>
          <p>Создайте свой первый чехол в <a href="/constuctor">конструкторе</a></p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => {
            const modelObj = (MODELS[order.brand] || []).find((m) => m.value === order.model)
            return (
            <div key={order.id} className="order-card">
              <OrderPreview order={order} modelImage={modelObj?.model} />

              <div className="order-details">
                <h3>{order.brand.toUpperCase()} {order.model.replace(/_/g, ' ')}</h3>
                <p className="order-date">
                  <span className="label">Дата:</span>
                  <span>{order.date} {order.time}</span>
                </p>
                <p className="order-item">
                  <span className="label">Наклеек:</span>
                  <span>{order.stickers.length}</span>
                </p>
                <p className="order-item">
                  <span className="label">Текст:</span>
                  <span>{order.textItems ? order.textItems.length : 0}</span>
                </p>
                <p className="order-color">
                  <span className="label">Цвет:</span>
                  <span 
                    className="color-dot" 
                    style={{ backgroundColor: order.bgColor }}
                    title={order.bgColor}
                  ></span>
                </p>
              </div>

              <div className="order-actions">
                <button 
                  className="btn btn-delete" 
                  onClick={() => handleDeleteOrder(order.id)}
                  title="Удалить заказ"
                >
                  🗑️ Удалить
                </button>
              </div>
            </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Profile