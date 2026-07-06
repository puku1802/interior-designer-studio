import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/layout/AnimatedSection';
import { Home, Briefcase, Building2, Sofa, Eye, Hammer } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Home size={40} className="text-gold mb-6" />,
      title: 'Residential Design',
      desc: 'Creating luxurious, comfortable, and personalized homes that reflect your lifestyle.'
    },
    {
      icon: <Briefcase size={40} className="text-gold mb-6" />,
      title: 'Commercial Design',
      desc: 'Designing inspiring workspaces, retail stores, and hospitality venues that elevate your brand.'
    },
    {
      icon: <Building2 size={40} className="text-gold mb-6" />,
      title: 'Office Spaces',
      desc: 'Optimizing productivity and employee well-being through modern, ergonomic office environments.'
    },
    {
      icon: <Sofa size={40} className="text-gold mb-6" />,
      title: 'Furniture Selection',
      desc: 'Curating bespoke furniture and decor pieces to perfectly complement your space.'
    },
    {
      icon: <Eye size={40} className="text-gold mb-6" />,
      title: '3D Visualization',
      desc: 'Providing photorealistic 3D renderings to help you visualize the final result before execution.'
    },
    {
      icon: <Hammer size={40} className="text-gold mb-6" />,
      title: 'Renovation',
      desc: 'Managing full-scale renovations from concept to completion with meticulous attention to detail.'
    }
  ];

  return (
    <PageTransition>
      <section className="pt-40 pb-20 bg-secondary-bg">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif text-primary-text mb-6">Our Services</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-8" />
            <p className="text-secondary-text max-w-2xl mx-auto font-light text-lg">
              Comprehensive interior design solutions tailored to your unique needs and aspirations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <AnimatedSection 
                key={i} 
                delay={i * 0.1} 
                className="bg-secondary-bg p-10 hover:-translate-y-2 transition-transform duration-300 border border-transparent hover:border-gold/30"
              >
                {service.icon}
                <h3 className="text-2xl font-serif text-primary-text mb-4">{service.title}</h3>
                <p className="text-secondary-text font-light leading-relaxed">{service.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}