import EmotionIcon from './EmotionIcon';

export default function EmotionCard({ emotion, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
        selected 
          ? 'bg-bg-card-hover ring-2 ring-offset-2 ring-offset-bg-primary' 
          : 'bg-bg-card hover:bg-bg-card-hover'
      }`}
      style={{ 
        boxShadow: selected ? `0 0 24px ${emotion.color}30` : 'var(--shadow-card)',
        ringColor: emotion.color
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`relative ${selected ? 'animate-pulse' : ''}`}>
          <EmotionIcon emotion={emotion} size="2xl" />
          {selected && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-primary">{emotion.name}</h3>
          <p className="text-sm text-text-tertiary mt-1">{emotion.description}</p>
        </div>
      </div>
      
      {selected && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none" 
          style={{ 
            background: `linear-gradient(135deg, ${emotion.color}10 0%, transparent 50%)` 
          }}
        />
      )}
    </button>
  );
}
