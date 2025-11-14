import { Brain, X, Sparkles, Send } from 'lucide-react';
import { useState } from 'react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages] = useState([
    {
      type: 'assistant',
      content: "Hi! I'm your NeuroBalance AI assistant. I can help you understand your Mental Footprint Index and how our platform works."
    },
    {
      type: 'assistant',
      content: "Your current MFI of 62 indicates moderate stress levels. This is calculated using advanced neural networks analyzing your biometric data, activity patterns, and environmental factors."
    }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-gray-200 dark:border-gray-700 animate-scale-in">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm animate-float">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">NeuroBalance AI Assistant</h2>
              <p className="text-teal-100 text-sm">Powered by AWS Neural Networks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:rotate-90 relative z-10"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex gap-3 animate-slide-in-up ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {message.type === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white animate-pulse-slow" />
                </div>
              )}
              <div
                className={`flex-1 p-4 rounded-2xl transition-all duration-300 hover:shadow-md ${
                  message.type === 'assistant'
                    ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white ml-10'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 p-6 rounded-2xl border border-teal-200 dark:border-teal-800 hover:shadow-lg transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Understanding Your MFI
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {[
                { range: '0-30:', description: 'Low stress - Optimal mental wellness' },
                { range: '31-60:', description: 'Moderate stress - Room for improvement' },
                { range: '61-80:', description: 'High stress - Action recommended' },
                { range: '81-100:', description: 'Critical stress - Immediate support needed' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 group-hover:scale-150 transition-transform duration-300" />
                  <span>
                    <strong>{item.range}</strong> {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-cyan-600" />
              How Stress Offset Tokens Work
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Every wellness activity you complete generates SOT tokens based on its positive impact on your mental health:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {[
                'Track activities through the dashboard',
                'AI verifies and calculates token rewards',
                'Tokens are minted on Aptos blockchain',
                'Trade or use tokens in the marketplace'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform duration-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about NeuroBalance..."
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white transition-all duration-300 placeholder:text-gray-400"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10">Send</span>
              <Send className="w-4 h-4 relative z-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
