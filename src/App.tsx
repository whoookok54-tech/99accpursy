import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import PermissionScreen from '@/components/PermissionScreen';
import BoostingScreen from '@/components/BoostingScreen';

type Screen = 'home' | 'permission' | 'boosting';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <div className="relative min-h-screen w-full max-w-md mx-auto bg-[#030303] overflow-hidden">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent" />
      </div>

      {/* Screen content */}
      <div key={screen} className="relative z-10">
        {screen === 'home' && (
          <HomeScreen onToggleOn={() => setScreen('permission')} />
        )}
        {screen === 'permission' && (
          <PermissionScreen
            onGranted={() => setScreen('boosting')}
            onBack={() => setScreen('home')}
          />
        )}
        {screen === 'boosting' && (
          <BoostingScreen onBackToGame={() => setScreen('home')} />
        )}
      </div>
    </div>
  );
}
