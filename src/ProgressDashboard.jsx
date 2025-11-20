import React from 'react';
import ProgressBar from './ProgressBar';
import './ProgressDashboard.css';

function ProgressDashboard({ overall = 0, frontend = 0, backend = 0, database = 0, weekly = [] }) {
  // Защита: если weekly не массив — приводим к пустому массиву и логируем проблему
  if (!Array.isArray(weekly)) {
    // Иногда weekly приходит как object/undefined — логируем для отладки
    // eslint-disable-next-line no-console
    console.warn('ProgressDashboard: expected prop "weekly" to be an array, got:', weekly);
    weekly = [];
  }

  // Защита: если ProgressBar не импортирован/undefined — показываем fallback
  const Bar = ProgressBar || (() => <div style={{ color: 'red' }}>ProgressBar missing</div>);

  return (
    <div className="progress-dashboard">
      <h2>Мой прогресс в изучении</h2>

      <Bar progress={overall} label="Общий прогресс" color="#2196F3" height={22} animated />

      <div className="section-row" style={{ marginTop: 12 }}>
        <Bar progress={frontend} label="Фронтенд" color="#4CAF50" />
        <Bar progress={backend} label="Бэкенд" color="#FF9800" />
      </div>

      <div className="weekly-progress" style={{ marginTop: 18 }}>
        <h3>Прогресс по неделям</h3>
        <div className="weekly-bars">
          {weekly.length === 0 ? (
            <div className="no-weeks" style={{ color: '#666' }}>Данных по неделям нет</div>
          ) : (
            weekly.map((p, i) => (
              <div key={i} className="week-item">
                <span className="week-label">Неделя {i + 1}</span>
                <Bar progress={Number(p) || 0} height={12} showPercentage={false} color="#9C27B0" />
                <span className="week-percentage">{Number(p) || 0}%</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressDashboard;
