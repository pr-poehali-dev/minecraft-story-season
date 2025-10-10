import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

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

  const team = [
    {
      name: "Tempus",
      role: "Разработчик & Сюжетист",
      telegram: "@dfenger",
      description: "Создаю механики и сюжетные линии для наших сезонов"
    },
    {
      name: "KirkaShadow",
      role: "Разработчик & Строитель",
      telegram: "@KIRKA30",
      description: "Воплощаю идеи в жизнь через строительство и дизайн"
    }
  ];

  const gallery = [
    "https://cdn.poehali.dev/projects/cb2138fb-26b1-4687-838b-d6e86f1d844d/files/f6e98770-55be-476e-8457-0990c6ab6f91.jpg",
    "https://cdn.poehali.dev/projects/cb2138fb-26b1-4687-838b-d6e86f1d844d/files/d31a6596-7f48-43ad-8444-b578ba56cf02.jpg",
    "https://cdn.poehali.dev/projects/cb2138fb-26b1-4687-838b-d6e86f1d844d/files/8a65f593-8271-4771-9248-baa13b301e13.jpg",
    "https://cdn.poehali.dev/projects/cb2138fb-26b1-4687-838b-d6e86f1d844d/files/f6e98770-55be-476e-8457-0990c6ab6f91.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-sky to-minecraft-grass/20">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-minecraft-stone/95 backdrop-blur-sm border-b-4 border-minecraft-brown shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-pixel text-xs sm:text-sm text-white">MINECRAFT SEASONS</h1>
            <div className="flex gap-2 sm:gap-4 flex-wrap justify-end">
              {["home", "seasons", "about", "team", "gallery", "contact"].map((section) => (
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
                  {section === "about" && "О НАС"}
                  {section === "team" && "КОМАНДА"}
                  {section === "gallery" && "ГАЛЕРЕЯ"}
                  {section === "contact" && "КОНТАКТЫ"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <h2 className="font-pixel text-2xl sm:text-4xl md:text-6xl mb-6 text-minecraft-stone drop-shadow-lg">
              MINECRAFT SEASONS
            </h2>
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-minecraft-stone/80 mb-8 max-w-3xl mx-auto">
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
              className="rounded-lg border-4 border-minecraft-stone shadow-2xl mx-auto max-w-4xl w-full"
            />
          </div>
        </div>
      </section>

      <section id="seasons" className="min-h-screen py-20 px-4 bg-minecraft-stone/10">
        <div className="container mx-auto">
          <h2 className="font-pixel text-3xl sm:text-5xl text-center mb-16 text-minecraft-stone">
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
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group"
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
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group"
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

          <div>
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
                  className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300 overflow-hidden group"
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
        </div>
      </section>

      <section id="about" className="min-h-screen py-20 px-4 flex items-center">
        <div className="container mx-auto">
          <h2 className="font-pixel text-3xl sm:text-5xl text-center mb-12 text-minecraft-stone">
            О ПРОЕКТЕ
          </h2>
          <div className="max-w-4xl mx-auto bg-white border-4 border-minecraft-stone p-8 sm:p-12 rounded-lg shadow-xl">
            <div className="space-y-6 font-sans text-lg text-minecraft-stone/90">
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

      <section id="team" className="min-h-screen py-20 px-4 bg-minecraft-stone/10">
        <div className="container mx-auto">
          <h2 className="font-pixel text-3xl sm:text-5xl text-center mb-12 text-minecraft-stone">
            КОМАНДА
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="border-4 border-minecraft-stone bg-white hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-minecraft-brown border-4 border-minecraft-stone mx-auto mb-6 flex items-center justify-center">
                    <Icon name="User" size={48} className="text-white" />
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
                  <a 
                    href={`https://t.me/${member.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-pixel text-xs bg-minecraft-sky text-white px-4 py-2 border-2 border-black hover:bg-minecraft-sky/80 transition-colors"
                  >
                    <Icon name="Send" size={16} />
                    {member.telegram}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="min-h-screen py-20 px-4">
        <div className="container mx-auto">
          <h2 className="font-pixel text-3xl sm:text-5xl text-center mb-12 text-minecraft-stone">
            ГАЛЕРЕЯ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((image, index) => (
              <div 
                key={index}
                className="aspect-square overflow-hidden border-4 border-minecraft-stone hover:scale-105 transition-transform duration-300"
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

      <section id="contact" className="min-h-screen py-20 px-4 bg-minecraft-stone/10 flex items-center">
        <div className="container mx-auto">
          <h2 className="font-pixel text-3xl sm:text-5xl text-center mb-12 text-minecraft-stone">
            КОНТАКТЫ
          </h2>
          <div className="max-w-2xl mx-auto bg-white border-4 border-minecraft-stone p-8 sm:p-12 rounded-lg shadow-xl text-center">
            <p className="font-sans text-lg text-minecraft-stone/80 mb-8">
              Хотите присоединиться к нашим сезонам или задать вопрос? 
              Свяжитесь с нами в Telegram!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://t.me/dfenger"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="font-pixel text-xs bg-minecraft-sky text-white hover:bg-minecraft-sky/80 border-4 border-black px-6 py-4 h-auto w-full sm:w-auto">
                  <Icon name="Send" size={16} className="mr-2" />
                  TEMPUS
                </Button>
              </a>
              <a 
                href="https://t.me/KIRKA30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="font-pixel text-xs bg-minecraft-grass text-black hover:bg-minecraft-grass/80 border-4 border-black px-6 py-4 h-auto w-full sm:w-auto">
                  <Icon name="Send" size={16} className="mr-2" />
                  KIRKASHADOW
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-minecraft-stone border-t-4 border-minecraft-brown py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="font-pixel text-[10px] text-white/80">
            © 2025 MINECRAFT SEASONS | MADE WITH ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;