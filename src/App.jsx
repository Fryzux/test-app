import './App.css';
import useTechnologies from './useTechnologies';
import ProgressHeader from './ProgressHeader';
import QuickActions from './QuickActions';
import FilterTabs from './FilterTabs';
import TechnologyCard from './TechnologyCard';
import ProgressBar from './ProgressBar';
import { useState } from 'react';

function App() {
  // Берём все операции и данные из кастомного хука (работает через localStorage)
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    progress
  } = useTechnologies();

  // Локальные UI состояния (фильтр и поиск)
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Обёртки-колбэки для передачи в дочерние компоненты
  const handleStatusChange = (id, newStatus) => updateStatus(id, newStatus);
  const handleNotesChange = (id, notes) => updateNotes(id, notes);
  const handleMarkAllCompleted = () => markAllCompleted();
  const handleResetAll = () => resetAll();

  // Случайный выбор — оставляем прежнюю логику, но используем updateStatus
  const handleRandomNext = () => {
    const notStarted = technologies.filter(t => t.status === 'not-started');

    if (notStarted.length > 0) {
      const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];

      // Обновляем статус (хук сохранит данные в localStorage)
      updateStatus(randomTech.id, 'in-progress');

      // Асинхронный alert, чтобы UI успел обновиться
      setTimeout(() => {
        alert(`Следующая технология: ${randomTech.title}`);
      }, 0);
    } else {
      setTimeout(() => {
        alert('Все технологии уже начаты или завершены!');
      }, 0);
    }
  };

  // Фильтрация + поиск (UI-side)
  const filteredTechnologies = technologies
    .filter(tech => (activeFilter === 'all' ? true : tech.status === activeFilter))
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
      <header style={{ padding: 12 }}>
        <h1 style={{ margin: 0 }}>Трекер изучения технологий</h1>

        {/* общий прогресс */}
        <div style={{ marginTop: 12 }}>
          <ProgressBar progress={progress} label="Общий прогресс" animated={true} />
        </div>

        {/* Опционально — оставляем ProgressHeader (если он показывает дополнительную статистику) */}
        <div style={{ marginTop: 12 }}>
          <ProgressHeader technologies={technologies} />
        </div>
      </header>

      <main style={{ padding: 12 }}>
        {/* Быстрые действия — теперь передаём весь массив, чтобы экспорт/модалки работали */}
        <QuickActions
          onMarkAllCompleted={handleMarkAllCompleted}
          onResetAll={handleResetAll}
          onRandomNext={handleRandomNext}
          technologies={technologies}
        />

        {/* Поиск + счётчик */}
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

        {/* Фильтры */}
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Сетка карточек */}
        <div className="technologies-list" style={{ marginTop: 12, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={handleStatusChange}
              onNotesChange={handleNotesChange}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
