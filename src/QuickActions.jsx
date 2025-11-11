import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="actions-grid">
                <button className="action-btn" onClick={onMarkAllCompleted}>
                    Отметить все как выполненные
                </button>
                <button className="action-btn" onClick={onResetAll}>
                    Сбросить все статусы
                </button>
                <button className="action-btn" onClick={onRandomNext}>
                    Случайный выбор следующей технологии
                </button>
            </div>
        </div>
    );
}

export default QuickActions;