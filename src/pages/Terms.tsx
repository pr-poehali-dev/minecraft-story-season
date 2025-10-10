import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-sky to-minecraft-grass/20">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-minecraft-stone/95 backdrop-blur-sm border-b-4 border-minecraft-brown shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-pixel text-xs sm:text-sm text-white">ТЕРМИНЫ СЕЗОНОВ</h1>
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="font-pixel text-[8px] sm:text-[10px] px-2 sm:px-4 py-1 sm:py-2 h-auto border-2 text-white border-white/20 hover:bg-white/10"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              НАЗАД
            </Button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen py-20 px-4 pt-32">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-pixel text-3xl sm:text-5xl text-center mb-12 text-minecraft-stone">
            ТЕРМИНЫ СЕЗОНОВ
          </h2>

          <Card className="border-4 border-minecraft-stone bg-white shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-minecraft-sand border-4 border-minecraft-stone flex items-center justify-center flex-shrink-0">
                  <Icon name="Gem" size={32} className="text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-pixel text-xl mb-4 text-minecraft-brown">
                    СКИНТ
                  </h3>
                  <div className="space-y-4 font-sans text-base text-minecraft-stone/90">
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
              
              <div className="mt-6 p-4 bg-minecraft-sand/20 border-2 border-minecraft-sand rounded">
                <p className="font-pixel text-xs text-minecraft-brown mb-2">
                  ПОЯВЛЕНИЕ В СЕЗОНАХ:
                </p>
                <p className="font-sans text-sm text-minecraft-stone/80">
                  Сезон 3: Сердце Миров — заражение Скинтом как ключевой элемент сюжета
                </p>
              </div>
            </CardContent>
          </Card>

          <Card id="iskra" className="border-4 border-minecraft-stone bg-white shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-minecraft-grass border-4 border-minecraft-stone flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="font-pixel text-xl mb-4 text-minecraft-grass">
                    ИСКРА
                  </h3>
                  <div className="space-y-4 font-sans text-base text-minecraft-stone/90">
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
              
              <div className="mt-6 p-4 bg-minecraft-grass/20 border-2 border-minecraft-grass rounded">
                <p className="font-pixel text-xs text-minecraft-grass mb-2">
                  ПОЯВЛЕНИЕ В СЕЗОНАХ:
                </p>
                <p className="font-sans text-sm text-minecraft-stone/80">
                  Побочный сезон 1: Моральное Осознание — углублённое познание в мирохождении и Искры
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => navigate("/")}
              className="font-pixel text-xs bg-minecraft-brown text-white hover:bg-minecraft-brown/80 border-4 border-black px-6 py-4 h-auto"
            >
              <Icon name="Home" size={16} className="mr-2" />
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </Button>
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

export default Terms;