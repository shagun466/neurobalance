import { Heart, Target, Users, Linkedin, Mail, Award } from 'lucide-react';
import { useState } from 'react';

export default function AboutPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      expertise: 'Neuroscience & AI',
      linkedin: '#'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      expertise: 'Blockchain Architecture',
      linkedin: '#'
    },
    {
      name: 'Aisha Patel',
      role: 'Head of Product',
      expertise: 'UX & Mental Health',
      linkedin: '#'
    },
    {
      name: 'James Kim',
      role: 'Lead Engineer',
      expertise: 'Full Stack Development',
      linkedin: '#'
    }
  ];

  const partners = [
    { name: 'AWS', logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=100&fit=crop' },
    { name: 'Aptos', logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=100&fit=crop' },
    { name: 'Ethereum', logo: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=200&h=100&fit=crop' },
    { name: 'Devfolio', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=100&fit=crop' }
  ];

  const milestones = [
    { year: '2024 Q1', title: 'Project Inception', description: 'Founded with vision to quantify mental health' },
    { year: '2024 Q2', title: 'AI Model Development', description: 'Built MFI calculation engine on AWS' },
    { year: '2024 Q3', title: 'Blockchain Integration', description: 'Deployed smart contracts on Aptos and Ethereum' },
    { year: '2024 Q4', title: 'Beta Launch', description: 'Public beta with 10,000+ users' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Building Emotional Sustainability for the Digital Age
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We believe mental health should be as measurable, tradeable, and valued as environmental sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create the world's first decentralized mental health measurement system that incentivizes wellness and funds global recovery programs.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A world where mental health is transparently measured, economically valued, and universally accessible through blockchain technology.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Privacy-first, data sovereignty, community governance, and transparent operations guide every decision we make.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-cyan-600 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                      <div className="text-sm font-bold text-teal-600 dark:text-teal-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-teal-600 rounded-full border-4 border-white dark:border-gray-900 flex-shrink-0 relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-all">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <div className="text-sm text-teal-600 dark:text-teal-400 mb-2">{member.role}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-4">{member.expertise}</div>
                <a
                  href={member.linkedin}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Technology Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-all">
                <img src={partner.logo} alt={partner.name} className="w-full h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-3">Get in Touch</h2>
              <p className="text-teal-50">
                Have questions or want to collaborate? We'd love to hear from you.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-teal-600 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
