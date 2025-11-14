import { Brain, TrendingDown, AlertCircle, Shield, Sparkles, Network, Scale, Activity, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-950 dark:to-gray-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.2), transparent 50%)`
            }}
          />
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-teal-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="inline-block mb-6 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-teal-200 dark:border-teal-800">
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
              World's First Mental Carbon Credit System
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-teal-800 to-cyan-800 dark:from-white dark:via-teal-200 dark:to-cyan-200 bg-clip-text text-transparent">
              Measure. Heal. Offset.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The world's first decentralized Mental Carbon Credit System — built on AWS, Aptos, and Ethereum.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all flex items-center justify-center gap-2"
            >
              How It Works
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '2.4M', label: 'SOT Tokens' },
              { value: '150+', label: 'Partners' }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              The Mental Health Crisis We Don't Measure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Traditional systems fail to quantify and address the invisible burden of stress and burnout.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertCircle,
                title: 'Unquantified Stress',
                description: 'No standardized system to measure mental health impact across organizations and individuals.',
                color: 'from-red-500 to-orange-500'
              },
              {
                icon: TrendingDown,
                title: 'Invisible Burnout',
                description: 'Mental exhaustion goes untracked, leading to preventable crises and reduced productivity.',
                color: 'from-orange-500 to-yellow-500'
              },
              {
                icon: Shield,
                title: 'Unincentivized Recovery',
                description: 'No economic model rewards wellness investment or stress reduction initiatives.',
                color: 'from-yellow-500 to-teal-500'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} p-3 mb-6 group-hover:shadow-lg transition-all`}>
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-950 dark:to-teal-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              A Blockchain for Emotional Balance
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Quantify mental health, incentivize recovery, and build a global wellness economy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Mental Footprint Index',
                subtitle: 'AI on AWS',
                description: 'Advanced neural networks analyze stress biomarkers, behavioral patterns, and environmental factors to calculate your real-time Mental Footprint Index.',
                features: ['Real-time tracking', 'Biometric integration', 'Predictive analytics']
              },
              {
                icon: Sparkles,
                title: 'Stress Offset Tokens',
                subtitle: 'Aptos Smart Contracts',
                description: 'Earn tradeable SOT tokens for wellness activities. Organizations buy tokens to offset their mental health impact, funding global recovery programs.',
                features: ['Blockchain verified', 'Instant transfers', 'Global marketplace']
              },
              {
                icon: Network,
                title: 'Cognitive Impact DAO',
                subtitle: 'Ethereum Governance',
                description: 'Community-governed allocation of resources. Vote on funding therapy programs, research initiatives, and wellness infrastructure projects.',
                features: ['Democratic voting', 'Transparent funding', 'Impact tracking']
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 p-4 mb-6 group-hover:shadow-lg group-hover:shadow-teal-500/50 transition-all">
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4">{item.subtitle}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your Mental Health Dashboard
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Track, understand, and improve your mental footprint with AI-powered insights.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-800 dark:to-teal-950 rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mental Footprint Index</h3>
                    <Activity className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="relative w-48 h-48 mx-auto">
                    <svg className="transform -rotate-90 w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(62 / 100) * 502.4} 502.4`}
                        className="text-teal-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white">62</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Moderate</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stress Offset Tokens</h3>
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="text-center py-12">
                    <div className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      12.4
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400">SOT Earned</div>
                    <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-950 rounded-xl">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Current Value</div>
                      <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">0.0034 ETH</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Stress vs Recovery</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[45, 62, 58, 72, 65, 48, 42].map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gradient-to-t from-teal-500 to-cyan-500 rounded-t-lg transition-all hover:shadow-lg" style={{ height: `${value}%` }} />
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2"
                >
                  View Full Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-950 dark:to-cyan-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trade Stress Offsets — Build a Healthier World
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A global marketplace where wellness becomes tradeable value.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Organization</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">SOT Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Value (ETH)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { org: 'TechCorp Global', sot: '500', eth: '1.42', impact: 'High' },
                    { org: 'Wellness Foundation', sot: '250', eth: '0.71', impact: 'Medium' },
                    { org: 'Future Industries', sot: '750', eth: '2.13', impact: 'High' },
                    { org: 'Green Energy Co', sot: '150', eth: '0.43', impact: 'Low' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">{row.org}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{row.impact} Impact</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{row.sot} SOT</td>
                      <td className="px-6 py-4 text-teal-600 dark:text-teal-400 font-medium">{row.eth} ETH</td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all">
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all inline-flex items-center gap-2"
            >
              Explore Marketplace
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Wellness Powered by the People
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Democratic governance for global mental health initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fund 100 Therapy Hours for Students',
                description: 'Allocate 5,000 SOT to provide free mental health support for university students.',
                votesFor: 847,
                votesAgainst: 123,
                status: 'Active'
              },
              {
                title: 'Launch Rural Wellness Centers',
                description: 'Deploy 10 mental health facilities in underserved rural communities.',
                votesFor: 1203,
                votesAgainst: 87,
                status: 'Passing'
              },
              {
                title: 'Research Grant: AI Stress Detection',
                description: 'Fund Stanford research on next-gen biometric stress monitoring.',
                votesFor: 654,
                votesAgainst: 234,
                status: 'Active'
              }
            ].map((proposal, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all">
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium mb-3">
                    {proposal.status}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{proposal.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{proposal.description}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">For: {proposal.votesFor}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                        style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
                    Vote Yes
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Vote No
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('dao')}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              View All Proposals
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 dark:from-black dark:via-teal-950 dark:to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-teal-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Scale className="w-16 h-16 text-teal-400 mx-auto mb-8" />
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            "Carbon had a footprint. <br />Now, so does your mind."
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the movement to quantify, incentivize, and heal the world's mental health crisis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105">
              Join NeuroBalance Beta
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/20 hover:bg-white/20 transition-all">
              Get Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
