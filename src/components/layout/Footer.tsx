import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-text text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="text-3xl font-serif font-bold mb-6 block text-gold">
              Studio Élan
            </Link>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              Transforming interiors into timeless experiences through creativity, functionality, and luxury. Elevating your living spaces.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors text-xs font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors text-xs font-bold">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors text-xs font-bold">
                LI
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-serif mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-gold transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-gold shrink-0 mt-1" />
                <span>123 Luxury Avenue, Design District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-gold shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-gold shrink-0" />
                <span>hello@studioelan.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4 font-light">
              Subscribe to our newsletter for the latest design trends and inspiration.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-gold text-white px-4 py-3 rounded-none uppercase tracking-wider text-sm font-medium hover:bg-gold-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Studio Élan. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
