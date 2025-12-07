"use client";
import React from "react";
import Header from "@/app/components/Header";
import Image from "next/image";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  BookOpen,
  Globe,
  TrendingUp,
  Zap,
  CheckCircle,
  Star,
  Rocket,
  Shield,
  Code,
  Sparkles,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

type Props = {};

const About = (props: Props) => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "500+", label: "Expert Courses" },
    { icon: Globe, value: "120+", label: "Countries Reached" },
    { icon: Award, value: "98%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from course content to student support.",
      color: "blue",
    },
    {
      icon: Heart,
      title: "Student First",
      description: "Our students' success is our priority. We're committed to providing the best learning experience.",
      color: "red",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly innovate our teaching methods to deliver cutting-edge education.",
      color: "yellow",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain the highest standards of integrity in all our interactions and content.",
      color: "green",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/team/member1.jpg",
      bio: "15+ years in EdTech",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/team/member2.jpg",
      bio: "Former Google Engineer",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image: "/team/member3.jpg",
      bio: "PhD in Education",
    },
    {
      name: "David Kim",
      role: "Lead Instructor",
      image: "/team/member4.jpg",
      bio: "10+ years teaching",
    },
  ];

  const achievements = [
    { icon: Award, text: "Best Online Learning Platform 2024" },
    { icon: Star, text: "4.8/5 Average Course Rating" },
    { icon: TrendingUp, text: "200% Year-over-Year Growth" },
    { icon: CheckCircle, text: "ISO 9001 Certified" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <Header activeItem={2} open={false} setOpen={() => {}} route="" setRoute={() => {}} />

      {/* Background Elements */}
      <div className="absolute inset-0 hero_animation opacity-20"></div>
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6 shadow-lg animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              About ELearning
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-100">
            <span className="text-gray-900 dark:text-white">Empowering </span>
            <span className="gradient-text">Tomorrow's Leaders</span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
            We're on a mission to democratize education and make world-class learning accessible to everyone, everywhere.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-300">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold gradient-text mb-1">{stat.value}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Story</h2>
              </div>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                <p>
                  Founded in 2020, ELearning was born from a simple belief: quality education should be accessible to everyone, regardless of their location or background.
                </p>
                <p>
                  What started as a small team of passionate educators has grown into a global platform serving over 50,000 students across 120+ countries.
                </p>
                <p>
                  Today, we partner with industry experts and leading professionals to create courses that not only teach skills but transform careers.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Join Our Community
                </button>
                <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  View Courses
                </button>
              </div>
            </div>

            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-24 h-24 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                To empower individuals worldwide with the knowledge and skills they need to succeed in the digital age through accessible, high-quality online education.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 mx-auto">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                To become the world's leading online learning platform, where anyone can unlock their potential and achieve their career aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-20 px-4 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colorClasses = {
                blue: "from-blue-600 to-indigo-600",
                red: "from-red-600 to-pink-600",
                yellow: "from-yellow-500 to-orange-500",
                green: "from-green-600 to-emerald-600",
              };

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                      colorClasses[value.color as keyof typeof colorClasses]
                    } flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
              <p className="text-blue-100 text-lg">Recognition we're proud of</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <Icon className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                    <p className="text-white font-medium">{achievement.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The passionate people behind ELearning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
            <Rocket className="w-16 h-16 text-white mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already transforming their careers with our expert-led courses.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
                Browse Courses
              </button>
              <button className="px-8 py-4 bg-purple-700 text-white border-2 border-white rounded-xl font-bold hover:bg-purple-800 transition-colors duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;