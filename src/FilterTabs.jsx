import './FilterTabs.css';

function FilterTabs({ activeFilter, onFilterChange }) {
    const filters = [
        { key: 'all', label: 'Все' },
        { key: 'not-started', label: 'Не начатые' },
        { key: 'in-progress', label: 'В процессе' },
        { key: 'completed', label: 'Выполненные' }
    ];

    return (
        <div className="filter-tabs">
            <div className="tabs">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        className={`tab ${activeFilter === filter.key ? 'active' : ''}`}
                        onClick={() => onFilterChange(filter.key)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterTabs;