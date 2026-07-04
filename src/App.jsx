import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import TabBar from './components/TabBar';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import TrendPage from './pages/TrendPage';
import MoodPage from './pages/MoodPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleOpenMood = () => {
    setActiveTab('mood');
    setSelectedEmotion(null);
  };

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleBackFromDetail = () => {
    setSelectedEmotion(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'mood') {
      setSelectedEmotion(null);
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onOpenMood={handleOpenMood} />;
      case 'map':
        return <MapPage />;
      case 'trend':
        return <TrendPage />;
      case 'mood':
        return (
          <MoodPage 
            selectedEmotion={selectedEmotion}
            onSelectEmotion={handleSelectEmotion}
            onBack={handleBackFromDetail}
          />
        );
      default:
        return <HomePage onOpenMood={handleOpenMood} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar 
        title={activeTab === 'home' ? '情绪天空' : 
               activeTab === 'map' ? '城市情绪地图' : 
               activeTab === 'trend' ? '情绪趋势' : 
               activeTab === 'mood' && selectedEmotion ? `${selectedEmotion.name}` : '心情记录'}
        showBack={activeTab === 'mood' && selectedEmotion}
        onBack={handleBackFromDetail}
      />
      {renderPage()}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
