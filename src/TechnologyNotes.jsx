// src/TechnologyNotes.jsx
import React from 'react';

function TechnologyNotes({ notes = '', onNotesChange, techId }) {
  const handleChange = (e) => {
    onNotesChange(techId, e.target.value);
  };

  return (
    <div className="notes-section" style={{ marginTop: 8 }}>
      <h4 style={{ margin: '6px 0' }}>Мои заметки</h4>
      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
        style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
      />
      <div className="notes-hint" style={{ marginTop: 6, fontSize: 12, color: '#555' }}>
        {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` : 'Добавьте заметку'}
      </div>
    </div>
  );
}

export default TechnologyNotes;
