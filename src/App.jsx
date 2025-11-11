import './App.css';
import { useState } from 'react';
import ProgressHeader from './ProgressHeader';
import QuickActions from './QuickActions';
import FilterTabs from './FilterTabs';
import TechnologyCard from './TechnologyCard';

function App() {
    // Начальное состояние технологий
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'completed'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'not-started'
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'not-started'
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('all');

    // Функция изменения статуса технологии
    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prev => 
            prev.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    // Быстрые действия
    const handleMarkAllCompleted = () => {
        setTechnologies(prev => 
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    const handleResetAll = () => {
        setTechnologies(prev => 
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    const handleRandomNext = () => {
        const notStarted = technologies.filter(t => t.status === 'not-started');
        if (notStarted.length > 0) {
            const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
            handleStatusChange(randomTech.id, 'in-progress');
            alert(`Следующая технология: ${randomTech.title}`);
        } else {
            alert('Все технологии уже начаты или завершены!');
        }
    };

    // Фильтрация технологий
    const filteredTechnologies = technologies.filter(tech => {
        if (activeFilter === 'all') return true;
        return tech.status === activeFilter;
    });

    return (
        <div className="App">
            <ProgressHeader technologies={technologies} />
            <QuickActions 
                onMarkAllCompleted={handleMarkAllCompleted}
                onResetAll={handleResetAll}
                onRandomNext={handleRandomNext}
            />
            <FilterTabs 
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />
            
            <div className="technologies-list">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        technology={tech}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;