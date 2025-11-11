import { useState } from 'react';

function ColorDisplay({ color }) {
    return (
        <div
            className="color-display"
            style={{
                backgroundColor: color,
                width: '200px',
                height: '100px',
                margin: '10px 0',
                border: '2px solid #333',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <p style={{ color: '#fff', textShadow: '1px 1px 2px #000' }}>
                Выбранный цвет: {color}
            </p>
        </div>
    );
}

function ColorControls({ color, onColorChange }) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    return (
        <div className="color-controls">
            <h3>Выберите цвет:</h3>
            <div className="color-buttons">
                {colors.map((col) => (
                    <button
                        key={col}
                        style={{
                            backgroundColor: col,
                            border: color === col ? '3px solid #000' : '1px solid #ccc',
                            padding: '10px 20px',
                            margin: '5px',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                        onClick={() => onColorChange(col)}
                    >
                        {col}
                    </button>
                ))}
            </div>
        </div>
    );
}

function ColorPicker() {
    const [selectedColor, setSelectedColor] = useState('#ff0000');

    return (
        <div className="color-picker">
            <h2>Выбор цвета</h2>
            <ColorDisplay color={selectedColor} />
            <ColorControls
                color={selectedColor}
                onColorChange={setSelectedColor}
            />
        </div>
    );
}

export default ColorPicker;