import { BRANDS, MODELS } from "../../phones"
import "./style.css"
import { useState, useEffect } from "react"
import ModelSlider from "../ModelSlider"

export default function ModelSelection() {
    const [chosenBrand, setChosenBrand] = useState(BRANDS[0].key)
    const [chosenModel, setChosenModel] = useState(MODELS[BRANDS[0].key][0].value)

    useEffect(() => {
        const first = MODELS[chosenBrand] && MODELS[chosenBrand][0]
        if (first) setChosenModel(first.value)
    }, [chosenBrand])

    return (
        <div className="model_selection">
        <div className="model_selection_container">
            <label style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                Марка телефона
                <select
                    name="phone_brand"
                    id="phone_brand"
                    value={chosenBrand}
                    onChange={(e) => setChosenBrand(e.target.value)}
                >
                    {BRANDS.map((brand) => (
                        <option key={brand.key} value={brand.key}>
                            {brand.label}
                        </option>
                    ))}
                </select>
            </label>
            <label style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                Модель телефона
                <select
                    name="phone_model"
                    id="phone_model"
                    value={chosenModel}
                    onChange={(e) => setChosenModel(e.target.value)}
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
                onSelectModel={setChosenModel}
            />
        </div>
    )
}