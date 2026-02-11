import './style.css'

function Settings({ onColorChange }) {
    return (
        <aside className="settings">
            <div className="settings_header">
                <h3>Настройки чехла</h3>
            </div>

            <div className="settings_menu">
                <section className="settings_section">
                    <h4>Цвет задней панели</h4>
                    <div className="color_picker">
                        <input type="color" id="color_input" name="color_input" onChange={(e) => onColorChange(e.target.value)} />
                    </div>
                </section>

                <section className="settings_section">
                    <h4>Наклейки</h4>
                </section>

                <section className="settings_section">
                    <h4>Текст на чехле</h4>
                    <div className="text">
                    </div>
                </section>
            </div>
        </aside>
    )
}

export default Settings;