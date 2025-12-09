"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header";
import {
  Shield,
  Lock,
  FileText,
  Cookie,
  Eye,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Info,
  Scale,
  Bell,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";

type Props = {};

const Policy = (props: Props) => {
  const [activeSection, setActiveSection] = useState("privacy");

  const sections = [
    { id: "privacy", label: "Privacy Policy", icon: Lock },
    { id: "terms", label: "Terms of Service", icon: FileText },
    { id: "cookies", label: "Cookie Policy", icon: Cookie },
    { id: "refund", label: "Refund Policy", icon: RefreshCw },
    { id: "copyright", label: "Copyright Policy", icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <Header activeItem={3} open={false} setOpen={() => {}} route="" setRoute={() => {}} />

      {/* Background Elements */}
      <div className="absolute inset-0 hero_animation opacity-10"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6 shadow-lg">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Legal & Privacy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Our </span>
            <span className="gradient-text">Policies</span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We are committed to protecting your privacy and being transparent about how we handle your data.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-xl sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 px-2">
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        activeSection === section.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{section.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Questions?
                </h4>
                <div className="space-y-2">
                  <a
                    href="mailto:legal@elearning.com"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    legal@elearning.com
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl">
              {/* Privacy Policy */}
              {activeSection === "privacy" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          Privacy Policy
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last updated: December 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Information We Collect
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We collect information you provide directly to us, including:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>Account Information:</strong> Name, email address, password, and profile information
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>Payment Information:</strong> Credit card details, billing address (processed securely through Stripe)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>Usage Data:</strong> Course progress, quiz scores, and learning activities
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>Device Information:</strong> IP address, browser type, operating system
                        </span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
                      <Eye className="w-5 h-5 text-purple-600" />
                      How We Use Your Information
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We use the information we collect to:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Provide and improve our services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Process payments and prevent fraud</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Send you course updates and notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Personalize your learning experience</span>
                      </li>
                    </ul>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5" />
                        Data Security
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200">
                        We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
                      <UserCheck className="w-5 h-5 text-green-600" />
                      Your Rights
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">You have the right to:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Access and download your personal data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Correct inaccurate information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Request deletion of your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Opt-out of marketing communications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Terms of Service */}
              {activeSection === "terms" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          Terms of Service
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last updated: December 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      1. Acceptance of Terms
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      By accessing and using ELearning, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      2. User Accounts
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Maintaining the security of your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">All activities that occur under your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Notifying us immediately of any unauthorized use</span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      3. Course Access and Content
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      When you purchase a course, you receive a non-exclusive, non-transferable license to access the course content. You may not:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Share your account credentials with others</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Download, reproduce, or distribute course content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">Use the content for commercial purposes</span>
                      </li>
                    </ul>

                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-red-900 dark:text-red-100 flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5" />
                        Prohibited Activities
                      </h4>
                      <p className="text-red-800 dark:text-red-200">
                        You may not use our service to engage in illegal activities, harassment, spamming, or any activity that could harm our platform or other users.
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      4. Payment Terms
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      All payments are processed securely through Stripe. Prices are in USD and include all applicable taxes unless stated otherwise.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      5. Termination
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our discretion.
                    </p>
                  </div>
                </div>
              )}

              {/* Cookie Policy */}
              {activeSection === "cookies" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-yellow-600 flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          Cookie Policy
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last updated: December 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      What Are Cookies?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Cookies are small text files stored on your device that help us improve your experience on our platform.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      Types of Cookies We Use
                    </h3>

                    <div className="space-y-4 mt-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                          Essential Cookies
                        </h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                          Required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">
                          Analytics Cookies
                        </h4>
                        <p className="text-green-800 dark:text-green-200 text-sm">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                        <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                          Marketing Cookies
                        </h4>
                        <p className="text-purple-800 dark:text-purple-200 text-sm">
                          Used to track visitors across websites to display relevant ads.
                        </p>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                        <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">
                          Preference Cookies
                        </h4>
                        <p className="text-orange-800 dark:text-orange-200 text-sm">
                          Remember your preferences and settings for a better experience.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      Managing Cookies
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
                    </p>
                  </div>
                </div>
              )}

              {/* Refund Policy */}
              {activeSection === "refund" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          Refund Policy
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last updated: December 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      30-Day Money-Back Guarantee
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We offer a 30-day money-back guarantee on all course purchases. If you are not satisfied with a course, you can request a full refund within 30 days of purchase.
                    </p>

                                      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-lg mt-6">
                      <h4 className="text-lg font-bold text-green-900 dark:text-green-100 flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        Easy Refund Process
                      </h4>
                      <p className="text-green-800 dark:text-green-200">
                        Simply contact our support team with your order details, and we will process your refund within 5-7 business days.
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      Eligibility Criteria
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      To be eligible for a refund, you must meet the following conditions:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Request made within 30 days of purchase
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Less than 30% of course content has been consumed
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          No certificate of completion has been downloaded
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Account is in good standing with no violations
                        </span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      Non-Refundable Items
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      The following items are not eligible for refunds:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Subscription renewals (must be cancelled before renewal date)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Courses purchased on sale or with promotional codes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Bundled course packages after 14 days
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Custom enterprise training programs
                        </span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      How to Request a Refund
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      To request a refund:
                    </p>
                    <ol className="space-y-3 mt-4">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                          1
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Contact our support team at refunds@elearning.com
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                          2
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Provide your order number and reason for refund
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                          3
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Wait for confirmation from our team
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                          4
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Refund will be processed to your original payment method
                        </span>
                      </li>
                    </ol>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 flex items-center gap-2 mb-2">
                        <Bell className="w-5 h-5" />
                        Processing Time
                      </h4>
                      <p className="text-yellow-800 dark:text-yellow-200">
                        Refunds typically take 5-7 business days to appear in your account, depending on your payment provider.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Copyright Policy */}
              {activeSection === "copyright" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                          Copyright Policy
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last updated: December 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Intellectual Property Rights
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      All content on ELearning, including but not limited to text, graphics, logos, videos, audio files, and software, is the property of ELearning or its content suppliers and is protected by international copyright laws.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      Course Content Ownership
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      All course materials are owned by their respective instructors and ELearning. When you purchase a course, you receive:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          A non-exclusive, non-transferable license to access the content
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          The right to use the content for personal, non-commercial purposes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Lifetime access to course updates (where applicable)
                        </span>
                      </li>
                    </ul>

                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-red-900 dark:text-red-100 flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5" />
                        Prohibited Uses
                      </h4>
                      <p className="text-red-800 dark:text-red-200 mb-3">
                        You are expressly prohibited from:
                      </p>
                      <ul className="space-y-2">
                        <li className="text-red-800 dark:text-red-200 text-sm">
                          • Reproducing, distributing, or publicly displaying course content
                        </li>
                        <li className="text-red-800 dark:text-red-200 text-sm">
                          • Selling or licensing course materials to third parties
                        </li>
                        <li className="text-red-800 dark:text-red-200 text-sm">
                          • Creating derivative works from course content
                        </li>
                        <li className="text-red-800 dark:text-red-200 text-sm">
                          • Removing copyright notices or watermarks
                        </li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      DMCA Notice
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We respect the intellectual property rights of others. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our copyright agent with the following information:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Identification of the copyrighted work
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Location of the infringing material on our platform
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Your contact information (address, phone, email)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          A statement of good faith belief
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Electronic or physical signature
                        </span>
                      </li>
                    </ul>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8">
                      <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
                        Contact Our Copyright Agent
                      </h4>
                      <div className="space-y-2 text-blue-800 dark:text-blue-200">
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email: copyright@elearning.com
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone: +1 (234) 567-890
                        </p>
                        <p>
                          Address: 123 Learning Street, Education City, EC 12345
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8">
                      User-Generated Content
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      When you post reviews, comments, or other content on our platform, you grant ELearning a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with our services.
                    </p>

                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-lg mt-8">
                      <h4 className="text-lg font-bold text-green-900 dark:text-green-100 flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5" />
                        We Protect Your Rights Too
                      </h4>
                      <p className="text-green-800 dark:text-green-200">
                        Any original content you create remains your property. We only use it to operate and improve our platform.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you understand our policies and answer any questions you may have.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
              Contact Support
            </button>
            <button className="px-8 py-3 bg-blue-700 text-white border-2 border-white rounded-xl font-bold hover:bg-blue-800 transition-colors duration-300">
              Visit Help Center
            </button>
          </div>
        </div>
      </div>

      {/* Add animations CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in 0.6s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default Policy;