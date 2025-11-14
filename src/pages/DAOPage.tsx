import { Vote, CheckCircle, Clock, Users, Coins, TrendingUp, MessageSquare, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function DAOPage() {
  const [filter, setFilter] = useState('all');

  const proposals = [
    {
      id: 'NB-001',
      title: 'Fund 100 Therapy Hours for University Students',
      description: 'Allocate 5,000 SOT to provide free mental health support and counseling services for students at 10 major universities across the US.',
      author: '0x742d...891f',
      created: '2 days ago',
      votesFor: 847,
      votesAgainst: 123,
      totalVotes: 970,
      quorum: 1000,
      status: 'active',
      category: 'Funding',
      amount: '5,000 SOT',
      duration: '5 days remaining'
    },
    {
      id: 'NB-002',
      title: 'Launch Rural Mental Wellness Centers',
      description: 'Deploy 10 community mental health facilities in underserved rural areas, providing accessible therapy, counseling, and wellness programs.',
      author: '0x8a3c...234b',
      created: '4 days ago',
      votesFor: 1203,
      votesAgainst: 87,
      totalVotes: 1290,
      quorum: 1000,
      status: 'passing',
      category: 'Infrastructure',
      amount: '15,000 SOT',
      duration: '3 days remaining'
    },
    {
      id: 'NB-003',
      title: 'Research Grant: AI-Powered Stress Detection',
      description: 'Fund Stanford University research on next-generation biometric stress monitoring using advanced neural networks and wearable technology.',
      author: '0x1f9d...567e',
      created: '1 week ago',
      votesFor: 654,
      votesAgainst: 234,
      totalVotes: 888,
      quorum: 1000,
      status: 'active',
      category: 'Research',
      amount: '8,000 SOT',
      duration: '2 days remaining'
    },
    {
      id: 'NB-004',
      title: 'Partner with Global Therapy Networks',
      description: 'Establish partnerships with international mental health organizations to expand SOT token utility and global wellness program reach.',
      author: '0x5c2a...789c',
      created: '3 days ago',
      votesFor: 1456,
      votesAgainst: 432,
      totalVotes: 1888,
      quorum: 1000,
      status: 'passing',
      category: 'Partnership',
      amount: '10,000 SOT',
      duration: '4 days remaining'
    },
    {
      id: 'NB-005',
      title: 'Expand MFI Algorithm with Sleep Data',
      description: 'Enhance the Mental Footprint Index calculation by integrating sleep quality metrics and circadian rhythm analysis.',
      author: '0x9b4f...123d',
      created: '5 days ago',
      votesFor: 892,
      votesAgainst: 456,
      totalVotes: 1348,
      quorum: 1000,
      status: 'active',
      category: 'Technical',
      amount: '3,500 SOT',
      duration: '1 day remaining'
    },
    {
      id: 'NB-006',
      title: 'Emergency Mental Health Crisis Fund',
      description: 'Create a rapid-response fund to provide immediate mental health support during natural disasters and community crises.',
      author: '0x3d7e...456f',
      created: '6 days ago',
      votesFor: 2341,
      votesAgainst: 234,
      totalVotes: 2575,
      quorum: 1000,
      status: 'passing',
      category: 'Emergency',
      amount: '20,000 SOT',
      duration: '12 hours remaining'
    }
  ];

  const stats = [
    { label: 'Total Proposals', value: '47', icon: Vote },
    { label: 'Active Voters', value: '3,245', icon: Users },
    { label: 'Treasury Balance', value: '125K SOT', icon: Coins },
    { label: 'Funds Deployed', value: '89K SOT', icon: TrendingUp }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'passing': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'failed': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Cognitive Impact DAO
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Community-governed allocation of resources for global mental health initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2">
              {['all', 'active', 'passing', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filter === status
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all">
              Create Proposal
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{proposal.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                      {proposal.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{proposal.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{proposal.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>By {proposal.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{proposal.created}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      <span className="font-semibold text-teal-600 dark:text-teal-400">{proposal.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    For: {proposal.votesFor.toLocaleString()} ({Math.round((proposal.votesFor / proposal.totalVotes) * 100)}%)
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} quorum
                  </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                    style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Against: {proposal.votesAgainst.toLocaleString()} ({Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)}%)
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {proposal.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Vote For
                </button>
                <button className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
                  Vote Against
                </button>
                <button className="px-6 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-teal-500 dark:hover:border-teal-500 transition-all flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Discuss
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 p-8 rounded-2xl text-white">
            <Vote className="w-12 h-12 mb-4" />
            <h2 className="text-2xl font-bold mb-3">How DAO Voting Works</h2>
            <ul className="space-y-3 text-teal-50">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <span>Hold SOT tokens to gain voting power in the DAO</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <span>Review proposals and their impact on mental health initiatives</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <span>Cast your vote and participate in community discussions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                <span>Approved proposals are executed on-chain transparently</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Proposal NB-006 reached quorum', time: '2 hours ago', type: 'success' },
                { action: 'New proposal submitted by 0x742d...891f', time: '5 hours ago', type: 'info' },
                { action: 'Proposal NB-002 passed with 93% approval', time: '1 day ago', type: 'success' },
                { action: '500 SOT deployed to Rural Wellness Program', time: '2 days ago', type: 'success' },
                { action: 'Proposal NB-001 entered final voting period', time: '3 days ago', type: 'warning' }
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{activity.time}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
