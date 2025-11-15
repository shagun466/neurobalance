import { Brain, Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loggedIn = !!user;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'dao', label: 'DAO' },
    { id: 'docs', label: 'Docs' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 group relative z-10"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 group-hover:shadow-xl group-hover:shadow-teal-500/50 transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Brain className="w-6 h-6 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent transition-all duration-300">
              NeuroBalance
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                {currentPage === item.id && (
                  <div className="absolute inset-0 bg-teal-50 dark:bg-teal-950 rounded-lg animate-scale-in" />
                )}
                <div className={`absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  currentPage === item.id ? 'hidden' : ''
                }`} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 group relative overflow-hidden"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-180" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>
            {loggedIn ? (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300"
                >
                  {(user?.photoURL) ? (
                    <img src={user.photoURL} alt="profile" className="w-6 h-6 rounded-full" />
                  ) : (
                    <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">
                      {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3">
                  <div className="flex flex-col gap-2 mt-1">
                    <button
                      onClick={() => {
                        onNavigate('dashboard')
                        setUserMenuOpen(false)
                      }}
                      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('dashboard')
                        setUserMenuOpen(false)
                      }}
                      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Preferences
                    </button>
                    <button
                      onClick={async () => {
                        await signOut(auth)
                        setUserMenuOpen(false)
                        onNavigate('home')
                      }}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
                    >
                      Log Out
                    </button>
                  </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative z-10">Sign In</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="px-6 pb-6 space-y-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                currentPage === item.id
                  ? 'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: mobileMenuOpen ? 'slideInLeft 0.3s ease-out' : 'none'
              }}
            >
              {item.label}
            </button>
          ))}
          {loggedIn ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('dashboard')
                  setMobileMenuOpen(false)
                }}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300"
              >
                Profile
              </button>
              <button
                onClick={async () => {
                  await signOut(auth);
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onNavigate('login');
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
