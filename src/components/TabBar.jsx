import { Home, Map, TrendingUp, Smile } from 'lucide-react';

const tabs = [
  { id: 'home', name: '首页', icon: Home },
  { id: 'map', name: '地图', icon: Map },
  { id: 'trend', name: '趋势', icon: TrendingUp },
  { id: 'mood', name: '心情', icon: Smile },
];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 px-4 flex items-center justify-around bg-bg-secondary/90 backdrop-blur-xl border-t border-border">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 w-16 py-2 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'text-sky bg-sky/10' 
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
              <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : ''}`} />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-sky rounded-full"></span>
              )}
            </div>
            <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{tab.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
