import { useState } from 'react';
import { Gamepad2, Shield, ChevronRight, Info, Zap } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

interface HomeScreenProps {
  onToggleOn: () => void;
}

export default function HomeScreen({ onToggleOn }: HomeScreenProps) {
  const [toggleOn, setToggleOn] = useState(false);

  const handleToggle = () => {
    const next = !toggleOn;
    setToggleOn(next);
    if (next) {
      setTimeout(onToggleOn, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="w-full flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center box-glow">
            <Gamepad2 className="w-6 h-6 text-neon-green" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-white tracking-wide leading-none">
              GAME BOOSTER
            </h1>
            <p className="text-xs text-zinc-500 font-medium tracking-wider mt-0.5">
              PRO EDITION
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs text-neon-green font-display font-semibold">ONLINE</span>
        </div>
      </div>

      {/* Central Toggle */}
      <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Status badge */}
        <div
          className={`px-4 py-1.5 rounded-full border transition-all duration-500 ${
            toggleOn
              ? 'bg-neon-green/10 border-neon-green/30'
              : 'bg-zinc-900/50 border-zinc-800'
          }`}
        >
          <span
            className={`font-display text-xs font-bold tracking-widest transition-colors duration-500 ${
              toggleOn ? 'text-neon-green text-glow' : 'text-zinc-500'
            }`}
          >
            {toggleOn ? 'SYSTEM ARMED' : 'SYSTEM IDLE'}
          </span>
        </div>

        {/* Circular backdrop */}
        <div className="relative flex items-center justify-center">
          {/* Ambient glow */}
          <div
            className={`absolute w-56 h-56 rounded-full transition-all duration-700 ${
              toggleOn ? 'bg-neon-green/10 blur-3xl scale-110' : 'bg-white/5 blur-2xl scale-90'
            }`}
          />
          {/* Concentric rings */}
          <div className={`absolute w-44 h-44 rounded-full border transition-all duration-500 ${toggleOn ? 'border-neon-green/15' : 'border-zinc-800/50'}`} />
          <div className={`absolute w-52 h-52 rounded-full border-2 border-dashed transition-all duration-700 ${toggleOn ? 'border-neon-green/10 animate-spin-slow' : 'border-zinc-800/30'}`} />

          <ToggleSwitch on={toggleOn} onToggle={handleToggle} />
        </div>

        {/* Label */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="font-display text-3xl font-bold text-white tracking-wide">
            99% <span className="text-neon-green text-glow">ACCURACY</span> MODE
          </h2>
          <p className="text-sm text-zinc-500 font-medium">
            {toggleOn ? 'Optimizing system resources...' : 'Tap the button to activate'}
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full max-w-sm flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {/* Quick stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl p-4 box-glow">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-neon-green" />
              <span className="text-xs text-zinc-500 font-medium">Boost Level</span>
            </div>
            <p className="font-display text-xl font-bold text-white">MAX</p>
          </div>
          <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl p-4 box-glow">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-neon-green" />
              <span className="text-xs text-zinc-500 font-medium">Protected</span>
            </div>
            <p className="font-display text-xl font-bold text-white">YES</p>
          </div>
        </div>

        {/* Info card */}
        <div className="flex items-start gap-3 bg-zinc-900/40 backdrop-blur border border-zinc-800/50 rounded-2xl p-4">
          <Info className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-500 leading-relaxed">
            This is a demo UI. 99% Accuracy Mode is a visual showcase and does not alter game performance, modify other apps, or use any cheats.
          </p>
        </div>

        {/* How it works */}
        <button className="group flex items-center justify-between bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl px-5 py-4 hover:border-neon-green/30 transition-all duration-300">
          <span className="text-sm text-zinc-300 font-medium">How it works</span>
          <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-neon-green group-hover:translate-x-1 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
}
