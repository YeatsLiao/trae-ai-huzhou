import { useState, useEffect, useRef } from 'react';
import { Plus, Users, Clock, MapPin, Heart } from 'lucide-react';
import EmotionIcon from '../components/EmotionIcon';
import { useTheme } from '../context/ThemeContext';
import { emotionTypes, globalStats, generateDailyRecords } from '../data/mockData';

function SkyCanvas({ currentEmotion, theme }) {
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
    
    const isDark = theme === 'dark';
    
    const emotionColors = {
      happy: { 
        sky: isDark ? '#1e3a5f' : '#fef3c7', 
        gradient: isDark ? ['#fbbf24', '#f59e0b'] : ['#fcd34d', '#fbbf24'], 
        particle: '#fbbf24' 
      },
      calm: { 
        sky: isDark ? '#0f172a' : '#e0f2fe', 
        gradient: isDark ? ['#38bdf8', '#0ea5e9'] : ['#7dd3fc', '#38bdf8'], 
        particle: '#38bdf8' 
      },
      anxious: { 
        sky: isDark ? '#1f2937' : '#f3f4f6', 
        gradient: isDark ? ['#9ca3af', '#6b7280'] : ['#d1d5db', '#9ca3af'], 
        particle: '#9ca3af' 
      },
      sad: { 
        sky: isDark ? '#1e1b4b' : '#ede9fe', 
        gradient: isDark ? ['#7c3aed', '#5b21b6'] : ['#a78bfa', '#7c3aed'], 
        particle: '#7c3aed' 
      },
      angry: { 
        sky: isDark ? '#2d1f1f' : '#fee2e2', 
        gradient: isDark ? ['#ef4444', '#dc2626'] : ['#fca5a5', '#ef4444'], 
        particle: '#ef4444' 
      },
      lost: { 
        sky: isDark ? '#1e293b' : '#f1f5f9', 
        gradient: isDark ? ['#e2e8f0', '#cbd5e1'] : ['#f8fafc', '#e2e8f0'], 
        particle: '#94a3b8' 
      },
      tired: { 
        sky: isDark ? '#1a1a2e' : '#ffedd5', 
        gradient: isDark ? ['#f97316', '#ea580c'] : ['#fdba74', '#f97316'], 
        particle: '#f97316' 
      },
      energetic: { 
        sky: isDark ? '#0c4a6e' : '#cffafe', 
        gradient: isDark ? ['#22d3ee', '#06b6d4'] : ['#67e8f9', '#22d3ee'], 
        particle: '#22d3ee' 
      },
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
        this.opacity = isDark ? Math.random() * 0.5 + 0.3 : Math.random() * 0.3 + 0.2;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, colors.sky);
      gradient.addColorStop(0.5, colors.gradient[0] + (isDark ? '20' : '40'));
      gradient.addColorStop(1, colors.gradient[1] + (isDark ? '10' : '30'));
      
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
  }, [currentEmotion, theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

export default function HomePage({ onOpenMood, onSelectEmotion }) {
  const { theme } = useTheme();
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
    <div className="min-h-screen pb-24 relative overflow-hidden bg-bg-primary">
      <SkyCanvas currentEmotion={currentEmotion} theme={theme} />
      
      {/* 增强文字对比度的渐变蒙层 */}
      <div className={`absolute inset-0 z-[1] pointer-events-none ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary/60' 
          : 'bg-gradient-to-b from-white/20 via-transparent to-white/40'
      }`}></div>
      
      <div className="relative z-10 pt-20 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="drop-shadow-sm">
            <p className="text-3xl font-bold text-text-primary mb-1">{formatTime(time)}</p>
            <p className="text-sm text-text-secondary font-medium">{formatDate(time)}</p>
          </div>
          <button 
            onClick={onOpenMood}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky to-purple flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className={`relative rounded-3xl overflow-hidden mb-6 backdrop-blur-xl border border-border shadow-card ${
          theme === 'dark' ? 'bg-bg-card/70' : 'bg-bg-card/90'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-sky/20 via-purple/10 to-pink/10 opacity-50"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-text-secondary font-medium">当前心情</p>
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2 mt-1">
                  <span style={{ color: currentEmotion.color }}>{currentEmotion.name}</span>
                  <Heart className="w-5 h-5 text-pink" />
                </h2>
              </div>
              <EmotionIcon emotion={currentEmotion} size="xl" />
            </div>
            
            <div className="h-3 bg-bg-tertiary/50 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${globalStats.moodLevel}%`, 
                  background: `linear-gradient(90deg, ${currentEmotion.color}, ${currentEmotion.color}80)` 
                }}
              />
            </div>
            <p className="text-right text-sm text-text-tertiary font-medium mt-2">心情指数 {globalStats.moodLevel}%</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className={`backdrop-blur-lg rounded-2xl p-4 border border-border shadow-card ${
            theme === 'dark' ? 'bg-bg-card/70' : 'bg-bg-card/90'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-sky" />
              <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider">全球用户</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{(globalStats.totalUsers / 10000).toFixed(1)}w</p>
          </div>
          <div className={`backdrop-blur-lg rounded-2xl p-4 border border-border shadow-card ${
            theme === 'dark' ? 'bg-bg-card/70' : 'bg-bg-card/90'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple" />
              <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider">今日记录</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{globalStats.todayRecords}</p>
          </div>
          <div className={`backdrop-blur-lg rounded-2xl p-4 border border-border shadow-card ${
            theme === 'dark' ? 'bg-bg-card/70' : 'bg-bg-card/90'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-pink" />
              <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider">活跃城市</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{globalStats.activeCities}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3">今日心情轨迹</h3>
          <div className={`backdrop-blur-lg rounded-2xl p-4 border border-border shadow-card ${
            theme === 'dark' ? 'bg-bg-card/70' : 'bg-bg-card/90'
          }`}>
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
          <h3 className="text-lg font-semibold text-text-primary mb-3">情绪记录</h3>
          <div className="grid grid-cols-4 gap-3">
            {emotionTypes.slice(0, 8).map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => onSelectEmotion(emotion)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 bg-bg-card/50 hover:bg-bg-card shadow-card hover:shadow-card-hover active:scale-95 border border-border`}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${emotion.color}20` }}
                >
                  <EmotionIcon emotion={emotion} size="lg" />
                </div>
                <span className="text-[10px] text-text-secondary font-medium">{emotion.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
