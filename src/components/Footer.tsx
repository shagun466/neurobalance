import { Brain } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">NeuroBalance</span>
            </div>
            <p className="text-sm text-gray-400">
              The world's first decentralized Mental Carbon Credit System.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Dashboard', 'Marketplace', 'DAO'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Built With</h4>
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1 bg-gray-800 rounded-lg text-xs font-medium">AWS</div>
              <div className="px-3 py-1 bg-gray-800 rounded-lg text-xs font-medium">Aptos</div>
              <div className="px-3 py-1 bg-gray-800 rounded-lg text-xs font-medium">Ethereum</div>
              <div className="px-3 py-1 bg-gray-800 rounded-lg text-xs font-medium">Devfolio</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 NeuroBalance. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
