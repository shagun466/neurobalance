import { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MarketplacePage from './pages/MarketplacePage';
import DAOPage from './pages/DAOPage';
import DocsPage from './pages/DocsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/AuthContext';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from './lib/firebase'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { user } = useAuth();
  

  useEffect(() => {
    if (currentPage === 'dashboard' && !user) {
      setCurrentPage('login');
    }
  }, [currentPage, user]);

  

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const stored = localStorage.getItem('nb_magic_email') || ''
      const email = stored || ''
      if (email) {
        signInWithEmailLink(auth, email, window.location.href).then(() => {
          localStorage.removeItem('nb_magic_email')
          setCurrentPage('dashboard')
        }).catch(() => {})
      }
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return user ? <DashboardPage /> : <LoginPage onAuthenticated={() => setCurrentPage('dashboard')} />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'dao':
        return <DAOPage />;
      case 'docs':
        return <DocsPage />;
      case 'about':
        return <AboutPage />;
      case 'login':
        return <LoginPage onAuthenticated={() => { setCurrentPage('dashboard'); }} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />

      <button
        onClick={() => setShowAIAssistant(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-full shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-110 z-40"
        aria-label="Open AI Assistant"
      >
        <Brain className="w-6 h-6" />
      </button>

      <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />
      
    </div>
  );
}

export default App;
