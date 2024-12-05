import { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

export default function ConfettiEffect({ isActive, onComplete }: { isActive: boolean; onComplete?: () => void }) {
  const refAnimationInstance = useRef<((options: any) => void) | null>(null);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current?.({
      ...opts,
      origin: { y: 0.3 },
      particleCount: Math.floor(200 * particleRatio),
      colors: ['#0A3977', '#00A3FF', '#ffffff'],
    });
  }, []);

  useEffect(() => {
    if (isActive) {
      makeShot(0.25, { spread: 26, startVelocity: 55 });
      if (onComplete) setTimeout(onComplete, 2000);
    }
  }, [isActive, makeShot, onComplete]);

  return (
    <ReactCanvasConfetti
      onInit={instance => refAnimationInstance.current = instance.confetti}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    />
  );
} 