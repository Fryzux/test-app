import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import './ProgressDashboard.css';

function ProgressDashboard({ overall = 0, frontend = 0, backend = 0, weekly = [] }) {
  // Защита: если weekly не массив — приводим к пустому массиву и логируем проблему
  if (!Array.isArray(weekly)) {
    // eslint-disable-next-line no-console
    console.warn('ProgressDashboard: expected prop "weekly" to be an array, got:', weekly);
    weekly = [];
  }

  // Защита: если ProgressBar не импортирован/undefined — показываем fallback
  const Bar = ProgressBar || (() => <div style={{ color: 'red' }}>ProgressBar missing</div>);

  return (
    <section className="progress-dashboard" aria-label="Progress dashboard">
      <h2>Мой прогресс в изучении</h2>

      <div className="progress-overall" aria-hidden={false}>
        <Bar progress={Number(overall) || 0} label="Общий прогресс" color="#2196F3" height={22} animated />
      </div>

      <div className="section-row" style={{ marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <Bar progress={Number(frontend) || 0} label="Фронтенд" color="#4CAF50" />
        </div>
        <div style={{ flex: 1 }}>
          <Bar progress={Number(backend) || 0} label="Бэкенд" color="#FF9800" />
        </div>
      </div>

      <div className="weekly-progress" style={{ marginTop: 18 }}>
        <h3>Прогресс по неделям</h3>
        <div className="weekly-bars">
          {weekly.length === 0 ? (
            <div className="no-weeks" style={{ color: '#666' }}>Данных по неделям нет</div>
          ) : (
            weekly.map((p, i) => (
              <div key={i} className="week-item" role="group" aria-label={`Week ${i + 1} progress`}>
                <span className="week-label">Неделя {i + 1}</span>
                <div style={{ flex: 1, margin: '0 12px' }}>
                  <Bar progress={Number(p) || 0} height={12} showPercentage={false} color="#9C27B0" />
                </div>
                <span className="week-percentage">{Number(p) || 0}%</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

ProgressDashboard.propTypes = {
  overall: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  frontend: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backend: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weekly: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

export default React.memo(ProgressDashboard);
