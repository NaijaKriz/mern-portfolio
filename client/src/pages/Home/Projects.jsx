import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Projects() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)
    const {portfolioData} = useSelector(state => state.root)
    const {projects} = portfolioData;
  return (
    <div>
        <SectionTitle title="Projects" />

        <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
            {projects.map((project, index)=>(
                <div onClick={() => {
                    setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
                >
                <h1 className={`text-xl px-5 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}>{project.title}</h1>
                </div>
                ))}
        </div>
            
            <div className="flex items-center justify-center gap-14 sm:flex-col">
                <img src={projects[selectedItemIndex].image} alt="" className="h-40 w-56 sm:w-full" />
            <div className="flex flex-col gap-10">
            <h1 className="text-secondary text-2xl"> {projects[selectedItemIndex].title} </h1>
            <p className="text-white"> {projects[selectedItemIndex].description} </p>
            <p className="text-white"><a href={projects[selectedItemIndex].link} >Visit website Link </a></p>
                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sequi ex numquam sit perferendis accusamus nisi debitis 
                    dolorem quo consectetur, maxime officiis quam nobis nulla 
                    praesentium quas neque, quis mollitia delectus.
                </p>
            </div>
            </div>
       </div>
    </div>
  )
}

export default Projects