import { useState } from 'react';
import { Send, Sparkles, Heart, Star, Cloud } from 'lucide-react';
import EmotionCard from '../components/EmotionCard';
import { emotionTypes } from '../data/mockData';

function IntensitySlider({ value, onChange, emotion }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-secondary">强度</span>
        <span className="text-sm font-bold" style={{ color: emotion.color }}>{value}%</span>
      </div>
      <div className="relative h-3 bg-bg-tertiary rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
          style={{ 
            width: `${value}%`,
            background: `linear-gradient(90deg, ${emotion.color}, ${emotion.color}80)`
          }}
        />
        <input
          type="range"
          min="10"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300"
          style={{ 
            left: `calc(${value}% - 10px)`,
            boxShadow: `0 0 12px ${emotion.color}50`
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-text-tertiary">轻微</span>
        <span className="text-xs text-text-tertiary">强烈</span>
      </div>
    </div>
  );
}

function MoodDetail({ emotion, onBack }) {
  const [intensity, setIntensity] = useState(70);
  const [note, setNote] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onBack();
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pb-24 pt-20 px-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-colors"
        >
          <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-text-primary">记录心情</h2>
      </div>
      
      <div className="relative rounded-3xl overflow-hidden mb-6 bg-bg-card/80 backdrop-blur-xl border border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-purple/10 to-pink/10"></div>
        <div className="relative p-6 flex flex-col items-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 animate-pulse"
            style={{ 
              backgroundColor: `${emotion.color}20`,
              boxShadow: `0 0 30px ${emotion.color}40`
            }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: `${emotion.color}30` }}>
              <EmotionCard emotion={emotion} size="2xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-text-primary" style={{ color: emotion.color }}>{emotion.name}</h3>
          <p className="text-sm text-text-secondary mt-1">{emotion.description}</p>
        </div>
      </div>
      
      <IntensitySlider value={intensity} onChange={setIntensity} emotion={emotion} />
      
      <div className="mt-6">
        <label className="text-sm text-text-secondary mb-2 block">备注（可选）</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="写下你现在的感受..."
          className="w-full h-32 p-4 bg-bg-card/50 backdrop-blur-lg rounded-2xl border border-border text-text-primary placeholder-text-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-sky/50 transition-all"
        />
      </div>
      
      <div className="mt-6 flex gap-2">
        {['开心', '放松', '疲惫', '焦虑'].map((tag) => (
          <button
            key={tag}
            onClick={() => setNote(tag)}
            className="px-4 py-2 rounded-full bg-bg-tertiary/50 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
      
      <div className="fixed bottom-24 left-4 right-4">
        <button
          onClick={handleSend}
          disabled={isSending}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-sky/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ 
            background: `linear-gradient(135deg, ${emotion.color}, ${emotion.color}cc)`
          }}
        >
          {isSending ? (
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>记录心情</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function MoodPage({ selectedEmotion, onSelectEmotion, onBack }) {
  if (selectedEmotion) {
    return <MoodDetail emotion={selectedEmotion} onBack={onBack} />;
  }
  
  return (
    <div className="min-h-screen pb-24 pt-20 px-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-primary mb-2">你现在感觉如何？</h2>
        <p className="text-sm text-text-secondary">选择最能描述你当前心情的选项</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {emotionTypes.map((emotion) => (
          <EmotionCard 
            key={emotion.id} 
            emotion={emotion}
            onClick={() => onSelectEmotion(emotion)}
          />
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">情绪小贴士</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-bg-card/50 backdrop-blur-lg rounded-xl border border-border">
            <div className="w-8 h-8 rounded-lg bg-emotion-happy/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-emotion-happy" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">保持积极</p>
              <p className="text-xs text-text-tertiary mt-1">每天记录一件让你开心的小事，积累快乐能量</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-bg-card/50 backdrop-blur-lg rounded-xl border border-border">
            <div className="w-8 h-8 rounded-lg bg-emotion-calm/20 flex items-center justify-center flex-shrink-0">
              <Cloud className="w-4 h-4 text-emotion-calm" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">内心平静</p>
              <p className="text-xs text-text-tertiary mt-1">深呼吸三次，让思绪沉淀，感受当下的宁静</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-bg-card/50 backdrop-blur-lg rounded-xl border border-border">
            <div className="w-8 h-8 rounded-lg bg-pink/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-pink" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">关爱自己</p>
              <p className="text-xs text-text-tertiary mt-1">接纳所有情绪，它们都是你真实的一部分</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-bg-card/50 backdrop-blur-lg rounded-xl border border-border">
            <div className="w-8 h-8 rounded-lg bg-emotion-energetic/20 flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-emotion-energetic" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">释放活力</p>
              <p className="text-xs text-text-tertiary mt-1">适当运动可以帮助释放压力，恢复精力</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-sky/10 via-purple/10 to-pink/10 rounded-2xl border border-border">
        <p className="text-sm text-text-secondary text-center">
          每一次记录都是对自己的了解，让情绪天空更加多彩
        </p>
      </div>
    </div>
  );
}
