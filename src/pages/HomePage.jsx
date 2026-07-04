import { useState, useEffect, useRef } from 'react';
import { Plus, Users, Clock, MapPin, Heart } from 'lucide-react';
import EmotionIcon from '../components/EmotionIcon';
import { emotionTypes, globalStats, generateDailyRecords } from '../data/mockData';

function SkyCanvas({ currentEmotion }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const emotionColors = {
      happy: { sky: '#1e3a5f', gradient: ['#fbbf24', '#f59e0b'], particle: '#fbbf24' },
      calm: { sky: '#0f172a', gradient: ['#38bdf8', '#0ea5e9'], particle: '#38bdf8' },
      anxious: { sky: '#1f2937', gradient: ['#9ca3af', '#6b7280'], particle: '#9ca3af' },
      sad: { sky: '#1e1b4b', gradient: ['#7c3aed', '#5b21b6'], particle: '#7c3aed' },
      angry: { sky: '#2d1f1f', gradient: ['#ef4444', '#dc2626'], particle: '#ef4444' },
      lost: { sky: '#1e293b', gradient: ['#e2e8f0', '#cbd5e1'], particle: '#e2e8f0' },
      tired: { sky: '#1a1a2e', gradient: ['#f97316', '#ea580c'], particle: '#f97316' },
      energetic: { sky: '#0c4a6e', gradient: ['#22d3ee', '#06b6d4'], particle: '#22d3ee' },
    };
    
    const colors = emotionColors[currentEmotion?.id] || emotionColors.calm;
    
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.type = Math.random() > 0.5 ? 'circle' : 'spark';
      }
      
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        if (this.y < -50) {
          this.reset();
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.fillStyle = colors.particle;
        ctx.globalAlpha = this.opacity;
        
        if (this.type === 'circle') {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      }
    }
    
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    
    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, colors.sky);
      gradient.addColorStop(0.5, colors.gradient[0] + '20');
      gradient.addColorStop(1, colors.gradient[1] + '10');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [currentEmotion]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

export default function HomePage({ onOpenMood }) {
  const [currentEmotion, setCurrentEmotion] = useState(emotionTypes[1]);
  const [dailyRecords] = useState(generateDailyRecords());
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  };
  
  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <SkyCanvas currentEmotion={currentEmotion} />
      
      <div className="relative z-10 pt-20 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-3xl font-bold text-text-primary mb-1">{formatTime(time)}</p>
            <p className="text-sm text-text-secondary">{formatDate(time)}</p>
          </div>
          <button 
            onClick={onOpenMood}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky to-purple flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="relative rounded-3xl overflow-hidden mb-6 bg-bg-card/50 backdrop-blur-xl border border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-purple/10 to-pink/10"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-text-secondary">当前心情</p>
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2 mt-1">
                  <span style={{ color: currentEmotion.color }}>{currentEmotion.name}</span>
                  <Heart className="w-5 h-5 text-pink" />
                </h2>
              </div>
              <EmotionIcon emotion={currentEmotion} size="xl" />
            </div>
            
            <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${globalStats.moodLevel}%`, 
                  background: `linear-gradient(90deg, ${currentEmotion.color}, ${currentEmotion.color}80)` 
                }}
              />
            </div>
            <p className="text-right text-sm text-text-tertiary mt-2">心情指数 {globalStats.moodLevel}%</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-sky" />
              <span className="text-xs text-text-tertiary">全球用户</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{(globalStats.totalUsers / 10000).toFixed(1)}w</p>
          </div>
          <div className="bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple" />
              <span className="text-xs text-text-tertiary">今日记录</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{globalStats.todayRecords}</p>
          </div>
          <div className="bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-pink" />
              <span className="text-xs text-text-tertiary">活跃城市</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{globalStats.activeCities}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3">今日心情轨迹</h3>
          <div className="bg-bg-card/50 backdrop-blur-lg rounded-2xl p-4 border border-border">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {dailyRecords.map((record) => (
                <div 
                  key={record.id}
                  className="flex flex-col items-center gap-2 min-w-[50px]"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ 
                      backgroundColor: `${record.emotion.color}20`,
                      boxShadow: `0 0 12px ${record.emotion.color}30`
                    }}
                  >
                    <EmotionIcon emotion={record.emotion} size="sm" />
                  </div>
                  <span className="text-xs text-text-tertiary">{record.time.split(':')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3">情绪选择</h3>
          <div className="grid grid-cols-4 gap-3">
            {emotionTypes.slice(0, 4).map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => setCurrentEmotion(emotion)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                  currentEmotion.id === emotion.id 
                    ? 'bg-bg-card-hover ring-2' 
                    : 'bg-bg-card/50 hover:bg-bg-card'
                }`}
                style={{ 
                  ringColor: emotion.color,
                  boxShadow: currentEmotion.id === emotion.id ? `0 0 16px ${emotion.color}30` : 'none'
                }}
              >
                <EmotionIcon emotion={emotion} size="lg" />
                <span className="text-xs text-text-secondary">{emotion.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
