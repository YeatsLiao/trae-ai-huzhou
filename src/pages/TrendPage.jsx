import { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import EmotionIcon from '../components/EmotionIcon';
import { generateWeeklyTrend, generateDailyRecords, emotionTypes } from '../data/mockData';

function TrendChart({ trendData }) {
  const maxValue = Math.max(...trendData.map(d => d.total));
  
  return (
    <div className="bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-sky" />
        <span className="text-sm font-medium text-text-primary">情绪波动</span>
      </div>
      
      <div className="flex items-end justify-between gap-2 h-40">
        {trendData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex flex-col items-center gap-1">
              <div 
                className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${(item.total / maxValue) * 100}%`,
                  minHeight: '8px',
                  background: `linear-gradient(180deg, ${item.dominant.color}80, ${item.dominant.color}30)`
                }}
              />
              <EmotionIcon emotion={item.dominant} size="sm" />
            </div>
            <span className="text-xs text-text-tertiary">{item.day}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs text-text-secondary">上升趋势</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">平均指数</span>
          <span className="text-sm font-bold text-text-primary">
            {Math.round(trendData.reduce((sum, d) => sum + d.total, 0) / trendData.length)}
          </span>
        </div>
      </div>
    </div>
  );
}

function DailyTimeline({ records }) {
  return (
    <div className="bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-purple" />
        <span className="text-sm font-medium text-text-primary">今日记录</span>
      </div>
      
      <div className="space-y-4">
        {records.map((record) => (
          <div 
            key={record.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-bg-tertiary/30 hover:bg-bg-tertiary/50 transition-colors"
          >
            <span className="text-sm text-text-tertiary w-12">{record.time}</span>
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: `${record.emotion.color}20`,
                boxShadow: `0 0 8px ${record.emotion.color}20`
              }}
            >
              <EmotionIcon emotion={record.emotion} size="sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary" style={{ color: record.emotion.color }}>
                {record.emotion.name}
              </p>
              <p className="text-xs text-text-tertiary">{record.note}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-16 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${record.intensity}%`,
                    backgroundColor: record.emotion.color
                  }}
                />
              </div>
              <span className="text-xs text-text-tertiary w-8">{record.intensity}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmotionStats({ trendData }) {
  const emotionCounts = {};
  emotionTypes.forEach(e => emotionCounts[e.id] = 0);
  
  trendData.forEach(day => {
    day.emotions.forEach(e => {
      emotionCounts[e.id] += e.value;
    });
  });
  
  const sortedEmotions = Object.entries(emotionCounts)
    .map(([id, count]) => ({ 
      ...emotionTypes.find(e => e.id === id), 
      count 
    }))
    .sort((a, b) => b.count - a.count);
  
  const total = Object.values(emotionCounts).reduce((sum, c) => sum + c, 0);
  
  return (
    <div className="bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-pink" />
        <span className="text-sm font-medium text-text-primary">本周情绪统计</span>
      </div>
      
      <div className="space-y-3">
        {sortedEmotions.slice(0, 4).map((emotion) => {
          const percentage = Math.round((emotion.count / total) * 100);
          return (
            <div key={emotion.id} className="flex items-center gap-3">
              <EmotionIcon emotion={emotion} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{emotion.name}</span>
                  <span className="text-xs text-text-tertiary">{percentage}%</span>
                </div>
                <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: emotion.color
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-tertiary">最频繁情绪</span>
          <span className="text-sm font-bold" style={{ color: sortedEmotions[0]?.color }}>
            {sortedEmotions[0]?.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TrendPage() {
  const [trendData] = useState(generateWeeklyTrend());
  const [dailyRecords] = useState(generateDailyRecords());
  const [timeRange, setTimeRange] = useState('week');
  
  const ranges = [
    { id: 'day', name: '今日' },
    { id: 'week', name: '本周' },
    { id: 'month', name: '本月' },
  ];
  
  return (
    <div className="min-h-screen pb-24 pt-20 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">情绪趋势</h2>
        <div className="flex bg-bg-card/50 backdrop-blur-lg rounded-xl p-1 border border-border">
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                timeRange === range.id 
                  ? 'bg-sky text-white' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>
      
      <TrendChart trendData={trendData} />
      
      <div className="mt-4">
        <EmotionStats trendData={trendData} />
      </div>
      
      <div className="mt-4">
        <DailyTimeline records={dailyRecords} />
      </div>
      
      <div className="mt-4 bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
        <h3 className="text-sm font-medium text-text-primary mb-4">情绪建议</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-sky/10 border border-sky/20">
            <p className="text-xs text-sky mb-1">心情提升</p>
            <p className="text-sm text-text-secondary">尝试深呼吸，听一首喜欢的音乐</p>
          </div>
          <div className="p-3 rounded-xl bg-purple/10 border border-purple/20">
            <p className="text-xs text-purple mb-1">压力释放</p>
            <p className="text-sm text-text-secondary">散步15分钟，让大脑放松一下</p>
          </div>
          <div className="p-3 rounded-xl bg-pink/10 border border-pink/20">
            <p className="text-xs text-pink mb-1">情绪记录</p>
            <p className="text-sm text-text-secondary">每天记录3件让你开心的小事</p>
          </div>
          <div className="p-3 rounded-xl bg-emotion-happy/10 border border-emotion-happy/20">
            <p className="text-xs text-emotion-happy mb-1">睡眠建议</p>
            <p className="text-sm text-text-secondary">保持规律作息，每晚睡够7小时</p>
          </div>
        </div>
      </div>
    </div>
  );
}
