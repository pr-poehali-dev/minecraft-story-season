import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface HalloweenMusicProps {
  isPlaying: boolean;
}

const HalloweenMusic = ({ isPlaying }: HalloweenMusicProps) => {
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const audio = document.getElementById('halloween-audio') as HTMLAudioElement;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => console.log('Autoplay blocked:', err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying]);

  const handleVolumeToggle = () => {
    const audio = document.getElementById('halloween-audio') as HTMLAudioElement;
    if (!audio) return;

    if (volume > 0) {
      setVolume(0);
      audio.volume = 0;
    } else {
      setVolume(0.3);
      audio.volume = 0.3;
    }
  };

  if (!isPlaying) return null;

  return (
    <>
      <audio
        id="halloween-audio"
        loop
        preload="auto"
      >
        <source src="https://assets.mixkit.co/music/preview/mixkit-halloween-moon-2507.mp3" type="audio/mpeg" />
        <source src="https://cdn.freesound.org/previews/615/615103_6283755-lq.mp3" type="audio/mpeg" />
      </audio>
      
      <button
        onClick={handleVolumeToggle}
        className="fixed bottom-4 right-4 z-50 bg-orange-600 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg spooky-glow transition-all hover:scale-110"
        title={volume > 0 ? 'Выключить музыку' : 'Включить музыку'}
      >
        <Icon name={volume > 0 ? 'Volume2' : 'VolumeX'} size={20} />
      </button>
    </>
  );
};

export default HalloweenMusic;
