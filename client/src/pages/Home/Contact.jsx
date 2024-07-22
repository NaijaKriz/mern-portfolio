import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

function Contact() {
    const {portfolioData} = useSelector(state => state.root)
    const {contact} = portfolioData;
  return (
    <div>
        <SectionTitle title="Say Hello" /> 
        <div className="flex sm:flex-col items-center justify-between">
            <div className="flex flex-col gap-1">
            <p className="text-white">{'{'}</p>
            {Object.keys(contact).map(
                (key) =>
                    key !== "_id" && (
                <p className="ml-5">
                    <span className="text-white">{key} : </span>  
                    <span className="text-white">{contact[key]}</span>
                </p>
            ))}
            <p className="text-white">{'}'}</p>
            </div>
            <div className="h-[400px]">
            <dotlottie-player src="https://lottie.host/383c6c44-41c0-4c92-980c-35086fb2cbd2/N9kEya0Raq.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
            </div>
        </div>
    </div>
  )
}

export default Contact