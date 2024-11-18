import { Button } from '@mui/material';
import React, { useState } from 'react';

const ContactForm = ({ onToggleform }) => {
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    contactnumber: "",
    jobTitle: "",
    companyName: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({ contactnumber: "", email: "" });
  const [phoneExistsError, setPhoneExistsError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "contactnumber") {
      const phoneregex = /^[0-9]{10}$/;
      if (!phoneregex.test(value)) {
        error = "Mobile Number must be 10 digits long";
      } else {
        setPhoneExistsError(""); // Clear the phoneExistsError when the phone number format is valid
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address.";
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const checkIfPhoneExists = async (contactnumber) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/check-phone/${contactnumber}`);
      const data = await response.json();
      return data.exists; // Assuming your API returns { exists: true/false }
    } catch (error) {
      console.error("Error checking phone number:", error);
      return false; // Return false if there was an error during the check
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.contactnumber || errors.email) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const phoneExists = await checkIfPhoneExists(formData.contactnumber);
    if (phoneExists) {
      setPhoneExistsError("This phone number already exists. Please use a different number.");
      return; // Prevent form submission if the phone number exists
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert('Contact saved successfully');
        setFormData(initialValues);
        onToggleform();
      }
    } catch (error) {
      console.log("Error", error);
      alert("Something went wrong while submitting the form");
    }
    console.log("Form Data", formData); 
    onToggleform();
  };

  return (
    <div className='max-w-2xl mx-auto p-10 bg-gray-200 rounded-md shadow-lg'>
      <h2 className='text-black text-2xl text-center font-semibold'>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor="fname" className=' text-black font-medium'>First Name</label>
          <input
            className="w-full px-4 py-2 border rounded-md mt-1"
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="lname" className=' text-black font-medium'>Last Name</label>
          <input
            className="w-full px-4 py-2 border rounded-md mt-1"
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className=' text-black font-medium'>Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md mt-1"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Enter your email'
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="contactnumber" className=' text-black font-medium'>Mobile Number</label>
          <input
            className="w-full px-4 py-2 border rounded-md mt-1"
            type="text"
            id="contactnumber"
            name="contactnumber"
            value={formData.contactnumber}
            onChange={handleInputChange}
            placeholder='Enter your mobile number'
            required
          />
          {errors.contactnumber && (
            <p className="text-red-500 text-sm mt-1">{errors.contactnumber}</p>
          )}
          {phoneExistsError && (
            <p className="text-red-500 text-sm mt-1">{phoneExistsError}</p>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor="jobTitle" className=' text-black font-medium'>Job Title</label>
          <input
            className="w-full px-4 py-2 border rounded-md mt-1"
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="companyName" className=' text-black font-medium'>Company Name</label>
          <input
            className="w-full px-4 py-2 border rounded-md mt-1"
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder='Enter your name'
            required
          />
        </div>
        <div>
          <Button
            sx={{ borderColor: 'black', color: 'black' }}
            variant='outlined'
            type="submit"
            disabled={!!errors.contactnumber || !!errors.email || phoneExistsError}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
