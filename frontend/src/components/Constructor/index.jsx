import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Settings from '../Settings'
import { MODELS } from '../../phones'
import './style.css'

export default function Constructor() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const { chosenBrand: stateBrand, chosenModel: stateModel } = location.state || {}
  const chosenBrand = params.brand || stateBrand
  const chosenModel = params.model || stateModel
  const [bgColor, setBgColor] = useState('#ffffff')
  const [stickers, setStickers] = useState([])
  const [selectedSticker, setSelectedSticker] = useState(null)
  const [textItems, setTextItems] = useState([])
  const [selectedText, setSelectedText] = useState(null)
  const previewRef = useRef(null)
  const modelObj = (MODELS[chosenBrand] || []).find((m) => m.value === chosenModel)

  useEffect(() => {
    if (!chosenBrand || !chosenModel) {
      navigate('/', { replace: true })
    }
  }, [chosenBrand, chosenModel, navigate])

  const handleColorChange = (newValue) => {
    setBgColor(newValue)
  }

  const handleAddSticker = (stickerData) => {
    const newSticker = {
      id: Date.now(),
      src: stickerData,
      x: 150,
      y: 150,
      size: 120,
      rotation: 0,
    }
    setStickers([...stickers, newSticker])
    setSelectedSticker(newSticker.id)
  }

  const handleRemoveSticker = (id) => {
    setStickers(stickers.filter(s => s.id !== id))
    if (selectedSticker === id) setSelectedSticker(null)
  }

  const handleUpdateSticker = (id, updates) => {
    setStickers(stickers.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const handleAddText = (textContent) => {
    const newText = {
      id: Date.now(),
      text: textContent,
      x: 150,
      y: 100,
      fontSize: 32,
      fontColor: '#000000',
      fontFamily: 'Arial',
      rotation: 0,
    }
    setTextItems([...textItems, newText])
    setSelectedText(newText.id)
  }

  const handleRemoveText = (id) => {
    setTextItems(textItems.filter(t => t.id !== id))
    if (selectedText === id) setSelectedText(null)
  }


  const handleTextMouseDown = (e, id) => {
    e.stopPropagation()
    const textItem = textItems.find(t => t.id === id)
    if (!textItem || !previewRef.current) return
    
    setSelectedText(id)
    
    const dragStartX = e.clientX
    const dragStartY = e.clientY
    const textStartX = textItem.x
    const textStartY = textItem.y

    const handleMouseMove = (moveEvent) => {
      if (!previewRef.current) return

      const rect = previewRef.current.getBoundingClientRect()
      const deltaX = moveEvent.clientX - dragStartX
      const deltaY = moveEvent.clientY - dragStartY

      const newX = textStartX + deltaX
      const newY = textStartY + deltaY

      setTextItems(prevTextItems => prevTextItems.map(t => 
        t.id === id 
          ? {
              ...t,
              x: Math.max(0, Math.min(newX, rect.width - 50)),
              y: Math.max(0, Math.min(newY, rect.height - 50)),
            }
          : t
      ))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleStickerMouseDown = (e, id) => {
    e.stopPropagation()
    const sticker = stickers.find(s => s.id === id)
    if (!sticker || !previewRef.current) return
    
    setSelectedSticker(id)
    
    const dragStartX = e.clientX
    const dragStartY = e.clientY
    const stickerStartX = sticker.x
    const stickerStartY = sticker.y

    const handleMouseMove = (moveEvent) => {
      if (!previewRef.current) return

      const rect = previewRef.current.getBoundingClientRect()
      const deltaX = moveEvent.clientX - dragStartX
      const deltaY = moveEvent.clientY - dragStartY

      const newX = stickerStartX + deltaX
      const newY = stickerStartY + deltaY

      setStickers(prevStickers => prevStickers.map(s => 
        s.id === id 
          ? {
              ...s,
              x: Math.max(0, Math.min(newX, rect.width - 50)),
              y: Math.max(0, Math.min(newY, rect.height - 50)),
            }
          : s
      ))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleResizeSticker = (e, id, direction) => {
    e.stopPropagation()
    const sticker = stickers.find(s => s.id === id)
    if (!sticker) return
    
    const startSize = sticker.size
    const startX = e.clientX
    const startY = e.clientY

    const handleMouseMove = (moveEvent) => {
      let newSize = startSize
      
      if (direction.includes('e')) {
        newSize += moveEvent.clientX - startX
      }
      if (direction.includes('s')) {
        newSize += moveEvent.clientY - startY
      }

      newSize = Math.max(40, Math.min(300, newSize))
      handleUpdateSticker(id, { size: newSize })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleRotateSticker = (e, id) => {
    e.stopPropagation()
    const sticker = stickers.find(s => s.id === id)
    if (!sticker || !previewRef.current) return
    
    const rect = previewRef.current.getBoundingClientRect()
    const centerX = rect.left + sticker.x + sticker.size / 2
    const centerY = rect.top + sticker.y + sticker.size / 2

    const handleMouseMove = (moveEvent) => {
      const angle = Math.atan2(
        moveEvent.clientY - centerY,
        moveEvent.clientX - centerX
      ) * 180 / Math.PI

      handleUpdateSticker(id, { rotation: angle })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMakeOrder = () => {
    const order = {
      id: Date.now(),
      brand: chosenBrand,
      model: chosenModel,
      bgColor: bgColor,
      stickers: stickers,
      textItems: textItems,
      date: new Date().toLocaleDateString('ru-RU'),
      time: new Date().toLocaleTimeString('ru-RU'),
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    alert('Заказ успешно создан! Посмотрите в профиле.')
    navigate('/profile')
  }

  if (!chosenBrand || !chosenModel) return null

  return (
    <div className="constructor">
      <Settings onColorChange={handleColorChange} onAddSticker={handleAddSticker} onAddText={handleAddText} />
      <div className="preview-container">
        <div className="phone-preview" ref={previewRef} style={{ backgroundColor: bgColor }}>
          <img src={modelObj?.model} alt={modelObj?.label} style={{
            width: "600px",
            position: "relative",
            zIndex: 10,
          }} />
          <div className="stickers-layer">
            {stickers.map(sticker => (
              <div
                key={sticker.id}
                className={`sticker-wrapper ${selectedSticker === sticker.id ? 'selected' : ''}`}
                style={{
                  left: `${sticker.x}px`,
                  top: `${sticker.y}px`,
                  width: `${sticker.size}px`,
                  height: `${sticker.size}px`,
                  transform: `rotate(${sticker.rotation}deg)`,
                }}
                onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
                onClick={() => setSelectedSticker(sticker.id)}
              >
                <img 
                  src={sticker.src} 
                  alt="sticker"
                  draggable={false}
                />
                {selectedSticker === sticker.id && (
                  <>
                    <button
                      className="control-btn remove-btn"
                      onClick={() => handleRemoveSticker(sticker.id)}
                      title="Удалить"
                    >
                      ✕
                    </button>
                    <div
                      className="resize-handle se"
                      onMouseDown={(e) => handleResizeSticker(e, sticker.id, 'se')}
                      title="Изменить размер"
                    ></div>
                    <div
                      className="rotate-handle"
                      onMouseDown={(e) => handleRotateSticker(e, sticker.id)}
                      title="Повернуть"
                    >
                      ⟳
                    </div>
                  </>
                )}
              </div>
            ))}
            {textItems.map(textItem => (
              <div
                key={textItem.id}
                className={`text-wrapper ${selectedText === textItem.id ? 'selected' : ''}`}
                style={{
                  left: `${textItem.x}px`,
                  top: `${textItem.y}px`,
                  transform: `rotate(${textItem.rotation}deg)`,
                }}
                onMouseDown={(e) => handleTextMouseDown(e, textItem.id)}
                onClick={() => setSelectedText(textItem.id)}
              >
                <div
                  className="text-content"
                  style={{
                    fontSize: `${textItem.fontSize}px`,
                    color: textItem.fontColor,
                    fontFamily: textItem.fontFamily,
                    whiteSpace: 'nowrap',
                  }}
                  draggable={false}
                >
                  {textItem.text}
                </div>
                {selectedText === textItem.id && (
                  <button
                    className="control-btn remove-btn"
                    onClick={() => handleRemoveText(textItem.id)}
                    title="Удалить"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="controls-hint">
          {selectedSticker ? (
            <p>Перетащите для перемещения, используйте ⟳ для поворота</p>
          ) : selectedText ? (
            <p>Перетащите текст для перемещения</p>
          ) : (
            <p>Нажмите на элемент для редактирования</p>
          )}
        </div>
      </div>
      <div className='order-panel'>
        <div className='order-info'>
          <h3>Ваш дизайн</h3>
          <p><strong>Модель:</strong> {modelObj?.label}</p>
          <p><strong>Цвет:</strong> <span style={{backgroundColor: bgColor, width: '30px', height: '30px', display: 'inline-block', borderRadius: '4px'}}></span></p>
          <p><strong>Наклеек:</strong> {stickers.length}</p>
          <p><strong>Текст:</strong> {textItems.length}</p>
        </div>
        <button className="order-btn" onClick={handleMakeOrder}>Сделать заказ</button>
      </div>
    </div>
  )
}
