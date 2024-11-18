import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

const EditForm = ({rowData, setIsEditing,updateRowData}) => {
    const [formData, setFormData] = useState ({
        fname: rowData.fname,
        lname: rowData.lname,
        email: rowData.email,
        contactnumber: rowData.contactnumber,
        jobTitle: rowData.jobTitle,
        companyName: rowData.companyName
    })
    const [errors, setErrors] = useState({
        email: "",
        contactnumber: "",
      });
    
      useEffect(() => {
        setFormData({
          fname: rowData.fname,
          lname: rowData.lname,
          email: rowData.email,
          contactnumber: rowData.contactnumber,
          jobTitle: rowData.jobTitle,
          companyName: rowData.companyName,
        });
      }, [rowData]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedData = {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          contactnumber: formData.contactnumber,
          jobTitle: formData.jobTitle,
          companyName: formData.companyName,
        };
      
        try {
          const response = await fetch(`http://localhost:5000/api/contact/${rowData._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });
      
          if (!response.ok) {
            throw new Error("Failed to update the contact.");
          }
      
          const result = await response.json();
      
          //console.log("Updated contact:", result);
      
          setIsEditing(false);
      
          
          updateRowData(result);
        } catch (error) {
          console.error("Error updating contact:", error);
        }
      };
      
    
    
  return (
         <div className='max-w-lg mx-auto p-10 bg-gray-200 rounded-md shadow-lg'>
        <h2 className='text-black text-2xl text-center font-semibold'>Edit Contact Form</h2>
        <form onSubmit={handleSubmit}>
        <div className='mb-4'>
        <label htmlFor="fname" className=' text-black font-medium'>First Name</label>
        <input className="w-full px-4 py-2 border rounded-md mt-1" type="text" id="fname" name="fname" value={formData.fname} onChange={handleInputChange} placeholder='Enter your name' required/>
        </div>
        <div className='mb-4'>
        <label htmlFor="lname" className=' text-black font-medium'>Last Name</label>
        <input className="w-full px-4 py-2 border rounded-md mt-1" type="text" id="lname" name="lname" value={formData.lname} onChange={handleInputChange} placeholder='Enter your name' required/>
        </div>
        <div className='mb-4'>
        <label htmlFor="email" className=' text-black font-medium'>Email</label>
        <input className="w-full px-4 py-2 border rounded-md mt-1" type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder='Enter your email' required/>
        {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className='mb-4'>
        <label htmlFor="contactnumber" className=' text-black font-medium'>Mobile Number</label>
        <input className="w-full px-4 py-2 border rounded-md mt-1"  type="text" id="contactnumber" name="contactnumber" value={formData.contactnumber} onChange={handleInputChange} placeholder='Enter your mobile number' required/>
        {errors.contactnumber && (
            <p className="text-red-500 text-sm mt-1">{errors.contactnumber}</p>
          )}
        </div>
        <div className='mb-4'>
        <label htmlFor="jobTitle" className=' text-black font-medium'>Job Title</label>
        <input className="w-full px-4 py-2 border rounded-md mt-1" type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder='Enter your name' required/>
        </div>
        <div className='mb-4'>
        <label htmlFor="companyName" className=' text-black font-medium'>Company Name</label>
        <input className="w-full px-4 py-2 border rounded-md mt-1" type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder='Enter your name' required/>
        </div>
        <div>
        <Button sx={{borderColor: 'black', color: 'black'}} variant='outlined'type="submit" disabled= {!!errors.contactnumber || !!errors.email} > Submit</Button>
        </div>
        </form>
    </div>
  )
}

export default EditForm