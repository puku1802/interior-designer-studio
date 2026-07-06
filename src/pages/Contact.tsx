import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import AnimatedSection from '../components/layout/AnimatedSection';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: 'Residential',
    budget: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) throw submitError;
      
      setSuccess(true);
      setFormData({
        name: '', email: '', phone: '', project_type: 'Residential', budget: '', message: ''
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="pt-40 pb-20 bg-secondary-bg">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif text-primary-text mb-6">Let's Talk</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-8" />
            <p className="text-secondary-text max-w-2xl mx-auto font-light text-lg">
              Ready to transform your space? Contact us to schedule a consultation and begin your design journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <AnimatedSection direction="right" className="lg:w-1/2">
              <h2 className="text-3xl font-serif text-primary-text mb-8">Send us a Message</h2>
              
              {success ? (
                <div className="bg-green-50 text-green-800 p-8 flex flex-col items-center justify-center text-center space-y-4 border border-green-200">
                  <CheckCircle2 size={48} className="text-green-500" />
                  <h3 className="text-2xl font-serif">Message Sent!</h3>
                  <p className="font-light">Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-medium uppercase tracking-widest text-green-700 hover:text-green-900">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <div className="bg-red-50 text-red-600 p-4 text-sm">{error}</div>}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Name</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold bg-transparent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold bg-transparent transition-colors" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold bg-transparent transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Project Type</label>
                      <select name="project_type" value={formData.project_type} onChange={handleChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold bg-transparent transition-colors cursor-pointer appearance-none">
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Office</option>
                        <option>Hospitality</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Estimated Budget</label>
                    <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. $50,000" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold bg-transparent transition-colors" />
                  </div>
                  
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Message</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold bg-transparent transition-colors resize-none"></textarea>
                  </div>
                  
                  <button type="submit" disabled={loading} className="bg-primary-text text-white px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-gold transition-colors flex items-center justify-center w-full md:w-auto min-w-[200px]">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </AnimatedSection>
            
            <AnimatedSection direction="left" className="lg:w-1/2">
              <div className="bg-secondary-bg p-12 h-full">
                <h2 className="text-3xl font-serif text-primary-text mb-8">Visit Our Studio</h2>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Address</h4>
                    <p className="text-lg text-primary-text font-light">123 Luxury Avenue,<br/>Design District, NY 10001</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Contact</h4>
                    <p className="text-lg text-primary-text font-light">+1 (555) 123-4567<br/>hello@studioelan.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Business Hours</h4>
                    <p className="text-lg text-primary-text font-light">Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: By Appointment Only<br/>Sunday: Closed</p>
                  </div>
                </div>
                
                {/* Mock Map Placeholder */}
                <div className="mt-12 w-full h-64 bg-gray-200 relative overflow-hidden group cursor-pointer">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <span className="bg-white/90 px-6 py-2 text-sm uppercase tracking-widest font-medium text-primary-text backdrop-blur-sm shadow-lg">Get Directions</span>
                   </div>
                </div>
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>
    </PageTransition>
  );
}