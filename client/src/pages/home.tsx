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
  X
} from "lucide-react";

import heroImage from "@assets/generated_images/luxury_cabin_exterior_at_twilight_in_forest.png";
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
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className={`text-2xl font-serif font-bold tracking-tight transition-colors ${
            scrolled ? "text-primary" : "text-white"
          }`}>
            Refugio del Bosque
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {["Cabañas", "Experiencias", "Nosotros", "Ubicación"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium hover:text-secondary transition-colors ${
                scrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {item}
            </a>
          ))}
          <Button 
            variant={scrolled ? "default" : "secondary"}
            className={!scrolled ? "bg-white text-primary hover:bg-white/90" : ""}
          >
            Reservar Ahora
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? "text-foreground" : "text-white"} /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-background border-b md:hidden p-6 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            {["Cabañas", "Experiencias", "Nosotros", "Ubicación"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button className="w-full">Reservar Ahora</Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-muted/30 transition-colors duration-300">
    <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <h3 className="font-serif text-xl font-medium mb-2 text-primary">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const CabinCard = ({ image, title, price, guests }: { image: string, title: string, price: string, guests: string }) => (
  <Card className="overflow-hidden border-none shadow-lg group cursor-pointer rounded-xl">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
    </div>
    <CardContent className="p-6 bg-card relative">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-serif text-2xl font-bold text-primary mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <MapPin size={14} /> Vista al Bosque
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-secondary">{price}</p>
          <p className="text-xs text-muted-foreground">por noche</p>
        </div>
      </div>
      
      <div className="flex gap-4 mt-6 text-sm text-foreground/80 font-medium border-t pt-4 border-border/50">
        <span className="flex items-center gap-1.5"><Star size={14} className="text-secondary" /> 4.9 (128)</span>
        <span className="flex items-center gap-1.5">Hasta {guests} personas</span>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroImage} 
            alt="Luxury Cabin in Forest" 
            className="w-full h-[120%] object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white pt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-4 text-sm md:text-base tracking-[0.2em] uppercase font-light text-white/90"
          >
            Escapa de la rutina
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-lg"
          >
            Refugio del <br className="hidden md:block" />
            <span className="italic font-light">Bosque</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light"
          >
            Donde el lujo rústico se encuentra con la serenidad de la naturaleza. 
            Tu santuario privado para desconectar y revitalizarte.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-secondary hover:bg-secondary/90 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              Explorar Cabañas
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <ArrowRight className="rotate-90" />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="nosotros">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-full h-full border-2 border-secondary/30 rounded-lg translate-x-4 translate-y-4" />
              <img 
                src={interiorImage} 
                alt="Cozy Interior" 
                className="relative rounded-lg shadow-2xl w-full aspect-[4/5] object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Nuestra Filosofía</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
                Desconecta para <span className="italic text-secondary">Reconectar</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                En Refugio del Bosque, creemos que la verdadera paz se encuentra en los detalles. 
                Cada cabaña ha sido diseñada para integrarse armoniosamente con el entorno, 
                ofreciendo una experiencia de inmersión total sin sacrificar el confort moderno.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Despierta con el sonido de los pájaros, disfruta de un café frente a la chimenea 
                y termina el día bajo un cielo estrellado en tu jacuzzi privado.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Trees size={20} />
                  </div>
                  <span className="font-medium text-foreground">Entorno Natural</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Wifi size={20} />
                  </div>
                  <span className="font-medium text-foreground">Starlink WiFi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cabins Section */}
      <section className="py-24 bg-muted/30" id="cabañas">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Nuestras Cabañas</h2>
            <p className="text-muted-foreground text-lg">
              Espacios íntimos diseñados para parejas, familias y amigos. 
              Elige tu refugio perfecto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <CabinCard 
              image={heroImage}
              title="Suite Roble"
              price="$250"
              guests="2"
            />
            <CabinCard 
              image={deckImage}
              title="Villa Pinos"
              price="$380"
              guests="4"
            />
            <CabinCard 
              image={interiorImage}
              title="Refugio Cumbre"
              price="$450"
              guests="6"
            />
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-24 bg-background" id="experiencias">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Flame} 
              title="Chimenea a Leña" 
              description="Calidez rústica para las noches frescas de montaña."
            />
            <FeatureCard 
              icon={Coffee} 
              title="Desayuno Artesanal" 
              description="Productos locales frescos entregados a tu puerta cada mañana."
            />
            <FeatureCard 
              icon={MapPin} 
              title="Senderos Privados" 
              description="Acceso exclusivo a rutas de trekking y miradores."
            />
            <FeatureCard 
              icon={Wifi} 
              title="Conexión Total" 
              description="Internet de alta velocidad para trabajar desde el paraíso."
            />
          </div>
        </div>
      </section>

      {/* Large Parallax Image Section */}
      <section className="py-24 relative overflow-hidden h-[60vh] flex items-center justify-center">
        <motion.div 
          style={{ y: y2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={deckImage} 
            alt="Relaxing Deck" 
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">Vive la Magia</h2>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto">
            "El lugar perfecto para perderse y encontrarse a uno mismo."
          </p>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary h-14 px-8 rounded-full text-lg">
            Ver Disponibilidad
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <h3 className="font-serif text-2xl font-bold mb-4">Refugio del Bosque</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Un santuario de lujo sostenible en el corazón de la naturaleza.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Explorar</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="#" className="hover:text-white transition-colors">Cabañas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Experiencias</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Galería</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>info@refugiodelbosque.com</li>
                <li>+54 911 1234 5678</li>
                <li>Camino del Río Km 5</li>
                <li>Patagonia, Argentina</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="bg-primary-foreground/10 border border-primary-foreground/20 rounded px-3 py-2 text-sm text-white placeholder:text-white/50 w-full focus:outline-none focus:border-secondary"
                />
                <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
            <p>&copy; 2024 Refugio del Bosque. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Airbnb</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
