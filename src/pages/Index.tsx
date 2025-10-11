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

  const achievements = [
    {
      id: "993-reality",
      title: "993 - реальность",
      description: "Вы зашли на сайт и открыли для себя новую реальность",
      icon: "Eye"
    }
  ];

  useEffect(() => {
    const hasVisited = localStorage.getItem('achievement-993-reality');
    const hasViewed = localStorage.getItem('achievements-viewed');
    
    if (hasViewed) {
      setHasViewedAchievements(true);
    }
    
    if (!hasVisited) {
      setTimeout(() => {
        setShowAchievement(true);
        setUnlockedAchievements(['993-reality']);
        localStorage.setItem('achievement-993-reality', 'true');
        setTimeout(() => setShowAchievement(false), 5000);
      }, 2000);
    } else {
      setUnlockedAchievements(['993-reality']);
    }
  }, []);

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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-pixel text-xs sm:text-sm text-white">СЮЖЕТНЫЕ СЕЗОНЫ</h1>
            <div className="flex gap-2 items-center">
              <button
                onClick={openAchievementsPage}
                className="font-pixel text-xs px-3 py-2 border-2 rounded transition-colors bg-minecraft-grass text-black border-minecraft-grass hover:bg-minecraft-grass/80 relative"
              >
                <Icon name="Trophy" size={16} />
                {unlockedAchievements.length > 0 && !hasViewedAchievements && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">
                    {unlockedAchievements.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`font-pixel text-xs px-3 py-2 border-2 rounded transition-colors ${
                  isDarkTheme
                    ? 'bg-yellow-500 text-black border-yellow-600 hover:bg-yellow-400'
                    : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                }`}
              >
                <Icon name={isDarkTheme ? "Sun" : "Moon"} size={16} />
              </button>
            </div>
            <div className="flex gap-2 sm:gap-4 flex-wrap justify-end">
              {["home", "seasons", "download", "about", "team", "gallery"].map((section) => (
                <Button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  variant={activeSection === section ? "default" : "ghost"}
                  className={`font-pixel text-[8px] sm:text-[10px] px-2 sm:px-4 py-1 sm:py-2 h-auto border-2 ${
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

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative">
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
            <h2 className={`font-pixel text-2xl sm:text-4xl md:text-6xl mb-6 drop-shadow-lg transition-colors ${
              isDarkTheme ? 'text-white' : 'text-minecraft-stone'
            }`}>
              СЮЖЕТНЫЕ СЕЗОНЫ
            </h2>
            <p className={`font-sans text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors ${
              isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
            }`}>
              Сюжетные сезоны, созданные с любовью к игре и вниманием к деталям
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                onClick={() => scrollToSection("seasons")}
                className="font-pixel text-xs sm:text-sm bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-4 border-black px-6 sm:px-8 py-4 sm:py-6 h-auto shadow-lg hover:scale-105 transition-transform"
              >
                СМОТРЕТЬ СЕЗОНЫ
              </Button>
              <Button 
                onClick={() => scrollToSection("team")}
                variant="outline"
                className="font-pixel text-xs sm:text-sm bg-minecraft-brown text-white hover:bg-minecraft-brown/80 border-4 border-black px-6 sm:px-8 py-4 sm:py-6 h-auto shadow-lg hover:scale-105 transition-transform"
              >
                ПОЗНАКОМИТЬСЯ
              </Button>
            </div>
          </div>
          <div className="mt-12 animate-float">
            <img 
              src="https://cdn.poehali.dev/files/52a192e4-420c-42f2-be29-f58ba27d00c4.png"
              alt="Minecraft World"
              onClick={() => setShowMemorial(true)}
              className="rounded-lg border-4 border-minecraft-stone shadow-2xl mx-auto max-w-4xl w-full cursor-pointer hover:scale-105 transition-transform"
            />
          </div>

          {showMemorial && (
            <div 
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
              onClick={() => setShowMemorial(false)}
            >
              <div 
                className="bg-minecraft-stone border-4 border-black p-12 text-center max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6">
                  <Icon name="Heart" size={64} className="text-red-500 mx-auto" />
                </div>
                <h3 className="font-pixel text-3xl text-white mb-4">
                  Уголь, прости:(
                </h3>
                <button 
                  onClick={() => setShowMemorial(false)}
                  className="mt-6 font-pixel text-sm bg-white text-minecraft-stone px-6 py-3 border-4 border-black hover:bg-gray-200 transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {startSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedSeason(index)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedSeason(index + startSeasons.length)}
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

          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 flex-1 bg-minecraft-grass max-w-xs"></div>
              <h3 className="font-pixel text-xl sm:text-3xl mx-6 text-minecraft-grass">
                ПОБОЧНЫЕ СЕЗОНЫ
              </h3>
              <div className="h-1 flex-1 bg-minecraft-grass max-w-xs"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sideSeasons.map((season, index) => (
                <Card 
                  key={index}
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedSeason(startSeasons.length + mainSeasons.length + index)}
                >
                  <div className="overflow-hidden">
                    <img 
                      src={season.image}
                      alt={season.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-pixel text-sm mb-4 text-minecraft-grass">
                      {season.title}
                    </h3>
                    <div className="font-sans text-sm text-minecraft-stone/80">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {inDevelopmentSeasons.map((season, index) => (
                  <Card 
                    key={index}
                    className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group relative cursor-pointer"
                    onClick={() => setSelectedSeason(startSeasons.length + mainSeasons.length + sideSeasons.length + index)}
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

      <section id="download" className={`min-h-screen py-20 px-4 flex items-center relative transition-colors duration-500 ${
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
              className="font-pixel text-lg bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-4 border-black px-8 py-6 h-auto shadow-lg hover:scale-105 transition-transform"
            >
              <Icon name={showDownloads ? "ChevronUp" : "ChevronDown"} size={24} className="mr-2" />
              {showDownloads ? "СКРЫТЬ ЗАГРУЗКИ" : "ПОКАЗАТЬ ЗАГРУЗКИ"}
            </Button>
          </div>

          {showDownloads && (
          <div className="max-w-4xl mx-auto bg-white border-4 border-minecraft-stone p-8 sm:p-12 rounded-lg shadow-xl mt-8 animate-fade-in">
            <p className="font-sans text-lg text-minecraft-stone/80 text-center mb-8">
              Выберите подходящую версию Minecraft для вашей платформы
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-4 border-minecraft-grass p-6 bg-minecraft-grass/5 hover:bg-minecraft-grass/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Monitor" size={32} className="text-minecraft-grass" />
                  <h3 className="font-pixel text-lg text-minecraft-stone">Windows</h3>
                </div>
                <p className="font-sans text-sm text-minecraft-stone/70 mb-4">
                  Версия для компьютеров на Windows
                </p>
                <a 
                  href="https://minecraft-downloads.net/MinecraftInstaller.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button 
                    className="w-full font-pixel text-xs bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-4 border-black h-auto py-3"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
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
                  className="w-full font-pixel text-xs bg-minecraft-stone text-white hover:bg-minecraft-stone/80 border-4 border-black h-auto py-3"
                  disabled
                >
                  Ссылка скоро появится
                </Button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="font-pixel text-sm text-minecraft-stone/70 bg-yellow-100 border-4 border-yellow-500 p-4 inline-block">
                Игра платная, никого не навязываем скачивать!!!
              </p>
            </div>
          </div>
          )}
        </div>
      </section>

      <section id="about" className={`min-h-screen py-20 px-4 flex items-center relative transition-colors duration-500 ${
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
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-12 transition-colors ${
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            О ПРОЕКТЕ
          </h2>
          <div className={`max-w-4xl mx-auto border-4 p-8 sm:p-12 rounded-lg shadow-xl transition-colors ${
            isDarkTheme ? 'bg-gray-800 border-gray-600' : 'bg-white border-minecraft-stone'
          }`}>
            <div className={`space-y-6 font-sans text-lg transition-colors ${
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
              <div className="flex items-center gap-4 pt-4">
                <div className="w-16 h-16 bg-minecraft-grass border-4 border-minecraft-stone flex items-center justify-center">
                  <Icon name="Pickaxe" size={32} className="text-minecraft-brown" />
                </div>
                <div className="w-16 h-16 bg-minecraft-water border-4 border-minecraft-stone flex items-center justify-center">
                  <Icon name="Hammer" size={32} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-minecraft-sand border-4 border-minecraft-stone flex items-center justify-center">
                  <Icon name="Sword" size={32} className="text-minecraft-brown" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className={`min-h-screen py-20 px-4 relative transition-colors duration-500 ${
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
                  <p className="font-sans text-sm text-minecraft-stone/80 mb-4">
                    {member.description}
                  </p>
                  <div className="inline-flex items-center gap-2 font-pixel text-xs bg-minecraft-sky text-white px-4 py-2 border-2 border-black">
                    <Icon name="Send" size={16} />
                    {member.telegram}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedMember !== null && (
            <div 
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMember(null)}
            >
              <div 
                className="bg-white border-4 border-minecraft-stone max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-pixel text-2xl text-minecraft-brown">
                      {team[selectedMember].name}
                    </h3>
                    <button 
                      onClick={() => setSelectedMember(null)}
                      className="text-minecraft-stone hover:text-minecraft-brown transition-colors"
                    >
                      <Icon name="X" size={24} />
                    </button>
                  </div>
                  
                  <div className="w-48 h-48 bg-minecraft-brown border-4 border-minecraft-stone mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    {team[selectedMember].avatar ? (
                      <img 
                        src={team[selectedMember].avatar} 
                        alt={team[selectedMember].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon name="User" size={96} className="text-white" />
                    )}
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="font-sans text-lg text-minecraft-stone/60">
                      {team[selectedMember].role}
                    </p>
                    <p className="font-sans text-base text-minecraft-stone/80">
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

      <section id="gallery" className={`min-h-screen py-20 px-4 relative transition-colors duration-500 ${
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
          <h2 className={`font-pixel text-3xl sm:text-5xl text-center mb-12 transition-colors ${
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            ГАЛЕРЕЯ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((image, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(image)}
                className="aspect-square overflow-hidden border-4 border-minecraft-stone hover:scale-105 transition-transform duration-300 cursor-pointer"
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
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-minecraft-stone hover:bg-minecraft-stone/80 border-4 border-white flex items-center justify-center transition-colors"
          >
            <Icon name="X" size={24} className="text-white" />
          </button>
          <img 
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain border-4 border-minecraft-stone"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {selectedSeason !== null && (() => {
        const allSeasons = [...startSeasons, ...mainSeasons, ...sideSeasons, ...inDevelopmentSeasons];
        const season = allSeasons[selectedSeason];
        
        return (
          <div 
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
            onClick={() => setSelectedSeason(null)}
          >
            <div 
              className="bg-white border-4 border-minecraft-stone rounded-lg max-w-3xl w-full my-8 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedSeason(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-minecraft-stone hover:bg-minecraft-stone/80 border-4 border-white flex items-center justify-center transition-colors"
                >
                  <Icon name="X" size={20} className="text-white" />
                </button>
                <img 
                  src={season.image}
                  alt="Season"
                  className="w-full h-64 object-cover border-b-4 border-minecraft-stone"
                />
              </div>
              <div className="p-8">
                <h3 className="font-pixel text-xl sm:text-2xl mb-4 text-minecraft-brown">
                  {season.title}
                </h3>
                <div className="font-sans text-base text-minecraft-stone/80 leading-relaxed mb-4">
                  {season.description}
                </div>
                {season.audio && (
                  <a
                    href={season.audio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-pixel text-xs bg-minecraft-stone text-white px-4 py-3 border-2 border-black hover:bg-minecraft-stone/80 transition-colors"
                  >
                    <Icon name="Music" size={16} />
                    {season.audio.title} - {season.audio.artist}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      <section className="py-20 px-4 bg-minecraft-stone/5">
        <div className="container mx-auto text-center">
          <h2 className="font-pixel text-4xl sm:text-6xl text-minecraft-stone animate-pulse mb-8">
            Дальше - Больше
          </h2>
          <div className="max-w-2xl mx-auto bg-white border-4 border-minecraft-grass p-8 sm:p-12 rounded-lg shadow-xl">
            <Icon name="Shirt" size={64} className="mx-auto mb-6 text-minecraft-grass" />
            <p className="font-pixel text-xl sm:text-2xl text-minecraft-stone">
              Скоро будет эксклюзивный мерч.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-minecraft-stone border-t-4 border-minecraft-brown py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="font-pixel text-[10px] text-white/80">
            © 2025 СЮЖЕТНЫЕ СЕЗОНЫ | MADE WITH ❤️
          </p>
        </div>
      </footer>

      {showAchievement && (
        <div className="fixed top-20 right-4 z-[200] animate-fade-in">
          <div className="bg-minecraft-stone border-4 border-minecraft-grass p-4 shadow-2xl min-w-[300px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-minecraft-grass border-2 border-black flex items-center justify-center">
                <Icon name="Eye" size={24} className="text-white" />
              </div>
              <div>
                <p className="font-pixel text-xs text-minecraft-grass">ДОСТИЖЕНИЕ ПОЛУЧЕНО!</p>
                <h4 className="font-pixel text-sm text-white">993 - реальность</h4>
              </div>
            </div>
            <p className="font-sans text-xs text-white/80 mt-2">
              Вы зашли на сайт и открыли для себя новую реальность
            </p>
          </div>
        </div>
      )}

      {showAchievementsPage && (
        <div 
          className="fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowAchievementsPage(false)}
        >
          <div 
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 p-8 rounded-lg ${
              isDarkTheme ? 'bg-gray-800 border-gray-600' : 'bg-minecraft-stone border-minecraft-grass'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-pixel text-3xl text-minecraft-grass">ДОСТИЖЕНИЯ</h2>
              <button 
                onClick={() => setShowAchievementsPage(false)}
                className="text-white hover:text-minecraft-grass transition-colors"
              >
                <Icon name="X" size={32} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                return (
                  <div 
                    key={achievement.id}
                    className={`border-4 p-6 transition-all ${
                      isUnlocked 
                        ? 'bg-minecraft-grass/20 border-minecraft-grass' 
                        : 'bg-gray-900/50 border-gray-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 border-2 flex items-center justify-center flex-shrink-0 ${
                        isUnlocked 
                          ? 'bg-minecraft-grass border-black' 
                          : 'bg-gray-800 border-gray-600'
                      }`}>
                        <Icon 
                          name={isUnlocked ? achievement.icon as any : "Lock"} 
                          size={32} 
                          className={isUnlocked ? "text-white" : "text-gray-600"}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-pixel text-lg mb-2 ${
                          isUnlocked ? 'text-minecraft-grass' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className={`font-sans text-sm ${
                          isUnlocked ? 'text-white' : 'text-gray-600'
                        }`}>
                          {isUnlocked ? achievement.description : '???'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="font-pixel text-minecraft-grass text-xl">
                {unlockedAchievements.length} / {achievements.length}
              </p>
              <p className="font-sans text-white/60 text-sm mt-2">
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