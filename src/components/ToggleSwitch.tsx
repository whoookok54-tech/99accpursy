import { Zap } from 'lucide-react';

interface ToggleSwitchProps {
  on: boolean;
  onToggle: () => void;
}

export default function ToggleSwitch({ on, onToggle }: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ease-out select-none"
      aria-label={on ? 'Deactivate 99% Accuracy Mode' : 'Activate 99% Accuracy Mode'}
      aria-pressed={on}
    >
      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          on
            ? 'bg-neon-green/20 box-glow-strong'
            : 'bg-white/5'
        }`}
      />

      {/* Rotating accent ring (outer) */}
      <div
        className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
          on
            ? 'border-neon-green/40 border-t-neon-green animate-spin-slow'
            : 'border-white/10'
        }`}
      />

      {/* Inner rotating ring */}
      <div
        className={`absolute inset-2 rounded-full border transition-all duration-500 ${
          on
            ? 'border-neon-green/20 border-b-neon-green/60 animate-spin-reverse'
            : 'border-white/5'
        }`}
      />

      {/* Main toggle body */}
      <div
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
          on
            ? 'bg-gradient-to-br from-neon-green to-emerald-500 shadow-[0_0_30px_rgba(0,255,136,0.6)]'
            : 'bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner border border-white/10'
        }`}
      >
        <Zap
          className={`w-9 h-9 transition-all duration-500 ${
            on ? 'text-black scale-110' : 'text-zinc-500 scale-90'
          }`}
          fill={on ? 'currentColor' : 'none'}
        />
      </div>

      {/* Status dot */}
      <div
        className={`absolute -bottom-1 w-3 h-3 rounded-full transition-all duration-500 ${
          on ? 'bg-neon-green shadow-[0_0_12px_rgba(0,255,136,0.8)]' : 'bg-zinc-700'
        }`}
      />
    </button>
  );
}
