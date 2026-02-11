import { BRANDS, MODELS } from "../../phones"
import "./style.css"
import ModelSlider from "../ModelSlider"

export default function ModelSelection({
  chosenAccessory,
  chosenBrand,
  chosenModel,
  onChangeAccessory,
  onChangeBrand,
  onChangeModel,
}) {
  return (
    <div className="model_selection">
      <div className="model_selection_container">
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span className="select_label">Аксессуар</span>
          <select
            name="accessory"
            id="accessory"
            value={chosenAccessory}
            onChange={(e) => onChangeAccessory(e.target.value)}
            className="custom_select"
          >
            <option value="case">Чехол</option>
            <option value="glass">Защитное стекло</option>
            <option value="keychain">Брелок</option>
            <option value="sticker">Наклейка</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span className="select_label">Марка телефона</span>
          <select
            name="phone_brand"
            id="phone_brand"
            value={chosenBrand}
            onChange={(e) => onChangeBrand(e.target.value)}
            className="custom_select"
          >
            {BRANDS.map((brand) => (
              <option key={brand.key} value={brand.key}>
                {brand.label}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span className="select_label">Модель телефона</span>
          <select
            name="phone_model"
            id="phone_model"
            value={chosenModel}
            onChange={(e) => onChangeModel(e.target.value)}
            className="custom_select"
          >
            {MODELS[chosenBrand].map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ModelSlider
        chosenBrand={chosenBrand}
        chosenModel={chosenModel}
        onSelectModel={onChangeModel}
      />
      <div style={{ marginTop: "8px", fontWeight: 700, fontSize: "18px" }}>
        Переходите в Конструктор
      </div>
    </div>
  )
}
