import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/layout/AnimatedSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center scale-105 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80)' }}
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, ease: 'easeOut' }} 
        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
      >
        Designing Spaces.<br />Creating Stories.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }} 
        className="text-lg md:text-xl lg:text-2xl mb-12 font-light text-gray-200 text-balance max-w-2xl mx-auto"
      >
        Transforming interiors into timeless experiences through creativity, functionality, and luxury.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }} 
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <Link 
          to="/portfolio" 
          className="bg-white text-primary-text px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-gold hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
        >
          View Portfolio
        </Link>
        <Link 
          to="/contact" 
          className="border border-white text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-primary-text transition-all duration-300 w-full sm:w-auto text-center"
        >
          Book Consultation
        </Link>
      </motion.div>
    </div>
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1, delay: 1 }} 
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <span className="text-xs uppercase tracking-widest mb-2 font-light">Scroll</span>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <ChevronDown size={20} className="text-white/70" />
      </motion.div>
    </motion.div>
  </section>
);

const ProcessTimeline = () => {
  const steps = [
    { title: 'Consultation', desc: 'Understanding your vision, lifestyle, and project requirements.' },
    { title: 'Planning', desc: 'Creating detailed floor plans, mood boards, and design concepts.' },
    { title: '3D Visualization', desc: 'Presenting photorealistic renderings of your future space.' },
    { title: 'Execution', desc: 'Managing contractors, sourcing materials, and installing furniture.' },
    { title: 'Final Reveal', desc: 'The moment you step into your newly transformed luxury space.' },
  ];

  return (
    <section className="py-32 bg-secondary-bg">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-primary-text mb-6">Our Design Process</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </AnimatedSection>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <AnimatedSection 
              key={index} 
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'right' : 'left'}
              className="relative pl-10 md:pl-0 mb-12 last:mb-0"
            >
              <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-gold border-4 border-secondary-bg -translate-x-[11px] md:-translate-x-1/2 mt-1 md:mt-0 z-10" />
                {index !== steps.length - 1 && (
                  <div className="absolute left-0 md:left-1/2 w-px h-full bg-gold/30 -translate-x-[2px] md:-translate-x-1/2 top-6 md:top-3 z-0" />
                )}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <h3 className="text-2xl font-serif text-primary-text mb-3">
                    <span className="text-gold mr-3">0{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-secondary-text font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    { title: 'Experienced Designers', text: 'Award-winning professionals dedicated to creating exceptional spaces.' },
    { title: 'Luxury Materials', text: 'Exclusive access to premium finishes, fabrics, and bespoke furniture.' },
    { title: 'Custom Solutions', text: 'Tailored designs that perfectly reflect your unique personality.' },
    { title: 'On-Time Delivery', text: 'Meticulous project management ensuring timelines are strictly met.' },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-primary-text mb-6">Why Choose Us</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <AnimatedSection key={i} delay={i * 0.1} className="bg-secondary-bg p-8 hover:shadow-xl transition-shadow duration-300">
              <CheckCircle2 size={32} className="text-gold mb-6" />
              <h3 className="text-xl font-serif text-primary-text mb-4">{reason.title}</h3>
              <p className="text-secondary-text font-light text-sm leading-relaxed">{reason.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <PageTransition>
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}</style>
      <Hero />
      
      {/* Featured Projects placeholder */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
           <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-serif text-primary-text mb-6">Featured Projects</h2>
              <div className="w-24 h-1 bg-gold mx-auto mb-12" />
              <p className="text-secondary-text mb-12">Loading beautiful projects...</p>
              <Link to="/portfolio" className="inline-flex items-center space-x-2 text-gold hover:text-primary-text transition-colors uppercase tracking-widest text-sm font-medium">
                <span>View All Projects</span>
                <ArrowRight size={16} />
              </Link>
           </AnimatedSection>
        </div>
      </section>

      <ProcessTimeline />
      <WhyChooseUs />
    </PageTransition>
  );
}