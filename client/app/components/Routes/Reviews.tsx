import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react';
import ReviewCard from "../Review/ReviewCard";
import { Sparkles, Quote } from 'lucide-react';

type Props = {}

export const reviews = [
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    ratings: 5,
    comment: "This platform transformed my career! The courses are well-structured and the instructors are top-notch. Highly recommend to anyone looking to level up their skills."
  },
  {
    name: "Mohamed Karim",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    profession: "Frontend Engineer | Egypt",
    ratings: 5,
    comment: "Great platform! The courses helped me level up my skills very quickly. The hands-on projects were especially valuable for my portfolio."
  },
  {
    name: "Amina Boucher",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    profession: "UI/UX Designer | Morocco",
    ratings: 5,
    comment: "Amazing experience! The instructors explain everything clearly and professionally. I landed my dream job thanks to the skills I learned here."
  },
  {
    name: "Omar Haddad",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    profession: "Software Engineer | UAE",
    ratings: 4,
    comment: "High-quality content and very organized structure. The community support is incredible. Highly recommended for serious learners!"
  },
  {
    name: "Layla Rahman",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    profession: "Data Analyst | Saudi Arabia",
    ratings: 5,
    comment: "The lessons are practical and easy to understand. Loved every minute! The real-world examples made complex concepts crystal clear."
  },
  {
    name: "Ahmed Hassan",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profession: "Backend Developer | Tunisia",
    ratings: 5,
    comment: "Best investment in my education! The course quality exceeded my expectations and the certificate helped me advance my career."
  }
];

const Reviews = (props: Props) => {
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

      <div className="relative z-10 w-[90%] 800px:w-[85%] max-w-[1400px] m-auto">
        
        {/* Header Section */}
        <div className="w-full 800px:flex items-center gap-12 mb-16">
          
          {/* Left Side Image */}
          <div className="800px:w-[50%] w-full mb-8 800px:mb-0 animate-fade-in-up">
            <div className="relative">
              {/* Gradient Background Blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
              
              <Image
                src={require("/Users/hossamhassan112003outlook.com/Documents/GitHub/LMS/client/public/assets/business-img.png")}
                alt="business"
                width={700}
                height={700}
                className="relative object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Side Text */}
          <div className="800px:w-[50%] w-full animate-fade-in-up animation-delay-200">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trusted by 50,000+ Students
              </span>
            </div>

            <h3 className="text-4xl 800px:text-5xl font-bold font-Poppins mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">Our Students Are </span>
              <span className="gradient-text">Our Strength</span>
              <br />
              <span className="text-gray-900 dark:text-white text-3xl 800px:text-4xl">
                See What They Say About Us
              </span>
            </h3>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-Poppins">
              Join thousands of successful students who have transformed their careers 
              with our world-class courses. Real stories from real people who achieved 
              their learning goals and professional dreams with our platform.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">4.9/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up animation-delay-400">
          {reviews.map((item, index) => (
            <div
              key={index}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              className="animate-fade-in-up"
            >
              <ReviewCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;