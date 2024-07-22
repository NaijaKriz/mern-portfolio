import React from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import Experience from './Experience'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import LeftSidebar from './LeftSidebar'
import { useSelector } from 'react-redux'
import Courses from './Courses'

function Home() {
  const {portfolioData} = useSelector(state => state.root)
  return (
    <div>
    <Header />
    {portfolioData &&(
      <div className='bg-primary px-40 sm:px-5'>
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <LeftSidebar />
      </div>
    )}
    </div>
  )
}

export default Home