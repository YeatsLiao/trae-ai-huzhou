import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudOff, Moon, Sparkles } from 'lucide-react';

const iconMap = {
  happy: Sun,
  calm: Cloud,
  anxious: CloudRain,
  sad: CloudSnow,
  angry: Zap,
  lost: CloudOff,
  tired: Moon,
  energetic: Sparkles,
};

export default function EmotionIcon({ emotion, size = 'md', showLabel = false, className = '' }) {
  const Icon = iconMap[emotion?.id] || Cloud;
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16',
  };

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300`}
        style={{ 
          backgroundColor: `${emotion?.color}20`, 
          color: emotion?.color,
          boxShadow: `0 0 12px ${emotion?.color}40`
        }}
      >
        <Icon className={sizeClasses[size]} />
      </div>
      {showLabel && <span className="text-xs text-text-secondary">{emotion?.name}</span>}
    </div>
  );
}
