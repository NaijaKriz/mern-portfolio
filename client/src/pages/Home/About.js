import React from 'react'
import SectionTitle from './../../components/SectionTitle';
import { useSelector } from 'react-redux';

function About() {
    const {loading, portfolioData} = useSelector(state => state.root)
    const {about} = portfolioData;
    const {skills, lottieURL, description1, description2} = about;
  return (
    <div>
        <SectionTitle title="About" />

        <div className="flex w-full items-center sm:flex-col">
            <div className="h-[70vh] w-1/2 sm:w-full items-center">
            <dotlottie-player src={lottieURL || ''} 
            background="transparent" speed="1" loop autoplay></dotlottie-player>
            </div>
            <div className="flex flex-col gap-5 w-1/2 sm:w-full">
                <p className="text-white">
                {description1 || ''}
                </p>

                <p className="text-white">
                {description2 || ''}
                </p>
            </div>
        </div>

        <div className="py-5">
            <h1 className="text-tertiary text-xl">Here are few of the technologies I have been working with recently:</h1>
            <div className="flex flex-wrap gap-10 mt-5">
            {skills.map((skill, index) =>(
                <div className="border-2 border-tertiary py-3 px-8 rounded">
                    <h1 className="text-tertiary">{skill}</h1>
                </div>
            ))}
            </div>
        </div>


    </div>
  )
}

export default About