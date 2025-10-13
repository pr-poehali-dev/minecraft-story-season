import { useEffect, useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface HalloweenMusicProps {
  isPlaying: boolean;
}

const HalloweenMusic = ({ isPlaying }: HalloweenMusicProps) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  }, [isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.volume = 0.25;
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(err => {
          console.error('Ошибка воспроизведения:', err);
        });
    }
  };

  if (!isPlaying) return null;

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.freesound.org/previews/615/615103_6283755-lq.mp3"
      />
      
      <button
        onClick={toggleAudio}
        className={`fixed bottom-4 right-4 z-50 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 ${
          isAudioPlaying 
            ? 'bg-orange-600 hover:bg-orange-500 spooky-glow animate-pulse' 
            : 'bg-gray-700 hover:bg-gray-600 border-2 border-orange-500'
        }`}
        title={isAudioPlaying ? '🎃 Остановить музыку' : '🎃 Запустить хэллоуинскую музыку (кликни!)'}
      >
        <Icon name={isAudioPlaying ? 'Volume2' : 'Play'} size={24} />
      </button>
    </>
  );
};

export default HalloweenMusic;