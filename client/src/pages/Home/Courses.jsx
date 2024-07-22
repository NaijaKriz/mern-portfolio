import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Courses() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)
    const {portfolioData} = useSelector(state => state.root)
    const {courses} = portfolioData;
  return (
    <div>
        <SectionTitle title = "Courses" />
        <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
            {courses.map((course, index)=>(
                <div onClick={() => {
                    setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
                >
                <h1 className={`text-xl px-5 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}>{course.title}</h1>
                </div>
                ))}
        </div>
            
            <div className="flex items-center justify-center gap-14 sm:flex-col">
               
            <div className="flex flex-col gap-10">
            <h1 className="text-secondary text-2xl"> {courses[selectedItemIndex].title} </h1>
                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sequi ex numquam sit perferendis accusamus nisi debitis 
                    dolorem quo consectetur, maxime officiis quam nobis nulla 
                    praesentium quas neque, quis mollitia delectus.
                </p>
            </div>
            <img src={courses[selectedItemIndex].image} alt="" className="h-40 w-80 sm:w-full rounded"/>
            </div>
       </div>
    </div>
  )
}

export default Courses