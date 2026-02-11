import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Settings from '../Settings'
import { MODELS } from '../../phones'
import './style.css'

function Constuctor() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const { chosenBrand: stateBrand, chosenModel: stateModel } = location.state || {}
  const chosenBrand = params.brand || stateBrand
  const chosenModel = params.model || stateModel
  const [bgColor, setBgColor] = useState('#ffffff')
  const modelObj = (MODELS[chosenBrand] || []).find((m) => m.value === chosenModel)

  useEffect(() => {
    if (!chosenBrand || !chosenModel) {
      navigate('/', { replace: true })
    }
  }, [chosenBrand, chosenModel, navigate])

  if (!chosenBrand || !chosenModel) return null

  const handleColorChange = (newValue) => {
    setBgColor(newValue)
  }

  return (
    <div className="constructor">
        <Settings onColorChange={handleColorChange} />
        <img src={modelObj?.model} alt={modelObj?.label} style={{
            backgroundColor: bgColor,
            width: "600px",
        }} />
        <div className='make_order'>
            <button>Сделать заказ</button>
        </div>
    </div>
  )
}

export default Constuctor