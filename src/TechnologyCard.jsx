import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
    const getStatusText = (status) => {
        switch(status) {
            case 'completed': return 'Завершено';
            case 'in-progress': return 'В процессе';
            case 'not-started': return 'Не начато';
            default: return status;
        }
    };

    const getStatusClass = (status) => {
        switch(status) {
            case 'completed': return 'status-completed';
            case 'in-progress': return 'status-in-progress';
            case 'not-started': return 'status-not-started';
            default: return '';
        }
    };

    const handleClick = () => {
        // Циклическое переключение статусов
        const statuses = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statuses.indexOf(technology.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        
        onStatusChange(technology.id, nextStatus);
    };

    return (
        <div 
            className={`technology-card ${getStatusClass(technology.status)}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <h3>{technology.title}</h3>
            <p>{technology.description}</p>
            <div className="status">
                Статус: <strong>{getStatusText(technology.status)}</strong>
            </div>

            {/* Заметки: передаём колбэк onNotesChange (если он есть) */}
            {typeof onNotesChange === 'function' && (
                <TechnologyNotes
                    notes={technology.notes || ''}
                    onNotesChange={onNotesChange}
                    techId={technology.id}
                />
            )}
        </div>
    );
}

export default TechnologyCard;
