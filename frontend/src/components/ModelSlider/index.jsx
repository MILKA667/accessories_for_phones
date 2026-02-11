import { MODELS } from "../../phones"
import "./style.css"

export default function ModelSlider({ chosenBrand, chosenModel, onSelectModel }) {
  return (
    <div className="model_slider_container">
      {MODELS[chosenBrand].map((model) => {
        const isActive = model.value === chosenModel
        return (
          <div
            className={"model_slider_item" + (isActive ? " active" : "")}
            key={model.value}
            onClick={() => onSelectModel(model.value)}
          >
            <img src={model.image} alt={model.label} />
            {model.label}
          </div>
        )
      })}
    </div>
  )
}