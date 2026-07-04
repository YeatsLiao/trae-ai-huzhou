export const emotionTypes = [
  { id: 'happy', name: '开心', icon: 'Sun', color: '#fbbf24', weather: 'sunny', description: '阳光明媚，心情愉快' },
  { id: 'calm', name: '平静', icon: 'Cloud', color: '#38bdf8', weather: 'cloudy', description: '微风轻拂，内心平和' },
  { id: 'anxious', name: '焦虑', icon: 'CloudRain', color: '#9ca3af', weather: 'rainy', description: '细雨绵绵，思绪纷乱' },
  { id: 'sad', name: '悲伤', icon: 'CloudSnow', color: '#7c3aed', weather: 'snowy', description: '雪花飘落，内心孤寂' },
  { id: 'angry', name: '愤怒', icon: 'Zap', color: '#ef4444', weather: 'thunder', description: '雷电交加，怒火中烧' },
  { id: 'lost', name: '迷茫', icon: 'Fog', color: '#e2e8f0', weather: 'foggy', description: '迷雾笼罩，前路不明' },
  { id: 'tired', name: '疲惫', icon: 'Moon', color: '#f97316', weather: 'night', description: '夜色深沉，身心俱疲' },
  { id: 'energetic', name: '活力', icon: 'Sparkles', color: '#22d3ee', weather: 'windy', description: '清风徐来，充满能量' },
];

export const cityData = [
  { id: 'beijing', name: '北京', lat: 39.9042, lng: 116.4074, emotion: 'calm', count: 2847, topEmotions: [{ id: 'calm', percentage: 35 }, { id: 'happy', percentage: 28 }, { id: 'tired', percentage: 18 }] },
  { id: 'shanghai', name: '上海', lat: 31.2304, lng: 121.4737, emotion: 'energetic', count: 3521, topEmotions: [{ id: 'energetic', percentage: 32 }, { id: 'happy', percentage: 29 }, { id: 'anxious', percentage: 20 }] },
  { id: 'guangzhou', name: '广州', lat: 23.1291, lng: 113.2644, emotion: 'happy', count: 2156, topEmotions: [{ id: 'happy', percentage: 40 }, { id: 'energetic', percentage: 25 }, { id: 'calm', percentage: 20 }] },
  { id: 'shenzhen', name: '深圳', lat: 22.5431, lng: 114.0579, emotion: 'energetic', count: 2890, topEmotions: [{ id: 'energetic', percentage: 38 }, { id: 'happy', percentage: 26 }, { id: 'anxious', percentage: 17 }] },
  { id: 'chengdu', name: '成都', lat: 30.5728, lng: 104.0668, emotion: 'calm', count: 1934, topEmotions: [{ id: 'calm', percentage: 36 }, { id: 'happy', percentage: 27 }, { id: 'tired', percentage: 19 }] },
  { id: 'hangzhou', name: '杭州', lat: 30.2741, lng: 120.1551, emotion: 'happy', count: 1876, topEmotions: [{ id: 'happy', percentage: 34 }, { id: 'calm', percentage: 30 }, { id: 'energetic', percentage: 20 }] },
  { id: 'wuhan', name: '武汉', lat: 30.5928, lng: 114.3055, emotion: 'calm', count: 1567, topEmotions: [{ id: 'calm', percentage: 32 }, { id: 'sad', percentage: 22 }, { id: 'happy', percentage: 21 }] },
  { id: 'xian', name: '西安', lat: 34.3416, lng: 108.9398, emotion: 'tired', count: 1245, topEmotions: [{ id: 'tired', percentage: 28 }, { id: 'calm', percentage: 26 }, { id: 'sad', percentage: 20 }] },
  { id: 'nanjing', name: '南京', lat: 32.0603, lng: 118.7969, emotion: 'happy', count: 1432, topEmotions: [{ id: 'happy', percentage: 31 }, { id: 'calm', percentage: 29 }, { id: 'anxious', percentage: 18 }] },
  { id: 'chongqing', name: '重庆', lat: 29.4316, lng: 106.9123, emotion: 'angry', count: 1678, topEmotions: [{ id: 'angry', percentage: 25 }, { id: 'anxious', percentage: 24 }, { id: 'tired', percentage: 22 }] },
];

export const generateWeeklyTrend = () => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const trend = [];
  
  days.forEach((day, index) => {
    const emotions = emotionTypes.map(e => ({
      ...e,
      value: Math.floor(Math.random() * 30) + 5,
    }));
    emotions.sort((a, b) => b.value - a.value);
    const dominant = emotions[0];
    
    trend.push({
      day,
      date: `0${index + 1}/${index + 10}`,
      total: emotions.reduce((sum, e) => sum + e.value, 0),
      dominant,
      emotions,
    });
  });
  
  return trend;
};

export const generateDailyRecords = () => {
  const records = [];
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  
  hours.forEach((time, index) => {
    const randomEmotion = emotionTypes[Math.floor(Math.random() * emotionTypes.length)];
    records.push({
      id: index,
      time,
      emotion: randomEmotion,
      note: ['感觉还不错', '有点累了', '心情很好', '压力有点大', '很平静', '充满活力'][Math.floor(Math.random() * 6)],
      intensity: Math.floor(Math.random() * 50) + 50,
    });
  });
  
  return records;
};

export const globalStats = {
  totalUsers: 128475,
  todayRecords: 8432,
  activeCities: 42,
  currentMood: 'calm',
  moodLevel: 72,
};
