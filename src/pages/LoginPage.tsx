import { Brain, Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface LoginProps {
  onAuthenticated?: () => void
}

export default function LoginPage({ onAuthenticated }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useMagicLink, setUseMagicLink] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (isSignup) {
      if (step < 3) {
        setStep(step + 1);
        return;
      }
    } else {
      try {
        setLoading(true);
        if (useMagicLink) {
          const actionCodeSettings = {
            url: window.location.origin,
            handleCodeInApp: true
          } as { url: string; handleCodeInApp: boolean }
          await sendSignInLinkToEmail(auth, formData.email, actionCodeSettings)
          localStorage.setItem('nb_magic_email', formData.email)
        } else {
          await signInWithEmailAndPassword(auth, formData.email, formData.password);
        }
        onAuthenticated?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to sign in');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAcceptAndCreateAccount = async () => {
    if (!isSignup) return;
    setError(null);
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please complete all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: serverTimestamp()
      }, { merge: true });
      onAuthenticated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName || '',
        email: result.user.email || '',
        createdAt: serverTimestamp()
      }, { merge: true });
      onAuthenticated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebook = async () => {
    setError(null);
    try {
      setLoading(true);
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName || '',
        email: result.user.email || '',
        createdAt: serverTimestamp()
      }, { merge: true });
      onAuthenticated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Facebook sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-950 dark:to-gray-900 pt-20 pb-12 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                NeuroBalance
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isSignup ? 'Join the Wellness Revolution' : 'Welcome Back'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {isSignup
                ? 'Start measuring your mental footprint and earn tokens for wellness activities.'
                : 'Sign in to access your dashboard and track your mental health journey.'
              }
            </p>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Why NeuroBalance?</h3>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span>AI-powered Mental Footprint Index tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span>Earn tradeable tokens for wellness activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span>Privacy-first with blockchain security</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span>Participate in community governance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
            {isSignup && (
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      step >= s ? 'bg-teal-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        step > s ? 'bg-teal-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {isSignup
                ? step === 1 ? 'Create Account' : step === 2 ? 'Consent & Terms' : 'Your First MFI'
                : 'Sign In'
              }
            </h2>
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200">
                {error}
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                {isSignup && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? (isSignup ? 'Processing...' : useMagicLink ? 'Sending Link...' : 'Signing In...') : (isSignup ? 'Continue' : useMagicLink ? 'Send Magic Link' : 'Sign In')}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleGoogle}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all disabled:opacity-60"
                    disabled={loading}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={handleFacebook}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                  >
                    Facebook
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 max-h-64 overflow-y-auto">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Data Consent Agreement</h3>
                  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <p>By continuing, you agree to:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                        <span>Allow NeuroBalance to collect and analyze wellness data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                        <span>Store encrypted MFI scores on Aptos blockchain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                        <span>Participate in the SOT token economy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                        <span>Maintain full ownership and control of your data</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" required />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" required />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      I consent to on-chain storage of my encrypted wellness data
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleAcceptAndCreateAccount}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all disabled:opacity-60"
                    disabled={loading}
                  >
                    Accept & Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="none" className="text-gray-200 dark:text-gray-700" />
                    <circle cx="96" cy="96" r="80" stroke="url(#gradient)" strokeWidth="12" fill="none" strokeDasharray="314 502.4" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white">62</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Baseline MFI</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Mental Footprint Index</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your baseline MFI has been calculated. This will improve as you engage in wellness activities.
                  </p>
                </div>

                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                >
                  Go to Dashboard
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setStep(1);
                  }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
                {!isSignup && (
                  <div className="mt-3">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <input type="checkbox" checked={useMagicLink} onChange={(e) => setUseMagicLink(e.target.checked)} />
                      Sign in with magic link
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
