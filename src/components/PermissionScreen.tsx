import { useState } from 'react';
import { Shield, Check, ChevronRight, Lock, Eye, Cpu, Gamepad2 } from 'lucide-react';

interface PermissionScreenProps {
  onGranted: () => void;
  onBack: () => void;
}

interface PermissionItem {
  icon: typeof Shield;
  title: string;
  desc: string;
}

const PERMISSIONS: PermissionItem[] = [
  { icon: Cpu, title: 'System Optimization', desc: 'Manage background processes' },
  { icon: Gamepad2, title: 'Game Detection', desc: 'Detect installed games' },
  { icon: Lock, title: 'Safe Mode', desc: 'No cheats or modifications' },
];

export default function PermissionScreen({ onGranted, onBack }: PermissionScreenProps) {
  const [granted, setGranted] = useState<boolean[]>([false, false, false]);
  const [granting, setGranting] = useState(false);

  const grantAll = () => {
    setGranting(true);
    PERMISSIONS.forEach((_, i) => {
      setTimeout(() => {
        setGranted((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        if (i === PERMISSIONS.length - 1) {
          setGranting(false);
          setTimeout(onGranted, 400);
        }
      }, 500 * (i + 1));
    });
  };

  const allGranted = granted.every(Boolean);

  return (
    <div className="flex flex-col min-h-screen px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in-up">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-neon-green/30 transition-colors"
          aria-label="Back"
        >
          <ChevronRight className="w-5 h-5 text-zinc-400 rotate-180" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-neon-green" />
          <h1 className="font-display text-lg font-bold text-white tracking-wide">
            PERMISSIONS
          </h1>
        </div>
      </div>

      {/* Shield illustration */}
      <div className="flex flex-col items-center mt-10 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className={`relative w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500 ${allGranted ? 'bg-neon-green/10 border-neon-green/30 box-glow-strong' : 'bg-zinc-900 border-zinc-800'}`}>
          <div className={`absolute inset-0 rounded-2xl border-2 ${allGranted ? 'border-neon-green/40 border-t-neon-green animate-spin-slow' : ''}`} />
          <Shield className={`w-12 h-12 transition-colors duration-500 ${allGranted ? 'text-neon-green' : 'text-zinc-600'}`} />
        </div>
        <h2 className="font-display text-xl font-bold text-white mt-5 tracking-wide">
          Grant Access
        </h2>
        <p className="text-sm text-zinc-500 mt-1 text-center max-w-xs">
          Allow Game Booster to optimize your system for the best gaming experience
        </p>
      </div>

      {/* Permission list */}
      <div className="flex flex-col gap-3 flex-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {PERMISSIONS.map((perm, i) => {
          const isGranted = granted[i];
          const isCurrent = granting && !isGranted && granted.slice(0, i).every(Boolean);
          return (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-500 ${
                isGranted
                  ? 'bg-neon-green/5 border-neon-green/30 box-glow'
                  : isCurrent
                    ? 'bg-zinc-900 border-neon-green/40 animate-pulse-glow'
                    : 'bg-zinc-900/60 border-zinc-800'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                  isGranted ? 'bg-neon-green/10' : 'bg-zinc-800'
                }`}
              >
                <perm.icon className={`w-5 h-5 transition-colors duration-500 ${isGranted ? 'text-neon-green' : 'text-zinc-500'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{perm.title}</p>
                <p className="text-xs text-zinc-500">{perm.desc}</p>
              </div>
              {isGranted ? (
                <div className="w-7 h-7 rounded-full bg-neon-green flex items-center justify-center animate-bounce-in">
                  <Check className="w-4 h-4 text-black" strokeWidth={3} />
                </div>
              ) : isCurrent ? (
                <div className="w-7 h-7 rounded-full border-2 border-neon-green/40 border-t-neon-green animate-spin-slow" />
              ) : (
                <Eye className="w-5 h-5 text-zinc-700" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-start gap-2 px-2">
          <Lock className="w-4 h-4 text-zinc-700 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-600 leading-relaxed">
            Demo permissions — no real system access is required or granted.
          </p>
        </div>
        <button
          onClick={grantAll}
          disabled={granting || allGranted}
          className={`w-full py-4 rounded-2xl font-display font-bold tracking-wide transition-all duration-300 ${
            allGranted
              ? 'bg-neon-green/10 text-neon-green border border-neon-green/30'
              : 'bg-gradient-to-r from-neon-green to-emerald-500 text-black hover:scale-[1.02] active:scale-[0.98] box-glow-strong'
          }`}
        >
          {allGranted ? 'PERMISSIONS GRANTED' : granting ? 'GRANTING...' : 'GRANT PERMISSIONS'}
        </button>
      </div>
    </div>
  );
}
