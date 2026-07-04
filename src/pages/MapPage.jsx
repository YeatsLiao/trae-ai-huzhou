import { useState } from 'react';
import { MapPin, Filter, ChevronRight } from 'lucide-react';
import EmotionIcon from '../components/EmotionIcon';
import { cityData, emotionTypes } from '../data/mockData';

function ChinaMap({ cities, onCitySelect, selectedCity }) {
  const mapPoints = {
    beijing: { x: 55, y: 22 },
    shanghai: { x: 78, y: 38 },
    guangzhou: { x: 72, y: 65 },
    shenzhen: { x: 74, y: 68 },
    chengdu: { x: 35, y: 50 },
    hangzhou: { x: 75, y: 35 },
    wuhan: { x: 58, y: 48 },
    xian: { x: 42, y: 35 },
    nanjing: { x: 68, y: 33 },
    chongqing: { x: 40, y: 55 },
  };
  
  return (
    <div className="relative w-full aspect-[4/3] bg-bg-card/50 backdrop-blur-lg rounded-2xl border border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky/10 via-purple/5 to-pink/10"></div>
      
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <path
          d="M25,30 Q30,25 35,28 L40,20 Q45,18 50,22 L55,18 Q60,15 65,20 L70,25 Q75,28 78,22 L80,30 Q85,32 82,38 L78,45 Q75,50 70,48 L65,55 Q60,60 55,58 L50,62 Q45,65 40,60 L35,55 Q30,50 28,45 L25,38 Q22,32 25,30 Z"
          fill="url(#mapGradient)"
          stroke="#38bdf8"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />
        
        {cities.map((city) => {
          const point = mapPoints[city.id];
          if (!point) return null;
          
          const emotion = emotionTypes.find(e => e.id === city.emotion);
          const isSelected = selectedCity?.id === city.id;
          
          return (
            <g key={city.id} onClick={() => onCitySelect(city)}>
              {isSelected && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={emotion?.color}
                  opacity="0.3"
                  className="animate-ping"
                />
              )}
              <circle
                cx={point.x}
                cy={point.y}
                r={isSelected ? "2.5" : "2"}
                fill={emotion?.color}
                className="transition-all duration-300 cursor-pointer"
                style={{ 
                  filter: `drop-shadow(0 0 ${isSelected ? '8px' : '4px'} ${emotion?.color})` 
                }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="1"
                fill="white"
              />
            </g>
          );
        })}
      </svg>
      
      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <div className="bg-bg-secondary/90 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-4">
          {emotionTypes.slice(0, 4).map((emotion) => (
            <div key={emotion.id} className="flex items-center gap-1">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: emotion.color }}
              />
              <span className="text-xs text-text-tertiary">{emotion.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [filterEmotion, setFilterEmotion] = useState('all');
  
  const filteredCities = filterEmotion === 'all' 
    ? cityData 
    : cityData.filter(c => c.emotion === filterEmotion);
  
  return (
    <div className="min-h-screen pb-24 pt-20 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">城市情绪地图</h2>
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
        {emotionTypes.slice(0, 4).map((emotion) => (
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
      
      <ChinaMap 
        cities={filteredCities} 
        onCitySelect={setSelectedCity}
        selectedCity={selectedCity}
      />
      
      {selectedCity && (
        <div className="mt-6 bg-bg-card/80 backdrop-blur-xl rounded-2xl border border-border p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${selectedCity.emotion.color}20`,
                  boxShadow: `0 0 12px ${selectedCity.emotion.color}30`
                }}
              >
                <MapPin className="w-6 h-6" style={{ color: selectedCity.emotion.color }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">{selectedCity.name}</h3>
                <p className="text-sm text-text-secondary">
                  当前情绪: <span style={{ color: selectedCity.emotion.color }}>{selectedCity.emotion.name}</span>
                </p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedCity(null)}
              className="w-8 h-8 rounded-lg bg-bg-tertiary/50 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
          
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-bg-tertiary/50 rounded-xl p-3">
              <p className="text-xs text-text-tertiary mb-1">参与人数</p>
              <p className="text-lg font-bold text-text-primary">{selectedCity.count}</p>
            </div>
            <div className="flex-1 bg-bg-tertiary/50 rounded-xl p-3">
              <p className="text-xs text-text-tertiary mb-1">活跃指数</p>
              <p className="text-lg font-bold text-text-primary">{Math.floor(selectedCity.count / 50)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-text-tertiary mb-3">情绪分布</p>
            <div className="space-y-2">
              {selectedCity.topEmotions.map((item) => {
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
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">热门城市</h3>
        <div className="space-y-3">
          {cityData.slice(0, 5).map((city) => {
            const emotion = emotionTypes.find(e => e.id === city.emotion);
            return (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  selectedCity?.id === city.id 
                    ? 'bg-bg-card-hover ring-2' 
                    : 'bg-bg-card/50 hover:bg-bg-card'
                }`}
                style={{ 
                  ringColor: emotion?.color,
                  boxShadow: selectedCity?.id === city.id ? `0 0 16px ${emotion?.color}30` : undefined
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
                  <p className="font-semibold text-text-primary">{city.name}</p>
                  <p className="text-sm text-text-tertiary">{city.count} 人参与</p>
                </div>
                <EmotionIcon emotion={emotion} size="md" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
