import { useState } from 'react';
import { MapPin, Filter, ChevronRight, MessageCircle, Users } from 'lucide-react';
import EmotionIcon from '../components/EmotionIcon';
import ChinaMapChart, { provinceEmotionData } from '../components/ChinaMapChart';
import { useTheme } from '../context/ThemeContext';
import { emotionTypes, emotionNotes, cityData, generateCityRecords } from '../data/mockData';

function ProvinceRecords({ records }) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-purple" />
        <span className="text-sm font-medium text-text-primary">实时留言</span>
      </div>
      <div className="space-y-3">
        {records.slice(0, 5).map((record) => (
          <div 
            key={record.id} 
            className="p-3 bg-bg-tertiary/30 rounded-xl flex items-start gap-3"
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${record.emotion.color}20` }}
            >
              <EmotionIcon emotion={record.emotion} size="sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary truncate">{record.note}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-text-tertiary">{record.time}</span>
                <div 
                  className="flex-1 h-1 bg-bg-tertiary rounded-full overflow-hidden"
                >
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${record.intensity}%`,
                      backgroundColor: record.emotion.color
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProvinceEmotionDistribution({ province }) {
  const emotions = [
    { id: 'happy', percentage: 25 + Math.floor(Math.random() * 15) },
    { id: 'calm', percentage: 25 + Math.floor(Math.random() * 15) },
    { id: 'energetic', percentage: 15 + Math.floor(Math.random() * 10) },
    { id: 'tired', percentage: 15 + Math.floor(Math.random() * 10) },
    { id: 'anxious', percentage: 10 + Math.floor(Math.random() * 10) },
    { id: 'sad', percentage: 5 + Math.floor(Math.random() * 5) },
  ];
  const total = emotions.reduce((sum, e) => sum + e.percentage, 0);
  const normalized = emotions.map(e => ({
    ...e,
    percentage: Math.round((e.percentage / total) * 100),
  })).sort((a, b) => b.percentage - a.percentage);

  return (
    <div>
      <p className="text-xs text-text-tertiary mb-3">情绪分布</p>
      <div className="space-y-2">
        {normalized.map((item) => {
          const emotion = emotionTypes.find(e => e.id === item.id);
          return (
            <div key={item.id} className="flex items-center gap-3">
              <EmotionIcon emotion={emotion} size="sm" />
              <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: emotion?.color
                  }}
                />
              </div>
              <span className="text-xs text-text-secondary w-8">{item.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function generateProvinceRecords(provinceName) {
  const records = [];
  const seed = provinceName.charCodeAt(0);
  
  for (let i = 0; i < 8; i++) {
    const emotionIndex = (seed + i) % emotionTypes.length;
    const randomEmotion = emotionTypes[emotionIndex];
    const notes = emotionNotes[randomEmotion.id];
    const noteIndex = (seed + i * 3) % notes.length;
    
    records.push({
      id: i,
      time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      emotion: randomEmotion,
      note: notes[noteIndex],
      intensity: Math.floor(Math.random() * 50) + 50,
    });
  }
  
  return records;
}

export default function MapPage() {
  const { theme } = useTheme();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [filterEmotion, setFilterEmotion] = useState('all');
  const [provinceRecords, setProvinceRecords] = useState([]);
  
  const filteredProvinces = filterEmotion === 'all' 
    ? provinceEmotionData 
    : provinceEmotionData.filter(p => p.emotion === filterEmotion);
  
  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setProvinceRecords(generateProvinceRecords(province.name));
  };
  
  const emotionColors = {
    happy: '#fbbf24',
    calm: '#38bdf8',
    anxious: '#9ca3af',
    sad: '#7c3aed',
    angry: '#ef4444',
    lost: '#64748b',
    tired: '#f97316',
    energetic: '#22d3ee',
  };
  
  return (
    <div className="min-h-screen pb-24 pt-20 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">中国情绪地图</h2>
          <p className="text-sm text-text-secondary mt-1">覆盖 {provinceEmotionData.length} 个省份</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-bg-card/50 backdrop-blur-lg rounded-xl border border-border hover:bg-bg-card transition-colors">
          <Filter className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">筛选</span>
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        <button
          onClick={() => setFilterEmotion('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            filterEmotion === 'all' 
              ? 'bg-sky text-white' 
              : 'bg-bg-card/50 text-text-secondary hover:bg-bg-card'
          }`}
        >
          全部
        </button>
        {emotionTypes.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => setFilterEmotion(emotion.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              filterEmotion === emotion.id 
                ? 'text-white' 
                : 'bg-bg-card/50 text-text-secondary hover:bg-bg-card'
            }`}
            style={{ 
              backgroundColor: filterEmotion === emotion.id ? emotion.color : undefined,
              boxShadow: filterEmotion === emotion.id ? `0 0 12px ${emotion.color}40` : undefined
            }}
          >
            {emotion.name}
          </button>
        ))}
      </div>
      
      <ChinaMapChart 
        onProvinceSelect={handleProvinceSelect}
        selectedProvince={selectedProvince}
        theme={theme}
      />
      
      {selectedProvince && (
        <div className="mt-6 bg-bg-card/80 backdrop-blur-xl rounded-2xl border border-border p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${emotionColors[selectedProvince.emotion]}20`,
                  boxShadow: `0 0 12px ${emotionColors[selectedProvince.emotion]}30`
                }}
              >
                <MapPin className="w-6 h-6" style={{ color: emotionColors[selectedProvince.emotion] }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">{selectedProvince.name}</h3>
                <p className="text-sm text-text-secondary">
                  当前情绪: <span style={{ color: emotionColors[selectedProvince.emotion] }}>{selectedProvince.emotionName}</span>
                </p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedProvince(null)}
              className="w-8 h-8 rounded-lg bg-bg-tertiary/50 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
          
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-bg-tertiary/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-3 h-3 text-sky" />
                <span className="text-xs text-text-tertiary">参与人数</span>
              </div>
              <p className="text-lg font-bold text-text-primary">{selectedProvince.userCount?.toLocaleString() || (Math.floor(Math.random() * 5000) + 1000).toLocaleString()}</p>
            </div>
            <div className="flex-1 bg-bg-tertiary/50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-3 h-3 text-purple" />
                <span className="text-xs text-text-tertiary">留言数</span>
              </div>
              <p className="text-lg font-bold text-text-primary">{selectedProvince.messageCount?.toLocaleString() || (Math.floor(Math.random() * 3000) + 500).toLocaleString()}</p>
            </div>
          </div>
          
          <ProvinceEmotionDistribution province={selectedProvince} />
          
          <ProvinceRecords records={provinceRecords} />
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">热门城市</h3>
        <div className="grid grid-cols-2 gap-3">
          {cityData.slice(0, 8).map((city) => {
            const emotion = emotionTypes.find(e => e.id === city.emotion);
            return (
              <button
                key={city.id}
                onClick={() => {
                  const province = provinceEmotionData.find(p => 
                    city.name.includes(p.name) || p.name.includes(city.name)
                  );
                  if (province) {
                    handleProvinceSelect(province);
                  }
                }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  selectedProvince?.name === city.name 
                    ? 'bg-bg-card-hover ring-2' 
                    : 'bg-bg-card/50 hover:bg-bg-card'
                }`}
                style={{ 
                  ringColor: emotion?.color,
                  boxShadow: selectedProvince?.name === city.name ? `0 0 16px ${emotion?.color}30` : undefined
                }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${emotion?.color}20`,
                    boxShadow: `0 0 8px ${emotion?.color}20`
                  }}
                >
                  <MapPin className="w-5 h-5" style={{ color: emotion?.color }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-text-primary text-sm">{city.name}</p>
                  <p className="text-xs text-text-tertiary">{city.count} 人</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
