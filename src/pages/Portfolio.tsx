import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/layout/AnimatedSection';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  cover_image: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Commercial'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, category, cover_image')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <PageTransition>
      <section className="pt-40 pb-20 bg-secondary-bg">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif text-primary-text mb-6">Our Portfolio</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-12" />
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-colors ${
                    filter === cat 
                      ? 'bg-gold text-white' 
                      : 'bg-white text-primary-text hover:bg-gold/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
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
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-secondary-text py-20">
              <p className="text-xl">No projects found in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.1}>
                  <Link to={`/portfolio/${project.id}`} className="group block cursor-pointer">
                    <div className="relative overflow-hidden aspect-[4/5] mb-4">
                      {project.cover_image ? (
                        <img 
                          src={project.cover_image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary-bg flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="text-white uppercase tracking-widest text-sm border border-white px-6 py-3">View Project</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif text-primary-text mb-1 group-hover:text-gold transition-colors">{project.title}</h3>
                    <p className="text-sm uppercase tracking-widest text-secondary-text">{project.category}</p>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}