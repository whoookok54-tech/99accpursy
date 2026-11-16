import { useEffect, useState } from 'react';
import { Zap, Activity, Check, ArrowLeft, Gamepad2, Cpu, Wifi } from 'lucide-react';

interface BoostingScreenProps {
  onBackToGame: () => void;
}

export default function BoostingScreen({ onBackToGame }: BoostingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [optimized, setOptimized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setOptimized(true);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Cpu, label: 'CPU Priority', value: optimized ? 'HIGH' : '...' },
    { icon: Wifi, label: 'Ping Stability', value: optimized ? 'STABLE' : '...' },
    { icon: Activity, label: 'Memory Freed', value: optimized ? '1.2 GB' : '...' },
  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="w-full flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="font-display text-xs font-bold text-neon-green tracking-widest text-glow">
            BOOSTING ACTIVE
          </span>
        </div>
        <span className="font-display text-sm font-bold text-zinc-400">
          {progress}%
        </span>
      </div>

      {/* Central visualization */}
      <div className="flex flex-col items-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="relative w-60 h-60 flex items-center justify-center">
          {/* Ambient glow */}
          <div className="absolute w-full h-full rounded-full bg-neon-green/10 blur-3xl animate-pulse-glow" />

          {/* Outer rotating ring */}
          <div className="absolute w-full h-full rounded-full border-2 border-neon-green/10 border-t-neon-green animate-spin-slow" />

          {/* Middle rotating ring */}
          <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-neon-green/15 border-b-neon-green/50 animate-spin-reverse" />

          {/* Progress ring via conic gradient */}
          <div
            className="absolute w-40 h-40 rounded-full"
            style={{
              background: `conic-gradient(rgba(0,255,136,0.8) ${progress * 3.6}deg, rgba(255,255,255,0.03) ${progress * 3.6}deg)`,
              mask: 'radial-gradient(transparent 62%, black 64%)',
              WebkitMask: 'radial-gradient(transparent 62%, black 64%)',
              transition: 'background 0.1s linear',
            }}
          />

          {/* Center icon */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-neon-green to-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,136,0.5)]">
            {optimized ? (
              <Check className="w-12 h-12 text-black animate-bounce-in" strokeWidth={3} />
            ) : (
              <Zap className="w-12 h-12 text-black animate-pulse" fill="currentColor" />
            )}
          </div>

          {/* Scan line overlay */}
          {!optimized && (
            <div className="absolute w-48 h-48 rounded-full overflow-hidden pointer-events-none">
              <div className="w-full h-1/2 bg-gradient-to-b from-neon-green/20 to-transparent animate-scan-line" />
            </div>
          )}
        </div>

        {/* Status text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-display text-2xl font-bold text-white tracking-wide">
            {optimized ? (
              <span className="text-neon-green text-glow">OPTIMIZATION COMPLETE</span>
            ) : (
              'OPTIMIZING...'
            )}
          </h2>
          <p className="text-sm text-zinc-500">
            {optimized
              ? 'Your system is ready for peak performance'
              : 'Clearing background processes and freeing RAM'}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="w-full max-w-sm flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-500 ${
                optimized ? 'bg-neon-green/5 border-neon-green/20 box-glow' : 'bg-zinc-900/60 border-zinc-800'
              }`}
            >
              <stat.icon className={`w-5 h-5 transition-colors duration-500 ${optimized ? 'text-neon-green' : 'text-zinc-600'}`} />
              <span className="text-[10px] text-zinc-500 font-medium text-center leading-tight">{stat.label}</span>
              <span className={`font-display text-[11px] font-bold transition-colors duration-500 ${optimized ? 'text-neon-green' : 'text-zinc-700'}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Launch Game button */}
        <button
          disabled={!optimized}
          onClick={onBackToGame}
          className={`w-full py-4 rounded-2xl font-display font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
            optimized
              ? 'bg-gradient-to-r from-neon-green to-emerald-500 text-black hover:scale-[1.02] active:scale-[0.98] box-glow-strong animate-pulse-glow'
              : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
          }`}
        >
          <Gamepad2 className="w-5 h-5" />
          LAUNCH GAME
        </button>

        {/* Back to Game */}
        <button
          onClick={onBackToGame}
          disabled={!optimized}
          className={`w-full py-3 rounded-2xl font-display font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
            optimized
              ? 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-neon-green/30 hover:text-neon-green'
              : 'bg-zinc-900/50 text-zinc-700 border border-zinc-800/50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO GAME
        </button>
      </div>
    </div>
  );
}
