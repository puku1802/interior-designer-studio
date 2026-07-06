import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/layout/AnimatedSection';

export default function About() {
  const stats = [
    { number: '250+', label: 'Projects Completed' },
    { number: '150+', label: 'Happy Clients' },
    { number: '12', label: 'Years Experience' },
    { number: '15', label: 'Design Awards' },
  ];

  return (
    <PageTransition>
      {/* Header */}
      <section className="pt-40 pb-20 bg-secondary-bg">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif text-primary-text mb-6">About Studio Élan</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-8" />
            <p className="text-secondary-text max-w-2xl mx-auto font-light text-lg">
              We are a collective of passionate designers dedicated to creating extraordinary spaces that inspire and elevate everyday living.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <AnimatedSection direction="right" className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80" 
                alt="Studio interior" 
                className="w-full h-auto object-cover rounded-sm shadow-2xl"
              />
            </AnimatedSection>
            <AnimatedSection direction="left" className="md:w-1/2">
              <h2 className="text-3xl font-serif text-primary-text mb-6">Our Story</h2>
              <p className="text-secondary-text font-light mb-6 leading-relaxed">
                Founded in 2012, Studio Élan emerged from a shared vision to redefine luxury interior design. We believe that true luxury lies not just in opulence, but in the perfect balance of aesthetics, comfort, and personalization.
              </p>
              <p className="text-secondary-text font-light leading-relaxed">
                Over the past decade, we have transformed countless residences and commercial spaces into timeless environments. Our approach is deeply collaborative, ensuring that every project reflects the unique personality and aspirations of our clients.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-primary-text text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-4xl md:text-5xl font-serif text-gold mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-widest text-gray-400 font-medium">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}