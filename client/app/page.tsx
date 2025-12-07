'use client';
import React, { FC, useState, useEffect } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Routes/Hero';
import Courses from './components/Routes/Courses';
import Reviews from './components/Routes/Reviews';
import FAQ from './components/Routes/FAQ';
import Footer from './components/Routes/Footer';


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');

  // Update active item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

  
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Heading
        title="Elearning"
        description="Elearning is a platform for online education."
        keywords="react,programming,education,learning"
      />
      
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      
      <main className="min-h-screen">
        <section id="home" className="pt-[80px]">
          <Hero />
        </section>
        
        <section id="courses">
          <Courses />
        </section> 

        <section id="reviews">
          <Reviews />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <section id="faq">
          <Footer />
        </section>

      </main>
    </>
  );
};

export default Page;