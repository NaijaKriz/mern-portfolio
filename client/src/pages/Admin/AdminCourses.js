import { Form, Modal, message } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminCourses() {
    
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state) => state.root);
    const {courses} = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async(values) =>{
        try {
            const tempTechnologies = values?.technologies?.split(",");
            values.technologies = tempTechnologies
            dispatch(ShowLoading())

           let response
           if(selectedItemForEdit)
            {
                response = await axios.post("/api/portfolio/update-course",{
                    ...values,
                    _id: selectedItemForEdit._id,
                })
            }else{
                response = await axios.post("/api/portfolio/add-course", values);
            }
        dispatch(HideLoading())
        if(response.data.success){
            message.success(response.data.message)
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
            dispatch(HideLoading());
            dispatch(ReloadData(true));
        }else{
            message.error(response.data.message)
        }
        } catch (error) {
            dispatch(HideLoading())
          message.error(error.message)  
        }
    };

    const onDelete = async(item) =>{
        try {
            const response = await axios.post("/api/portfolio/delete-course", {
                _id:item._id,
            });
            dispatch(HideLoading())
            if(response.data.success){
                message.success(response.data.message)
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            }else{
                message.error(response.data.message)
            }
            } catch (error) {
                dispatch(HideLoading())
              message.error(error.message)  
            }
        };
    
  return (
    <div>
        <div className="flex justify-end">
            <button className="bg-primary px-5 py-2 text-white"
            onClick={() =>  {
                setShowAddEditModal(true);
                setSelectedItemForEdit(null);
                
            }}>
                Add Projects
            </button>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
        {courses.map((course) => (
            <div className="shadow border p-5 border-gray-400 flex flex-col gap-5">
                <h1 className="text-primary text-xl font-bold">{course.title}</h1>
                <hr />
                <h1><span className="font-bold">Image:</span> <img src={course.image} alt='' className='h-60 w-full rounded'/> </h1>
                <h1><span className="font-bold">Role:</span> {course.title}</h1>
                <h1><span className="font-bold">Description:</span> {course.description}</h1> 
                <h1><span className="font-bold">Project Link:</span> {course.link}</h1> 
                <div className="flex gap-5 justify-end mt-5">
                    <div className="bg-red-500 text-white px-5 py-2 cursor-pointer"
                    onClick={() =>{
                        onDelete(course);
                    }}
                    >
                        Delete</div>
                    <div className="bg-primary text-white px-5 py-2 cursor-pointer"
                        onClick={() =>{
                            setSelectedItemForEdit(course);
                            setShowAddEditModal(true);
                            setType("edit");
                        }}
                        >Edit</div>
                </div>
            </div>
        ))}

        {( type === "add" || selectedItemForEdit) && (

            <Modal open ={showAddEditModal}
        title = {selectedItemForEdit ? "Edit Course" : "Add Course"}
        footer={null}
        onCancel={() => {
            setShowAddEditModal(false)
            setSelectedItemForEdit(null)
        }}
        >
            <Form layout="vertical" 
            onFinish={onFinish}
            initialValues={{
                ...selectedItemForEdit,
                technologies : selectedItemForEdit?.technologies?.join(" , "),
            } || {}}
            >
                <Form.Item name='title' label='Title'>
                    <input placeholder="Title" />
                </Form.Item>
                <Form.Item name='image' label='Image Url'>
                    <input placeholder="Image Url" />
                </Form.Item>
                <Form.Item name='description' label='Description'>
                    <textarea placeholder="Description" />
                </Form.Item>
                <Form.Item name='link' label='Link'>
                    <input placeholder="Link" />
                </Form.Item>

                <div className="flex justify-end">
                    <button className="border-primary text-primary px-5 py-2" 
                    onClick={() => {
                        setShowAddEditModal(false)
                        setSelectedItemForEdit(null)
                    }}>Cancel</button>
                    <button className="bg-primary text-white px-5 py-2">
                        {selectedItemForEdit ? "Update" : "Add"}
                    </button>
                </div>
            </Form>
        </Modal>
            
        )}
    </div>
    </div>
  )
}

export default AdminCourses