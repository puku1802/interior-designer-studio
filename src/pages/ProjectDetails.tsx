import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/layout/AnimatedSection';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowLeft } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  cover_image: string;
  gallery_images: string[];
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      navigate('/portfolio');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  if (!project) return null;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end pb-20">
        {project.cover_image && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.cover_image})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-white">
          <Link to="/portfolio" className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-6 uppercase tracking-widest text-sm">
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">{project.title}</h1>
            <div className="flex items-center space-x-6 text-sm uppercase tracking-widest font-light">
              <span>{project.category}</span>
              <span className="w-1 h-1 bg-gold rounded-full" />
              <span>{project.location}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-serif text-primary-text mb-6">About the Project</h2>
              <div className="w-16 h-1 bg-gold mb-8" />
              <div className="text-secondary-text font-light leading-relaxed whitespace-pre-wrap text-lg">
                {project.description || 'No description provided.'}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery_images && project.gallery_images.length > 0 && (
        <section className="pb-32 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery_images.map((img, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <img 
                    src={img} 
                    alt={`${project.title} gallery ${i + 1}`} 
                    className="w-full h-[600px] object-cover"
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}