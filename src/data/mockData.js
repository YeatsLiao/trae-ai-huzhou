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

export const emotionNotes = {
  happy: [
    '今天收到了心仪公司的offer！',
    '和好朋友一起吃了顿火锅，太开心了',
    '努力了很久的项目终于上线了',
    '收到了意外的礼物，惊喜满满',
    '周末去海边玩了，心情超好',
    '今天升职加薪啦！',
    '暗恋的人主动联系我了',
    '买到了限量版的球鞋',
  ],
  calm: [
    '泡了一杯热茶，静静地看书',
    '在公园散步，感受微风拂面',
    '今天工作很顺利，没有加班',
    '听着喜欢的音乐，放松一下',
    '做了一顿美味的晚餐',
    '午后小憩，感觉很惬意',
    '读完了一本好书',
    '和家人视频聊天很愉快',
  ],
  anxious: [
    '明天要面试，有点紧张',
    '项目进度有点赶，压力好大',
    '最近总是失眠，担心身体',
    '马上要考试了，还没复习完',
    '不知道该怎么选择职业方向',
    '房贷压力有点大',
    '家人身体不太好，很担心',
    '工作中犯了个小错误',
  ],
  sad: [
    '养了很久的宠物离开了',
    '和男朋友分手了',
    '今天被老板批评了',
    '错过了回家的末班车',
    '努力了很久的事情失败了',
    '最好的朋友要去外地工作了',
    '看到别人秀恩爱，有点孤单',
    '下雨天，心情很低落',
  ],
  angry: [
    '被同事甩锅了，太过分了',
    '外卖送错了还态度不好',
    '排队时被人插队',
    '等了很久的公交车迟迟不来',
    '项目被毫无理由地驳回',
    '被朋友放鸽子了',
    '新买的东西坏了',
    '堵车堵了一个小时',
  ],
  lost: [
    '不知道未来该怎么走',
    '感觉自己的努力没有方向',
    '毕业两年了，还是很迷茫',
    '不知道自己真正喜欢什么',
    '站在人生的十字路口',
    '工作两年了，感觉没什么成长',
    '不知道要不要换城市',
    '对未来感到很焦虑',
  ],
  tired: [
    '连续加班一周，累到不行',
    '昨晚没睡好，今天好困',
    '带孩子一天，精疲力竭',
    '周末还要加班，好累',
    '身体感觉被掏空',
    '走了很多路，脚很酸',
    '最近事情太多，有点吃不消',
    '生病刚好，还很虚弱',
  ],
  energetic: [
    '今天元气满满，干劲十足',
    '跑完步感觉充满能量',
    '新的一天，新的开始',
    '想到要去旅行就很兴奋',
    '早上起来状态超好',
    '准备开始健身计划',
    '学了新技能，很有成就感',
    '和朋友们聚会，玩得很开心',
  ],
};

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
  { id: 'tianjin', name: '天津', lat: 39.0842, lng: 117.2008, emotion: 'calm', count: 1345, topEmotions: [{ id: 'calm', percentage: 33 }, { id: 'happy', percentage: 27 }, { id: 'tired', percentage: 20 }] },
  { id: 'suzhou', name: '苏州', lat: 31.2990, lng: 120.5853, emotion: 'happy', count: 1287, topEmotions: [{ id: 'happy', percentage: 35 }, { id: 'calm', percentage: 32 }, { id: 'energetic', percentage: 18 }] },
  { id: 'dongguan', name: '东莞', lat: 23.0215, lng: 113.7516, emotion: 'tired', count: 1156, topEmotions: [{ id: 'tired', percentage: 30 }, { id: 'anxious', percentage: 25 }, { id: 'happy', percentage: 22 }] },
  { id: 'zhengzhou', name: '郑州', lat: 34.7466, lng: 113.6253, emotion: 'anxious', count: 1098, topEmotions: [{ id: 'anxious', percentage: 32 }, { id: 'tired', percentage: 26 }, { id: 'calm', percentage: 20 }] },
  { id: 'changsha', name: '长沙', lat: 28.2280, lng: 112.9388, emotion: 'happy', count: 1056, topEmotions: [{ id: 'happy', percentage: 36 }, { id: 'energetic', percentage: 28 }, { id: 'calm', percentage: 20 }] },
  { id: 'fuzhou', name: '福州', lat: 26.0745, lng: 119.2965, emotion: 'calm', count: 987, topEmotions: [{ id: 'calm', percentage: 38 }, { id: 'happy', percentage: 25 }, { id: 'tired', percentage: 18 }] },
  { id: 'wuxi', name: '无锡', lat: 31.4912, lng: 120.3119, emotion: 'happy', count: 923, topEmotions: [{ id: 'happy', percentage: 34 }, { id: 'calm', percentage: 31 }, { id: 'energetic', percentage: 19 }] },
  { id: 'qingdao', name: '青岛', lat: 36.0671, lng: 120.3826, emotion: 'energetic', count: 892, topEmotions: [{ id: 'energetic', percentage: 35 }, { id: 'happy', percentage: 30 }, { id: 'calm', percentage: 20 }] },
  { id: 'shenyang', name: '沈阳', lat: 41.8057, lng: 123.4315, emotion: 'calm', count: 856, topEmotions: [{ id: 'calm', percentage: 34 }, { id: 'sad', percentage: 24 }, { id: 'happy', percentage: 22 }] },
  { id: 'dalian', name: '大连', lat: 38.9140, lng: 121.6147, emotion: 'happy', count: 823, topEmotions: [{ id: 'happy', percentage: 33 }, { id: 'energetic', percentage: 27 }, { id: 'calm', percentage: 22 }] },
  { id: 'harbin', name: '哈尔滨', lat: 45.8038, lng: 126.5349, emotion: 'sad', count: 789, topEmotions: [{ id: 'sad', percentage: 28 }, { id: 'calm', percentage: 26 }, { id: 'tired', percentage: 22 }] },
  { id: 'kunming', name: '昆明', lat: 24.8820, lng: 102.8329, emotion: 'happy', count: 756, topEmotions: [{ id: 'happy', percentage: 37 }, { id: 'calm', percentage: 28 }, { id: 'energetic', percentage: 18 }] },
  { id: 'nanchang', name: '南昌', lat: 28.6822, lng: 115.8573, emotion: 'anxious', count: 723, topEmotions: [{ id: 'anxious', percentage: 30 }, { id: 'tired', percentage: 25 }, { id: 'calm', percentage: 22 }] },
  { id: 'jinan', name: '济南', lat: 36.6512, lng: 117.1201, emotion: 'calm', count: 698, topEmotions: [{ id: 'calm', percentage: 35 }, { id: 'happy', percentage: 26 }, { id: 'tired', percentage: 20 }] },
  { id: 'lanzhou', name: '兰州', lat: 36.0611, lng: 103.8343, emotion: 'lost', count: 654, topEmotions: [{ id: 'lost', percentage: 27 }, { id: 'calm', percentage: 25 }, { id: 'tired', percentage: 22 }] },
  { id: 'taiyuan', name: '太原', lat: 37.8706, lng: 112.5489, emotion: 'tired', count: 623, topEmotions: [{ id: 'tired', percentage: 31 }, { id: 'calm', percentage: 26 }, { id: 'anxious', percentage: 20 }] },
  { id: 'nanning', name: '南宁', lat: 22.8170, lng: 108.3665, emotion: 'happy', count: 598, topEmotions: [{ id: 'happy', percentage: 36 }, { id: 'calm', percentage: 28 }, { id: 'energetic', percentage: 19 }] },
  { id: 'guiyang', name: '贵阳', lat: 26.6476, lng: 106.6302, emotion: 'calm', count: 567, topEmotions: [{ id: 'calm', percentage: 34 }, { id: 'happy', percentage: 27 }, { id: 'tired', percentage: 21 }] },
  { id: 'changchun', name: '长春', lat: 43.8170, lng: 125.3235, emotion: 'calm', count: 543, topEmotions: [{ id: 'calm', percentage: 35 }, { id: 'sad', percentage: 24 }, { id: 'tired', percentage: 20 }] },
  { id: 'haerbin', name: '海口', lat: 20.0440, lng: 110.2446, emotion: 'happy', count: 512, topEmotions: [{ id: 'happy', percentage: 40 }, { id: 'energetic', percentage: 28 }, { id: 'calm', percentage: 18 }] },
  { id: 'xining', name: '西宁', lat: 36.6171, lng: 101.7782, emotion: 'calm', count: 489, topEmotions: [{ id: 'calm', percentage: 38 }, { id: 'happy', percentage: 25 }, { id: 'tired', percentage: 19 }] },
  { id: 'yinchuan', name: '银川', lat: 38.4870, lng: 106.2308, emotion: 'calm', count: 467, topEmotions: [{ id: 'calm', percentage: 36 }, { id: 'happy', percentage: 26 }, { id: 'tired', percentage: 20 }] },
  { id: 'urumqi', name: '乌鲁木齐', lat: 43.8256, lng: 87.6168, emotion: 'tired', count: 445, topEmotions: [{ id: 'tired', percentage: 30 }, { id: 'calm', percentage: 27 }, { id: 'sad', percentage: 20 }] },
  { id: 'shijiazhuang', name: '石家庄', lat: 38.0423, lng: 114.5149, emotion: 'anxious', count: 423, topEmotions: [{ id: 'anxious', percentage: 31 }, { id: 'tired', percentage: 26 }, { id: 'calm', percentage: 21 }] },
  { id: 'hefei', name: '合肥', lat: 31.8206, lng: 117.2272, emotion: 'energetic', count: 401, topEmotions: [{ id: 'energetic', percentage: 33 }, { id: 'happy', percentage: 29 }, { id: 'anxious', percentage: 19 }] },
  { id: 'wulumuqi', name: '呼和浩特', lat: 40.8425, lng: 111.7517, emotion: 'calm', count: 389, topEmotions: [{ id: 'calm', percentage: 37 }, { id: 'happy', percentage: 26 }, { id: 'tired', percentage: 19 }] },
  { id: 'nanning', name: '宁波', lat: 29.8683, lng: 121.5440, emotion: 'happy', count: 367, topEmotions: [{ id: 'happy', percentage: 35 }, { id: 'energetic', percentage: 28 }, { id: 'calm', percentage: 21 }] },
  { id: 'wenzhou', name: '温州', lat: 27.9942, lng: 120.6995, emotion: 'energetic', count: 345, topEmotions: [{ id: 'energetic', percentage: 34 }, { id: 'happy', percentage: 29 }, { id: 'anxious', percentage: 18 }] },
];

export const provinceData = [
  { id: 'beijing', name: '北京', x: 55, y: 22 },
  { id: 'tianjin', name: '天津', x: 58, y: 24 },
  { id: 'hebei', name: '河北', x: 56, y: 26 },
  { id: 'shanxi', name: '山西', x: 50, y: 28 },
  { id: 'neimenggu', name: '内蒙古', x: 42, y: 20 },
  { id: 'liaoning', name: '辽宁', x: 68, y: 18 },
  { id: 'jilin', name: '吉林', x: 65, y: 12 },
  { id: 'heilongjiang', name: '黑龙江', x: 62, y: 8 },
  { id: 'shanghai', name: '上海', x: 78, y: 38 },
  { id: 'jiangsu', name: '江苏', x: 72, y: 34 },
  { id: 'zhejiang', name: '浙江', x: 78, y: 34 },
  { id: 'anhui', name: '安徽', x: 66, y: 36 },
  { id: 'fujian', name: '福建', x: 82, y: 44 },
  { id: 'jiangxi', name: '江西', x: 70, y: 44 },
  { id: 'shandong', name: '山东', x: 64, y: 30 },
  { id: 'henan', name: '河南', x: 60, y: 34 },
  { id: 'hubei', name: '湖北', x: 62, y: 42 },
  { id: 'hunan', name: '湖南', x: 66, y: 48 },
  { id: 'guangdong', name: '广东', x: 76, y: 58 },
  { id: 'guangxi', name: '广西', x: 70, y: 56 },
  { id: 'hainan', name: '海南', x: 82, y: 70 },
  { id: 'chongqing', name: '重庆', x: 48, y: 50 },
  { id: 'sichuan', name: '四川', x: 38, y: 48 },
  { id: 'guizhou', name: '贵州', x: 56, y: 52 },
  { id: 'yunnan', name: '云南', x: 46, y: 58 },
  { id: 'xizang', name: '西藏', x: 28, y: 42 },
  { id: 'shaanxi', name: '陕西', x: 44, y: 32 },
  { id: 'gansu', name: '甘肃', x: 32, y: 32 },
  { id: 'qinghai', name: '青海', x: 30, y: 40 },
  { id: 'ningxia', name: '宁夏', x: 36, y: 28 },
  { id: 'xinjiang', name: '新疆', x: 12, y: 22 },
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
    const notes = emotionNotes[randomEmotion.id];
    records.push({
      id: index,
      time,
      emotion: randomEmotion,
      note: notes[Math.floor(Math.random() * notes.length)],
      intensity: Math.floor(Math.random() * 50) + 50,
    });
  });
  
  return records;
};

export const generateCityRecords = (cityId) => {
  const records = [];
  const city = cityData.find(c => c.id === cityId);
  if (!city) return [];
  
  for (let i = 0; i < 10; i++) {
    const randomEmotion = emotionTypes[Math.floor(Math.random() * emotionTypes.length)];
    const notes = emotionNotes[randomEmotion.id];
    records.push({
      id: i,
      time: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      emotion: randomEmotion,
      note: notes[Math.floor(Math.random() * notes.length)],
      intensity: Math.floor(Math.random() * 50) + 50,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cityId}-${i}`,
    });
  }
  
  return records;
};

export const globalStats = {
  totalUsers: 128475,
  todayRecords: 8432,
  activeCities: 42,
  currentMood: 'calm',
  moodLevel: 72,
};

export const provinceEmotionData = [
  { name: '北京', value: 78, emotion: 'calm', emotionName: '平静', userCount: 12847, messageCount: 5432 },
  { name: '天津', value: 72, emotion: 'calm', emotionName: '平静', userCount: 8432, messageCount: 3210 },
  { name: '河北', value: 65, emotion: 'anxious', emotionName: '焦虑', userCount: 15432, messageCount: 4321 },
  { name: '山西', value: 68, emotion: 'tired', emotionName: '疲惫', userCount: 9876, messageCount: 2109 },
  { name: '内蒙古', value: 75, emotion: 'calm', emotionName: '平静', userCount: 7654, messageCount: 1876 },
  { name: '辽宁', value: 62, emotion: 'sad', emotionName: '悲伤', userCount: 11234, messageCount: 3456 },
  { name: '吉林', value: 60, emotion: 'sad', emotionName: '悲伤', userCount: 8765, messageCount: 2345 },
  { name: '黑龙江', value: 58, emotion: 'sad', emotionName: '悲伤', userCount: 9432, messageCount: 2765 },
  { name: '上海', value: 85, emotion: 'energetic', emotionName: '活力', userCount: 18765, messageCount: 7654 },
  { name: '江苏', value: 82, emotion: 'happy', emotionName: '开心', userCount: 21345, messageCount: 8765 },
  { name: '浙江', value: 84, emotion: 'happy', emotionName: '开心', userCount: 19876, messageCount: 8234 },
  { name: '安徽', value: 70, emotion: 'calm', emotionName: '平静', userCount: 13456, messageCount: 4567 },
  { name: '福建', value: 78, emotion: 'happy', emotionName: '开心', userCount: 11234, messageCount: 3876 },
  { name: '江西', value: 66, emotion: 'anxious', emotionName: '焦虑', userCount: 10987, messageCount: 3210 },
  { name: '山东', value: 76, emotion: 'happy', emotionName: '开心', userCount: 23456, messageCount: 7654 },
  { name: '河南', value: 64, emotion: 'anxious', emotionName: '焦虑', userCount: 25678, messageCount: 6543 },
  { name: '湖北', value: 74, emotion: 'calm', emotionName: '平静', userCount: 16789, messageCount: 5432 },
  { name: '湖南', value: 77, emotion: 'happy', emotionName: '开心', userCount: 17654, messageCount: 5678 },
  { name: '广东', value: 88, emotion: 'energetic', emotionName: '活力', userCount: 32145, messageCount: 12345 },
  { name: '广西', value: 75, emotion: 'happy', emotionName: '开心', userCount: 14567, messageCount: 4321 },
  { name: '海南', value: 86, emotion: 'happy', emotionName: '开心', userCount: 6543, messageCount: 2109 },
  { name: '重庆', value: 68, emotion: 'angry', emotionName: '愤怒', userCount: 13456, messageCount: 4567 },
  { name: '四川', value: 79, emotion: 'calm', emotionName: '平静', userCount: 19876, messageCount: 6543 },
  { name: '贵州', value: 72, emotion: 'calm', emotionName: '平静', userCount: 9876, messageCount: 2765 },
  { name: '云南', value: 80, emotion: 'happy', emotionName: '开心', userCount: 11234, messageCount: 3876 },
  { name: '西藏', value: 76, emotion: 'calm', emotionName: '平静', userCount: 3456, messageCount: 987 },
  { name: '陕西', value: 65, emotion: 'tired', emotionName: '疲惫', userCount: 12345, messageCount: 3876 },
  { name: '甘肃', value: 62, emotion: 'lost', emotionName: '迷茫', userCount: 7654, messageCount: 1876 },
  { name: '青海', value: 70, emotion: 'calm', emotionName: '平静', userCount: 4321, messageCount: 1098 },
  { name: '宁夏', value: 68, emotion: 'calm', emotionName: '平静', userCount: 5432, messageCount: 1654 },
  { name: '新疆', value: 64, emotion: 'tired', emotionName: '疲惫', userCount: 8765, messageCount: 2345 },
  { name: '台湾', value: 78, emotion: 'happy', emotionName: '开心', userCount: 10234, messageCount: 3456 },
  { name: '香港', value: 80, emotion: 'energetic', emotionName: '活力', userCount: 9876, messageCount: 3876 },
  { name: '澳门', value: 76, emotion: 'calm', emotionName: '平静', userCount: 3456, messageCount: 987 },
];
