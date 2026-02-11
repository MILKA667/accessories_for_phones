import "./style.css"

export default function Constructor({ chosenBrand, chosenModel, onCreateOrder }) {
  const handleCreateOrder = () => {
    onCreateOrder({
      brand: chosenBrand,
      model: chosenModel,
      description: "Индивидуальный дизайн аксессуара",
    })
  }

  return (
    <div className="constructor_page">
      <div className="constructor_sidebar">
        <button className="constructor_tool constructor_tool_active" type="button">
          ⬚
        </button>
        <button className="constructor_tool" type="button">
          🖼
        </button>
        <button className="constructor_tool" type="button">
          ★
        </button>
        <button className="constructor_tool" type="button">
          T
        </button>
        <div className="constructor_tools_bottom">
          <button className="constructor_tool" type="button">
            ↺
          </button>
          <button className="constructor_tool" type="button">
            ↻
          </button>
        </div>
      </div>

      <div className="constructor_canvas">
        <div className="constructor_phone">
          <div className="constructor_camera" />
        </div>
        <div className="constructor_actions">
          <button className="constructor_secondary" type="button">
            Сбросить и вернуться назад
          </button>
          <button className="constructor_primary" type="button" onClick={handleCreateOrder}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  )
}


