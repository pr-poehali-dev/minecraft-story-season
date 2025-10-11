import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [showMemorial, setShowMemorial] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [showAchievementsPage, setShowAchievementsPage] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [hasViewedAchievements, setHasViewedAchievements] = useState(false);
  const [viewedSeasons, setViewedSeasons] = useState<Set<number>>(new Set());
  const [currentAchievement, setCurrentAchievement] = useState<any>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [viewedImages, setViewedImages] = useState<Set<number>>(new Set());

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
    const hasVisited = localStorage.getItem('achievement-993-reality');
    const hasViewed = localStorage.getItem('achievements-viewed');
    const savedAchievements = localStorage.getItem('unlocked-achievements');
    
    if (hasViewed) {
      setHasViewedAchievements(true);
    }
    
    if (savedAchievements) {
      setUnlockedAchievements(JSON.parse(savedAchievements));
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
    const requiredAchievements = ['993-reality', 'infinity-limit', 'tretyakov-gallery'];
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
    }, 300);
  };

  const openAchievementsPage = () => {
    setShowAchievementsPage(true);
    setHasViewedAchievements(true);
    localStorage.setItem('achievements-viewed', 'true');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
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
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkTheme 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-minecraft-sky to-minecraft-grass/20'
    }`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b-4 shadow-lg transition-colors duration-500 ${
        isDarkTheme 
          ? 'bg-gray-950/95 border-gray-700' 
          : 'bg-minecraft-stone/95 border-minecraft-brown'
      }`}>
        <div className="container mx-auto px-2 sm:px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h1 className="font-pixel text-[10px] sm:text-xs md:text-sm text-white">СЮЖЕТНЫЕ СЕЗОНЫ</h1>
            <div className="flex gap-2 items-center order-first sm:order-none">
              <button
                onClick={openAchievementsPage}
                className="font-pixel text-xs p-2 border-2 rounded transition-colors bg-minecraft-grass text-black border-minecraft-grass hover:bg-minecraft-grass/80 relative"
              >
                <Icon name="Trophy" size={14} />
                {unlockedAchievements.length > 0 && !hasViewedAchievements && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">
                    {unlockedAchievements.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`font-pixel text-xs p-2 border-2 rounded transition-colors ${
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
                  variant={activeSection === section ? "default" : "ghost"}
                  className={`font-pixel text-[8px] sm:text-[9px] md:text-[10px] px-2 sm:px-3 py-1 h-auto border-2 ${
                    activeSection === section 
                      ? "bg-minecraft-grass text-black border-black hover:bg-minecraft-grass/80" 
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

      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative">
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
              isDarkTheme ? 'text-white' : 'text-minecraft-stone'
            }`}>
              СЮЖЕТНЫЕ СЕЗОНЫ
            </h2>
            <p className={`font-sans text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto transition-colors px-4 ${
              isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
            }`}>
              Сюжетные сезоны, созданные с любовью к игре и вниманием к деталям
            </p>
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-wrap px-4">
              <Button 
                onClick={() => scrollToSection("seasons")}
                className="font-pixel text-[9px] sm:text-[10px] md:text-xs lg:text-sm bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-2 sm:border-4 border-black px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 h-auto shadow-lg hover:scale-105 transition-transform"
              >
                СМОТРЕТЬ СЕЗОНЫ
              </Button>
              <Button 
                onClick={() => scrollToSection("team")}
                variant="outline"
                className="font-pixel text-[9px] sm:text-[10px] md:text-xs lg:text-sm bg-minecraft-brown text-white hover:bg-minecraft-brown/80 border-2 sm:border-4 border-black px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 h-auto shadow-lg hover:scale-105 transition-transform"
              >
                ПОЗНАКОМИТЬСЯ
              </Button>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 md:mt-12 animate-float px-2 sm:px-4">
            <img 
              src="https://cdn.poehali.dev/files/52a192e4-420c-42f2-be29-f58ba27d00c4.png"
              alt="Minecraft World"
              onClick={() => setShowMemorial(true)}
              className="rounded-lg border-2 sm:border-4 border-minecraft-stone shadow-2xl mx-auto max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-4xl w-full cursor-pointer hover:scale-105 transition-transform"
            />
          </div>

          {showMemorial && (
            <div 
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
              onClick={() => setShowMemorial(false)}
            >
              <div 
                className="bg-minecraft-stone border-4 border-black p-6 sm:p-8 md:p-12 text-center max-w-xs sm:max-w-2xl mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 sm:mb-6">
                  <Icon name="Heart" size={48} className="text-red-500 mx-auto sm:w-16 sm:h-16" />
                </div>
                <h3 className="font-pixel text-xl sm:text-2xl md:text-3xl text-white mb-4">
                  Уголь, прости:(
                </h3>
                <button 
                  onClick={() => setShowMemorial(false)}
                  className="mt-4 sm:mt-6 font-pixel text-xs sm:text-sm bg-white text-minecraft-stone px-4 sm:px-6 py-2 sm:py-3 border-2 sm:border-4 border-black hover:bg-gray-200 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="seasons" className={`min-h-screen py-20 px-4 relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-gray-800/30' : 'bg-minecraft-stone/10'
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
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-16 transition-colors ${
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            НАШИ СЕЗОНЫ
          </h2>

          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 flex-1 bg-minecraft-sky max-w-xs"></div>
              <h3 className="font-pixel text-xl sm:text-3xl mx-6 text-minecraft-sky">
                НАЧАЛО
              </h3>
              <div className="h-1 flex-1 bg-minecraft-sky max-w-xs"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {startSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setSelectedSeason(index);
                    setViewedSeasons(prev => new Set(prev).add(index));
                  }}
                >
                  <div className="overflow-hidden">
                    <img 
                      src={season.image}
                      alt={season.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-pixel text-sm mb-4 text-minecraft-brown">
                      {season.title}
                    </h3>
                    <p className="font-sans text-sm text-minecraft-stone/80">
                      {season.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 flex-1 bg-minecraft-brown max-w-xs"></div>
              <h3 className="font-pixel text-xl sm:text-3xl mx-6 text-minecraft-brown">
                ОСНОВНОЙ СЮЖЕТ
              </h3>
              <div className="h-1 flex-1 bg-minecraft-brown max-w-xs"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {mainSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => {
                    const seasonIndex = index + startSeasons.length;
                    setSelectedSeason(seasonIndex);
                    setViewedSeasons(prev => new Set(prev).add(seasonIndex));
                  }}
                >
                  <div className="overflow-hidden">
                    <img 
                      src={season.image}
                      alt={season.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-pixel text-xs sm:text-sm mb-2 sm:mb-4 text-minecraft-brown">
                      {season.title}
                    </h3>
                    <div className="font-sans text-xs sm:text-sm text-minecraft-stone/80 mb-2 sm:mb-4">
                      {season.description}
                    </div>
                    {season.audio && (
                      <a
                        href={season.audio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 sm:gap-2 font-pixel text-[8px] sm:text-[10px] bg-minecraft-stone text-white px-2 sm:px-4 py-1 sm:py-2 border-2 border-black hover:bg-minecraft-stone/80 transition-colors"
                      >
                        <Icon name="Music" size={12} className="sm:w-3.5 sm:h-3.5" />
                        {season.audio.title} - {season.audio.artist}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 flex-1 bg-minecraft-grass max-w-xs"></div>
              <h3 className="font-pixel text-xl sm:text-3xl mx-6 text-minecraft-grass">
                ПОБОЧНЫЕ СЕЗОНЫ
              </h3>
              <div className="h-1 flex-1 bg-minecraft-grass max-w-xs"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {sideSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => {
                    const seasonIndex = startSeasons.length + mainSeasons.length + index;
                    setSelectedSeason(seasonIndex);
                    setViewedSeasons(prev => new Set(prev).add(seasonIndex));
                  }}
                >
                  <div className="overflow-hidden">
                    <img 
                      src={season.image}
                      alt={season.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-pixel text-xs sm:text-sm mb-2 sm:mb-4 text-minecraft-grass">
                      {season.title}
                    </h3>
                    <div className="font-sans text-xs sm:text-sm text-minecraft-stone/80">
                      {season.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {inDevelopmentSeasons.length > 0 && (
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="h-1 flex-1 bg-minecraft-sky max-w-xs"></div>
                <h3 className="font-pixel text-xl sm:text-3xl mx-6 text-minecraft-sky">
                  СЕЗОНЫ В РАЗРАБОТКЕ
                </h3>
                <div className="h-1 flex-1 bg-minecraft-sky max-w-xs"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {inDevelopmentSeasons.map((season, index) => (
                  <Card 
                    key={index}
                    className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group relative cursor-pointer"
                    onClick={() => {
                      const seasonIndex = startSeasons.length + mainSeasons.length + sideSeasons.length + index;
                      setSelectedSeason(seasonIndex);
                      setViewedSeasons(prev => new Set(prev).add(seasonIndex));
                    }}
                  >
                    <div className="absolute top-2 right-2 z-10 bg-minecraft-sky text-white font-pixel text-[8px] px-2 py-1 border-2 border-black">
                      В РАЗРАБОТКЕ
                    </div>
                    <div className="overflow-hidden">
                      <img 
                        src={season.image}
                        alt={season.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-pixel text-sm mb-4 text-minecraft-sky">
                        {season.title}
                      </h3>
                      <div className="font-sans text-sm text-minecraft-stone/80 mb-4">
                        {season.description}
                      </div>
                      {season.audio && (
                        <a
                          href={season.audio.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-pixel text-[10px] bg-minecraft-stone text-white px-4 py-2 border-2 border-black hover:bg-minecraft-stone/80 transition-colors"
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

      <section id="download" className={`min-h-screen py-12 sm:py-16 md:py-20 px-4 flex items-center relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-gray-800/30' : 'bg-minecraft-stone/10'
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
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-12 transition-colors ${
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            СКАЧАТЬ MINECRAFT
          </h2>
          
          <div className="max-w-4xl mx-auto text-center">
            <Button
              onClick={() => setShowDownloads(!showDownloads)}
              className="font-pixel text-[10px] sm:text-xs md:text-sm lg:text-lg bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-2 sm:border-4 border-black px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-6 h-auto shadow-lg hover:scale-105 transition-transform"
            >
              <Icon name={showDownloads ? "ChevronUp" : "ChevronDown"} size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm lg:text-base">{showDownloads ? "СКРЫТЬ" : "ПОКАЗАТЬ"}</span>
            </Button>
          </div>

          {showDownloads && (
          <div className="max-w-4xl mx-auto bg-white border-2 sm:border-4 border-minecraft-stone p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-xl mt-6 sm:mt-8 animate-fade-in">
            <p className="font-sans text-sm sm:text-base md:text-lg text-minecraft-stone/80 text-center mb-6 sm:mb-8 px-2">
              Выберите подходящую версию Minecraft для вашей платформы
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="border-2 sm:border-4 border-minecraft-grass p-4 sm:p-6 bg-minecraft-grass/5 hover:bg-minecraft-grass/10 transition-colors">
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <Icon name="Monitor" size={24} className="text-minecraft-grass sm:w-8 sm:h-8" />
                  <h3 className="font-pixel text-sm sm:text-base md:text-lg text-minecraft-stone">Windows</h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-minecraft-stone/70 mb-3 sm:mb-4">
                  Версия для компьютеров на Windows
                </p>
                <a 
                  href="https://minecraft-downloads.net/MinecraftInstaller.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button 
                    className="w-full font-pixel text-[10px] sm:text-xs bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-2 sm:border-4 border-black h-auto py-2 sm:py-3"
                  >
                    <Icon name="Download" size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4" />
                    СКАЧАТЬ
                  </Button>
                </a>
              </div>

              <div className="border-4 border-minecraft-brown p-6 bg-minecraft-brown/5 hover:bg-minecraft-brown/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Boxes" size={32} className="text-minecraft-brown" />
                  <h3 className="font-pixel text-lg text-minecraft-stone">mcpeHub</h3>
                </div>
                <p className="font-sans text-sm text-minecraft-stone/70 mb-4">
                  Универсальный лаунчер для всех платформ
                </p>
                <a 
                  href="https://mcpehub.org/engine/dlfile.php?id=49382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button 
                    className="w-full font-pixel text-xs bg-minecraft-brown text-white hover:bg-minecraft-brown/80 border-4 border-black h-auto py-3"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    СКАЧАТЬ
                  </Button>
                </a>
              </div>

              <div className="border-4 border-minecraft-sky p-6 bg-minecraft-sky/5 hover:bg-minecraft-sky/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Smartphone" size={32} className="text-minecraft-sky" />
                  <h3 className="font-pixel text-lg text-minecraft-stone">Android</h3>
                </div>
                <p className="font-sans text-sm text-minecraft-stone/70 mb-4">
                  Pocket Edition для Android устройств
                </p>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.mojang.minecraftpe&hl=ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button 
                    className="w-full font-pixel text-xs bg-minecraft-sky text-white hover:bg-minecraft-sky/80 border-4 border-black h-auto py-3"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    СКАЧАТЬ
                  </Button>
                </a>
              </div>

              <div className="border-4 border-minecraft-stone p-6 bg-minecraft-stone/5 hover:bg-minecraft-stone/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Smartphone" size={32} className="text-minecraft-stone" />
                  <h3 className="font-pixel text-lg text-minecraft-stone">iOS</h3>
                </div>
                <p className="font-sans text-sm text-minecraft-stone/70 mb-4">
                  Pocket Edition для iPhone и iPad
                </p>
                <Button 
                  className="w-full font-pixel text-[10px] sm:text-xs bg-minecraft-stone text-white hover:bg-minecraft-stone/80 border-4 border-black h-auto py-3 px-2"
                  disabled
                >
                  <span className="break-words">Ссылка скоро появится</span>
                </Button>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 text-center px-4">
              <p className="font-pixel text-[10px] sm:text-xs md:text-sm text-minecraft-stone/70 bg-yellow-100 border-2 sm:border-4 border-yellow-500 p-2 sm:p-3 md:p-4 inline-block">
                Игра платная, никого не навязываем скачивать!!!
              </p>
            </div>
          </div>
          )}
        </div>
      </section>

      <section id="about" className={`min-h-screen py-12 sm:py-16 md:py-20 px-4 flex items-center relative transition-colors duration-500 ${
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
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            О ПРОЕКТЕ
          </h2>
          <div className={`max-w-4xl mx-auto border-4 p-4 sm:p-8 md:p-12 rounded-lg shadow-xl transition-colors ${
            isDarkTheme ? 'bg-gray-800 border-gray-600' : 'bg-white border-minecraft-stone'
          }`}>
            <div className={`space-y-4 sm:space-y-6 font-sans text-sm sm:text-base md:text-lg transition-colors ${
              isDarkTheme ? 'text-gray-200' : 'text-minecraft-stone/90'
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

      <section id="team" className={`min-h-screen py-12 sm:py-16 md:py-20 px-4 relative transition-colors duration-500 ${
        isDarkTheme ? 'bg-gray-800/30' : 'bg-minecraft-stone/10'
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
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-12 transition-colors ${
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            КОМАНДА
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                onClick={() => setSelectedMember(index)}
                className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-minecraft-brown border-4 border-minecraft-stone mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon name="User" size={48} className="text-white" />
                    )}
                  </div>
                  <h3 className="font-pixel text-lg mb-2 text-minecraft-brown">
                    {member.name}
                  </h3>
                  <p className="font-sans text-sm text-minecraft-stone/60 mb-4">
                    {member.role}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-minecraft-stone/80 mb-3 sm:mb-4">
                    {member.description}
                  </p>
                  <div className="inline-flex items-center gap-1 sm:gap-2 font-pixel text-[10px] sm:text-xs bg-minecraft-sky text-white px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-black">
                    <Icon name="Send" size={14} className="sm:w-4 sm:h-4" />
                    <span className="truncate">{member.telegram}</span>
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
                className={`bg-white border-2 sm:border-4 border-minecraft-stone max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
                  isClosing ? 'scale-90' : 'scale-100 animate-scale-in'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <h3 className="font-pixel text-lg sm:text-xl md:text-2xl text-minecraft-brown">
                      {team[selectedMember].name}
                    </h3>
                    <button 
                      onClick={handleCloseModal}
                      className="text-minecraft-stone hover:text-minecraft-brown transition-colors p-1"
                    >
                      <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-minecraft-brown border-2 sm:border-4 border-minecraft-stone mx-auto mb-4 sm:mb-6 flex items-center justify-center overflow-hidden">
                    {team[selectedMember].avatar ? (
                      <img 
                        src={team[selectedMember].avatar} 
                        alt={team[selectedMember].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon name="User" size={64} className="text-white sm:w-20 sm:h-20 md:w-24 md:h-24" />
                    )}
                  </div>
                  
                  <div className="text-center space-y-3 sm:space-y-4">
                    <p className="font-sans text-sm sm:text-base md:text-lg text-minecraft-stone/60">
                      {team[selectedMember].role}
                    </p>
                    <p className="font-sans text-xs sm:text-sm md:text-base text-minecraft-stone/80 px-2">
                      {team[selectedMember].description}
                    </p>
                    <a 
                      href={`https://t.me/${team[selectedMember].telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-pixel text-sm bg-minecraft-sky text-white px-6 py-3 border-4 border-black hover:bg-minecraft-sky/80 transition-colors mt-6"
                    >
                      <Icon name="Send" size={20} />
                      Написать {team[selectedMember].telegram}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="gallery" className={`min-h-screen py-12 sm:py-16 md:py-20 px-4 relative transition-colors duration-500 ${
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
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            ГАЛЕРЕЯ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {gallery.map((image, index) => (
              <div 
                key={index}
                onClick={() => {
                  setSelectedImage(image);
                  setViewedImages(prev => new Set(prev).add(index));
                }}
                className="aspect-square overflow-hidden border-2 sm:border-4 border-minecraft-stone hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <img 
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
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
        
        return (
          <div 
            className={`fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 overflow-y-auto transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'
            }`}
            onClick={handleCloseModal}
          >
            <div 
              className={`bg-white border-4 border-minecraft-stone rounded-lg max-w-3xl w-full my-8 transition-transform duration-300 ${
                isClosing ? 'scale-90' : 'scale-100 animate-scale-in'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-minecraft-stone hover:bg-minecraft-stone/80 border-2 sm:border-4 border-white flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={16} className="text-white sm:w-5 sm:h-5" />
                </button>
                <img 
                  src={season.image}
                  alt="Season"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover border-b-2 sm:border-b-4 border-minecraft-stone"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="font-pixel text-base sm:text-xl md:text-2xl mb-3 sm:mb-4 text-minecraft-brown">
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

      <section className="py-12 sm:py-16 md:py-20 px-4 bg-minecraft-stone/5">
        <div className="container mx-auto text-center">
          <h2 className="font-pixel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-minecraft-stone animate-pulse mb-6 sm:mb-8 px-4">
            Дальше - Больше
          </h2>
          <div className="max-w-2xl mx-auto bg-white border-2 sm:border-4 border-minecraft-grass p-6 sm:p-8 md:p-12 rounded-lg shadow-xl">
            <Icon name="Shirt" size={48} className="mx-auto mb-4 sm:mb-6 text-minecraft-grass sm:w-16 sm:h-16" />
            <p className="font-pixel text-base sm:text-xl md:text-2xl text-minecraft-stone px-2">
              Скоро будет эксклюзивный мерч.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-minecraft-stone border-t-2 sm:border-t-4 border-minecraft-brown py-6 sm:py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="font-pixel text-[8px] sm:text-[10px] text-white/80 px-2">
            © 2025 СЮЖЕТНЫЕ СЕЗОНЫ | MADE WITH ❤️
          </p>
        </div>
      </footer>

      {showAchievement && currentAchievement && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-[200] animate-fade-in max-w-[280px] sm:max-w-[320px]">
          <div className="bg-minecraft-stone border-2 sm:border-4 border-minecraft-grass p-3 sm:p-4 shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-minecraft-grass border-2 border-black flex items-center justify-center flex-shrink-0">
                <Icon name={currentAchievement.icon as any} size={20} className="text-white sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="font-pixel text-[8px] sm:text-xs text-minecraft-grass">ДОСТИЖЕНИЕ!</p>
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
                        ? 'bg-minecraft-grass/20 border-minecraft-grass' 
                        : 'bg-gray-900/50 border-gray-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-2 flex items-center justify-center flex-shrink-0 ${
                        isUnlocked 
                          ? 'bg-minecraft-grass border-black' 
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
                          isUnlocked ? 'text-minecraft-grass' : 'text-gray-400'
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
    </div>
  );
};

export default Index;