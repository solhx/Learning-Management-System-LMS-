import React from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Sparkles, ArrowRight } from 'lucide-react';

type Props = {}

const Footer = (props: Props) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Courses', href: '/courses' },
      { name: 'Instructors', href: '/instructors' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/policy' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Success Stories', href: '/stories' },
      { name: 'Partnerships', href: '/partners' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-600' },
    { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-gray-900 dark:hover:text-white' },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 hero_animation opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-shift"></div>

      {/* Particles */}
      <div className="particles-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-[90%] 800px:w-[85%] max-w-[1400px] m-auto">
        
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 800px:p-12 shadow-2xl">
            <div className="flex flex-col 800px:flex-row items-center justify-between gap-6">
              <div className="text-center 800px:text-left">
                <div className="flex items-center justify-center 800px:justify-start gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                  <h3 className="text-2xl 800px:text-3xl font-bold text-white font-Poppins">
                    Stay Updated
                  </h3>
                </div>
                <p className="text-blue-100 font-Poppins">
                  Subscribe to our newsletter for the latest courses and updates
                </p>
              </div>
              <div className="w-full 800px:w-auto 800px:min-w-[400px]">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 font-Poppins"
                  />
                  <button
                    type="submit"
                    className="group px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 800px:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 800px:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 group mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <span className="text-[26px] font-Poppins font-bold gradient-text">
                  Elearning
                </span>
              </Link>
              <p className="text-gray-700 dark:text-gray-300 mb-6 font-Poppins leading-relaxed">
                Empowering learners worldwide with cutting-edge courses, expert instructors, and a vibrant community. Transform your career with quality education.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a href="mailto:info@elearning.com" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-Poppins">info@elearning.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-Poppins">+1 (234) 567-890</span>
                </a>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="font-Poppins">123 Learning St, Education City</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 font-Poppins flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-Poppins inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all text-blue-600 dark:text-blue-400" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 font-Poppins flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-Poppins inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all text-blue-600 dark:text-blue-400" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 font-Poppins flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full"></div>
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-Poppins inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all text-blue-600 dark:text-blue-400" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col 800px:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <p className="text-gray-600 dark:text-gray-400 font-Poppins text-center 800px:text-left">
              © {currentYear} Elearning. All rights reserved. Made with ❤️ for learners worldwide.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center justify-center gap-6 800px:gap-12">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-Poppins font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-Poppins font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-Poppins font-medium">Certified Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;