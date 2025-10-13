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

  const toggleAudio = async () => {
    if (!audioRef.current) {
      console.log('Audio ref not found');
      return;
    }

    console.log('Toggle clicked, current state:', isAudioPlaying);

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
      console.log('Paused');
    } else {
      try {
        audioRef.current.volume = 0.3;
        audioRef.current.load();
        await audioRef.current.play();
        setIsAudioPlaying(true);
        console.log('Playing');
      } catch (err) {
        console.error('Play error:', err);
      }
    }
  };

  if (!isPlaying) return null;

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3" type="audio/mpeg" />
        <source src="https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" type="audio/ogg" />
      </audio>
      
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