import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    // Статистика
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-header">
            <div className="stats">
                <h2>Прогресс изучения</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">Всего технологий</span>
                        <span className="stat-value">{total}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Изучено</span>
                        <span className="stat-value">{completed}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Не начато</span>
                        <span className="stat-value">{notStarted}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">В процессе</span>
                        <span className="stat-value">{inProgress}</span>
                    </div>
                </div>
            </div>
            
            <div className="progress-bar-container">
                <div className="progress-info">
                    <span>{progressPercentage}% завершено</span>
                </div>
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;