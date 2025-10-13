import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInitialTheme, saveTheme, listenToSystemThemeChanges } from "@/utils/theme";

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [showCharacter, setShowCharacter] = useState(false);
  const [isCharacterClosing, setIsCharacterClosing] = useState(false);
  const [showCharacter2, setShowCharacter2] = useState(false);
  const [isCharacter2Closing, setIsCharacter2Closing] = useState(false);
  const [showCharacter3, setShowCharacter3] = useState(false);
  const [isCharacter3Closing, setIsCharacter3Closing] = useState(false);
  const [showMemorial, setShowMemorial] = useState(false);
  const [isMemorialClosing, setIsMemorialClosing] = useState(false);
  const [showDownloads, setShowDownloads] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showAchievementsPage, setShowAchievementsPage] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [hasViewedAchievements, setHasViewedAchievements] = useState(false);
  const [viewedSeasons, setViewedSeasons] = useState<Set<number>>(new Set());
  const [currentAchievement, setCurrentAchievement] = useState<any>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [viewedImages, setViewedImages] = useState<Set<number>>(new Set());
  const [isButtonLocked, setIsButtonLocked] = useState(false);
  const [viewedCharacters, setViewedCharacters] = useState<Set<number>>(new Set());
  const [foundPumpkins, setFoundPumpkins] = useState<Set<number>>(new Set());
  const [showScreamer, setShowScreamer] = useState(false);
  const [hasSeenScreamer, setHasSeenScreamer] = useState(false);

  const baseAchievements = [
    {
      id: "993-reality",
      title: "993 - реальность",
      description: "Вы зашли на сайт и открыли для себя новую реальность",
      icon: "Eye"
    },
    {
      id: "infinity-limit",
      title: "Бесконечность - не предел!",
      description: "Просмотрели все сезоны проекта",
      icon: "Infinity"
    },
    {
      id: "tretyakov-gallery",
      title: "Третьяковская галерея",
      description: "Просмотрели 3 скриншота в галерее",
      icon: "Image"
    },
    {
      id: "supreme-power",
      title: "Высшая власть",
      description: "Узнали информацию о главных героях",
      icon: "Crown"
    },
    {
      id: "spooky-harvest",
      title: "Жуткая Жатва",
      description: "Нашли все тыквы на сайте!",
      icon: "Ghost"
    },
    {
      id: "halloween-2024",
      title: "С жутким Хэллоуином",
      description: "Сладость или гадость?",
      icon: "Ghost"
    }
  ];

  const secretAchievement = {
    id: "story-seasons-master",
    title: "Сюжетные сезоны",
    description: "Получили все достижения!",
    icon: "Trophy"
  };

  const hasSecretAchievement = unlockedAchievements.includes('story-seasons-master');
  const achievements = hasSecretAchievement ? [...baseAchievements, secretAchievement] : baseAchievements;

  useEffect(() => {
    const unsubscribe = listenToSystemThemeChanges((isDark) => {
      setIsDarkTheme(isDark);
    });
    
    return unsubscribe;
  }, []);

  useEffect(() => {
    saveTheme(isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    if (showMemorial) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMemorialClosing(true);
          setTimeout(() => {
            setShowMemorial(false);
            setIsMemorialClosing(false);
          }, 300);
        }
      };
      
      window.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [showMemorial]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('achievement-993-reality');
    const hasViewed = localStorage.getItem('achievements-viewed');
    const savedAchievements = localStorage.getItem('unlocked-achievements');
    const savedPumpkins = localStorage.getItem('found-pumpkins');
    const hasSeenScreamerBefore = localStorage.getItem('halloween-screamer-seen');
    
    if (hasViewed) {
      setHasViewedAchievements(true);
    }
    
    if (savedPumpkins) {
      const pumpkinsArray = JSON.parse(savedPumpkins);
      setFoundPumpkins(new Set(pumpkinsArray));
    }
    
    if (hasSeenScreamerBefore) {
      setHasSeenScreamer(true);
    }
    
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    const isHalloweenPeriod = true;
    
    if (savedAchievements) {
      setUnlockedAchievements(JSON.parse(savedAchievements));
      
      if (isHalloweenPeriod && !hasSeenScreamerBefore) {
        const randomDelay = 2000;
        setTimeout(() => {
          setShowScreamer(true);
          setHasSeenScreamer(true);
          localStorage.setItem('halloween-screamer-seen', 'true');
          
          setTimeout(() => {
            setShowScreamer(false);
            
            setTimeout(() => {
              const halloweenAchievement = baseAchievements.find(a => a.id === 'halloween-2024');
              if (halloweenAchievement) {
                setCurrentAchievement(halloweenAchievement);
                setShowAchievement(true);
                const achievements = JSON.parse(localStorage.getItem('unlocked-achievements') || '[]');
                if (!achievements.includes('halloween-2024')) {
                  const newUnlocked = [...achievements, 'halloween-2024'];
                  setUnlockedAchievements(newUnlocked);
                  localStorage.setItem('unlocked-achievements', JSON.stringify(newUnlocked));
                }
                setTimeout(() => setShowAchievement(false), 5000);
              }
            }, 500);
          }, 2000);
        }, randomDelay);
      }
    } else if (!hasVisited) {
      setTimeout(() => {
        const achievement = baseAchievements[0];
        setCurrentAchievement(achievement);
        setShowAchievement(true);
        const newUnlocked = ['993-reality'];
        setUnlockedAchievements(newUnlocked);
        localStorage.setItem('achievement-993-reality', 'true');
        localStorage.setItem('unlocked-achievements', JSON.stringify(newUnlocked));
        setTimeout(() => setShowAchievement(false), 5000);
        
        if (isHalloweenPeriod && !hasSeenScreamerBefore) {
          const randomDelay = 8000;
          setTimeout(() => {
            setShowScreamer(true);
            setHasSeenScreamer(true);
            localStorage.setItem('halloween-screamer-seen', 'true');
            
            setTimeout(() => {
              setShowScreamer(false);
              
              setTimeout(() => {
                const halloweenAchievement = baseAchievements.find(a => a.id === 'halloween-2024');
                if (halloweenAchievement) {
                  setCurrentAchievement(halloweenAchievement);
                  setShowAchievement(true);
                  const withHalloween = [...newUnlocked, 'halloween-2024'];
                  setUnlockedAchievements(withHalloween);
                  localStorage.setItem('unlocked-achievements', JSON.stringify(withHalloween));
                  setTimeout(() => setShowAchievement(false), 5000);
                }
              }, 500);
            }, 2000);
          }, randomDelay);
        }
      }, 2000);
    } else {
      setUnlockedAchievements(['993-reality']);
    }
  }, []);

  useEffect(() => {
    const allSeasons = [...startSeasons, ...mainSeasons, ...sideSeasons, ...inDevelopmentSeasons];
    if (viewedSeasons.size === allSeasons.length && viewedSeasons.size > 0) {
      const hasInfinityAchievement = unlockedAchievements.includes('infinity-limit');
      if (!hasInfinityAchievement) {
        setTimeout(() => {
          const achievement = baseAchievements[1];
          setCurrentAchievement(achievement);
          setShowAchievement(true);
          const newUnlocked = [...unlockedAchievements, 'infinity-limit'];
          setUnlockedAchievements(newUnlocked);
          localStorage.setItem('unlocked-achievements', JSON.stringify(newUnlocked));
          setHasViewedAchievements(false);
          setTimeout(() => setShowAchievement(false), 5000);
        }, 500);
      }
    }
  }, [viewedSeasons]);

  useEffect(() => {
    if (viewedImages.size >= 3) {
      const hasGalleryAchievement = unlockedAchievements.includes('tretyakov-gallery');
      if (!hasGalleryAchievement) {
        setTimeout(() => {
          const achievement = baseAchievements[2];
          setCurrentAchievement(achievement);
          setShowAchievement(true);
          const newUnlocked = [...unlockedAchievements, 'tretyakov-gallery'];
          setUnlockedAchievements(newUnlocked);
          localStorage.setItem('unlocked-achievements', JSON.stringify(newUnlocked));
          setHasViewedAchievements(false);
          setTimeout(() => setShowAchievement(false), 5000);
        }, 500);
      }
    }
  }, [viewedImages]);

  useEffect(() => {
    if (viewedCharacters.size === 3 && !unlockedAchievements.includes('supreme-power')) {
      setTimeout(() => {
        const achievement = baseAchievements.find(a => a.id === 'supreme-power');
        setCurrentAchievement(achievement);
        setShowAchievement(true);
        const newUnlocked = [...unlockedAchievements, 'supreme-power'];
        setUnlockedAchievements(newUnlocked);
        localStorage.setItem('unlocked-achievements', JSON.stringify(newUnlocked));
        setHasViewedAchievements(false);
        setTimeout(() => setShowAchievement(false), 5000);
      }, 500);
    }
  }, [viewedCharacters]);

  useEffect(() => {
    const totalPumpkins = 8;
    if (foundPumpkins.size === totalPumpkins && !unlockedAchievements.includes('spooky-harvest')) {
      setTimeout(() => {
        const achievement = baseAchievements.find(a => a.id === 'spooky-harvest');
        setCurrentAchievement(achievement);
        setShowAchievement(true);
        const newUnlocked = [...unlockedAchievements, 'spooky-harvest'];
        setUnlockedAchievements(newUnlocked);
        localStorage.setItem('unlocked-achievements', JSON.stringify(newUnlocked));
        setHasViewedAchievements(false);
        setTimeout(() => setShowAchievement(false), 5000);
      }, 500);
    }
  }, [foundPumpkins]);

  useEffect(() => {
    const requiredAchievements = ['993-reality', 'infinity-limit', 'tretyakov-gallery', 'supreme-power'];
    const hasAllBase = requiredAchievements.every(id => unlockedAchievements.includes(id));
    const hasSecret = unlockedAchievements.includes('story-seasons-master');
    
    if (hasAllBase && !hasSecret) {
      setTimeout(() => {
        setCurrentAchievement(secretAchievement);
        setShowAchievement(true);
        const newUnlocked = [...unlockedAchievements, 'story-seasons-master'];
        setUnlockedAchievements(newUnlocked);
        localStorage.setItem('unlocked-achievements', JSON.stringify(newUnlocked));
        setHasViewedAchievements(false);
        setTimeout(() => setShowAchievement(false), 5000);
      }, 1000);
    }
  }, [unlockedAchievements]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedImage || selectedSeason !== null || selectedMember !== null || showAchievementsPage) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [selectedImage, selectedSeason, selectedMember, showAchievementsPage]);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setSelectedSeason(null);
      setSelectedMember(null);
      setShowAchievementsPage(false);
      setIsClosing(false);
      setIsButtonLocked(false);
    }, 300);
  };

  const openAchievementsPage = () => {
    if (isButtonLocked) return;
    setIsButtonLocked(true);
    setShowAchievementsPage(true);
    setHasViewedAchievements(true);
    localStorage.setItem('achievements-viewed', 'true');
  };

  const scrollToSection = (sectionId: string) => {
    if (isButtonLocked) return;
    setIsButtonLocked(true);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setIsButtonLocked(false), 500);
  };

  const handlePumpkinClick = (pumpkinId: number) => {
    if (!foundPumpkins.has(pumpkinId)) {
      const newPumpkins = new Set(foundPumpkins).add(pumpkinId);
      setFoundPumpkins(newPumpkins);
      localStorage.setItem('found-pumpkins', JSON.stringify(Array.from(newPumpkins)));
    }
  };

  const startSeasons = [
    {
      title: "Тестовый сезон: Новое поколение",
      description: "Первый сюжетный сезон, где всё только начиналось. Основание новых знакомств, потери и новые начинания.",
      image: "https://cdn.poehali.dev/files/6a1f8c7f-4c0b-4bcd-b6ee-6a6e7582afc7.jpg"
    }
  ];

  const mainSeasons = [
    {
      title: "Сезон 1: MineDocs",
      description: "Новые знакомства, предательства, эмоции, и конечно новые механики.",
      image: "https://cdn.poehali.dev/files/4519a809-af89-4c24-9f48-8cc379b28dfc.jpg",
      audio: null
    },
    {
      title: "Сезон 2: MineDocs II",
      description: "Попадание в параллельную реальность, новые персонажи, разрыв мира и отношений, улучшение качества сезона.",
      image: "https://cdn.poehali.dev/files/9753b439-61d8-4066-ad05-57318a24442f.jpg",
      audio: null
    },
    {
      title: "Сезон 3: Сердце Миров",
      description: (
        <>
          Новый главный персонаж, большие предательства, заражение <a href="/terms" className="font-bold hover:text-minecraft-brown transition-colors">Скинтом¹</a>, получение чужого солнца, возвращение домой.
        </>
      ),
      image: "https://cdn.poehali.dev/files/739a4a01-9179-4d2e-a262-7b163ce825a3.jpg",
      audio: null
    },
    {
      title: "Сезон 4: Тени: Новая звезда",
      description: "Самый долгий сезон в проработке. Много новых проработанных механик, персонажей, заданий и победа в войне.",
      image: "https://cdn.poehali.dev/files/88d30fd0-33bf-4996-bc49-feb138386c10.jpg",
      audio: null
    },
    {
      title: "Сезон 5: Разлом Времени",
      description: "Первый сезон, где углублённо поднимается понятие времени. Разломы, конец времени, временные ветки, но, это только начало.",
      image: "https://cdn.poehali.dev/files/55eb3131-f5bb-4556-bcb3-f46fcaf2e43f.jpg",
      audio: null
    },
    {
      title: "Сезон 6: Осколки Неизбежности",
      description: "Тяжёлый сезон в плане эмоций, много потерь и мало хорошего. После совмещения всех веток в одну началось новое время.",
      image: "https://cdn.poehali.dev/files/a4010045-bc19-4345-b864-3a2e3b0b901c.png",
      audio: {
        title: "Creator",
        artist: "Lena Raine (Minecraft)",
        url: "https://rus.hitmotop.com/song/77781995"
      }
    },
    {
      title: "Сезон 7: Отражение Реалей",
      description: "Новое Время не помогает, парадоксы остались, решить не удалось. Главные герои спасаются от стирания, а вот луч, луча больше нет.",
      image: "https://cdn.poehali.dev/files/d8140562-0820-411a-92e8-42099ccfa9a6.png",
      audio: {
        title: "Aria Math",
        artist: "C418 (Minecraft)",
        url: "https://rus.hitmotop.com/song/78407789"
      }
    }
  ];

  const sideSeasons = [
    {
      title: "Побочный сезон 1: Моральное Осознание",
      description: (
        <>
          Попадание главного героя в мир, где время течёт не прямолинейно вместе с основным временем, углублённое познание в мирохождении и <a href="/terms#iskra" className="font-bold hover:text-minecraft-grass transition-colors">Искры²</a>.
        </>
      ),
      image: "https://cdn.poehali.dev/files/e147159b-eeba-4661-a7ba-3229e0400cba.jpg"
    },
    {
      title: "Побочный сезон 2: Моральное Осознание: Альтер - Эго",
      description: "Игра за Альтернативную версию главного героя. Очень короткий сезон, но очень интересный сезон.",
      image: "https://cdn.poehali.dev/files/06d6610f-c986-4a23-b000-b0ada6608fd6.jpg"
    }
  ];

  const inDevelopmentSeasons = [
    {
      title: "Название в Разработке",
      description: "Сезон в разработке.",
      image: "https://cdn.poehali.dev/files/043facda-aabc-4c99-95de-fefe4956e6e9.jpg",
      audio: null
    }
  ];

  const team = [
    {
      name: "Tempus",
      role: "Разработчик & Сюжетист",
      telegram: "@dfenger",
      description: "Создаю механики и сюжетные линии для наших сезонов",
      avatar: "https://cdn.poehali.dev/files/4d3abc8c-f272-41a6-8537-6df57b65cd0c.jpg"
    },
    {
      name: "KirkaShadow",
      role: "Разработчик & Строитель",
      telegram: "@KIRKA30",
      description: "Воплощаю идеи в жизнь через строительство и дизайн",
      avatar: "https://cdn.poehali.dev/files/f81084ff-a0ab-4513-aee4-4365b3fda356.jpg"
    }
  ];

  const gallery = [
    "https://cdn.poehali.dev/files/8c093338-e505-45e5-8cf9-7fcc4eb3970f.jpg",
    "https://cdn.poehali.dev/files/0c2e117a-832b-4727-aa05-18351297a54c.jpg",
    "https://cdn.poehali.dev/files/0968dd6e-a8bd-44dd-a9fb-acd5352ab405.jpg",
    "https://cdn.poehali.dev/files/9d186581-7fd4-4694-bdca-3b8b2d0be229.jpg",
    "https://cdn.poehali.dev/files/f8cae41d-e17b-4f2e-9ae7-3120dcb92183.jpg",
    "https://cdn.poehali.dev/files/89397628-5662-4e77-99ec-26d3bdb648c5.jpg",
    "https://cdn.poehali.dev/files/d72f0587-f0c5-4472-8492-5c65202df0da.jpg",
    "https://cdn.poehali.dev/files/008517c2-80ca-4a7c-b054-c131b9213536.jpg",
    "https://cdn.poehali.dev/files/8492de9e-062d-4814-8348-016b88a8a131.png",
    "https://cdn.poehali.dev/files/9142d3f8-7bb2-477e-8f24-ed57e834d64c.png"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${
      isDarkTheme 
        ? 'bg-gradient-to-b from-purple-950 via-orange-950 to-gray-950' 
        : 'bg-gradient-to-b from-minecraft-sky to-minecraft-grass/20'
    }`}>
      {/* Halloween decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Spiderwebs */}
        <div className="absolute top-0 left-0 text-6xl opacity-30">🕸️</div>
        <div className="absolute top-0 right-0 text-6xl opacity-30 transform scale-x-[-1]">🕸️</div>
        <div className="absolute bottom-20 left-10 text-5xl opacity-20">🕸️</div>
        <div className="absolute bottom-40 right-20 text-5xl opacity-20 transform scale-x-[-1]">🕸️</div>
        
        {/* Flying bats */}
        <div className="absolute top-1/4 left-1/4 text-4xl halloween-float opacity-40" style={{animationDelay: '0s'}}>🦇</div>
        <div className="absolute top-1/3 right-1/4 text-3xl halloween-float opacity-30" style={{animationDelay: '1s'}}>🦇</div>
        <div className="absolute top-2/3 left-1/3 text-3xl halloween-float opacity-35" style={{animationDelay: '2s'}}>🦇</div>
        <div className="absolute bottom-1/4 right-1/3 text-4xl halloween-float opacity-25" style={{animationDelay: '1.5s'}}>🦇</div>
        
        {/* Ghosts */}
        <div className="absolute top-1/2 left-10 text-5xl halloween-swing opacity-20" style={{animationDelay: '0.5s'}}>👻</div>
        <div className="absolute top-1/3 right-10 text-5xl halloween-swing opacity-20" style={{animationDelay: '1.5s'}}>👻</div>
        
        {/* Floating pumpkins */}
        <div className="absolute bottom-1/3 left-1/4 text-3xl halloween-float opacity-15" style={{animationDelay: '2.5s'}}>🎃</div>
        <div className="absolute bottom-1/2 right-1/4 text-3xl halloween-float opacity-15" style={{animationDelay: '3s'}}>🎃</div>
      </div>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b-4 shadow-lg transition-colors duration-500 relative ${
        isDarkTheme 
          ? 'bg-purple-950/95 border-orange-600 spooky-glow' 
          : 'bg-minecraft-stone/95 border-minecraft-brown'
      }`}>
        {isDarkTheme && (
          <>
            <div className="absolute -top-8 left-10 text-4xl animate-bounce">🎃</div>
            <div className="absolute -top-8 right-10 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎃</div>
          </>
        )}
        <div className="container mx-auto px-2 sm:px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h1 className="font-pixel text-[10px] sm:text-xs md:text-sm text-white">СЮЖЕТНЫЕ СЕЗОНЫ</h1>
            <div className="flex gap-2 items-center order-first sm:order-none">
              <button
                onClick={() => navigate('/terms')}
                disabled={showMemorial}
                className={`font-pixel text-xs p-2 border-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkTheme 
                    ? 'bg-purple-700 text-orange-300 border-purple-600 hover:bg-purple-600' 
                    : 'bg-minecraft-brown text-white border-minecraft-brown hover:bg-minecraft-brown/80'
                }`}
                title="Термины сезонов"
              >
                <Icon name="Book" size={14} />
              </button>
              <button
                onClick={openAchievementsPage}
                disabled={showMemorial}
                className={`font-pixel text-xs p-2 border-2 rounded transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkTheme 
                    ? 'bg-orange-600 text-white border-orange-500 hover:bg-orange-500' 
                    : 'bg-minecraft-grass text-black border-minecraft-grass hover:bg-minecraft-grass/80'
                }`}
              >
                <Icon name="Trophy" size={14} />
                {unlockedAchievements.length > 0 && !hasViewedAchievements && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">
                    {unlockedAchievements.length}
                  </span>
                )}
              </button>
              {foundPumpkins.size > 0 && (
                <div className={`font-pixel text-xs px-2 py-1 border-2 rounded transition-colors ${
                  isDarkTheme 
                    ? 'bg-orange-500 text-white border-orange-600 spooky-glow' 
                    : 'bg-orange-500 text-white border-orange-600'
                }`}>
                  🎃 {foundPumpkins.size}/8
                </div>
              )}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                disabled={showMemorial}
                className={`font-pixel text-xs p-2 border-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDarkTheme
                    ? 'bg-yellow-500 text-black border-yellow-600 hover:bg-yellow-400'
                    : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                }`}
              >
                <Icon name={isDarkTheme ? "Sun" : "Moon"} size={14} />
              </button>
            </div>
            <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
              {["home", "seasons", "download", "about", "team", "gallery"].map((section) => (
                <Button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  disabled={showMemorial}
                  variant={activeSection === section ? "default" : "ghost"}
                  className={`font-pixel text-[8px] sm:text-[9px] md:text-[10px] px-2 sm:px-3 py-1 h-auto border-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
                    activeSection === section 
                      ? isDarkTheme 
                        ? "bg-orange-500 text-black border-orange-700 hover:bg-orange-400 spooky-glow" 
                        : "bg-minecraft-grass text-black border-black hover:bg-minecraft-grass/80"
                      : isDarkTheme
                        ? "text-orange-300 border-purple-500/50 hover:bg-purple-800/30"
                        : "text-white border-white/20 hover:bg-white/10"
                  }`}
                >
                  {section === "home" && "ГЛАВНАЯ"}
                  {section === "seasons" && "СЕЗОНЫ"}
                  {section === "download" && "СКАЧАТЬ"}
                  {section === "about" && "О НАС"}
                  {section === "team" && "КОМАНДА"}
                  {section === "gallery" && "ГАЛЕРЕЯ"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/537b7315-92b4-40c0-87ba-736c2985a280.jpg)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-4xl h-full bg-gradient-to-b from-transparent via-minecraft-sky/10 to-transparent"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 animate-fade-in">
            <h2 className={`font-pixel text-xl sm:text-3xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 drop-shadow-lg transition-colors px-2 ${
              isDarkTheme ? 'text-orange-400 spooky-glow' : 'text-minecraft-stone'
            }`}>
              СЮЖЕТНЫЕ СЕЗОНЫ
            </h2>
            <p className={`font-sans text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto transition-colors px-4 ${
              isDarkTheme ? 'text-purple-200' : 'text-minecraft-stone/80'
            }`}>
              Сюжетные сезоны, созданные с любовью к игре и вниманием к деталям
            </p>
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-wrap px-4">
              <Button 
                onClick={() => scrollToSection("seasons")}
                disabled={showMemorial}
                className={`font-pixel text-[9px] sm:text-[10px] md:text-xs lg:text-sm border-2 sm:border-4 border-black px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 h-auto shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isDarkTheme 
                    ? 'bg-orange-600 text-white hover:bg-orange-500 spooky-glow' 
                    : 'bg-minecraft-grass text-black hover:bg-minecraft-grass/80'
                }`}
              >
                СМОТРЕТЬ СЕЗОНЫ
              </Button>
              <Button 
                onClick={() => scrollToSection("team")}
                disabled={showMemorial}
                variant="outline"
                className={`font-pixel text-[9px] sm:text-[10px] md:text-xs lg:text-sm border-2 sm:border-4 border-black px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 h-auto shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isDarkTheme 
                    ? 'bg-purple-700 text-white hover:bg-purple-600' 
                    : 'bg-[#0891b2] text-white hover:bg-[#0891b2]/80'
                }`}
              >
                ПОЗНАКОМИТЬСЯ
              </Button>
            </div>
          </div>
          
          <div className="absolute top-20 left-4 sm:left-10 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(1)}>
            <div className={`text-4xl sm:text-5xl ${foundPumpkins.has(1) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
          </div>
          
          <div className="mt-6 sm:mt-8 md:mt-12 animate-float px-2 sm:px-4">
            <img 
              src="https://cdn.poehali.dev/files/52a192e4-420c-42f2-be29-f58ba27d00c4.png"
              alt="Minecraft World"
              className="rounded-lg border-2 sm:border-4 border-minecraft-stone shadow-2xl mx-auto max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full"
            />
          </div>
        </div>
      </section>

      <section id="seasons" className={`min-h-screen py-12 sm:py-16 px-4 relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-purple-900/40 shadow-2xl' : 'bg-minecraft-stone/10'
      }`}>
        <div 
          className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/537b7315-92b4-40c0-87ba-736c2985a280.jpg)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="absolute top-10 right-4 sm:right-10 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(2)}>
            <div className={`text-4xl sm:text-5xl ${foundPumpkins.has(2) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
          </div>
          
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-16 transition-colors ${
            isDarkTheme ? 'text-orange-400 spooky-glow' : 'text-minecraft-stone'
          }`}>
            НАШИ СЕЗОНЫ
          </h2>

          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className={`h-1 flex-1 max-w-xs transition-colors ${
                isDarkTheme ? 'bg-orange-500' : 'bg-cyan-500'
              }`}></div>
              <h3 className={`font-pixel text-xl sm:text-3xl mx-6 transition-colors ${
                isDarkTheme ? 'text-orange-400' : 'text-cyan-500'
              }`}>
                НАЧАЛО
              </h3>
              <div className={`h-1 flex-1 max-w-xs transition-colors ${
                isDarkTheme ? 'bg-orange-500' : 'bg-cyan-500'
              }`}></div>
            </div>
            <div className="flex justify-center">
              {startSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className={`relative border-4 sm:border-6 lg:border-8 hover:scale-105 transition-all duration-300 overflow-hidden group w-full sm:max-w-md lg:max-w-2xl ${
                    showMemorial ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  } ${
                    isDarkTheme
                      ? 'bg-gray-950 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_rgba(249,115,22,0.8)]'
                      : 'bg-white border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-[10px_10px_0px_rgba(0,0,0,0.4)]'
                  }`}
                  onClick={() => {
                    if (!showMemorial && !isButtonLocked) {
                      setIsButtonLocked(true);
                      setSelectedSeason(index);
                      setViewedSeasons(prev => new Set(prev).add(index));
                    }
                  }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 ${
                    isDarkTheme ? 'bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600' : 'bg-cyan-500'
                  }`}></div>
                  <div className="overflow-hidden">
                    <img 
                      src={season.image}
                      alt={season.title}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 lg:p-8">
                    <h3 className={`font-pixel text-sm sm:text-base lg:text-lg mb-4 transition-colors ${
                      isDarkTheme ? 'text-orange-400' : 'text-minecraft-brown'
                    }`}>
                      {season.title}
                    </h3>
                    <p className={`font-sans text-sm sm:text-base transition-colors ${
                      isDarkTheme ? 'text-purple-200' : 'text-minecraft-stone/80'
                    }`}>
                      {season.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center mb-8 relative">
              <div className="absolute left-0 -top-8 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(3)}>
                <div className={`text-3xl sm:text-4xl ${foundPumpkins.has(3) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
              </div>
              <div className="h-1 flex-1 max-w-xs transition-colors" style={{ backgroundColor: '#f4bc09' }}></div>
              <h3 className="font-pixel text-xl sm:text-3xl mx-6 transition-colors" style={{ color: '#f4bc09' }}>
                ОСНОВНОЙ СЮЖЕТ
              </h3>
              <div className="h-1 flex-1 max-w-xs transition-colors" style={{ backgroundColor: '#f4bc09' }}></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {mainSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className={`relative border-4 sm:border-6 lg:border-8 hover:scale-105 transition-all duration-300 overflow-hidden group ${
                    showMemorial ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  } ${
                    isDarkTheme
                      ? 'bg-purple-950 border-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.5)] hover:shadow-[0_0_40px_rgba(234,88,12,0.8)]'
                      : 'bg-white border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-[10px_10px_0px_rgba(0,0,0,0.4)]'
                  }`}
                  onClick={() => {
                    if (!showMemorial && !isButtonLocked) {
                      setIsButtonLocked(true);
                      const seasonIndex = index + startSeasons.length;
                      setSelectedSeason(seasonIndex);
                      setViewedSeasons(prev => new Set(prev).add(seasonIndex));
                    }
                  }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 transition-colors ${
                    isDarkTheme ? 'bg-gradient-to-r from-purple-600 via-orange-600 to-purple-600' : ''
                  }`} style={{ backgroundColor: isDarkTheme ? '' : '#f4bc09' }}></div>
                  <div className="overflow-hidden">
                    <img 
                      src={season.image}
                      alt={season.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className={`font-pixel text-xs sm:text-sm mb-2 sm:mb-4 transition-colors ${
                      isDarkTheme ? 'text-orange-400' : 'text-minecraft-brown'
                    }`}>
                      {season.title}
                    </h3>
                    <div className={`font-sans text-xs sm:text-sm mb-2 sm:mb-4 transition-colors ${
                      isDarkTheme ? 'text-purple-200' : 'text-minecraft-stone/80'
                    }`}>
                      {season.description}
                    </div>
                    {season.audio && (
                      <a
                        href={season.audio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 sm:gap-2 font-pixel text-[8px] sm:text-[10px] px-2 sm:px-4 py-1 sm:py-2 border-2 transition-colors ${
                          isDarkTheme
                            ? 'bg-orange-600 text-white border-orange-400 hover:bg-orange-500'
                            : 'bg-minecraft-stone text-white border-black hover:bg-minecraft-stone/80'
                        }`}
                      >
                        <Icon name="Music" size={12} className="sm:w-3.5 sm:h-3.5" />
                        {season.audio.title} - {season.audio.artist}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
              <div className="hidden lg:block"></div>
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center mb-8 relative">
              <div className="absolute right-0 -top-8 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(6)}>
                <div className={`text-3xl sm:text-4xl ${foundPumpkins.has(6) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
              </div>
              <div className={`h-1 flex-1 max-w-xs transition-colors ${
                isDarkTheme ? 'bg-green-400' : 'bg-minecraft-grass'
              }`}></div>
              <h3 className={`font-pixel text-xl sm:text-3xl mx-6 transition-colors ${
                isDarkTheme ? 'text-green-400' : 'text-minecraft-grass'
              }`}>
                ПОБОЧНЫЕ СЕЗОНЫ
              </h3>
              <div className={`h-1 flex-1 max-w-xs transition-colors ${
                isDarkTheme ? 'bg-green-400' : 'bg-minecraft-grass'
              }`}></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {sideSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className={`relative border-4 sm:border-6 lg:border-8 hover:scale-105 transition-all duration-300 overflow-hidden group ${
                    showMemorial ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  } ${
                    isDarkTheme
                      ? 'bg-purple-950 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_rgba(249,115,22,0.8)]'
                      : 'bg-white border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-[10px_10px_0px_rgba(0,0,0,0.4)]'
                  }`}
                  onClick={() => {
                    if (!showMemorial) {
                      const seasonIndex = startSeasons.length + mainSeasons.length + index;
                      setSelectedSeason(seasonIndex);
                      setViewedSeasons(prev => new Set(prev).add(seasonIndex));
                    }
                  }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 ${
                    isDarkTheme ? 'bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600' : 'bg-minecraft-grass'
                  }`}></div>
                  <div className="overflow-hidden">
                    <img 
                      src={season.image}
                      alt={season.title}
                      className="w-full h-48 sm:h-52 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 lg:p-8">
                    <h3 className={`font-pixel text-xs sm:text-sm lg:text-base mb-2 sm:mb-4 transition-colors ${
                      isDarkTheme ? 'text-green-400' : 'text-minecraft-grass'
                    }`}>
                      {season.title}
                    </h3>
                    <div className={`font-sans text-xs sm:text-sm transition-colors ${
                      isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
                    }`}>
                      {season.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {inDevelopmentSeasons.length > 0 && (
            <div>
              <div className="flex items-center justify-center mb-8 relative">
                <div className="absolute left-1/4 -top-10 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(7)}>
                  <div className={`text-3xl sm:text-4xl ${foundPumpkins.has(7) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
                </div>
                <div className={`h-1 flex-1 max-w-xs transition-colors ${
                  isDarkTheme ? 'bg-purple-400' : 'bg-minecraft-sky'
                }`}></div>
                <h3 className={`font-pixel text-xl sm:text-3xl mx-6 transition-colors ${
                  isDarkTheme ? 'text-purple-400' : 'text-minecraft-sky'
                }`}>
                  СЕЗОНЫ В РАЗРАБОТКЕ
                </h3>
                <div className={`h-1 flex-1 max-w-xs transition-colors ${
                  isDarkTheme ? 'bg-purple-400' : 'bg-minecraft-sky'
                }`}></div>
              </div>
              <div className="flex justify-center">
                {inDevelopmentSeasons.map((season, index) => (
                  <Card 
                    key={index}
                    className={`relative border-4 sm:border-6 lg:border-8 hover:scale-105 transition-all duration-300 overflow-hidden group w-full sm:max-w-md lg:max-w-2xl ${
                      showMemorial ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    } ${
                      isDarkTheme
                        ? 'bg-gray-950 border-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:shadow-[0_0_40px_rgba(147,51,234,0.9)]'
                        : 'bg-white border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-[10px_10px_0px_rgba(0,0,0,0.4)]'
                    }`}
                    onClick={() => {
                      if (!showMemorial) {
                        const seasonIndex = startSeasons.length + mainSeasons.length + sideSeasons.length + index;
                        setSelectedSeason(seasonIndex);
                        setViewedSeasons(prev => new Set(prev).add(seasonIndex));
                      }
                    }}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-2 ${
                      isDarkTheme ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500' : 'bg-minecraft-sky'
                    }`}></div>
                    <div className={`absolute top-2 right-2 z-10 font-pixel text-[8px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 border-2 transition-colors ${
                      isDarkTheme
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-minecraft-sky text-white border-black'
                    }`}>
                      В РАЗРАБОТКЕ
                    </div>
                    <div className="overflow-hidden">
                      <img 
                        src={season.image}
                        alt={season.title}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 lg:p-8">
                      <h3 className={`font-pixel text-sm sm:text-base lg:text-lg mb-4 transition-colors ${
                        isDarkTheme ? 'text-purple-400' : 'text-minecraft-sky'
                      }`}>
                        {season.title}
                      </h3>
                      <div className={`font-sans text-sm sm:text-base mb-4 transition-colors ${
                        isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
                      }`}>
                        {season.description}
                      </div>
                      {season.audio && (
                        <a
                          href={season.audio.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 font-pixel text-[10px] sm:text-xs px-4 py-2 border-2 transition-colors ${
                            isDarkTheme
                              ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500'
                              : 'bg-minecraft-stone text-white border-black hover:bg-minecraft-stone/80'
                          }`}
                        >
                          <Icon name="Music" size={14} />
                          {season.audio.title} - {season.audio.artist}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="download" className={`min-h-screen py-10 sm:py-14 md:py-16 px-4 flex items-center relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-purple-900/40' : 'bg-minecraft-stone/10'
      }`}>
        <div 
          className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/537b7315-92b4-40c0-87ba-736c2985a280.jpg)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="absolute top-5 left-10 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(8)}>
            <div className={`text-4xl sm:text-5xl ${foundPumpkins.has(8) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
          </div>
          
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-12 transition-colors ${
            isDarkTheme ? 'text-orange-400' : 'text-minecraft-stone'
          }`}>
            СКАЧАТЬ MINECRAFT
          </h2>
          
          <div className="max-w-4xl mx-auto text-center">
            <Button
              onClick={() => setShowDownloads(!showDownloads)}
              disabled={showMemorial}
              className={`font-pixel text-[10px] sm:text-xs md:text-sm lg:text-lg border-2 sm:border-4 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-6 h-auto shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isDarkTheme 
                  ? 'bg-orange-600 text-white hover:bg-orange-500 border-orange-800 spooky-glow' 
                  : 'bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-black'
              }`}
            >
              <Icon name={showDownloads ? "ChevronUp" : "ChevronDown"} size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm lg:text-base">{showDownloads ? "СКРЫТЬ" : "ПОКАЗАТЬ"}</span>
            </Button>
          </div>

          {showDownloads && (
          <div className={`relative max-w-4xl mx-auto border-4 sm:border-6 lg:border-8 p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg mt-6 sm:mt-8 animate-fade-in transition-all overflow-hidden ${
            isDarkTheme
              ? 'bg-gray-900 border-minecraft-grass shadow-[0_0_20px_rgba(34,197,94,0.4)]'
              : 'bg-white border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.3)]'
          }`}>
            <div className={`absolute top-0 left-0 right-0 h-2 ${
              isDarkTheme ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-500' : 'bg-minecraft-grass'
            }`}></div>
            <p className={`font-sans text-sm sm:text-base md:text-lg text-center mb-6 sm:mb-8 px-2 transition-colors ${
              isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
            }`}>
              Выберите подходящую версию Minecraft для вашей платформы
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className={`border-2 sm:border-4 p-4 sm:p-6 transition-colors ${
                isDarkTheme
                  ? 'border-green-500 bg-green-900/20 hover:bg-green-900/30'
                  : 'border-minecraft-grass bg-minecraft-grass/5 hover:bg-minecraft-grass/10'
              }`}>
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <Icon name="Monitor" size={24} className={`sm:w-8 sm:h-8 ${
                    isDarkTheme ? 'text-green-400' : 'text-minecraft-grass'
                  }`} />
                  <h3 className={`font-pixel text-sm sm:text-base md:text-lg transition-colors ${
                    isDarkTheme ? 'text-green-400' : 'text-minecraft-stone'
                  }`}>Windows</h3>
                </div>
                <p className={`font-sans text-xs sm:text-sm mb-3 sm:mb-4 transition-colors ${
                  isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/70'
                }`}>
                  Версия для компьютеров на Windows
                </p>
                <a 
                  href="https://minecraft-downloads.net/MinecraftInstaller.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full ${showMemorial ? 'pointer-events-none' : ''}`}
                >
                  <Button 
                    disabled={showMemorial}
                    className="w-full font-pixel text-[10px] sm:text-xs bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-2 sm:border-4 border-black h-auto py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="Download" size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4" />
                    СКАЧАТЬ
                  </Button>
                </a>
              </div>

              <div className={`border-2 sm:border-4 p-4 sm:p-6 transition-colors ${
                isDarkTheme
                  ? 'border-yellow-500 bg-yellow-900/20 hover:bg-yellow-900/30'
                  : 'border-minecraft-brown bg-minecraft-brown/5 hover:bg-minecraft-brown/10'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Boxes" size={24} className={`sm:w-8 sm:h-8 ${
                    isDarkTheme ? 'text-yellow-400' : 'text-minecraft-brown'
                  }`} />
                  <h3 className={`font-pixel text-sm sm:text-base md:text-lg transition-colors ${
                    isDarkTheme ? 'text-yellow-400' : 'text-minecraft-stone'
                  }`}>mcpeHub</h3>
                </div>
                <p className={`font-sans text-xs sm:text-sm mb-3 sm:mb-4 transition-colors ${
                  isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/70'
                }`}>
                  Универсальный лаунчер для всех платформ
                </p>
                <a 
                  href="https://mcpehub.org/engine/dlfile.php?id=49382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full ${showMemorial ? 'pointer-events-none' : ''}`}
                >
                  <Button 
                    disabled={showMemorial}
                    className="w-full font-pixel text-[10px] sm:text-xs bg-minecraft-brown text-white hover:bg-minecraft-brown/80 border-2 sm:border-4 border-black h-auto py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    СКАЧАТЬ
                  </Button>
                </a>
              </div>

              <div className={`border-2 sm:border-4 p-4 sm:p-6 transition-colors ${
                isDarkTheme
                  ? 'border-cyan-500 bg-cyan-900/20 hover:bg-cyan-900/30'
                  : 'border-minecraft-sky bg-minecraft-sky/5 hover:bg-minecraft-sky/10'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Smartphone" size={24} className={`sm:w-8 sm:h-8 ${
                    isDarkTheme ? 'text-cyan-400' : 'text-minecraft-sky'
                  }`} />
                  <h3 className={`font-pixel text-sm sm:text-base md:text-lg transition-colors ${
                    isDarkTheme ? 'text-cyan-400' : 'text-minecraft-stone'
                  }`}>Android</h3>
                </div>
                <p className={`font-sans text-xs sm:text-sm mb-3 sm:mb-4 transition-colors ${
                  isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/70'
                }`}>
                  Pocket Edition для Android устройств
                </p>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.mojang.minecraftpe&hl=ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full ${showMemorial ? 'pointer-events-none' : ''}`}
                >
                  <Button 
                    disabled={showMemorial}
                    className="w-full font-pixel text-[10px] sm:text-xs bg-minecraft-sky text-white hover:bg-minecraft-sky/80 border-2 sm:border-4 border-black h-auto py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    СКАЧАТЬ
                  </Button>
                </a>
              </div>

              <div className={`border-2 sm:border-4 p-4 sm:p-6 transition-colors ${
                isDarkTheme
                  ? 'border-gray-500 bg-gray-800/50 hover:bg-gray-800/70'
                  : 'border-minecraft-stone bg-minecraft-stone/5 hover:bg-minecraft-stone/10'
              }`}>
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Smartphone" size={24} className={`sm:w-8 sm:h-8 ${
                    isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone'
                  }`} />
                  <h3 className={`font-pixel text-sm sm:text-base md:text-lg transition-colors ${
                    isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone'
                  }`}>iOS</h3>
                </div>
                <p className={`font-sans text-xs sm:text-sm mb-3 sm:mb-4 transition-colors ${
                  isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/70'
                }`}>
                  Pocket Edition для iPhone и iPad
                </p>
                <Button 
                  className="w-full font-pixel text-[8px] sm:text-xs bg-minecraft-stone text-white hover:bg-minecraft-stone/80 border-2 sm:border-4 border-black h-auto py-2 sm:py-3 px-1"
                  disabled
                >
                  <span className="break-words leading-tight">Скоро появится</span>
                </Button>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 text-center px-4">
              <p className={`font-pixel text-[10px] sm:text-xs md:text-sm border-2 sm:border-4 p-2 sm:p-3 md:p-4 inline-block transition-colors ${
                isDarkTheme
                  ? 'text-yellow-300 bg-yellow-900/30 border-yellow-500'
                  : 'text-minecraft-stone/70 bg-yellow-100 border-yellow-500'
              }`}>
                Игра платная, никого не навязываем скачивать!!!
              </p>
            </div>
          </div>
          )}
        </div>
      </section>

      <section id="about" className={`min-h-screen py-10 sm:py-14 md:py-16 px-4 flex items-center relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-transparent' : 'bg-transparent'
      }`}>
        <div 
          className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/537b7315-92b4-40c0-87ba-736c2985a280.jpg)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <h2 className={`font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 sm:mb-12 transition-colors px-4 ${
            isDarkTheme ? 'text-orange-400' : 'text-minecraft-stone'
          }`}>
            О ПРОЕКТЕ
          </h2>
          <div className={`max-w-4xl mx-auto border-4 p-4 sm:p-8 md:p-12 rounded-lg shadow-xl transition-colors ${
            isDarkTheme ? 'bg-purple-950 border-orange-600 spooky-glow' : 'bg-white border-minecraft-stone'
          }`}>
            <div className={`space-y-4 sm:space-y-6 font-sans text-sm sm:text-base md:text-lg transition-colors ${
              isDarkTheme ? 'text-purple-200' : 'text-minecraft-stone/90'
            }`}>
              <p>
                Мы создаём уникальные сюжетные сезоны в Minecraft, где каждая постройка, каждое событие 
                и каждый персонаж играют важную роль в общей истории.
              </p>
              <p>
                Наши сезоны — это не просто игра, это полноценные приключения с проработанным сюжетом, 
                интересными механиками и запоминающимися моментами.
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-4 pt-2 sm:pt-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-minecraft-grass border-2 sm:border-4 border-minecraft-stone flex items-center justify-center">
                  <Icon name="Pickaxe" size={24} className="text-minecraft-brown sm:w-8 sm:h-8" />
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-minecraft-water border-2 sm:border-4 border-minecraft-stone flex items-center justify-center">
                  <Icon name="Hammer" size={24} className="text-white sm:w-8 sm:h-8" />
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-minecraft-sand border-2 sm:border-4 border-minecraft-stone flex items-center justify-center">
                  <Icon name="Sword" size={24} className="text-minecraft-brown sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className={`min-h-screen py-10 sm:py-14 md:py-16 px-4 relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-purple-900/40' : 'bg-minecraft-stone/10'
      }`}>
        <div 
          className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/537b7315-92b4-40c0-87ba-736c2985a280.jpg)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(4)}>
            <div className={`text-4xl sm:text-5xl ${foundPumpkins.has(4) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
          </div>
          
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-12 transition-colors ${
            isDarkTheme ? 'text-orange-400' : 'text-minecraft-stone'
          }`}>
            КОМАНДА
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                onClick={() => {
                  if (!showMemorial && !isButtonLocked) {
                    setIsButtonLocked(true);
                    setSelectedMember(index);
                  }
                }}
                className={`relative border-4 sm:border-8 hover:scale-105 transition-all duration-300 overflow-hidden ${
                  showMemorial ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } ${
                  isDarkTheme
                    ? 'bg-purple-950 border-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_rgba(249,115,22,0.8)]'
                    : 'bg-white border-minecraft-stone shadow-[4px_4px_0px_rgba(0,0,0,0.3)] sm:shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] sm:hover:shadow-[12px_12px_0px_rgba(0,0,0,0.4)]'
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 sm:h-2 ${
                  isDarkTheme ? 'bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600' : 'bg-minecraft-grass'
                }`}></div>
                <CardContent className="p-4 sm:p-8 text-center">
                  <div className={`relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 overflow-hidden ${
                    isDarkTheme 
                      ? 'border-3 sm:border-4 border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.6)] sm:shadow-[0_0_20px_rgba(139,92,246,0.6)]' 
                      : 'border-3 sm:border-4 border-minecraft-stone shadow-[3px_3px_0px_rgba(0,0,0,0.4)] sm:shadow-[4px_4px_0px_rgba(0,0,0,0.4)]'
                  }`}>
                    <div className={`absolute inset-0 ${
                      isDarkTheme ? 'bg-gradient-to-br from-purple-900 to-gray-900' : 'bg-minecraft-brown'
                    }`}></div>
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover relative z-10 pixelated"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    ) : (
                      <Icon name="User" size={48} className="text-white relative z-10" />
                    )}
                  </div>
                  <h3 className={`font-pixel text-base sm:text-xl mb-2 transition-colors ${
                    isDarkTheme ? 'text-orange-400' : 'text-minecraft-brown'
                  }`}>
                    {member.name}
                  </h3>
                  <p className={`font-sans text-xs sm:text-sm mb-3 sm:mb-4 transition-colors ${
                    isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                  }`}>
                    {member.role}
                  </p>
                  <p className={`font-sans text-xs sm:text-sm mb-3 sm:mb-4 transition-colors ${
                    isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
                  }`}>
                    {member.description}
                  </p>
                  <div className={`inline-flex items-center gap-1.5 sm:gap-2 font-pixel text-[9px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 border-2 transition-colors ${
                    isDarkTheme
                      ? 'bg-orange-600 text-white border-orange-400 hover:bg-orange-500'
                      : 'bg-minecraft-sky text-white border-black hover:bg-minecraft-sky/90'
                  }`}>
                    <Icon name="Send" size={12} className="sm:w-4 sm:h-4" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{member.telegram}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedMember !== null && (
            <div 
              className={`fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'
              }`}
              onClick={handleCloseModal}
            >
              <div 
                className={`border-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
                  isClosing ? 'scale-90' : 'scale-100 animate-scale-in'
                } ${
                  isDarkTheme
                    ? 'bg-gray-900 border-purple-500 shadow-[0_0_30px_rgba(139,92,246,0.5)]'
                    : 'bg-white border-minecraft-stone shadow-[12px_12px_0px_rgba(0,0,0,0.5)]'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <h3 className={`font-pixel text-lg sm:text-xl md:text-2xl transition-colors ${
                      isDarkTheme ? 'text-purple-400' : 'text-minecraft-brown'
                    }`}>
                      {team[selectedMember].name}
                    </h3>
                    <button 
                      onClick={handleCloseModal}
                      className={`transition-colors p-1 ${
                        isDarkTheme ? 'text-gray-400 hover:text-purple-400' : 'text-minecraft-stone hover:text-minecraft-brown'
                      }`}
                    >
                      <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  
                  <div className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 flex items-center justify-center overflow-hidden ${
                    isDarkTheme
                      ? 'border-4 border-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.6)]'
                      : 'bg-minecraft-brown border-4 border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.4)]'
                  }`}>
                    <div className={`absolute inset-0 ${
                      isDarkTheme ? 'bg-gradient-to-br from-purple-900 to-gray-900' : ''
                    }`}></div>
                    {team[selectedMember].avatar ? (
                      <img 
                        src={team[selectedMember].avatar} 
                        alt={team[selectedMember].name}
                        className="w-full h-full object-cover relative z-10 pixelated"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    ) : (
                      <Icon name="User" size={64} className="text-white sm:w-20 sm:h-20 md:w-24 md:h-24 relative z-10" />
                    )}
                  </div>
                  
                  <div className="text-center space-y-3 sm:space-y-4">
                    <p className={`font-sans text-sm sm:text-base md:text-lg transition-colors ${
                      isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                    }`}>
                      {team[selectedMember].role}
                    </p>
                    <p className={`font-sans text-xs sm:text-sm md:text-base px-2 transition-colors ${
                      isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
                    }`}>
                      {team[selectedMember].description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <a 
                        href={`https://t.me/${team[selectedMember].telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 font-pixel text-sm px-6 py-3 border-4 transition-colors ${
                          isDarkTheme
                            ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500'
                            : 'bg-minecraft-sky text-white border-black hover:bg-minecraft-sky/80'
                        }`}
                      >
                        <Icon name="Send" size={20} />
                        Написать {team[selectedMember].telegram}
                      </a>
                      {selectedMember === 0 && (
                        <button
                          onClick={() => {
                            setShowCharacter(true);
                            setViewedCharacters(prev => new Set(prev).add(0));
                            handleCloseModal();
                          }}
                          disabled={showCharacter || showCharacter2 || showCharacter3}
                          className={`inline-flex items-center gap-2 font-pixel text-sm px-6 py-3 border-4 transition-colors ${
                            (showCharacter || showCharacter2 || showCharacter3)
                              ? 'bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed opacity-50'
                              : isDarkTheme
                              ? 'bg-yellow-600 text-white border-yellow-400 hover:bg-yellow-500'
                              : 'bg-minecraft-grass text-black border-black hover:bg-minecraft-grass/80'
                          }`}
                        >
                          <Icon name="User" size={20} />
                          Главный персонаж
                        </button>
                      )}
                      {selectedMember === 1 && (
                        <>
                          <button
                            onClick={() => {
                              setShowCharacter2(true);
                              setViewedCharacters(prev => new Set(prev).add(1));
                              handleCloseModal();
                            }}
                            disabled={showCharacter || showCharacter2 || showCharacter3}
                            className={`inline-flex items-center gap-2 font-pixel text-sm px-6 py-3 border-4 transition-colors ${
                              (showCharacter || showCharacter2 || showCharacter3)
                                ? 'bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed opacity-50'
                                : isDarkTheme
                                ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500'
                                : 'bg-minecraft-sky text-black border-black hover:bg-minecraft-sky/80'
                            }`}
                          >
                            <Icon name="User" size={20} />
                            Уголь
                          </button>
                          <button
                            onClick={() => {
                              setShowCharacter3(true);
                              setViewedCharacters(prev => new Set(prev).add(2));
                              handleCloseModal();
                            }}
                            disabled={showCharacter || showCharacter2 || showCharacter3}
                            className={`inline-flex items-center gap-2 font-pixel text-sm px-6 py-3 border-4 transition-colors ${
                              (showCharacter || showCharacter2 || showCharacter3)
                                ? 'bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed opacity-50'
                                : isDarkTheme
                                ? 'bg-orange-600 text-white border-orange-400 hover:bg-orange-500'
                                : 'bg-minecraft-brown text-white border-black hover:bg-minecraft-brown/80'
                            }`}
                          >
                            <Icon name="User" size={20} />
                            Раст
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="gallery" className={`min-h-screen py-10 sm:py-14 md:py-16 px-4 relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-purple-900/40' : 'bg-transparent'
      }`}>
        <div 
          className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/537b7315-92b4-40c0-87ba-736c2985a280.jpg)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="absolute top-0 right-10 z-10 animate-bounce cursor-pointer hover:scale-110 transition-transform" onClick={() => handlePumpkinClick(5)}>
            <div className={`text-4xl sm:text-5xl ${foundPumpkins.has(5) ? 'opacity-30 grayscale' : ''}`}>🎃</div>
          </div>
          
          <h2 className={`font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 sm:mb-12 transition-colors px-4 ${
            isDarkTheme ? 'text-orange-400' : 'text-minecraft-stone'
          }`}>
            ГАЛЕРЕЯ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
            {gallery.map((image, index) => (
              <div 
                key={index}
                onClick={() => {
                  if (!showMemorial && !isButtonLocked) {
                    setIsButtonLocked(true);
                    setSelectedImage(image);
                    setViewedImages(prev => new Set(prev).add(index));
                  }
                }}
                className={`overflow-hidden border-4 sm:border-6 hover:scale-[1.02] transition-all duration-300 ${
                  showMemorial ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } ${
                  isDarkTheme
                    ? 'border-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_rgba(249,115,22,0.8)]'
                    : 'border-minecraft-stone shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)]'
                }`}
              >
                <img 
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div 
          className={`fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'
          }`}
          onClick={handleCloseModal}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-minecraft-stone hover:bg-minecraft-stone/80 border-2 sm:border-4 border-white flex items-center justify-center transition-colors"
          >
            <Icon name="X" size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
          <img 
            src={selectedImage}
            alt="Full size"
            className={`max-w-full max-h-[80vh] sm:max-h-full object-contain border-2 sm:border-4 border-minecraft-stone transition-transform duration-300 ${
              isClosing ? 'scale-90' : 'scale-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {selectedSeason !== null && (() => {
        const allSeasons = [...startSeasons, ...mainSeasons, ...sideSeasons, ...inDevelopmentSeasons];
        const season = allSeasons[selectedSeason];
        
        // Determine border color based on season category
        let borderColorClass = 'border-minecraft-stone';
        let topBarColorClass = 'bg-cyan-500';
        let titleColorClass = 'text-minecraft-brown';
        
        if (selectedSeason < startSeasons.length) {
          // Start seasons
          borderColorClass = isDarkTheme ? 'border-cyan-500' : 'border-minecraft-stone';
          topBarColorClass = isDarkTheme ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500' : 'bg-cyan-500';
          titleColorClass = isDarkTheme ? 'text-cyan-400' : 'text-minecraft-brown';
        } else if (selectedSeason < startSeasons.length + mainSeasons.length) {
          // Main seasons
          borderColorClass = isDarkTheme ? 'border-yellow-500' : 'border-minecraft-stone';
          topBarColorClass = isDarkTheme ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500' : 'bg-[#f4bc09]';
          titleColorClass = isDarkTheme ? 'text-yellow-400' : 'text-minecraft-brown';
        } else if (selectedSeason < startSeasons.length + mainSeasons.length + sideSeasons.length) {
          // Side seasons
          borderColorClass = isDarkTheme ? 'border-green-500' : 'border-minecraft-stone';
          topBarColorClass = isDarkTheme ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-500' : 'bg-minecraft-grass';
          titleColorClass = isDarkTheme ? 'text-green-400' : 'text-minecraft-grass';
        } else {
          // In development seasons
          borderColorClass = isDarkTheme ? 'border-purple-500' : 'border-minecraft-stone';
          topBarColorClass = isDarkTheme ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500' : 'bg-minecraft-sky';
          titleColorClass = isDarkTheme ? 'text-purple-400' : 'text-minecraft-sky';
        }
        
        return (
          <div 
            className={`fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 overflow-y-auto transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'
            }`}
            onClick={handleCloseModal}
          >
            <div 
              className={`${isDarkTheme ? 'bg-gray-900' : 'bg-white'} border-4 sm:border-6 lg:border-8 ${borderColorClass} rounded-lg max-w-3xl w-full my-8 transition-transform duration-300 ${
                isClosing ? 'scale-90' : 'scale-100 animate-scale-in'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className={`absolute top-0 left-0 right-0 h-2 ${topBarColorClass}`}></div>
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-minecraft-stone hover:bg-minecraft-stone/80 border-2 sm:border-4 border-white flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={16} className="text-white sm:w-5 sm:h-5" />
                </button>
                <img 
                  src={season.image}
                  alt="Season"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className={`font-pixel text-base sm:text-xl md:text-2xl mb-3 sm:mb-4 ${titleColorClass}`}>
                  {season.title}
                </h3>
                <div className="font-sans text-sm sm:text-base text-minecraft-stone/80 leading-relaxed mb-3 sm:mb-4">
                  {season.description}
                </div>
                {season.audio && (
                  <a
                    href={season.audio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 sm:gap-2 font-pixel text-[10px] sm:text-xs bg-minecraft-stone text-white px-3 sm:px-4 py-2 sm:py-3 border-2 border-black hover:bg-minecraft-stone/80 transition-colors"
                  >
                    <Icon name="Music" size={14} className="sm:w-4 sm:h-4" />
                    <span className="truncate">{season.audio.title} - {season.audio.artist}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      <footer className="bg-minecraft-stone border-t-2 sm:border-t-4 border-minecraft-brown py-6 sm:py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="font-pixel text-[8px] sm:text-[10px] text-white/80 px-2">
            © 2025 СЮЖЕТНЫЕ СЕЗОНЫ | MADE WITH ❤️
          </p>
        </div>
      </footer>

      {showAchievement && currentAchievement && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-[200] animate-fade-in max-w-[280px] sm:max-w-[320px]">
          <div className={`bg-minecraft-stone border-2 sm:border-4 p-3 sm:p-4 shadow-2xl ${
            currentAchievement.id === 'spooky-harvest' 
              ? 'border-orange-500 spooky-glow' 
              : 'border-minecraft-grass'
          }`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 border-2 border-black flex items-center justify-center flex-shrink-0 ${
                currentAchievement.id === 'spooky-harvest' 
                  ? 'bg-orange-500' 
                  : 'bg-minecraft-grass'
              }`}>
                <Icon name={currentAchievement.icon as any} size={20} className="text-white sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className={`font-pixel text-[8px] sm:text-xs ${
                  currentAchievement.id === 'spooky-harvest' 
                    ? 'text-orange-400' 
                    : 'text-minecraft-grass'
                }`}>ДОСТИЖЕНИЕ!</p>
                <h4 className="font-pixel text-[10px] sm:text-sm text-white truncate">{currentAchievement.title}</h4>
              </div>
            </div>
            <p className="font-sans text-[10px] sm:text-xs text-white/80 mt-2">
              {currentAchievement.description}
            </p>
          </div>
        </div>
      )}

      {showAchievementsPage && (
        <div 
          className={`fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 sm:border-4 p-4 sm:p-6 md:p-8 rounded-lg transition-transform duration-300 ${
              isClosing ? 'scale-90' : 'scale-100'
            } ${
              isDarkTheme ? 'bg-gray-800 border-gray-600' : 'bg-minecraft-stone border-minecraft-grass'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-minecraft-grass">ДОСТИЖЕНИЯ</h2>
              <button 
                onClick={handleCloseModal}
                className="text-white hover:text-minecraft-grass transition-colors p-1"
              >
                <Icon name="X" size={24} className="sm:w-8 sm:h-8" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {achievements.map((achievement) => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                return (
                  <div 
                    key={achievement.id}
                    className={`border-2 sm:border-4 p-3 sm:p-4 md:p-6 transition-all ${
                      isUnlocked 
                        ? achievement.id === 'spooky-harvest' 
                          ? 'bg-orange-500/20 border-orange-500' 
                          : 'bg-minecraft-grass/20 border-minecraft-grass'
                        : 'bg-gray-900/50 border-gray-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 flex items-center justify-center flex-shrink-0 ${
                        isUnlocked 
                          ? achievement.id === 'spooky-harvest'
                            ? 'bg-orange-500 border-black'
                            : 'bg-minecraft-grass border-black'
                          : 'bg-gray-800 border-gray-600'
                      }`}>
                        <Icon 
                          name={isUnlocked ? achievement.icon as any : "Lock"} 
                          size={20} 
                          className={`${isUnlocked ? "text-white" : "text-gray-600"} sm:w-6 sm:h-6 md:w-8 md:h-8`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-pixel text-xs sm:text-sm md:text-lg mb-1 sm:mb-2 break-words ${
                          isUnlocked 
                            ? achievement.id === 'spooky-harvest' 
                              ? 'text-orange-500' 
                              : 'text-minecraft-grass'
                            : 'text-gray-400'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className={`font-sans text-[10px] sm:text-xs md:text-sm break-words ${
                          isUnlocked ? 'text-white' : 'text-gray-600'
                        }`}>
                          {isUnlocked ? achievement.description : 'Заблокировано'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="font-pixel text-minecraft-grass text-base sm:text-lg md:text-xl">
                {unlockedAchievements.length} / {achievements.length}
              </p>
              <p className="font-sans text-white/60 text-xs sm:text-sm mt-1 sm:mt-2">
                Достижений разблокировано
              </p>
            </div>
          </div>
        </div>
      )}

      {showCharacter && (
        <div 
          className={`fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
            isCharacterClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'
          }`}
          onClick={() => {
            setIsCharacterClosing(true);
            setTimeout(() => {
              setShowCharacter(false);
              setIsCharacterClosing(false);
            }, 300);
          }}
        >
          <div 
            className={`border-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
              isCharacterClosing ? 'scale-90' : 'scale-100 animate-scale-in'
            } ${
              isDarkTheme
                ? 'bg-gray-900 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)]'
                : 'bg-white border-minecraft-brown shadow-[12px_12px_0px_rgba(0,0,0,0.5)]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className={`font-pixel text-lg sm:text-xl md:text-2xl transition-colors ${
                  isDarkTheme ? 'text-yellow-400' : 'text-minecraft-brown'
                }`}>
                  Главный персонаж
                </h3>
                <button 
                  onClick={() => {
                    if (!isButtonLocked) {
                      setIsButtonLocked(true);
                      setIsCharacterClosing(true);
                      setTimeout(() => {
                        setShowCharacter(false);
                        setIsCharacterClosing(false);
                        setIsButtonLocked(false);
                      }, 300);
                    }
                  }}
                  className={`transition-colors p-1 ${
                    isDarkTheme ? 'text-gray-400 hover:text-yellow-400' : 'text-minecraft-stone hover:text-minecraft-brown'
                  }`}
                >
                  <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className={`relative w-full aspect-square mx-auto flex items-center justify-center overflow-hidden ${
                  isDarkTheme
                    ? 'border-4 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)] bg-gray-800'
                    : 'bg-minecraft-sky/20 border-4 border-minecraft-brown shadow-[6px_6px_0px_rgba(0,0,0,0.4)]'
                }`}>
                  <img 
                    src="https://cdn.poehali.dev/files/8576b771-e0f7-4d61-89b0-4da8fbd77ab3.png" 
                    alt="dFenger"
                    className="w-full h-full object-contain pixelated"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-pixel text-xl sm:text-2xl mb-4 transition-colors ${
                      isDarkTheme ? 'text-yellow-400' : 'text-minecraft-brown'
                    }`}>
                      Характеристики
                    </h4>
                  </div>

                  <div className={`border-2 p-3 sm:p-4 transition-colors ${
                    isDarkTheme
                      ? 'border-yellow-500/50 bg-yellow-900/20'
                      : 'border-minecraft-brown bg-minecraft-brown/5'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Имя:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-yellow-300' : 'text-minecraft-brown'
                        }`}>
                          dFenger
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Возраст:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-yellow-300' : 'text-minecraft-brown'
                        }`}>
                          22
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Мир:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-yellow-300' : 'text-minecraft-brown'
                        }`}>
                          Вактерония
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Страна:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-yellow-300' : 'text-minecraft-brown'
                        }`}>
                          Виронтерия
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Класс:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-yellow-300' : 'text-minecraft-brown'
                        }`}>
                          Мироходец
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsCharacterClosing(true);
                      setTimeout(() => {
                        setShowCharacter(false);
                        setIsCharacterClosing(false);
                      }, 300);
                    }}
                    className={`w-full font-pixel text-sm px-6 py-3 border-4 transition-colors ${
                      isDarkTheme
                        ? 'bg-yellow-600 text-white border-yellow-400 hover:bg-yellow-500'
                        : 'bg-minecraft-grass text-black border-black hover:bg-minecraft-grass/80'
                    }`}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCharacter2 && (
        <div 
          className={`fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${
            isCharacter2Closing ? 'opacity-0' : 'opacity-100 animate-fade-in'
          }`}
          onClick={() => {
            setIsCharacter2Closing(true);
            setTimeout(() => {
              setShowCharacter2(false);
              setIsCharacter2Closing(false);
            }, 300);
          }}
        >
          <div 
            className={`border-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
              isCharacter2Closing ? 'scale-90' : 'scale-100 animate-scale-in'
            } ${
              isDarkTheme
                ? 'bg-gray-900 border-purple-500 shadow-[0_0_30px_rgba(139,92,246,0.5)]'
                : 'bg-white border-minecraft-stone shadow-[12px_12px_0px_rgba(0,0,0,0.5)]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className={`font-pixel text-lg sm:text-xl md:text-2xl transition-colors ${
                  isDarkTheme ? 'text-purple-400' : 'text-minecraft-sky'
                }`}>
                  Главный персонаж
                </h3>
                <button 
                  onClick={() => {
                    if (!isButtonLocked) {
                      setIsButtonLocked(true);
                      setIsCharacter2Closing(true);
                      setTimeout(() => {
                        setShowCharacter2(false);
                        setIsCharacter2Closing(false);
                        setIsButtonLocked(false);
                      }, 300);
                    }
                  }}
                  className={`transition-colors p-1 ${
                    isDarkTheme ? 'text-gray-400 hover:text-purple-400' : 'text-minecraft-stone hover:text-minecraft-sky'
                  }`}
                >
                  <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className={`relative w-full aspect-square mx-auto flex items-center justify-center overflow-hidden ${
                  isDarkTheme
                    ? 'border-4 border-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.6)] bg-gray-800'
                    : 'bg-minecraft-sky/20 border-4 border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.4)]'
                }`}>
                  <img 
                    src="https://cdn.poehali.dev/files/717d210d-be12-41a1-b908-0e13ca82e048.png" 
                    alt="Уголь"
                    className="w-full h-full object-contain pixelated"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-pixel text-xl sm:text-2xl mb-4 transition-colors ${
                      isDarkTheme ? 'text-purple-400' : 'text-minecraft-sky'
                    }`}>
                      Характеристики
                    </h4>
                  </div>

                  <div className={`border-2 p-3 sm:p-4 transition-colors ${
                    isDarkTheme
                      ? 'border-purple-500/50 bg-purple-900/20'
                      : 'border-minecraft-sky bg-minecraft-sky/5'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Имя:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-purple-300' : 'text-minecraft-sky'
                        }`}>
                          Уголь
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Возраст:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-purple-300' : 'text-minecraft-sky'
                        }`}>
                          29
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Мир:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-purple-300' : 'text-minecraft-sky'
                        }`}>
                          Синева
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Страна:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-purple-300' : 'text-minecraft-sky'
                        }`}>
                          Тени
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Класс:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-purple-300' : 'text-minecraft-sky'
                        }`}>
                          Мироходец
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsCharacter2Closing(true);
                      setTimeout(() => {
                        setShowCharacter2(false);
                        setIsCharacter2Closing(false);
                      }, 300);
                    }}
                    className={`w-full font-pixel text-sm px-6 py-3 border-4 transition-colors ${
                      isDarkTheme
                        ? 'bg-purple-600 text-white border-purple-400 hover:bg-purple-500'
                        : 'bg-minecraft-sky text-white border-black hover:bg-minecraft-sky/80'
                    }`}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCharacter3 && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
            isCharacter3Closing ? 'opacity-0' : 'opacity-100 animate-fade-in'
          } ${
            isDarkTheme ? 'bg-black/90' : 'bg-minecraft-stone/90'
          }`}
          onClick={() => {
            if (!isButtonLocked) {
              setIsButtonLocked(true);
              setIsCharacter3Closing(true);
              setTimeout(() => {
                setShowCharacter3(false);
                setIsCharacter3Closing(false);
                setIsButtonLocked(false);
              }, 300);
            }
          }}
        >
          <div 
            className={`max-w-4xl w-full border-4 sm:border-6 md:border-8 transition-transform duration-300 ${
              isCharacter3Closing ? 'scale-90' : 'scale-100 animate-scale-in'
            } ${
              isDarkTheme
                ? 'bg-gray-900 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.5)]'
                : 'bg-white border-minecraft-stone shadow-[12px_12px_0px_rgba(0,0,0,0.5)]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className={`font-pixel text-lg sm:text-xl md:text-2xl transition-colors ${
                  isDarkTheme ? 'text-orange-400' : 'text-minecraft-brown'
                }`}>
                  Главный персонаж
                </h3>
                <button 
                  onClick={() => {
                    if (!isButtonLocked) {
                      setIsButtonLocked(true);
                      setIsCharacter3Closing(true);
                      setTimeout(() => {
                        setShowCharacter3(false);
                        setIsCharacter3Closing(false);
                        setIsButtonLocked(false);
                      }, 300);
                    }
                  }}
                  className={`transition-colors p-1 ${
                    isDarkTheme ? 'text-gray-400 hover:text-orange-400' : 'text-minecraft-stone hover:text-minecraft-brown'
                  }`}
                >
                  <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className={`relative w-full aspect-square mx-auto flex items-center justify-center overflow-hidden ${
                  isDarkTheme
                    ? 'border-4 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] bg-gray-800'
                    : 'bg-minecraft-brown/20 border-4 border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.4)]'
                }`}>
                  <img 
                    src="https://cdn.poehali.dev/files/476a8c7d-decd-4922-b386-32aa16aa3af5.png" 
                    alt="Раст"
                    className="w-full h-full object-contain pixelated"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={`font-pixel text-xl sm:text-2xl mb-4 transition-colors ${
                      isDarkTheme ? 'text-orange-400' : 'text-minecraft-brown'
                    }`}>
                      Характеристики
                    </h4>
                  </div>

                  <div className={`border-2 p-3 sm:p-4 transition-colors ${
                    isDarkTheme
                      ? 'border-orange-500/50 bg-orange-900/20'
                      : 'border-minecraft-brown bg-minecraft-brown/5'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Имя:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-orange-300' : 'text-minecraft-brown'
                        }`}>
                          Раст
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Возраст:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-orange-300' : 'text-minecraft-brown'
                        }`}>
                          22
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Мир:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-orange-300' : 'text-minecraft-brown'
                        }`}>
                          Синева
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Страна:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-orange-300' : 'text-minecraft-brown'
                        }`}>
                          Тени
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`font-pixel text-xs sm:text-sm transition-colors ${
                          isDarkTheme ? 'text-gray-400' : 'text-minecraft-stone/60'
                        }`}>
                          Класс:
                        </span>
                        <span className={`font-sans text-sm sm:text-base font-semibold transition-colors ${
                          isDarkTheme ? 'text-orange-300' : 'text-minecraft-brown'
                        }`}>
                          Мироходец
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsCharacter3Closing(true);
                      setTimeout(() => {
                        setShowCharacter3(false);
                        setIsCharacter3Closing(false);
                      }, 300);
                    }}
                    className={`w-full font-pixel text-sm px-6 py-3 border-4 transition-colors ${
                      isDarkTheme
                        ? 'bg-orange-600 text-white border-orange-400 hover:bg-orange-500'
                        : 'bg-minecraft-brown text-white border-black hover:bg-minecraft-brown/80'
                    }`}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScreamer && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black animate-fade-in">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-9xl animate-pulse">
              👻
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="font-pixel text-6xl md:text-8xl text-red-600 animate-pulse drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]">
                БУ!
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;