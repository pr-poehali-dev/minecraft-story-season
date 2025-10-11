import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInitialTheme, saveTheme, listenToSystemThemeChanges } from "@/utils/theme";

const Terms = () => {
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme);
  const [isVisible, setIsVisible] = useState(false);

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
    setIsVisible(true);
  }, []);

  const handleNavigateBack = () => {
    setIsVisible(false);
    setTimeout(() => navigate("/"), 300);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkTheme 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-minecraft-sky to-minecraft-grass/20'
    } ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b-4 shadow-lg transition-colors duration-500 ${
        isDarkTheme
          ? 'bg-gray-900/95 border-gray-700'
          : 'bg-minecraft-stone/95 border-minecraft-brown'
      }`}>
        <div className="container mx-auto px-2 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <h1 className="font-pixel text-[10px] sm:text-xs md:text-sm text-white">ТЕРМИНЫ</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`font-pixel text-xs p-2 border-2 rounded transition-colors ${
                  isDarkTheme
                    ? 'bg-yellow-500 text-black border-yellow-600 hover:bg-yellow-400'
                    : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                }`}
              >
                <Icon name={isDarkTheme ? "Sun" : "Moon"} size={14} className="sm:w-4 sm:h-4" />
              </button>
              <Button
                onClick={handleNavigateBack}
                variant="ghost"
                className="font-pixel text-[8px] sm:text-[10px] px-2 sm:px-4 py-1 sm:py-2 h-auto border-2 text-white border-white/20 hover:bg-white/10"
              >
                <Icon name="ArrowLeft" size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4" />
                НАЗАД
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="min-h-screen py-12 sm:py-16 md:py-20 px-4 pt-20 sm:pt-24 md:pt-32">
        <div className="container mx-auto max-w-4xl">
          <h2 className={`font-pixel text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center mb-8 sm:mb-12 px-2 transition-colors ${
            isDarkTheme ? 'text-white' : 'text-minecraft-stone'
          }`}>
            ТЕРМИНЫ СЮЖЕТНЫХ СЕЗОНОВ
          </h2>

          <Card className={`relative border-4 sm:border-6 lg:border-8 mb-6 sm:mb-8 transition-all overflow-hidden ${
            isDarkTheme
              ? 'bg-gray-900 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
              : 'bg-white border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.3)]'
          }`}>
            <div className={`absolute top-0 left-0 right-0 h-2 ${
              isDarkTheme ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500' : 'bg-yellow-500'
            }`}></div>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 sm:border-4 flex items-center justify-center flex-shrink-0 ${
                  isDarkTheme
                    ? 'bg-yellow-900/50 border-yellow-500'
                    : 'bg-minecraft-sand border-minecraft-stone'
                }`}>
                  <Icon name="Gem" size={24} className="text-yellow-500 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <div className="flex-1 w-full">
                  <h3 className={`font-pixel text-base sm:text-lg md:text-xl mb-3 sm:mb-4 transition-colors ${
                    isDarkTheme ? 'text-yellow-400' : 'text-minecraft-brown'
                  }`}>
                    СКИНТ
                  </h3>
                  <div className={`space-y-2 sm:space-y-3 md:space-y-4 font-sans text-xs sm:text-sm md:text-base transition-colors border-2 sm:border-4 rounded p-3 sm:p-4 ${
                    isDarkTheme ? 'border-gray-600 bg-gray-900/30 text-gray-200' : 'border-minecraft-stone/20 bg-minecraft-sand/5 text-minecraft-stone/90'
                  }`}>
                    <p>
                      <strong>Скинт</strong> — прочный кристалл жёлтого цвета, который тяжело сломать 
                      или добыть без специального оборудования.
                    </p>
                    <p>
                      Он растёт естественным путём в некоторых неполноценных мирах и карманных 
                      измерениях, в которых отсутствует прочный барьер между пустотой.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`mt-4 sm:mt-6 p-3 sm:p-4 border-2 rounded transition-colors ${
                isDarkTheme 
                  ? 'bg-yellow-500/10 border-yellow-500/30' 
                  : 'bg-minecraft-sand/20 border-minecraft-sand'
              }`}>
                <p className={`font-pixel text-[10px] sm:text-xs mb-2 transition-colors ${
                  isDarkTheme ? 'text-yellow-400' : 'text-minecraft-brown'
                }`}>
                  ПОЯВЛЕНИЕ В СЕЗОНАХ:
                </p>
                <p className={`font-sans text-xs sm:text-sm transition-colors ${
                  isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
                }`}>
                  Используется во всех сезонах, кроме сезонов в разработке. Ключевой элемент сюжета в Сезоне 3: Сердце Миров
                </p>
              </div>
            </CardContent>
          </Card>

          <Card id="iskra" className={`relative border-4 sm:border-6 lg:border-8 mb-6 sm:mb-8 transition-all overflow-hidden ${
            isDarkTheme
              ? 'bg-gray-900 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
              : 'bg-white border-minecraft-stone shadow-[6px_6px_0px_rgba(0,0,0,0.3)]'
          }`}>
            <div className={`absolute top-0 left-0 right-0 h-2 ${
              isDarkTheme ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-500' : 'bg-minecraft-grass'
            }`}></div>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 sm:border-4 flex items-center justify-center flex-shrink-0 ${
                  isDarkTheme
                    ? 'bg-green-900/50 border-green-500'
                    : 'bg-minecraft-grass border-minecraft-stone'
                }`}>
                  <Icon name="Sparkles" size={24} className="text-white sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <div className="flex-1 w-full">
                  <h3 className={`font-pixel text-base sm:text-lg md:text-xl mb-3 sm:mb-4 transition-colors ${
                    isDarkTheme ? 'text-minecraft-grass' : 'text-minecraft-grass'
                  }`}>
                    ИСКРА
                  </h3>
                  <div className={`space-y-2 sm:space-y-3 md:space-y-4 font-sans text-xs sm:text-sm md:text-base transition-colors border-2 sm:border-4 rounded p-3 sm:p-4 ${
                    isDarkTheme ? 'border-gray-600 bg-gray-900/30 text-gray-200' : 'border-minecraft-stone/20 bg-minecraft-grass/5 text-minecraft-stone/90'
                  }`}>
                    <p>
                      <strong>Искра</strong> (также «Орган межпространственного перемещения») — материальный орган в мире мироходцев.
                    </p>
                    <p>
                      Позволяет опытным мироходцам контролируемо перемещаться между мирами, а неопытным — неконтролируемо, через сильные эмоции (например, страх).
                    </p>
                    <p>
                      Даёт возможность адаптироваться к мирам, куда происходит перемещение, например, понимать и говорить почти на любом языке.
                    </p>
                    <p>
                      В зависимости от силы Искры, её владелец может изменять свой генетический код и подстраиваться под почти любой мир, обретая новые способности и модифицируя своё тело.
                    </p>
                    <p>
                      Сильная Искра может обладать своим сознанием, отдельным от сознания мироходца.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`mt-4 sm:mt-6 p-3 sm:p-4 border-2 rounded transition-colors ${
                isDarkTheme 
                  ? 'bg-minecraft-grass/10 border-minecraft-grass/30' 
                  : 'bg-minecraft-grass/20 border-minecraft-grass'
              }`}>
                <p className="font-pixel text-[10px] sm:text-xs text-minecraft-grass mb-2">
                  ПОЯВЛЕНИЕ В СЕЗОНАХ:
                </p>
                <p className={`font-sans text-xs sm:text-sm transition-colors ${
                  isDarkTheme ? 'text-gray-300' : 'text-minecraft-stone/80'
                }`}>
                  Используется во всех сезонах, кроме сезонов в разработке. Углублённое познание в Побочном сезоне 1: Моральное Осознание
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center px-4">
            <Button
              onClick={handleNavigateBack}
              className="font-pixel text-[10px] sm:text-xs bg-minecraft-brown text-white hover:bg-minecraft-brown/80 border-2 sm:border-4 border-black px-4 sm:px-6 py-3 sm:py-4 h-auto"
            >
              <Icon name="Home" size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4" />
              ВЕРНУТЬСЯ
            </Button>
          </div>
        </div>
      </section>

      <footer className={`border-t-2 sm:border-t-4 py-6 sm:py-8 px-4 transition-colors duration-500 ${
        isDarkTheme 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-minecraft-stone border-minecraft-brown'
      }`}>
        <div className="container mx-auto text-center">
          <p className="font-pixel text-[8px] sm:text-[10px] text-white/80">
            © 2025 MINECRAFT SEASONS | MADE WITH ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Terms;