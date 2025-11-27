import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { QRCodeSVG } from 'qrcode.react';

const templates = [
  { id: 1, name: 'Классика', color: '#1A1F2C', accent: '#8B5CF6', style: 'classic' },
  { id: 2, name: 'Минимал', color: '#FFFFFF', accent: '#000000', style: 'minimal' },
  { id: 3, name: 'Премиум', color: '#000000', accent: '#FFD700', style: 'premium' },
  { id: 4, name: 'Модерн', color: '#F3F4F6', accent: '#0EA5E9', style: 'modern' },
];

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [cardData, setCardData] = useState({
    businessName: 'Моя компания',
    cardholderName: 'Иван Иванов',
    discount: '10',
    backgroundColor: '#1A1F2C',
    accentColor: '#8B5CF6',
    logoText: 'МК',
    cardNumber: '1234 5678',
  });

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setCardData({
      ...cardData,
      backgroundColor: template.color,
      accentColor: template.accent,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" className="text-primary-foreground" size={20} />
            </div>
            <h1 className="text-2xl font-semibold">LoyaltyCard</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-sm font-medium">
              <Icon name="Layout" size={16} className="mr-2" />
              Конструктор
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Библиотека
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Шаблоны
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </Button>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
            <Button size="sm">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Palette" size={20} />
                Шаблоны
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedTemplate.id === template.id
                        ? 'border-primary shadow-lg'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: template.color }}
                  >
                    <div className="w-full h-16 rounded-md flex items-center justify-center text-xs font-medium"
                      style={{ 
                        backgroundColor: template.accent,
                        color: template.color === '#FFFFFF' ? '#000000' : '#FFFFFF'
                      }}>
                      {template.name}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Wrench" size={20} />
                Инструменты
              </h2>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="content" className="text-xs">Контент</TabsTrigger>
                  <TabsTrigger value="style" className="text-xs">Стиль</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm">Название компании</Label>
                    <Input
                      id="businessName"
                      value={cardData.businessName}
                      onChange={(e) => setCardData({ ...cardData, businessName: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName" className="text-sm">Имя владельца</Label>
                    <Input
                      id="cardholderName"
                      value={cardData.cardholderName}
                      onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount" className="text-sm">Скидка (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={cardData.discount}
                      onChange={(e) => setCardData({ ...cardData, discount: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoText" className="text-sm">Логотип (текст)</Label>
                    <Input
                      id="logoText"
                      value={cardData.logoText}
                      onChange={(e) => setCardData({ ...cardData, logoText: e.target.value })}
                      maxLength={3}
                      className="text-sm"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bgColor" className="text-sm">Цвет фона</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bgColor"
                        type="color"
                        value={cardData.backgroundColor}
                        onChange={(e) => setCardData({ ...cardData, backgroundColor: e.target.value })}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={cardData.backgroundColor}
                        onChange={(e) => setCardData({ ...cardData, backgroundColor: e.target.value })}
                        className="flex-1 text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor" className="text-sm">Акцентный цвет</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={cardData.accentColor}
                        onChange={(e) => setCardData({ ...cardData, accentColor: e.target.value })}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={cardData.accentColor}
                        onChange={(e) => setCardData({ ...cardData, accentColor: e.target.value })}
                        className="flex-1 text-sm font-mono"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Card className="p-8 bg-muted/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Icon name="Eye" size={20} />
                  Предпросмотр
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Smartphone" size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Monitor" size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center p-12">
                <div 
                  className="w-full max-w-md aspect-[1.586/1] rounded-2xl shadow-2xl p-8 relative overflow-hidden transition-all duration-300"
                  style={{ backgroundColor: cardData.backgroundColor }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: cardData.accentColor }}
                  />
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
                        style={{ 
                          backgroundColor: cardData.accentColor,
                          color: cardData.backgroundColor
                        }}
                      >
                        {cardData.logoText}
                      </div>
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center bg-white p-2"
                      >
                        <QRCodeSVG 
                          value={`LOYALTY:${cardData.cardNumber}:${cardData.businessName}:${cardData.discount}%`}
                          size={48}
                          level="H"
                          includeMargin={false}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 
                        className="text-2xl font-bold mb-1"
                        style={{ color: cardData.backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                      >
                        {cardData.businessName}
                      </h3>
                      <p 
                        className="text-sm opacity-70 mb-6"
                        style={{ color: cardData.backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                      >
                        Карта лояльности
                      </p>

                      <div 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                        style={{ 
                          backgroundColor: cardData.accentColor,
                          color: cardData.backgroundColor
                        }}
                      >
                        <Icon name="Gift" size={16} />
                        Скидка {cardData.discount}%
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p 
                            className="text-xs opacity-60 mb-1"
                            style={{ color: cardData.backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                          >
                            Владелец карты
                          </p>
                          <p 
                            className="text-base font-semibold"
                            style={{ color: cardData.backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                          >
                            {cardData.cardholderName}
                          </p>
                        </div>
                        <div>
                          <p 
                            className="text-xs opacity-60 mb-1 text-right"
                            style={{ color: cardData.backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                          >
                            Номер карты
                          </p>
                          <p 
                            className="text-base font-semibold font-mono"
                            style={{ color: cardData.backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF' }}
                          >
                            {cardData.cardNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 text-base">
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Сбросить
              </Button>
              <Button className="h-14 text-base">
                <Icon name="Download" size={20} className="mr-2" />
                Экспортировать
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Layers" size={20} />
                Возможности
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="QrCode" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">QR-код</p>
                    <p className="text-xs text-muted-foreground">Добавить QR</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="Barcode" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Штрих-код</p>
                    <p className="text-xs text-muted-foreground">Добавить код</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="Nfc" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">NFC</p>
                    <p className="text-xs text-muted-foreground">Настроить NFC</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="Image" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Логотип</p>
                    <p className="text-xs text-muted-foreground">Загрузить лого</p>
                  </div>
                </button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Статистика
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Карт создано</span>
                    <span className="text-lg font-semibold">47</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '47%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Активных карт</span>
                    <span className="text-lg font-semibold">32</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium">Всего скачиваний</span>
                  <span className="text-2xl font-bold">89</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;