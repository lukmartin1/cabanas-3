import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wifi, 
  Flame, 
  Trees, 
  Coffee, 
  MapPin, 
  Star,
  ArrowRight,
  Menu,
  X,
  Waves,
  Navigation,
  Anchor,
  Wind
} from "lucide-react";

import heroImage from "@assets/generated_images/luxury_cabin_exterior_at_twilight_in_forest.png";
import riverImage from "@assets/generated_images/river_cabin_with_dock_and_kayaks.png";
import interiorImage from "@assets/generated_images/cozy_cabin_interior_with_fireplace.png";
import deckImage from "@assets/generated_images/cabin_deck_with_hot_tub_and_view.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className={`text-xl md:text-2xl font-serif font-bold tracking-tighter transition-colors flex items-center gap-2 ${
            scrolled ? "text-primary" : "text-white"
          }`}>
            <Anchor size={24} className={scrolled ? "text-secondary" : "text-white"} />
            Refugio del Bosque
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {["Cabañas", "Actividades", "Ubicación", "Contacto"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-xs uppercase tracking-widest font-bold hover:text-secondary transition-colors ${
                scrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {item}
            </a>
          ))}
          <Button 
            variant={scrolled ? "default" : "secondary"}
            className={`rounded-none px-8 font-bold tracking-widest uppercase text-xs ${
              !scrolled ? "bg-white text-primary hover:bg-secondary hover:text-white" : ""
            }`}
          >
            Reservar
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? "text-foreground" : "text-white"} /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 bg-background z-[60] md:hidden p-8 flex flex-col justify-center items-center text-center"
        >
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-primary">
            <X size={32} />
          </button>
          <div className="flex flex-col space-y-8">
            {["Cabañas", "Actividades", "Ubicación", "Contacto"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-3xl font-serif font-bold text-primary hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="mt-8 rounded-none px-12 py-6 text-lg uppercase tracking-widest font-bold">Reservar</Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const ActivityIcon = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-4">
      <Icon size={32} strokeWidth={1} />
    </div>
    <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground group-hover:text-primary transition-colors">{title}</span>
  </div>
);

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary/30">
      <Navbar />

      {/* Hero Section - Inspired by Soldemedianoche's focus on nature & views */}
      <section className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImage} 
            alt="Refugio del Bosque" 
            className="w-full h-[125%] object-cover brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="border border-white/20 p-8 md:p-16 inline-block bg-black/10 backdrop-blur-sm"
          >
            <span className="inline-block mb-6 text-sm tracking-[0.4em] uppercase font-bold text-secondary">
              Naturaleza • Aventura • Relax
            </span>
            <h1 className="font-serif text-5xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter">
              El refugio <br /> perfecto.
            </h1>
            <p className="text-sm md:text-lg text-white/80 max-w-xl mx-auto mb-12 uppercase tracking-[0.2em] font-medium">
              A solo minutos de la civilización, <br className="hidden md:block" /> a un mundo de distancia.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-none bg-secondary hover:bg-white hover:text-primary px-10 py-7 text-xs font-bold uppercase tracking-widest border-0">
                Conocé el lugar
              </Button>
              <Button size="lg" variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-primary px-10 py-7 text-xs font-bold uppercase tracking-widest">
                Preguntas frecuentes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section - Inspired by Orillas del Curupí's services focus */}
      <section className="py-24 bg-background border-b" id="actividades">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <ActivityIcon icon={Waves} title="Kayaks" />
            <ActivityIcon icon={Wind} title="Bicicletas" />
            <ActivityIcon icon={Flame} title="Parrilla" />
            <ActivityIcon icon={Wifi} title="Wifi Starlink" />
            <ActivityIcon icon={Navigation} title="Senderos" />
          </div>
        </div>
      </section>

      {/* Feature Section - Inspired by the "Hostería de Campo" feel */}
      <section className="py-32" id="nosotros">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="relative aspect-[16/9] overflow-hidden group">
                <img 
                  src={riverImage} 
                  alt="Nuestra Costa" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-1000" />
                <div className="absolute bottom-8 left-8 text-white">
                  <span className="text-xs uppercase tracking-widest font-bold block mb-2">Actividad destacada</span>
                  <h3 className="text-3xl font-serif font-bold">Costa Privada & Kayaks</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <img src={interiorImage} alt="Interior" className="aspect-square object-cover" />
                <img src={deckImage} alt="Exterior" className="aspect-square object-cover" />
              </div>
            </div>
            
            <div className="lg:col-span-5 lg:pl-12">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Hostería de Campo</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-8 tracking-tighter leading-none">
                Disfrutá del río y mucha <span className="italic font-light">naturaleza.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-light">
                Ubicados en un entorno privilegiado, ofrecemos un servicio de pensión completa o cabañas equipadas para que solo te preocupes por descansar.
              </p>
              <ul className="space-y-6 mb-12">
                {[
                  "Muelle propio para pesca y relax",
                  "Kayaks y canoas de uso libre",
                  "Pensión completa (opcional)",
                  "No se aceptan mascotas"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm font-bold uppercase tracking-widest text-primary/80">
                    <div className="mt-1 w-2 h-2 bg-secondary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="rounded-none px-10 py-7 text-xs font-bold uppercase tracking-widest">
                Consultar disponibilidad
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 tracking-tighter">¿Listo para tu próxima aventura?</h2>
          <p className="text-white/60 text-lg uppercase tracking-[0.2em] mb-12 font-medium max-w-2xl mx-auto">
            Vení a descubrir el delta como nunca antes. <br /> Reservá tu estadía hoy mismo.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Navigation size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">WhatsApp</p>
                <p className="text-lg font-bold">+54 9 11 3068-8284</p>
              </div>
            </div>
            <Button size="lg" className="rounded-none bg-white text-primary hover:bg-secondary hover:text-white px-12 py-8 text-sm font-bold uppercase tracking-widest">
              Enviar Mensaje
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-24 border-t">
        <div className="container mx-auto px-6 text-center">
          <Anchor size={48} className="mx-auto text-secondary mb-8" />
          <h3 className="font-serif text-3xl font-bold text-primary mb-12">Refugio del Bosque</h3>
          
          <div className="grid md:grid-cols-3 gap-12 text-center mb-16 max-w-4xl mx-auto">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Ubicación</h4>
              <p className="text-sm font-bold uppercase">Delta del Tigre, Buenos Aires</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Email</h4>
              <p className="text-sm font-bold uppercase">hola@refugiodelbosque.com.ar</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Seguinos</h4>
              <div className="flex justify-center gap-6">
                <a href="#" className="text-xs font-bold uppercase hover:text-secondary">Instagram</a>
                <a href="#" className="text-xs font-bold uppercase hover:text-secondary">Facebook</a>
              </div>
            </div>
          </div>
          
          <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">
            &copy; 2024 Refugio del Bosque • Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
