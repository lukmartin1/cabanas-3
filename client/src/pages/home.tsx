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
  Wind
} from "lucide-react";

import heroImage from "@assets/generated_images/modern_minimalist_cabin_in_snowy_mountains_at_dawn.png";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl shadow-sm py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className={`text-2xl font-serif font-bold tracking-tighter transition-colors ${
            scrolled ? "text-primary" : "text-white"
          }`}>
            LA<span className="font-light italic text-secondary ml-1">ARBOLEDA</span>
          </a>
        </Link>

        {/* Menú de Escritorio */}
        <div className="hidden md:flex items-center space-x-10">
          {["Cabañas", "Servicios", "Blog", "Contacto"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-xs uppercase tracking-widest font-bold hover:text-secondary transition-colors ${
                scrolled ? "text-foreground/70" : "text-white/80"
              }`}
            >
              {item}
            </a>
          ))}
          <Button 
            variant={scrolled ? "default" : "secondary"}
            className={`rounded-none px-8 ${!scrolled ? "bg-white text-primary hover:bg-white/90" : "bg-secondary hover:bg-secondary/90 text-white"}`}
          >
            RESERVAR
          </Button>
        </div>

        {/* Toggle Móvil */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? "text-foreground" : "text-white"} /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
        </button>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 bg-background md:hidden p-12 z-50 flex flex-col justify-center text-center"
        >
          <button className="absolute top-8 right-8" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col space-y-8">
            {["Cabañas", "Servicios", "Blog", "Contacto"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-3xl font-serif text-foreground hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="h-16 text-xl bg-secondary hover:bg-secondary/90 rounded-none">RESERVAR</Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col p-8 border border-border/50 hover:border-secondary/30 transition-all duration-500 group">
    <div className="text-secondary mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
      <Icon size={32} strokeWidth={1} />
    </div>
    <h3 className="font-serif text-2xl font-medium mb-3 text-primary">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-sm font-light">{description}</p>
  </div>
);

const CabinCard = ({ image, title, price, subtitle }: { image: string, title: string, price: string, subtitle: string }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[4/5] overflow-hidden mb-6">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 text-primary font-bold text-sm">
        {price}
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="font-serif text-2xl group-hover:text-secondary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">{subtitle}</p>
    </div>
  </div>
);

export default function Home() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Sección Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0"
        >
          <img 
            src={heroImage} 
            alt="Cabaña Minimalista" 
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-grayscale-[0.3]" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block mb-6 text-xs tracking-[0.5em] uppercase font-bold text-white/70">
              El Arte del Aislamiento
            </span>
            <h1 className="font-serif text-6xl md:text-9xl font-bold mb-8 tracking-tighter">
              SILENCIO.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-12 font-light leading-relaxed">
              Vive la belleza brutal de la montaña en nuestros santuarios minimalistas. 
              Diseñado para quienes buscan claridad a través de la quietud.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="h-16 px-10 rounded-none bg-secondary hover:bg-secondary/90 text-white font-bold tracking-widest text-xs">
                EXPLORAR CABAÑAS
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-none border-white text-white hover:bg-white hover:text-primary font-bold tracking-widest text-xs">
                NUESTRA HISTORIA
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenido en Cuadrícula */}
      <section className="py-32 bg-background" id="cabañas">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="font-serif text-5xl md:text-6xl mb-6">Diseñado para la <br/><span className="italic text-secondary font-light">Contemplación</span></h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestras cabañas no son solo lugares para dormir; son marcos para el paisaje. 
                Usando materiales crudos y grandes cristales, borramos la línea entre el interior y el infinito.
              </p>
            </div>
            <Link href="/cabins">
              <a className="text-xs uppercase tracking-[0.3em] font-bold border-b-2 border-secondary pb-2 hover:text-secondary transition-colors">
                Ver todas las unidades
              </a>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <CabinCard 
              image={heroImage}
              title="El Monolito"
              price="$450"
              subtitle="2 Personas · Vista a la Cumbre"
            />
            <CabinCard 
              image={interiorImage}
              title="Casa de Cristal"
              price="$320"
              subtitle="2 Personas · Suelo del Bosque"
            />
            <CabinCard 
              image={deckImage}
              title="Terraza Obsidiana"
              price="$580"
              subtitle="4 Personas · Borde del Valle"
            />
          </div>
        </div>
      </section>

      {/* Sección de Características Minimalistas */}
      <section className="py-32 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-px bg-border/30">
            <FeatureCard 
              icon={Wind} 
              title="Aire Puro" 
              description="Ubicación a gran altitud con cero contaminación industrial."
            />
            <FeatureCard 
              icon={Flame} 
              title="Fuego de Basalto" 
              description="Chimeneas centrales construidas con piedra volcánica local."
            />
            <FeatureCard 
              icon={Trees} 
              title="Bosque Ancestral" 
              description="Rodeado de bosques antiguos bajo protección estricta."
            />
            <FeatureCard 
              icon={Coffee} 
              title="Brew Nórdico" 
              description="Selección de café curada de los mejores tostadores del mundo."
            />
          </div>
        </div>
      </section>

      {/* Sección de Cita */}
      <section className="py-40 bg-background text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20vw] font-serif font-black text-muted/10 select-none -z-0">
          QUIETUD
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <blockquote className="font-serif text-3xl md:text-5xl max-w-4xl mx-auto leading-tight italic font-light">
            "Las montañas llaman y debo ir, pero solo si hay una chimenea y ventanales del suelo al techo."
          </blockquote>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-secondary" />
            <cite className="not-italic text-xs uppercase tracking-widest font-bold text-muted-foreground">Revista Modern Nomad</cite>
          </div>
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-primary text-primary-foreground py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5">
              <h3 className="font-serif text-3xl font-bold mb-6 tracking-tighter">LA<span className="font-light italic text-secondary ml-1">ARBOLEDA</span></h3>
              <p className="text-primary-foreground/60 max-w-sm mb-8 leading-relaxed">
                Un experimento arquitectónico en minimalismo y naturaleza. 
                Ubicado en las altas cumbres donde el silencio es el único lenguaje.
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="secondary" className="rounded-none bg-white/5 hover:bg-white/10 text-white border-0">
                  <Star size={18} />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-none bg-white/5 hover:bg-white/10 text-white border-0">
                  <Star size={18} />
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary mb-6">Explorar</h4>
              <ul className="space-y-4 text-sm font-medium text-primary-foreground/50">
                <li><a href="#" className="hover:text-white transition-colors">Santuarios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Filosofía</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disponibilidad</a></li>
              </ul>
            </div>

            <div className="md:col-span-5">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary mb-6">Mantente Informado</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="INGRESA TU EMAIL" 
                  className="bg-white/5 border border-white/10 rounded-none px-4 py-4 text-xs font-bold tracking-widest w-full focus:outline-none focus:border-secondary transition-colors"
                />
                <Button className="h-14 px-8 bg-secondary hover:bg-secondary/90 rounded-none text-xs font-bold tracking-widest">
                  UNIRSE
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-primary-foreground/30">
            <p>&copy; 2024 LA ARBOLEDA EXPERIMENT. TODOS LOS DERECHOS RESERVADOS.</p>
            <div className="flex gap-12 mt-6 md:mt-0">
              <a href="#" className="hover:text-white">Privacidad</a>
              <a href="#" className="hover:text-white">Términos</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
