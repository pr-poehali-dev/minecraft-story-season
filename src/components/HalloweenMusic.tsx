import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface HalloweenMusicProps {
  isPlaying: boolean;
}

const HalloweenMusic = ({ isPlaying }: HalloweenMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2879/2879-preview.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const playAudio = async () => {
      if (audioRef.current && isPlaying && hasInteracted) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log('Автовоспроизведение заблокировано браузером');
        }
      } else if (audioRef.current && !isPlaying) {
        audioRef.current.pause();
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, hasInteracted]);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isPlaying) return null;

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 bg-orange-600 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg spooky-glow transition-all animate-pulse-slow"
      title={isMuted ? 'Включить музыку' : 'Выключить музыку'}
    >
      <Icon name={isMuted ? 'VolumeX' : 'Volume2'} size={20} />
    </button>
  );
};

export default HalloweenMusic;
