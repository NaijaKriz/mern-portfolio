import { Form, Modal, message } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminExperiences() {
    
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state) => state.root);
    const {experiences} = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async(values) =>{
        try {
           dispatch(ShowLoading())

           let response
           if(selectedItemForEdit)
            {
                response = await axios.post("/api/portfolio/update-experience",{
                    ...values,
                    _id: selectedItemForEdit._id,
                })
            }else{
                response = await axios.post("/api/portfolio/add-experience",
                    values
                );
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
            const response = await axios.post("/api/portfolio/delete-experience", {
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
                Add Experience
            </button>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {experiences.map((experience) => (
            <div className="shadow border p-5 border-gray-400 flex flex-col">
                <h1 className="text-primary text-xl font-bold">{experience.period}</h1>
                <hr />
                <h1><span className="font-bold">Company:</span> {experience.company}</h1>
                <h1><span className="font-bold">Role:</span> {experience.title}</h1>
                <h1><span className="font-bold">Description:</span> {experience.description}</h1> 
                <div className="flex gap-5 justify-end mt-5">
                    <div className="bg-red-500 text-white px-5 py-2 cursor-pointer"
                    onClick={() =>{
                        onDelete(experience);
                    }}
                    >
                        Delete</div>
                    <div className="bg-primary text-white px-5 py-2 cursor-pointer"
                        onClick={() =>{
                            setSelectedItemForEdit(experience);
                            setShowAddEditModal(true);
                            setType("edit");
                        }}
                        >Edit</div>
                </div>
            </div>
        ))}

        {( type === "add" || selectedItemForEdit) && (

            <Modal open ={showAddEditModal}
        title = {selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        footer={null}
        onCancel={() => {
            setShowAddEditModal(false)
            setSelectedItemForEdit(null)
        }}
        >
            <Form layout="vertical" onFinish={onFinish}
                initialValues={selectedItemForEdit}
            >
                <Form.Item name='period' label='Period'>
                    <input type="text" placeholder="Period" />
                </Form.Item>
                <Form.Item name='company' label='Company'>
                    <input type="text" placeholder="Company" />
                </Form.Item>
                <Form.Item name='title' label='Title'>
                    <input type="textarea" placeholder="Title" />
                </Form.Item>
                <Form.Item name='description' label='Description'>
                    <input type="textarea" placeholder="Description" />
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

export default AdminExperiences