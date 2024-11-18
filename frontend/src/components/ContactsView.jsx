import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';

const ContactsView = () => {
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => {
        setShowForm(!showForm)
    }
  return (
    <div>
    <div className='flex justify-between mt-10 '>
      <h2 className='ml-10 font-bold text-3xl'>Your Contacts</h2>
      <div className='mr-10'>
      <Button startIcon={<Edit sx={{color: 'black'}} />} sx={{borderColor: 'black', color: 'black'}} variant='outlined' onClick={toggleForm}> Add New Contact</Button>
      </div>
    </div>
    <div className='flex justify-center mt-5 z-50'>
      {showForm && ( <ContactForm onToggleform={toggleForm} />)}
    </div>
    <div className='mt-5'>
    <ContactTable />
    </div>
    </div>
  )
}

export default ContactsView
