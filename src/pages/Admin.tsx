import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, LogOut, MessageSquare, FolderGit2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchData();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    const { data: pData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (pData) setProjects(pData);
    
    const { data: mData } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (mData) setMessages(mData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  if (!session) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-secondary-bg pt-20">
          <div className="bg-white p-10 shadow-2xl max-w-md w-full">
            <h1 className="text-3xl font-serif text-center mb-8 text-primary-text">Admin Login</h1>
            {authError && <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm text-center">{authError}</div>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm uppercase tracking-widest text-secondary-text mb-2">Password</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold" />
              </div>
              <button type="submit" className="w-full bg-primary-text text-white py-4 uppercase tracking-widest text-sm hover:bg-gold transition-colors">
                Log In
              </button>
            </form>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-24">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md flex flex-col h-auto md:min-h-[calc(100vh-6rem)]">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-serif text-primary-text">Dashboard</h2>
          </div>
          <nav className="flex-grow flex flex-col p-4 space-y-2">
            <button onClick={() => setActiveTab('projects')} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-gold/10 text-gold' : 'text-gray-600 hover:bg-gray-50'}`}>
              <FolderGit2 size={20} />
              <span className="font-medium">Projects</span>
            </button>
            <button onClick={() => setActiveTab('messages')} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-gold/10 text-gold' : 'text-gray-600 hover:bg-gray-50'}`}>
              <MessageSquare size={20} />
              <span className="font-medium">Inquiries</span>
            </button>
          </nav>
          <div className="p-4 border-t border-gray-100">
            <button onClick={handleLogout} className="flex items-center space-x-3 p-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Log out</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif text-primary-text">Manage Projects</h3>
                  <button className="bg-primary-text text-white px-4 py-2 text-sm uppercase tracking-widest hover:bg-gold transition-colors rounded">Add Project</button>
                </div>
                {projects.length === 0 ? (
                  <p className="text-gray-500">No projects found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                          <th className="py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                          <th className="py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                          <th className="py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map(p => (
                          <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{p.title}</td>
                            <td className="py-3 px-4 text-gray-600">{p.category}</td>
                            <td className="py-3 px-4 text-gray-500 text-sm">{new Date(p.created_at).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-gold hover:text-primary-text cursor-pointer">Edit</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h3 className="text-2xl font-serif text-primary-text mb-6">Contact Inquiries</h3>
                {messages.length === 0 ? (
                  <p className="text-gray-500">No inquiries yet.</p>
                ) : (
                  <div className="space-y-6">
                    {messages.map(m => (
                      <div key={m.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-serif text-lg text-primary-text">{m.name}</h4>
                            <p className="text-sm text-gray-500">{m.email} • {m.phone}</p>
                          </div>
                          <span className="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full uppercase tracking-wider font-medium">{m.project_type}</span>
                        </div>
                        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{m.message}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Budget: {m.budget || 'Not specified'}</span>
                          <span className="text-gray-400">{new Date(m.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
}