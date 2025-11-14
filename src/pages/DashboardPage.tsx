import { Brain, Activity, TrendingUp, Sparkles, Calendar, Heart, Zap, Award, Target, Clock, Wallet, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('week');
  const [walletConnected, setWalletConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const weeklyData = [
    { day: 'Mon', stress: 45, recovery: 65, mfi: 55 },
    { day: 'Tue', stress: 62, recovery: 48, mfi: 62 },
    { day: 'Wed', stress: 58, recovery: 52, mfi: 59 },
    { day: 'Thu', stress: 72, recovery: 38, mfi: 68 },
    { day: 'Fri', stress: 65, recovery: 45, mfi: 64 },
    { day: 'Sat', stress: 48, recovery: 72, mfi: 52 },
    { day: 'Sun', stress: 42, recovery: 78, mfi: 48 }
  ];

  const activities = [
    { name: 'Meditation Session', time: '30 min', sot: '+2.5', icon: Brain, color: 'teal' },
    { name: 'Evening Walk', time: '45 min', sot: '+1.8', icon: Activity, color: 'cyan' },
    { name: 'Therapy Session', time: '60 min', sot: '+4.2', icon: Heart, color: 'blue' },
    { name: 'Yoga Practice', time: '40 min', sot: '+2.1', icon: Zap, color: 'teal' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Your Mental Health Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your mental footprint and wellness progress in real-time.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Brain, label: 'Mental Footprint Index', value: '62', subtext: 'Moderate', change: '-8% from last week', positive: true, gradient: 'from-teal-500 to-cyan-600' },
            { icon: Sparkles, label: 'SOT Balance', value: '12.4', subtext: 'tokens', change: '≈ 0.0034 ETH', positive: true, gradient: 'from-cyan-500 to-blue-600' },
            { icon: Award, label: 'Wellness Streak', value: '7', subtext: 'days', change: 'Personal record!', positive: true, gradient: 'from-orange-500 to-red-600' }
          ].map((card, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300 hover:scale-105 group ${
                mounted ? 'animate-slide-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{card.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{card.value}</span>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{card.subtext}</span>
                  </div>
                </div>
                <div className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl group-hover:shadow-lg group-hover:shadow-teal-500/50 transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <card.icon className="w-6 h-6 text-white relative z-10" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {card.positive && <TrendingUp className="w-4 h-4 text-green-600" />}
                <span className="text-green-600 dark:text-green-400 font-medium">{card.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${
            mounted ? 'animate-slide-in-left' : 'opacity-0'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mental Footprint Index</h2>
              <div className="flex gap-2">
                {['week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                      timeRange === range
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/50'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-56 h-56 mx-auto mb-6">
              <svg className="transform -rotate-90 w-56 h-56">
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="90"
                  stroke="url(#gradient)"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${(62 / 100) * 565.5} 565.5`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    strokeDasharray: mounted ? `${(62 / 100) * 565.5} 565.5` : '0 565.5'
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-6xl font-bold text-gray-900 dark:text-white">62</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Moderate Stress</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              {[
                { label: 'Low', value: 45, color: 'green' },
                { label: 'Current', value: 62, color: 'orange' },
                { label: 'Peak', value: 78, color: 'red' }
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${
            mounted ? 'animate-slide-in-right' : 'opacity-0'
          }`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Stress vs Recovery Trends</h2>

            <div className="h-64 flex items-end justify-between gap-3 mb-6">
              {weeklyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative" style={{ height: '200px' }}>
                    <div
                      className="absolute bottom-0 w-1/2 left-0 bg-gradient-to-t from-red-500 to-orange-500 rounded-t-lg transition-all duration-700 hover:shadow-lg hover:shadow-red-500/50"
                      style={{
                        height: mounted ? `${(data.stress / 100) * 200}px` : '0px',
                        transitionDelay: `${i * 100}ms`
                      }}
                      title={`Stress: ${data.stress}`}
                    />
                    <div
                      className="absolute bottom-0 w-1/2 right-0 bg-gradient-to-t from-teal-500 to-cyan-500 rounded-t-lg transition-all duration-700 hover:shadow-lg hover:shadow-teal-500/50"
                      style={{
                        height: mounted ? `${(data.recovery / 100) * 200}px` : '0px',
                        transitionDelay: `${i * 100 + 50}ms`
                      }}
                      title={`Recovery: ${data.recovery}`}
                    />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{data.day}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Stress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 animate-pulse" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Recovery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${
            mounted ? 'animate-slide-in-up' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md hover:scale-102 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 rounded-lg group-hover:shadow-lg group-hover:shadow-${activity.color}-500/50 transition-all duration-300`}>
                      <activity.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{activity.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{activity.sot}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">SOT</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10">Log New Activity</span>
            </button>
          </div>

          <div className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${
            mounted ? 'animate-slide-in-up' : 'opacity-0'
          }`} style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wellness Goals</h2>
              <Target className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              {[
                { goal: 'Daily Meditation', current: 21, target: 30, unit: 'days' },
                { goal: 'Weekly Exercise', current: 4, target: 5, unit: 'sessions' },
                { goal: 'Sleep Quality', current: 7.5, target: 8, unit: 'hours' },
                { goal: 'Social Connection', current: 8, target: 10, unit: 'interactions' }
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.goal}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.current} / {item.target} {item.unit}
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                      style={{
                        width: mounted ? `${(item.current / item.target) * 100}%` : '0%',
                        transitionDelay: `${i * 150}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300 hover:scale-105">
              Manage Goals
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${
            mounted ? 'animate-scale-in' : 'opacity-0'
          }`} style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wallet Integration</h2>
              <Wallet className="w-5 h-5 text-gray-400" />
            </div>

            {!walletConnected ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center animate-float">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Connect MetaMask or Aptos wallet to view your tokens and transactions
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setWalletConnected(true)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <span className="relative z-10">Connect MetaMask</span>
                  </button>
                  <button
                    onClick={() => setWalletConnected(true)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  >
                    Connect Aptos
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Wallet Address</span>
                      <span className="text-xs font-mono text-gray-700 dark:text-gray-300">0x742d...891f</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">12.4 SOT</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">≈ 0.0034 ETH</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Recent Transactions</h3>
                  <div className="space-y-2">
                    {[
                      { type: 'Earned', amount: '+2.5 SOT', time: '2h ago', hash: '0xabc123' },
                      { type: 'Earned', amount: '+1.8 SOT', time: '1d ago', hash: '0xdef456' },
                      { type: 'Redeemed', amount: '-5.0 SOT', time: '3d ago', hash: '0xghi789' }
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-102">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${tx.type === 'Earned' ? 'bg-green-500 animate-pulse' : 'bg-orange-500 animate-pulse'}`} />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{tx.type}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{tx.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-bold ${tx.type === 'Earned' ? 'text-green-600' : 'text-orange-600'}`}>
                            {tx.amount}
                          </span>
                          <ExternalLink className="w-3 h-3 text-gray-400 cursor-pointer hover:text-teal-600 transition-colors duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-2xl text-white hover:shadow-2xl transition-all duration-300 ${
            mounted ? 'animate-scale-in' : 'opacity-0'
          }`} style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">AI Wellness Insights</h2>
              <Brain className="w-8 h-8 text-white opacity-60 animate-float" />
            </div>
            <p className="text-teal-100 mb-6">
              Based on your patterns, we recommend focusing on evening relaxation techniques to improve your MFI score.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                <h3 className="font-bold mb-2">Top 3 Stress Triggers</h3>
                <ul className="space-y-2 text-sm text-teal-50">
                  {['Thursday workload spikes', 'Poor sleep quality midweek', 'Lack of social interaction'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 animate-slide-in-left" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                <h3 className="font-bold mb-2">Suggested Recovery Actions</h3>
                <ul className="space-y-2 text-sm text-teal-50">
                  {['30min evening meditation', 'Weekend digital detox', 'Schedule social activities'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 animate-slide-in-left" style={{ animationDelay: `${i * 100 + 300}ms` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
