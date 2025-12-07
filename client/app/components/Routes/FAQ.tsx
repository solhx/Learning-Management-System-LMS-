import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { HelpCircle, Sparkles } from 'lucide-react';
import Loader from '../Loader/Loader';

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 py-20 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 hero_animation opacity-20"></div>
      <div className="particles-container">
        {[...Array(10)].map((_, i) => (
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

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 geometric-shape shape-1"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 geometric-shape shape-2"></div>

      <div className="relative z-10 w-[90%] 800px:w-[80%] max-w-[1200px] m-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6 shadow-lg">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Got Questions? We've Got Answers
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl 800px:text-5xl font-bold font-Poppins mb-4">
            <span className="text-gray-900 dark:text-white">Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-Poppins">
            Find answers to common questions about our platform, courses, and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 animate-fade-in-up animation-delay-200">
          <dl className="space-y-4">
            {questions.map((q, index) => {
              const isActive = activeQuestion === q._id;
              
              return (
                <div
                  key={q._id}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div
                    className={`
                      relative bg-white/90 dark:bg-gray-800/80 backdrop-blur-[20px]
                      border-2 rounded-2xl overflow-hidden
                      transition-all duration-300
                      ${
                        isActive
                          ? 'border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-400/40 dark:hover:border-blue-500/40'
                      }
                    `}
                  >
                    {/* Top Gradient Border (shows when active) */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-shift"></div>
                    )}

                    <dt>
                      <button
                        className="flex items-start justify-between w-full text-left p-6 focus:outline-none group"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        {/* Question Number & Text */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Number Badge */}
                          <div
                            className={`
                              flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                              font-bold text-sm transition-all duration-300
                              ${
                                isActive
                                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                              }
                            `}
                          >
                            {index + 1}
                          </div>

                          {/* Question Text */}
                          <span
                            className={`
                              font-semibold text-lg font-Poppins transition-colors duration-300
                              ${
                                isActive
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                              }
                            `}
                          >
                            {q.question}
                          </span>
                        </div>

                        {/* Toggle Icon */}
                        <div
                          className={`
                            ml-6 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                            transition-all duration-300
                            ${
                              isActive
                                ? 'bg-gradient-to-br from-blue-600 to-purple-600 rotate-180 shadow-lg'
                                : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                            }
                          `}
                        >
                          {isActive ? (
                            <HiMinus className="h-5 w-5 text-white" />
                          ) : (
                            <HiPlus className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                          )}
                        </div>
                      </button>
                    </dt>

                    {/* Answer */}
                    <dd
                      className={`
                        overflow-hidden transition-all duration-300
                        ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="px-6 pb-6 pl-[72px]">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                          <p className="text-base font-Poppins text-gray-700 dark:text-gray-300 leading-relaxed">
                            {q.answer}
                          </p>
                        </div>
                      </div>
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-400">
          <div className="inline-block bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-Poppins">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-Poppins">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              <span className="relative z-10 flex items-center gap-2">
                Contact Support
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;