import { Code, Database, Shield, Layers, ArrowRight, ExternalLink, Lock, Zap } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete system architecture and implementation details
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Architecture</h2>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">AWS AI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Neural networks analyze biometric data</p>
            </div>

            <ArrowRight className="w-8 h-8 text-teal-600 mx-auto mt-6 hidden md:block" />

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Aptos Blockchain</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Privacy-preserving data storage</p>
            </div>

            <ArrowRight className="w-8 h-8 text-teal-600 mx-auto mt-6 hidden md:block" />

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Ethereum</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">SOT token and DAO governance</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Data Flow</h3>
            <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>User data collected via wearables and app interactions</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>AWS Lambda processes data through neural network models</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>MFI score calculated and encrypted</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Data stored on Aptos with zero-knowledge proofs</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>SOT tokens minted on Ethereum for wellness activities</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                <span>DAO governance enables community decision-making</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Endpoints</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400">GET /api/mfi</code>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">Auth</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Retrieve current Mental Footprint Index</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400">POST /api/mint</code>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">Auth</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Mint SOT tokens for wellness activities</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400">POST /api/dao/vote</code>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">Auth</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submit governance vote on proposals</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400">GET /api/marketplace</code>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">Public</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fetch SOT marketplace listings</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Contracts</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white">Aptos Move Contract</h3>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-3">
                  <code className="text-xs font-mono text-gray-700 dark:text-gray-300">
                    module neurobalance::mfi_ledger
                  </code>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Store encrypted MFI scores
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Zero-knowledge proof verification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Consent management on-chain
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white">Ethereum ERC-20</h3>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-3">
                  <code className="text-xs font-mono text-gray-700 dark:text-gray-300">
                    contract StressOffsetToken (SOT)
                  </code>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Tradeable wellness tokens
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Marketplace integration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    DAO voting weight calculation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-teal-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security & Compliance</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <Lock className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Zero-Knowledge Proofs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                User data is verified without revealing personal information. ZK-SNARKs ensure privacy while maintaining data integrity.
              </p>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  Aptos-native ZK implementation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  No raw data leaves user device
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <Shield className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">GDPR Compliance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Full compliance with EU data protection regulations. Users maintain complete control over their data.
              </p>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  Right to deletion
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  Data portability
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <Zap className="w-8 h-8 text-teal-600 mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">HIPAA Strategy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Healthcare-grade security for mental health data with encrypted storage and secure transmission.
              </p>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-teal-500" />
                  Audit trail logging
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Developer Resources</h2>
          <p className="text-teal-50 mb-6">
            Build on top of NeuroBalance with our comprehensive developer tools and documentation.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:shadow-lg transition-all">
              API Documentation
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              GitHub Repository
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
