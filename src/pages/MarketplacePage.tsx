import { Search, Filter, TrendingUp, Building2, Sparkles, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

type Listing = {
  org: string
  type: string
  sot: number
  eth: number
  impact: string
  change: string
  positive: boolean
  projects: string[]
  verified: boolean
}

export default function MarketplacePage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [baseSot] = useState(1.23)
  const [baseEth] = useState(0.0028)
  const [price, setPrice] = useState(baseSot)
  const [ethPerSot, setEthPerSot] = useState(baseEth)
  const [supply] = useState(1000000)
  const [txs] = useState<Array<{ type: 'buy'|'retire', amount: number, org: string }>>([
    { type: 'buy', amount: 2500, org: 'WellCorp' },
    { type: 'retire', amount: 1000, org: 'GreenMind' }
  ])

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((p) => Math.max(0.5, Math.min(5, Number((p + (Math.random()-0.5)*0.05).toFixed(2)))))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    async function loadLatestMfi() {
      if (!user) return
      const col = collection(db, 'users', user.uid, 'mfi_entries')
      const q = query(col, orderBy('createdAt', 'desc'), limit(1))
      const snaps = await getDocs(q)
      let latest: number | null = null
      snaps.forEach(d => {
        const data = d.data() as { score?: number }
        if (typeof data.score === 'number') latest = data.score as number
      })
      if (latest !== null) {
        const factor = Math.max(0.7, Math.min(1.3, 1 + ((latest - 50) / 400)))
        setPrice(Number((baseSot * factor).toFixed(2)))
        setEthPerSot(Number((baseEth * factor).toFixed(6)))
      }
    }
    loadLatestMfi()
  }, [user, baseSot, baseEth])

  const listings: Listing[] = [
    {
      org: 'TechCorp Global',
      type: 'Corporate',
      sot: 500,
      eth: 1.42,
      impact: 'High',
      change: '+12.5%',
      positive: true,
      projects: ['Employee Wellness Program', 'Mental Health Days'],
      verified: true
    },
    {
      org: 'Wellness Foundation',
      type: 'Non-Profit',
      sot: 250,
      eth: 0.71,
      impact: 'Medium',
      change: '+8.3%',
      positive: true,
      projects: ['Community Therapy Sessions'],
      verified: true
    },
    {
      org: 'Future Industries',
      type: 'Corporate',
      sot: 750,
      eth: 2.13,
      impact: 'High',
      change: '-3.2%',
      positive: false,
      projects: ['Stress Management Training', 'Mindfulness Program'],
      verified: true
    },
    {
      org: 'Green Energy Co',
      type: 'Corporate',
      sot: 150,
      eth: 0.43,
      impact: 'Low',
      change: '+5.7%',
      positive: true,
      projects: ['Workplace Meditation'],
      verified: false
    },
    {
      org: 'HealthTech Innovations',
      type: 'Startup',
      sot: 320,
      eth: 0.91,
      impact: 'Medium',
      change: '+18.4%',
      positive: true,
      projects: ['Mental Health App Access', 'Therapy Subsidies'],
      verified: true
    },
    {
      org: 'Global Finance Group',
      type: 'Corporate',
      sot: 880,
      eth: 2.50,
      impact: 'High',
      change: '+6.9%',
      positive: true,
      projects: ['Burnout Prevention', 'Work-Life Balance Initiative'],
      verified: true
    }
  ];

  const stats = [
    { label: 'Total Volume', value: '24,567 SOT', change: '+12.4%' },
    { label: 'Avg Price', value: '0.0028 ETH', change: '+3.2%' },
    { label: 'Active Listings', value: '1,234', change: '+8.7%' },
    { label: 'Total Traders', value: '5,678', change: '+15.1%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Stress Offset Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Trade verified wellness tokens and support global mental health initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Live SOT Price</p>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">${price}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">ETH per SOT: <span className="font-mono">{ethPerSot}</span></div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Approximate and simulated</div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total SOT Supply</p>
              <Building2 className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{supply.toLocaleString()}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Initial mint by the protocol</div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Recent Activity</p>
              <Sparkles className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="space-y-2">
              {txs.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{t.org} {t.type==='buy'?'bought':'retired'} {t.amount.toLocaleString()} SOT</span>
                  {t.type==='buy' ? (<ArrowUpRight className="w-4 h-4 text-green-600" />) : (<ArrowDownRight className="w-4 h-4 text-orange-600" />)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search organizations, projects, or token amounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'corporate', 'non-profit', 'startup'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filterType === type
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
              <button className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {listings.map((listing, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{listing.org}</h3>
                      {listing.verified && (
                        <div className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium">
                          Verified
                        </div>
                      )}
                      <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                        {listing.type}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 dark:text-white">{listing.sot} SOT</span> available
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${listing.impact === 'High' ? 'text-red-600' : listing.impact === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>
                          {listing.impact} Impact
                        </span>
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${listing.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {listing.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {listing.change}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {listing.projects.map((project, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs">
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{listing.eth}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">ETH per SOT</div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedListing(listing);
                      setShowBuyModal(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-2xl text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-3">Want to List Your Organization?</h2>
            <p className="text-teal-50 mb-6">
              Offset your organization's mental health impact by purchasing SOT tokens. Every token funds verified wellness programs and mental health initiatives worldwide.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:shadow-lg transition-all">
                List Organization
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">DAO Governance (Snapshot)</h2>
            <a href="https://snapshot.org" target="_blank" rel="noreferrer" className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium">Open Snapshot</a>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[{title:'Fund therapy programs'},{title:'Adjust token supply'},{title:'Approve wellness standards'}].map((p,i)=> (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="font-medium text-gray-900 dark:text-white">{p.title}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Simulated proposal</div>
              </div>
            ))}
          </div>
        </div>

        {showBuyModal && selectedListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buy SOT Tokens</h2>
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{selectedListing.org}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedListing.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedListing.sot} SOT</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price per SOT</div>
                      <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{selectedListing.eth} ETH</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount of SOT to Buy
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    min="1"
                    max={selectedListing.sot}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Cost</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">0.00 ETH</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">+ Gas fees</div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBuyModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all">
                    Confirm Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
