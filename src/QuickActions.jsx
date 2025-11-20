import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    const data = { exportedAt: new Date().toISOString(), technologies };
    const dataStr = JSON.stringify(data, null, 2);
    // создаём скачиваемый файл
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technologies-export.json';
    a.click();
    URL.revokeObjectURL(url);

    setShowExportModal(true);
  };

  return (
    <div className="quick-actions" style={{ marginBottom: 12 }}>
      <h3>Быстрые действия</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={onMarkAllCompleted}>✅ Отметить все как выполненные</button>
        <button onClick={onResetAll}>🔄 Сбросить все статусы</button>
        <button onClick={handleExport}>📤 Экспорт данных</button>
      </div>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Экспорт данных">
        <p>Данные подготовлены и скачаны как <code>technologies-export.json</code>.</p>
        <button onClick={() => setShowExportModal(false)}>Закрыть</button>
      </Modal>
    </div>
  );
}

export default QuickActions;
