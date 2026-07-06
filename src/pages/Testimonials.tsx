import { useState, useEffect } from 'react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/layout/AnimatedSection';
import { supabase } from '../lib/supabase';
import { Loader2, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  review: string;
  rating: number;
  client_image: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.rating >= minRating &&
    (t.client_name.toLowerCase().includes(search.toLowerCase()) || 
     t.review.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageTransition>
      <section className="pt-40 pb-20 bg-secondary-bg">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif text-primary-text mb-6">Client Testimonials</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-12" />
            
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 justify-center">
              <input 
                type="text" 
                placeholder="Search reviews..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-6 py-3 border border-gray-200 focus:outline-none focus:border-gold w-full md:w-2/3"
              />
              <select 
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="px-6 py-3 border border-gray-200 focus:outline-none focus:border-gold w-full md:w-1/3 bg-white"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4+ Stars</option>
              </select>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-white min-h-[50vh]">
        <div className="container mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-gold" size={48} />
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="text-center text-secondary-text py-20">
              <p className="text-xl">No testimonials match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, i) => (
                <AnimatedSection key={testimonial.id} delay={i * 0.1} className="bg-secondary-bg p-8 flex flex-col h-full">
                  <div className="flex space-x-1 text-gold mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} fill={idx < testimonial.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="text-secondary-text font-light leading-relaxed mb-8 flex-grow italic">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center space-x-4 mt-auto">
                    {testimonial.client_image ? (
                      <img src={testimonial.client_image} alt={testimonial.client_name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-serif text-xl">
                        {testimonial.client_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif text-primary-text">{testimonial.client_name}</h4>
                      <p className="text-xs uppercase tracking-widest text-gray-400">Client</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}