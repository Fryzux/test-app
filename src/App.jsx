import './App.css';
import { useState, useEffect } from 'react';
import ProgressHeader from './ProgressHeader';
import QuickActions from './QuickActions';
import FilterTabs from './FilterTabs';
import TechnologyCard from './TechnologyCard';

function App() {
    // Начальное состояние технологий (обратите внимание: добавлено поле notes)
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'completed',
            notes: ''
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'not-started',
            notes: ''
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'not-started',
            notes: ''
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // --- localStorage: загрузка при старте ---
    useEffect(() => {
        try {
            const saved = localStorage.getItem('techTrackerData');
            if (saved) {
                setTechnologies(JSON.parse(saved));
                console.log('Данные загружены из localStorage');
            }
        } catch (err) {
            console.error('Ошибка загрузки из localStorage', err);
        }
    }, []);

    // --- localStorage: автосохранение при изменении technologies ---
    useEffect(() => {
        try {
            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
            // console.log('Данные сохранены в localStorage');
        } catch (err) {
            console.error('Ошибка сохранения в localStorage', err);
        }
    }, [technologies]);

    // Функция изменения статуса технологии
    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prev => 
            prev.map(tech => 
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    // Обновление заметок
    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech => 
            prevTech.map(tech => 
                tech.id === techId ? { ...tech, notes: newNotes } : tech
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

            // Сначала обновляем состояние (React начнёт ререндер)
            handleStatusChange(randomTech.id, 'in-progress');

            // Вызываем alert асинхронно — даём React отрисовать изменения
            setTimeout(() => {
                alert(`Следующая технология: ${randomTech.title}`);
            }, 0);

        } else {
            setTimeout(() => {
                alert('Все технологии уже начаты или завершены!');
            }, 0);
        }
    };

    // Фильтрация + поиск
    const filteredTechnologies = technologies
        .filter(tech => {
            if (activeFilter === 'all') return true;
            return tech.status === activeFilter;
        })
        .filter(tech => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                tech.title.toLowerCase().includes(q) ||
                tech.description.toLowerCase().includes(q)
            );
        });

    return (
        <div className="App">
            <ProgressHeader technologies={technologies} />
            <QuickActions 
                onMarkAllCompleted={handleMarkAllCompleted}
                onResetAll={handleResetAll}
                onRandomNext={handleRandomNext}
            />

            <div style={{ margin: '12px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="search-box" style={{ flex: 1 }}>
                    <input
                        type="text"
                        placeholder="Поиск технологий..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ minWidth: 140, textAlign: 'right' }}>
                    Найдено: <strong>{filteredTechnologies.length}</strong>
                </div>
            </div>

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
                        onNotesChange={updateTechnologyNotes} // передаём колбэк для заметок
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
