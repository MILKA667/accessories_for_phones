import { useState } from 'react'
import './style.css'

function Settings({ onColorChange, onAddSticker, onAddText }) {
  const [stickerPreview, setStickerPreview] = useState(null)
  const [textInput, setTextInput] = useState('')

  const handleStickerUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setStickerPreview(event.target.result)
        onAddSticker(event.target.result)
        e.target.value = '' // Очистить input
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddText(textInput)
      setTextInput('')
    }
  }

  const handleTextKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddText()
    }
  }

  return (
    <aside className="settings">
      <div className="settings_header">
        <h3>Настройки чехла</h3>
      </div>

      <div className="settings_menu">
        <section className="settings_section">
          <h4>Цвет задней панели</h4>
          <div className="color_picker">
            <input 
              type="color" 
              id="color_input" 
              name="color_input" 
              onChange={(e) => onColorChange(e.target.value)} 
              defaultValue="#ffffff"
            />
          </div>
        </section>

        <section className="settings_section">
          <h4>Наклейки</h4>
          <div className="stickers-upload">
            <label htmlFor="sticker-input" className="upload-label">
              <div className="upload-box">
                <span className="upload-icon">+</span>
                <span>Загрузить наклейку</span>
              </div>
            </label>
            <input
              id="sticker-input"
              type="file"
              accept="image/*"
              onChange={handleStickerUpload}
              style={{ display: 'none' }}
            />
            {stickerPreview && (
              <div className="sticker-preview">
                <img src={stickerPreview} alt="preview" />
              </div>
            )}
          </div>
        </section>

        <section className="settings_section">
          <h4>Текст на чехле</h4>
          <div className="text-section">
            <input 
              type="text" 
              placeholder="Введите текст..." 
              className="text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleTextKeyPress}
            />
            <button 
              className="add-text-btn"
              onClick={handleAddText}
              disabled={!textInput.trim()}
            >
              Добавить
            </button>
          </div>
        </section>
      </div>
    </aside>
  )
}

export default Settings