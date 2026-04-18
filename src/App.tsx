/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, memo } from 'react';
import { 
  Users, 
  Heart, 
  Play, 
  Zap, 
  ShieldCheck, 
  Lock,
  Clock, 
  ChevronDown, 
  MessageCircle,
  CheckCircle2,
  Star,
  Package,
  MessageSquare,
  UserCheck,
  ArrowRight,
  TrendingUp,
  Instagram,
  Sliders,
  ShoppingCart,
  Plus,
  Sparkles,
  ShoppingBag,
  Info
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import * as pixel from './lib/pixel';

const WHATSAPP_NUMBER = "5599991090194";

interface Plan {
  id: string;
  quantity: string;
  label: string;
  price: string;
  oldPrice?: string;
  microCopy?: string;
  badge?: string;
  highlight?: boolean;
  description?: string;
}

const FOLLOWERS_PLANS: Plan[] = [
  { id: 'f1', quantity: '1.000', label: 'Seguidores', price: '19,90', oldPrice: '29,90', microCopy: 'Ideal para começar' },
  { id: 'f2', quantity: '3.000', label: 'Seguidores', price: '49,90', oldPrice: '67,00', badge: '🔥 MAIS ESCOLHIDO', microCopy: '🔥 O MELHOR CUSTO-BENEFÍCIO PARA CRESCER AGORA', highlight: true },
  { id: 'f3', quantity: '5.000', label: 'Seguidores', price: '79,90', oldPrice: '119,90', microCopy: 'Aumenta sua autoridade' },
  { id: 'f4', quantity: '10.000', label: 'Seguidores', price: '149,90', oldPrice: '229,90', microCopy: 'Perfil com impacto forte' },
];

const LIKES_PLANS: Plan[] = [
  { id: 'l1', quantity: '250', label: 'Curtidas', price: '4,90', oldPrice: '9,90', microCopy: 'Destaque inicial' },
  { id: 'l2', quantity: '500', label: 'Curtidas', price: '7,90', oldPrice: '14,90', microCopy: 'Engajamento real' },
  { id: 'l3', quantity: '1.000', label: 'Curtidas', price: '12,90', oldPrice: '24,90', microCopy: 'Popularidade garantida', highlight: true, badge: 'MAIS VENDIDO' },
  { id: 'l4', quantity: '3.000', label: 'Curtidas', price: '24,90', oldPrice: '49,90', microCopy: 'Impulso de autoridade' },
  { id: 'l5', quantity: '5.000', label: 'Curtidas', price: '39,90', oldPrice: '79,90', microCopy: 'Dominação total' },
];

const VIEWS_PLANS: Plan[] = [
  { id: 'v1', quantity: '1.000', label: 'Views', price: '5,90', oldPrice: '12,90', microCopy: 'Início viral' },
  { id: 'v2', quantity: '5.000', label: 'Views', price: '14,90', oldPrice: '29,90', microCopy: 'Alcance orgânico', highlight: true, badge: 'MELHOR PREÇO' },
  { id: 'v3', quantity: '10.000', label: 'Views', price: '24,90', oldPrice: '49,90', microCopy: 'Explosão de visualizações' },
  { id: 'v4', quantity: '50.000', label: 'Views', price: '79,90', oldPrice: '159,90', microCopy: 'Viralização garantida' },
];

const COMBOS: Plan[] = [
  { id: 'c1', quantity: 'COMBO START', label: '1k seguidores • 1k curtidas • 5k views', price: '39,90', oldPrice: '79,90', microCopy: 'Tire o seu perfil do zero agora.' },
  { id: 'c2', quantity: 'COMBO IMPULSO', label: '3k seguidores • 3k curtidas • 10k views', price: '79,90', oldPrice: '149,90', badge: 'MAIS ESCOLHIDO', microCopy: 'Autoridade imediata no nicho.', highlight: true },
  { id: 'c3', quantity: 'COMBO CRESCIMENTO', label: '5k seguidores • 5k curtidas • 20k views', price: '119,90', oldPrice: '229,90', microCopy: 'Resultados profissionais e consistentes.' },
  { id: 'c4', quantity: 'COMBO VIRAL', label: '10k seguidores • 10k curtidas • 50k views', price: '199,90', oldPrice: '399,90', microCopy: 'Vitrine de sucesso com alcance massivo.' },
  { id: 'c5', quantity: 'COMBO DOMINAÇÃO', label: '20k seguidores • 20k curtidas • 100k views', price: '349,90', oldPrice: '699,90', microCopy: 'Referência total em dominação de mercado.' },
];

const InstagramPreview = memo(({ followersCount }: { followersCount: number }) => {
  const [displayCount, setDisplayCount] = useState(followersCount);
  
  useEffect(() => {
    const start = displayCount;
    const end = followersCount;
    if (start === end) return;
    
    const duration = 400;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const nextCount = Math.floor(start + (end - start) * easeProgress);
      setDisplayCount(nextCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [followersCount]);

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-100 max-w-[300px] mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/alpha/100/100?webp=1" 
                  alt="Avatar" 
                  className="w-full h-full object-cover shadow-inner" 
                  loading="lazy"
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-gray-900 leading-none">seu_perfil</p>
            <p className="text-[9px] font-bold text-gray-400 mt-0.5">Instagram</p>
          </div>
        </div>
        <Instagram size={18} className="text-brand-deep/20" />
      </div>
      
      <div className="flex justify-between text-center mb-6 px-2">
        <div>
          <p className="text-sm font-black text-gray-900">12</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Posts</p>
        </div>
        <div>
          <motion.p 
            key={displayCount}
            initial={{ scale: 1.05, color: '#4A00E0' }}
            animate={{ scale: 1, color: '#111827' }}
            className="text-sm font-black"
          >
            {displayCount.toLocaleString()}
          </motion.p>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Seguidores</p>
        </div>
        <div>
          <p className="text-sm font-black text-gray-900">342</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Seguindo</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-1.5 rounded-2xl overflow-hidden">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="aspect-square bg-gray-200 overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/insta${i}/200/200?webp=1`} 
              alt="Post" 
              className="w-full h-full object-cover opacity-90" 
              loading="lazy"
              referrerPolicy="no-referrer" 
            />
          </div>
        ))}
      </div>
    </div>
  );
});

const FEEDBACKS = [
  { name: "João", time: "10:22", text: "comprei 3k aqui e já começou a subir seguidor kkk" },
  { name: "Ana", time: "11:03", text: "chegou rápido mesmo, pensei que ia demorar" },
  { name: "Lucas", time: "11:47", text: "meu perfil tava morto, agora já tá bem melhor" },
  { name: "Carlos", time: "12:15", text: "valeu muito, vou pegar mais depois" },
  { name: "Mariana", time: "13:05", text: "Gente, funciona de verdade! 🚀" },
  { name: "Pedro", time: "14:20", text: "Top demais, entrega imediata como prometido." },
  { name: "Bia", time: "15:10", text: "recomendo mto, suporte nota 10" },
];

const FAQS = [
  { 
    q: "Os seguidores são reais ou posso perder meu perfil?", 
    a: "Sim. O crescimento é feito de forma segura e gradual, respeitando os limites do Instagram e evitando qualquer risco à sua conta." 
  },
  { 
    q: "Preciso passar minha senha ou é seguro?", 
    a: "Não. Você só envia seu @usuário. Nenhum acesso à conta ou senha é necessário, garantindo 100% de segurança." 
  },
  { 
    q: "Em quanto tempo começo a ver resultado?", 
    a: "O envio é imediato e você começa a ver os resultados em poucos minutos, de forma natural e constante." 
  },
];

const UrgencyIndicator = memo(({ type }: { type: 'high' | 'choosing' | 'viewing' }) => {
  const [count, setCount] = useState(Math.floor(Math.random() * (120 - 40 + 1)) + 40);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.random() > 0.6 ? 1 : Math.random() > 0.4 ? -1 : 0;
        const next = prev + change;
        return next > 150 ? 149 : next < 30 ? 31 : next;
      });
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  const getText = () => {
    switch (type) {
      case 'high': return "Alta procura agora";
      case 'choosing': return "Pessoas estão escolhendo este plano agora";
      case 'viewing': return `${count} pessoas vendo agora`;
      default: return "";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1.5 mt-3"
    >
      <span className="text-[9px] sm:text-[10px] font-bold text-white/70 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full border border-white/5">
        <span className="animate-pulse">🔥</span> {getText()}
      </span>
    </motion.div>
  );
});

const SALES_QUANTITIES = ["300", "500", "1.000", "1.500", "3.000", "5.000", "10.000"];
const SALES_TYPES = ["seguidores", "curtidas", "visualizações"];

const SalesNotification = memo(({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
    className="fixed top-6 left-6 z-[100] bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl flex items-center gap-3 max-w-[240px] border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
  >
    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
      <CheckCircle2 className="text-green-500" size={12} />
    </div>
    <p className="text-[11px] font-bold text-gray-700 leading-none tracking-tight">{message}</p>
  </motion.div>
));

const LiveViewingCount = memo(() => {
  const [count, setCount] = useState(Math.floor(Math.random() * (150 - 110 + 1)) + 110);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next > 200 ? 199 : next < 50 ? 51 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[8px] text-center font-black uppercase tracking-widest text-orange-400/80 flex items-center justify-center gap-1.5">
       <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
       {count} pessoas comprando agora
    </div>
  );
});

const AnimatedPrice = memo(({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    let startValue = displayValue;
    const endValue = value;
    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const current = startValue + (endValue - startValue) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>;
});

const AnimatedNumber = memo(({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    let startValue = displayValue;
    const endValue = value;
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(startValue + (endValue - startValue) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toLocaleString('pt-BR')}</>;
});

export default function App() {
  const [activeCategory, setActiveCategory] = useState('seguidores');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [openFaq, setOpenFaq] = useState<number>(0);

  // Custom order state
  const [customFollowers, setCustomFollowers] = useState<number>(0);
  const [customLikes, setCustomLikes] = useState<number>(0);
  const [customViews, setCustomViews] = useState<number>(0);

  const PRICE_TIERS = {
    followers: [
      { q: 1000, p: 19.90 },
      { q: 3000, p: 49.90 },
      { q: 5000, p: 79.90 },
      { q: 10000, p: 149.90 },
      { q: 20000, p: 349.90 }
    ],
    likes: [
      { q: 250, p: 4.90 },
      { q: 500, p: 7.90 },
      { q: 1000, p: 12.90 },
      { q: 3000, p: 24.90 },
      { q: 5000, p: 39.90 }
    ],
    views: [
      { q: 1000, p: 5.90 },
      { q: 5000, p: 14.90 },
      { q: 10000, p: 24.90 },
      { q: 50000, p: 79.90 }
    ]
  };

  const COMBOS_DATA = [
    { f: 1000, l: 1000, v: 5000, p: 39.90 },
    { f: 3000, l: 3000, v: 10000, p: 79.90 },
    { f: 5000, l: 5000, v: 20000, p: 119.90 },
    { f: 10000, l: 10000, v: 50000, p: 199.90 },
    { f: 20000, l: 20000, v: 100000, p: 349.90 }
  ];

  const getTieredPrice = (quantity: number, tiers: { q: number; p: number }[]) => {
    if (quantity <= 0) return 0;
    
    // Sort tiers just in case
    const sortedTiers = [...tiers].sort((a, b) => a.q - b.q);
    
    // If less than smallest tier, use smallest tier's unit price
    if (quantity <= sortedTiers[0].q) {
      const unitPrice = sortedTiers[0].p / sortedTiers[0].q;
      return quantity * unitPrice;
    }
    
    // If more than largest tier, use largest tier's unit price
    if (quantity >= sortedTiers[sortedTiers.length - 1].q) {
      const unitPrice = sortedTiers[sortedTiers.length - 1].p / sortedTiers[sortedTiers.length - 1].q;
      return quantity * unitPrice;
    }
    
    // Interpolate between tiers
    for (let i = 0; i < sortedTiers.length - 1; i++) {
      const current = sortedTiers[i];
      const next = sortedTiers[i + 1];
      
      if (quantity >= current.q && quantity <= next.q) {
        const rangeQ = next.q - current.q;
        const rangeP = next.p - current.p;
        const progress = (quantity - current.q) / rangeQ;
        return current.p + (rangeP * progress);
      }
    }
    
    return 0;
  };

  const calculateCustomTotal = () => {
    const fPrice = getTieredPrice(customFollowers, PRICE_TIERS.followers);
    const lPrice = getTieredPrice(customLikes, PRICE_TIERS.likes);
    const vPrice = getTieredPrice(customViews, PRICE_TIERS.views);
    
    const individualTotal = fPrice + lPrice + vPrice;
    
    // Check if it should be adjusted to a combo price
    let bestTotal = individualTotal;
    
    COMBOS_DATA.forEach(combo => {
      // If user requested at least what's in the combo
      if (customFollowers >= combo.f && customLikes >= combo.l && customViews >= combo.v) {
        const excessF = customFollowers - combo.f;
        const excessL = customLikes - combo.l;
        const excessV = customViews - combo.v;
        
        const comboTotal = combo.p + 
          getTieredPrice(excessF, PRICE_TIERS.followers) + 
          getTieredPrice(excessL, PRICE_TIERS.likes) + 
          getTieredPrice(excessV, PRICE_TIERS.views);
        
        if (comboTotal < bestTotal) {
          bestTotal = comboTotal;
        }
      } else {
        // Anti-error protection: if the individual calculation is more expensive than a combo 
        // that provides MORE or EQUAL, use the combo price
        if (combo.p < bestTotal && combo.f >= customFollowers && combo.l >= customLikes && combo.v >= customViews) {
          bestTotal = combo.p;
        }
      }
    });

    return bestTotal;
  };

  const isUsingComboPrice = () => {
    const fPrice = getTieredPrice(customFollowers, PRICE_TIERS.followers);
    const lPrice = getTieredPrice(customLikes, PRICE_TIERS.likes);
    const vPrice = getTieredPrice(customViews, PRICE_TIERS.views);
    const individualTotal = fPrice + lPrice + vPrice;
    const currentTotal = calculateCustomTotal();
    
    return currentTotal < individualTotal && currentTotal > 0;
  };

  const handleCustomBuy = () => {
    const total = calculateCustomTotal();
    if (total === 0) return;

    const message = `Olá, quero montar um pedido personalizado.
Seguidores: ${customFollowers}
Curtidas: ${customLikes}
Views: ${customViews}
Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastQty = "";
    let lastType = "";
    
    const triggerNotification = () => {
      let qty, type;
      // Avoid immediate repetition of the same combination
      do {
        qty = SALES_QUANTITIES[Math.floor(Math.random() * SALES_QUANTITIES.length)];
        type = SALES_TYPES[Math.floor(Math.random() * SALES_TYPES.length)];
      } while (qty === lastQty && type === lastType);
      
      lastQty = qty;
      lastType = type;

      const suffix = type === "seguidores" ? "adicionados" : "adicionadas";
      const message = `+${qty} ${type} ${suffix}`;
      
      setNotification(message);
      
      // Keep visible for 2.5 to 3.5 seconds
      const visibilityTime = Math.floor(Math.random() * (3500 - 2500 + 1)) + 2500;
      
      setTimeout(() => {
        setNotification(null);
        // Only after it's gone, wait 8 to 18 seconds for the next one
        const nextDelay = Math.floor(Math.random() * (18000 - 8000 + 1)) + 8000;
        timeoutId = setTimeout(triggerNotification, nextDelay);
      }, visibilityTime);
    };

    // Initial delay before the first cycle starts
    const initialWait = Math.floor(Math.random() * (15000 - 7000 + 1)) + 7000;
    timeoutId = setTimeout(triggerNotification, initialWait);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    pixel.initPixel();
  }, []);

  const handleBuy = (plan: Plan) => {
    pixel.event('InitiateCheckout', {
      content_name: plan.label,
      content_category: plan.id,
      value: parseFloat(plan.price.replace(',', '.')),
      currency: 'BRL'
    });
    const message = `Olá! Quero o plano de ${plan.quantity} ${plan.label} por R$ ${plan.price}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getActivePlans = () => {
    switch (activeCategory) {
      case 'seguidores': return FOLLOWERS_PLANS;
      case 'curtidas': return LIKES_PLANS;
      case 'visualizacoes': return VIEWS_PLANS;
      case 'combos': return COMBOS;
      default: return FOLLOWERS_PLANS;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-deep selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-white/5 px-6 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-2xl font-black tracking-tighter italic text-white drop-shadow-sm">ALPHA</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-[10px] font-black border border-white/10 tracking-widest">
              <span className="pulse-dot">
                <span className="pulse-dot-inner"></span>
                <span className="pulse-dot-main"></span>
              </span>
              <span>ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Background Glows & Texture */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
          {/* Noise Texture Overlay - More visible but elegant */}
          <div 
            className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
            }}
          ></div>

          {/* Central Blue Glow Accent */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-blue/10 rounded-full blur-[120px] will-change-[filter]"></div>

          {/* Peripheral Accents */}
          <div className="absolute top-0 -left-20 w-96 h-96 bg-brand-deep/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Hero */}
        <section className="py-8 sm:py-12 text-center max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-white drop-shadow-lg px-2"
          >
            🚀 Aumente seus seguidores, curtidas e visualizações com rapidez e segurança
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 mt-4 text-base sm:text-lg font-bold px-4"
          >
            Escolha seu pacote abaixo e comece a crescer ainda hoje
          </motion.p>
          
          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3 mt-8 text-[10px] sm:text-[11px] font-black text-white/80 uppercase tracking-widest"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Zap size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
              <span>Entrega rápida</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Lock size={14} className="text-cyan-400 sm:w-4 sm:h-4" />
              <span>Processo seguro</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <TrendingUp size={14} className="text-green-400 sm:w-4 sm:h-4" />
              <span>Resultados visíveis</span>
            </div>
          </motion.div>
        </section>

        {/* App-like Selection Experience */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start mt-8">
          <div className="space-y-6 sm:space-y-10">
            {/* Category Selector - Premium App Style */}
            <div className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-2">
              {[
                { 
                  id: 'seguidores', 
                  label: 'Seguidores', 
                  subtitle: 'Mais autoridade',
                  icon: Users, 
                  color: 'from-purple-600 to-indigo-700',
                  glow: 'shadow-purple-500/40',
                },
                { 
                  id: 'curtidas', 
                  label: 'Curtidas', 
                  subtitle: 'Mais engajamento',
                  icon: Heart, 
                  color: 'from-purple-500 to-pink-600',
                  glow: 'shadow-pink-500/40'
                },
                { 
                  id: 'visualizacoes', 
                  label: 'Views', 
                  subtitle: 'Mais alcance',
                  icon: Play, 
                  color: 'from-blue-400 to-cyan-500',
                  glow: 'shadow-blue-400/40'
                },
                { 
                  id: 'combos', 
                  label: 'Combos', 
                  subtitle: 'Crescimento completo',
                  icon: Zap, 
                  color: 'from-indigo-800 to-purple-950',
                  glow: 'shadow-indigo-500/50',
                  recommended: true
                },
                { 
                  id: 'personalizado', 
                  label: 'Personalizado', 
                  subtitle: 'Do seu jeito',
                  icon: Sliders, 
                  color: 'from-emerald-500 to-teal-600',
                  glow: 'shadow-emerald-500/40'
                },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveCategory(item.id);
                    setSelectedPlan(null);
                  }}
                  whileHover={{ scale: activeCategory === item.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-[1.8rem] sm:rounded-[2.5rem] transition-all duration-300 border-2 overflow-hidden min-h-[90px] sm:min-h-[130px] shadow-lg ${
                    activeCategory === item.id 
                    ? `bg-gradient-to-br ${item.color} border-white ring-4 ring-white/10 scale-[1.05] z-10 ${item.glow}` 
                    : `bg-[#2a2a2a] border-white/10 grayscale-[0.3] opacity-60 hover:opacity-100 hover:grayscale-0 hover:border-white/20`
                  }`}
                >
                  {/* Decorative Glow Background */}
                  {activeCategory === item.id && (
                    <motion.div
                      layoutId="card-bg-glow"
                      className="absolute inset-0 bg-white/10 filter blur-2xl pointer-events-none"
                    />
                  )}

                  {/* Icon Area */}
                  <div className={`relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-500 flex items-center justify-center mb-1.5 sm:mb-3 ${
                    activeCategory === item.id 
                    ? 'bg-white text-gray-900 shadow-xl scale-110' 
                    : 'bg-white/10 text-white group-hover:bg-white/20'
                  }`}>
                    <item.icon 
                      size={20} 
                      strokeWidth={2.5}
                      className={`sm:w-6 sm:h-6 ${activeCategory === item.id ? 'animate-pulse' : ''}`} 
                    />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className={`text-[10px] sm:text-[13px] font-black uppercase tracking-widest leading-none ${
                      activeCategory === item.id ? 'text-white' : 'text-white/90'
                    }`}>
                      {item.label}
                    </span>
                    <span className={`text-[7px] sm:text-[10px] font-black uppercase tracking-tighter mt-1 px-2 py-0.5 rounded-full ${
                      activeCategory === item.id ? 'bg-black/20 text-white/80' : 'text-white/40'
                    }`}>
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Recommended Badge Overlay */}
                  {item.recommended && activeCategory !== item.id && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded-full border border-white/20">
                      <Sparkles size={8} className="text-yellow-400" />
                      <span className="text-[6px] font-black text-white/90 uppercase tracking-widest">Top</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Plans Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-2">
                <h3 className="text-white font-black uppercase tracking-widest text-xs">
                  Escolha como você quer crescer agora
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-cyan-400 animate-pulse">⚡ Promoção Ativa</span>
                  <span className="text-[10px] font-bold text-orange-400">⏳ Oferta por tempo limitado</span>
                </div>
              </div>
              
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={activeCategory === 'personalizado' ? "w-full" : "grid sm:grid-cols-2 gap-4"}
                    >
                      {activeCategory === 'personalizado' ? (
                        <div className="space-y-4 w-full pb-6">
                          {/* Main Builder Area */}
                          <div className="bg-white p-4 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] border-2 border-white shadow-xl space-y-4 sm:space-y-10 overflow-hidden relative group">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-brand-deep/5 rounded-full blur-[60px] -mr-16 -mt-16"></div>
                            
                            <div className="grid lg:grid-cols-3 gap-3 sm:gap-8 relative z-10 text-gray-900">
                              {[
                                { id: 'f', label: 'Seguidores', value: customFollowers, setter: setCustomFollowers, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-100', emoji: '🚀' },
                                { id: 'l', label: 'Curtidas', value: customLikes, setter: setCustomLikes, icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50', borderColor: 'border-pink-100', emoji: '❤️' },
                                { id: 'v', label: 'Views', value: customViews, setter: setCustomViews, icon: Play, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', emoji: '👀' },
                              ].map((input) => (
                                <div key={input.label} className="bg-white/60 rounded-[1.2rem] sm:rounded-[2.5rem] p-3 sm:p-5 border border-gray-100 shadow-sm flex flex-col items-center">
                                  {/* R1: Header */}
                                  <div className="flex items-center justify-between w-full mb-2 shrink-0">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-2xl ${input.bgColor} ${input.color} flex items-center justify-center shadow-sm`}>
                                        <input.icon size={14} className="sm:w-5 sm:h-5" />
                                      </div>
                                      <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-gray-800">{input.label}</span>
                                    </div>
                                    <div className="text-[7px] sm:text-[10px] font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-tighter">
                                      <Zap size={8} className="sm:w-3 sm:h-3" /> Melhor Preço
                                    </div>
                                  </div>

                                  {/* R2: Input */}
                                  <div className="w-full mb-2">
                                    <input
                                      type="number"
                                      min="0"
                                      value={input.value || ''}
                                      onChange={(e) => input.setter(Math.max(0, parseInt(e.target.value) || 0))}
                                      placeholder="0"
                                      className="w-full bg-white/80 border-2 border-gray-100 rounded-xl sm:rounded-2xl p-2 sm:p-4 text-lg sm:text-2xl font-black text-gray-900 focus:border-brand-deep/30 outline-none transition-all placeholder:text-gray-100 text-center h-10 sm:h-16"
                                    />
                                  </div>

                                  {/* R3: Buttons */}
                                  <div className="grid grid-cols-3 gap-1 w-full mb-1 sm:mb-2">
                                    {[500, 1000, 5000].map((amount) => (
                                      <button
                                        key={amount}
                                        onClick={() => input.setter((prev: number) => prev + amount)}
                                        className={`py-1 sm:py-2.5 rounded-lg text-[8px] sm:text-[10px] font-black uppercase border border-gray-100 ${input.bgColor} ${input.color} active:scale-95 transition-all h-7 sm:h-10`}
                                      >
                                        +{amount / 1000}k
                                      </button>
                                    ))}
                                  </div>

                                  {/* R4: Feedback */}
                                  <div className="h-3 sm:h-4 flex items-center justify-center">
                                    <AnimatePresence>
                                      {input.value > 0 && (
                                        <motion.div 
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0.8 }}
                                          className="text-[7px] sm:text-[9px] font-black text-gray-500 uppercase tracking-tighter"
                                        >
                                          {input.emoji} +{input.value.toLocaleString('pt-BR')} adicionados
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-3 sm:pt-10 border-t border-gray-100 relative z-10 flex flex-col items-center gap-3">
                              <div className="text-center">
                                <p className="text-[7px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-brand-deep/80 mb-0.5">CUSTO DO SEU PEDIDO</p>
                                <div className="relative inline-block">
                                  <p className="text-4xl sm:text-8xl font-black text-gray-900 tracking-tighter">
                                    <span className="text-sm mr-0.5 opacity-30">R$</span>
                                    <AnimatedPrice value={calculateCustomTotal()} />
                                  </p>
                                  {calculateCustomTotal() > 0 && (
                                    <motion.div 
                                      className="absolute -right-2 -top-1 w-5 h-5 sm:w-12 sm:h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                    >
                                      <Sparkles size={10} className="sm:w-5 sm:h-5" />
                                    </motion.div>
                                  )}
                                </div>
                              </div>

                              {calculateCustomTotal() > 0 && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-full border flex items-center gap-1 leading-none ${
                                    isUsingComboPrice() 
                                    ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
                                    : 'text-brand-deep bg-brand-deep/10 border-brand-deep/10'
                                  }`}
                                >
                                  {isUsingComboPrice() ? (
                                    <>
                                      <Sparkles size={8} /> Melhor oferta aplicada
                                    </>
                                  ) : (
                                    <>
                                      <Zap size={8} /> Cálculo por faixas otimizado
                                    </>
                                  )}
                                </motion.div>
                              )}
                              
                              {/* Desktop-only CTA */}
                              <div className="hidden lg:flex flex-col items-center gap-4 mt-6 w-full">
                                <button
                                  onClick={handleCustomBuy}
                                  disabled={calculateCustomTotal() === 0}
                                  className={`w-full py-6 rounded-[2.5rem] text-lg font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-4 ${
                                    calculateCustomTotal() > 0 ? 'bg-gray-900 text-white hover:scale-[1.02]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  <ShoppingBag size={24} />
                                  <span>Solicitar Pedido</span>
                                </button>
                              </div>
                            </div>
                          </div>
              
                          {/* Trust Indicators */}
                          <div className="px-2 space-y-2">
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[7px] font-black uppercase tracking-widest text-white/50">
                              <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-400" /> Automático</span>
                              <span className="flex items-center gap-1"><Lock size={10} className="text-emerald-400" /> Seguro</span>
                              <span className="flex items-center gap-1"><Zap size={10} className="text-emerald-400" /> Imediato</span>
                            </div>
                            <LiveViewingCount />
                          </div>

                          {/* Sticky Mobile CTA */}
                          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-[60] pointer-events-none">
                            <motion.div 
                              initial={{ y: 100 }}
                              animate={{ y: calculateCustomTotal() > 0 ? 0 : 100 }}
                              className="max-w-md mx-auto pointer-events-auto"
                            >
                              <button
                                onClick={handleCustomBuy}
                                className="w-full bg-gray-900 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.15em] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-3 border border-white/10 active:scale-95 transition-all"
                              >
                                <ShoppingBag size={18} />
                                🚀 Quero crescer com esse pedido
                              </button>
                            </motion.div>
                          </div>
                        </div>
                      ) : getActivePlans().map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan)}
                          whileTap={{ scale: 0.98 }}
                          className={`relative flex flex-col p-4 sm:p-5 rounded-[1.8rem] sm:rounded-[2.5rem] transition-all duration-300 border-2 text-left group overflow-hidden min-h-fit will-change-transform ${
                            selectedPlan?.id === plan.id
                            ? 'bg-white border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] scale-[1.02] z-10'
                            : plan.highlight
                              ? 'bg-white/40 border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.2)] hover:bg-white/50 scale-[1.01]'
                              : 'bg-white/20 border-white/10 shadow-lg hover:bg-white/30'
                          }`}
                        >
                          {plan.highlight && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                              />
                            </div>
                          )}

                          {/* Header Badge */}
                          {plan.badge && (
                            <div className={`absolute top-2 right-2 z-20 ${
                              plan.highlight ? 'bg-orange-600' : 'bg-gray-800'
                            } text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1`}>
                              {plan.highlight && <Sparkles size={8} className="text-orange-200" />}
                              {plan.badge}
                            </div>
                          )}

                          {/* Line 1: Main Identification */}
                          <div className="flex flex-col gap-0.5 mb-3">
                            <h4 className={`text-lg sm:text-2xl font-black tracking-tighter leading-tight ${selectedPlan?.id === plan.id ? 'text-gray-900' : 'text-white'}`}>
                              {plan.quantity}
                            </h4>
                            <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight opacity-70 ${selectedPlan?.id === plan.id ? 'text-brand-deep' : 'text-white'}`}>
                              {plan.label}
                            </p>
                          </div>

                          {/* Line 2: Pricing (The Focus) */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <p className={`text-3xl sm:text-5xl font-black leading-none ${
                                selectedPlan?.id === plan.id ? 'text-gray-900' : 'text-white'
                              }`}>
                                <span className="text-xs sm:text-lg mr-1 font-bold opacity-50 italic">R$</span>{plan.price}
                              </p>
                              {plan.oldPrice && (
                                <p className={`text-[10px] sm:text-xs font-bold line-through opacity-30 ${selectedPlan?.id === plan.id ? 'text-gray-500' : 'text-white'}`}>
                                  {plan.oldPrice}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Line 3: Bottom Row with Feedback + Mini CTA */}
                          <div className="mt-auto flex items-center justify-between gap-2">
                            {plan.microCopy && (
                              <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-tight max-w-[60%] leading-tight ${selectedPlan?.id === plan.id ? 'text-gray-400' : 'text-white/40'}`}>
                                {plan.microCopy}
                              </p>
                            )}
                            
                            <div className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 ${
                              selectedPlan?.id === plan.id 
                              ? 'bg-brand-deep text-white shadow-xl' 
                              : 'bg-white/10 text-white/60 group-hover:bg-white/20'
                            }`}>
                              🚀 {selectedPlan?.id === plan.id ? 'Selecionado' : 'Escolher'}
                            </div>
                          </div>
                        </button>
                      ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Preview Column (Desktop) */}
          <aside className="hidden lg:block sticky top-32 space-y-6">
            <div className="glass-card p-8 rounded-[3rem] border-white/20 shadow-2xl">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-black text-gray-900 leading-tight">Seu Perfil ALPHA</h3>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Simulação em tempo real</p>
              </div>
              
              <InstagramPreview 
                followersCount={
                  selectedPlan && activeCategory === 'seguidores' 
                  ? 12500 + parseInt(selectedPlan.quantity.replace('.', '')) 
                  : 12500
                } 
              />

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-900 uppercase">Segurança Total</p>
                    <p className="text-[9px] font-bold text-gray-500">Sem necessidade de senha</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Zap size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-900 uppercase">Entrega Turbo</p>
                    <p className="text-[9px] font-bold text-gray-500">Início em poucos minutos</p>
                  </div>
                </div>
              </div>
            </div>

            {selectedPlan && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-1 bg-gradient-to-r from-brand-deep via-brand-blue to-brand-pink rounded-[2.5rem] shadow-2xl"
              >
                <div className="bg-white p-6 rounded-[2.3rem] text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total a pagar</p>
                  <h4 className="text-4xl font-black text-brand-deep leading-none mb-4">R$ {selectedPlan.price}</h4>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center gap-1.5 text-[9px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 py-2 rounded-xl">
                      <TrendingUp size={12} />
                      <span>🔥 Mais escolhido nas últimas horas</span>
                    </div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                      ⏳ Oferta pode sair a qualquer momento
                    </p>
                  </div>

                  <button
                    onClick={() => handleBuy(selectedPlan)}
                    className="w-full py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all shadow-[0_15px_30px_rgba(34,197,94,0.4)] border-b-4 border-green-700"
                  >
                    🚀 COMEÇAR MEU CRESCIMENTO AGORA
                  </button>
                </div>
              </motion.div>
            )}
          </aside>
        </div>

        {/* Mobile Preview Area Removed */}

        {/* Trust Bar */}
        <section className="mt-16 sm:mt-24 grid grid-cols-3 gap-2 sm:gap-4 py-8 sm:py-10 border-y border-white/20">
          <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
            <div className="p-3 sm:p-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <ShieldCheck size={20} className="text-brand-deep sm:w-6 sm:h-6" />
            </div>
            <span className="text-[8px] sm:text-[10px] font-black leading-tight text-white uppercase tracking-tighter drop-shadow-md">NÃO PRECISA DE SENHA</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
            <div className="p-3 sm:p-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <Clock size={20} className="text-brand-blue sm:w-6 sm:h-6" />
            </div>
            <span className="text-[8px] sm:text-[10px] font-black leading-tight text-white uppercase tracking-tighter drop-shadow-md">ENTREGA RÁPIDA</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
            <div className="p-3 sm:p-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <CheckCircle2 size={20} className="text-brand-cyan sm:w-6 sm:h-6" />
            </div>
            <span className="text-[8px] sm:text-[10px] font-black leading-tight text-white uppercase tracking-tighter drop-shadow-md">100% SEGURO</span>
          </div>
        </section>

        {/* How it Works */}
        <section className="mt-8 sm:mt-24">
          <h3 className="text-2xl font-black text-white text-center mb-12 tracking-tighter uppercase">
            Como você começa agora (é simples)
          </h3>
          
          <div className="space-y-10 relative">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-blue shadow-[0_0_20px_rgba(0,102,255,0.4)] border border-white/50">
                <Package size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-white font-black text-xl uppercase tracking-tight drop-shadow-md">1. Escolha seu pacote</h4>
                <p className="text-white/90 text-sm font-semibold mt-1 leading-snug">Clique na opção que você quer começar.</p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#FF0080] shadow-[0_0_20px_rgba(255,0,128,0.4)] border border-white/50">
                <MessageSquare size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-white font-black text-xl uppercase tracking-tight drop-shadow-md">2. Você será direcionado para o WhatsApp</h4>
                <p className="text-white/90 text-sm font-semibold mt-1 leading-snug">A mensagem já vai pronta, é só enviar.</p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#7000FF] shadow-[0_0_20px_rgba(112,0,255,0.4)] border border-white/50">
                <UserCheck size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-white font-black text-xl uppercase tracking-tight drop-shadow-md">3. Envie seu @ e finalize o pagamento</h4>
                <p className="text-white/90 text-sm font-semibold mt-1 leading-snug">Você recebe as instruções e pronto — o crescimento começa.</p>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 p-8 glass-card rounded-[2.5rem] border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-800 font-black text-xs uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-green-500" />
                Não precisa de senha
              </div>
              <div className="flex items-center gap-3 text-gray-800 font-black text-xs uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-green-500" />
                Pagamento simples e rápido
              </div>
              <div className="flex items-center gap-3 text-gray-800 font-black text-xs uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-green-500" />
                Atendimento direto no WhatsApp
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-brand-deep font-black text-sm uppercase tracking-tighter italic">
                Você faz tudo em menos de 2 minutos.
              </p>
            </div>
          </div>
        </section>

        {/* Feedbacks - WhatsApp Style Carousel */}
        <section className="mt-12 sm:mt-24">
          {/* Numerical Proof */}
          <div className="grid grid-cols-3 gap-2 mb-10 px-1 sm:px-2">
            <div className="text-center bg-white py-4 sm:py-5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] flex flex-col justify-center min-h-[80px]">
              <p className="text-lg sm:text-xl font-black text-brand-deep leading-none">+10.000</p>
              <p className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">Pedidos</p>
            </div>
            <div className="text-center bg-white py-4 sm:py-5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] flex flex-col justify-center min-h-[80px]">
              <p className="text-lg sm:text-xl font-black text-brand-blue leading-none">+2.500</p>
              <p className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">Perfis</p>
            </div>
            <div className="text-center bg-white py-4 sm:py-5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] flex flex-col justify-center min-h-[80px]">
              <p className="text-lg sm:text-xl font-black text-brand-cyan leading-none">99%</p>
              <p className="text-[7px] sm:text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">Aprovação</p>
            </div>
          </div>

          <div className="text-center mb-8 px-4">
            <h3 className="text-lg sm:text-xl font-black text-white inline-flex items-center gap-2 leading-tight">
              🔥 Pessoas comprando e crescendo agora
            </h3>
          </div>

          {/* WhatsApp Chat Container */}
          <div className="bg-[#e5ddd5] rounded-[2.5rem] py-8 shadow-2xl border-4 border-white/20 relative overflow-hidden">
            {/* WhatsApp Header Mockup */}
            <div className="absolute top-0 left-0 right-0 bg-[#075e54] py-3 px-6 flex items-center gap-3 z-20">
              <div className="relative w-11 h-11 shrink-0">
                <div className="w-full h-full rounded-full bg-[#0d0d1e] flex items-center justify-center overflow-hidden shadow-lg border border-white/10">
                  <img 
                    src="https://i.postimg.cc/LsHdgY6p/wq-dq1.png" 
                    alt="Alpha Engajamento" 
                    className="w-full h-full object-cover scale-[1.8] transform translate-y-[-1px]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Real-time Online Indicator */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-[#075e54] shadow-sm">
                  <motion.div 
                    animate={{ opacity: [1, 0.5, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full rounded-full bg-[#25D366]" 
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white text-[13px] font-bold leading-none tracking-tight">Alpha Engajamento</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <p className="text-white/80 text-[10px] font-medium italic">online</p>
                </div>
              </div>
              <div className="flex gap-4 text-white/90">
                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px] font-black opacity-40">i</div>
              </div>
            </div>

            {/* Dynamic Highlight Message */}
            <div className="mt-8 mb-6 flex justify-center z-10 relative">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#dcf8c6] text-[#4a4a4a] text-[10px] font-bold py-1.5 px-4 rounded-full shadow-sm border border-[#c7e9b0] uppercase tracking-wider"
              >
                🔥 Acabou de chegar pedido de 5.000 seguidores
              </motion.span>
            </div>

            {/* Infinite Horizontal Scroll Track */}
            <div className="relative w-full overflow-hidden">
              <motion.div 
                className="flex gap-4 px-4 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 25, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
                style={{ display: 'flex' }}
                whileHover={{ animationPlayState: 'paused' }}
              >
                {/* Duplicate the list for seamless loop */}
                {[...FEEDBACKS, ...FEEDBACKS].map((item, i) => (
                  <div 
                    key={i}
                    className="p-4 rounded-2xl shadow-sm relative bg-white min-w-[240px] max-w-[280px]"
                  >
                    <div className="flex justify-between items-baseline gap-4 mb-2">
                      <span className="text-[10px] font-black text-brand-deep/60">{item.name}</span>
                      <span className="text-[8px] text-gray-400 font-bold">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-800 font-medium leading-relaxed">
                      {item.text}
                    </p>
                    {/* Message Tail */}
                    <div className="absolute top-0 -left-1 w-2 h-2 bg-white [clip-path:polygon(100%_0,0_0,100%_100%)]"></div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* WhatsApp Footer Mockup */}
            <div className="mt-8 px-6 flex items-center gap-2 opacity-50">
              <div className="flex-1 h-8 bg-white rounded-full"></div>
              <div className="w-8 h-8 rounded-full bg-[#128c7e]"></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-8 sm:mt-24 px-2 sm:px-0">
          <h3 className="text-lg sm:text-xl font-black mb-8 text-white text-center px-4">
            Ainda com dúvida? olha isso 👇
          </h3>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <FaqItem 
                key={i} 
                question={faq.q} 
                answer={faq.a} 
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </section>

        {/* Final CTA Selection - Simplified */}
        <section className="mt-10 sm:mt-20 mb-12 px-4 sm:px-0 text-center">
          <div className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black p-10 sm:p-24 rounded-[3rem] sm:rounded-[4rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-deep/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-pink/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-orange-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-6"
              >
                🔥 Pessoas estão começando agora
              </motion.div>

              <h3 className="text-3xl sm:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tighter">
                Enquanto você pensa… <br className="hidden sm:block" />
                outros perfis <span className="text-brand-cyan">estão crescendo.</span>
              </h3>

              <p className="text-white/70 text-base sm:text-xl font-bold mb-10 max-w-2xl mx-auto leading-relaxed">
                Você pode começar agora e ver resultado hoje… <br className="hidden sm:block" />
                ou continuar parado vendo os outros crescendo.
              </p>

              <div className="max-w-md mx-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveCategory('seguidores');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-7 sm:py-9 rounded-2xl sm:rounded-3xl text-lg sm:text-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all relative overflow-hidden group border-b-4 border-green-700"
                >
                  <span className="relative z-10">🚀 Quero começar agora</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>

                <div className="mt-8 flex flex-wrap justify-center items-center gap-x-5 gap-y-3 text-white/30 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
                  <span>Sem senha</span>
                  <span>•</span>
                  <span>Início rápido</span>
                  <span>•</span>
                  <span>Atendimento no WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center pb-12 px-6">
          <div className="flex flex-col items-center gap-4 text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
            <p>© Alpha</p>
          </div>
        </footer>
      </main>

      {/* Sticky CTA Button */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 z-50 lg:hidden"
          >
            <div className="max-w-md mx-auto">
              <button
                onClick={() => handleBuy(selectedPlan)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(34,197,94,0.4)] flex flex-col items-center justify-center gap-1 active:scale-95 transition-all duration-150 min-h-[64px] will-change-transform border-b-4 border-green-700"
              >
                <span className="text-[10px] sm:text-xs">🚀 COMEÇAR MEU CRESCIMENTO AGORA</span>
                <span className="bg-white/20 px-3 py-0.5 rounded-lg text-[9px] sm:text-[10px]">R$ {selectedPlan.price}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sticky CTA (Removed in favor of sidebar card) */}

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        style={{ 
          transform: (selectedPlan || (activeCategory === 'personalizado' && calculateCustomTotal() > 0)) ? 'translateY(-80px)' : 'translateY(0)'
        }}
        className="fixed right-4 sm:right-6 bottom-6 bg-[#25D366] text-white p-3 sm:p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50 border-2 border-white/20 lg:!transform-none"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* Sales Notifications */}
      <AnimatePresence>
        {notification && <SalesNotification message={notification} />}
      </AnimatePresence>
    </div>
  );
}

interface FaqItemProps {
  key?: string | number;
  question: string;
  answer: string;
}

const FaqItem = memo(({ key, question, answer, isOpen, onToggle }: { key?: any; question: string; answer: string; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div 
      className={`glass-card rounded-[2rem] overflow-hidden transition-all duration-200 border-2 will-change-transform ${
        isOpen ? 'border-white/50 bg-white shadow-xl scale-[1.01]' : 'border-transparent'
      }`}
    >
      <button 
        onClick={onToggle}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 min-h-[60px] active:bg-gray-50 transition-colors"
      >
        <span className={`text-xs sm:text-sm font-black tracking-tight leading-tight ${isOpen ? 'text-brand-deep' : 'text-gray-800'}`}>
          {question}
        </span>
        <ChevronDown 
          size={20} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-deep' : 'text-gray-400'}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="px-6 pb-6"
          >
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
