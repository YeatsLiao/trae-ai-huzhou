import { ChevronLeft, Settings, Bell } from 'lucide-react';

export default function Navbar({ title, showBack, onBack, rightIcon }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-4 flex items-center justify-between bg-bg-secondary/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {rightIcon && (
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-colors">
            {rightIcon}
          </button>
        )}
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-colors relative">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink rounded-full"></span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary transition-colors">
          <Settings className="w-5 h-5 text-text-secondary" />
        </button>
      </div>
    </nav>
  );
}
