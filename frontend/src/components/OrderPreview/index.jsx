import './style.css'

function OrderPreview({ order, modelImage }) {
  return (
    <div className="order-preview-container">
      <div className="preview-phone" style={{ backgroundColor: order.bgColor }}>
        {modelImage && (
          <img src={modelImage} alt="phone model" className="preview-model" />
        )}
        <div className="preview-stickers">
          {order.stickers && order.stickers.map(sticker => (
            <div
              key={sticker.id}
              className="preview-sticker"
              style={{
                left: `${(sticker.x / 600) * 100}%`,
                top: `${(sticker.y / 600) * 100}%`,
                width: `${(sticker.size / 600) * 100}%`,
                height: `${(sticker.size / 600) * 100}%`,
                transform: `rotate(${sticker.rotation}deg)`,
              }}
            >
              <img src={sticker.src} alt="sticker" />
            </div>
          ))}
        </div>
        <div className="preview-texts">
          {order.textItems && order.textItems.map(textItem => (
            <div
              key={textItem.id}
              className="preview-text"
              style={{
                left: `${(textItem.x / 600) * 100}%`,
                top: `${(textItem.y / 600) * 100}%`,
                transform: `rotate(${textItem.rotation}deg)`,
                fontSize: `${(textItem.fontSize / 600) * 100}%`,
                color: textItem.fontColor,
                fontFamily: textItem.fontFamily,
              }}
            >
              {textItem.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderPreview
